import {
    applyEdits,
    getNodeValue,
    JSONPath,
    modify,
    Node,
    parseTree,
} from "jsonc-parser";
import isEqual from "lodash/isEqual";
import remove from "lodash/remove";
import {
    commands,
    ConfigurationTarget,
    Range,
    TextDocument,
    Uri,
    window,
    workspace,
    WorkspaceEdit,
} from "vscode";
import { KeyBinding } from "./keyBinding";

const legacyBindings = require("./legacyKeybindings.jsonc");
const legacySettings = require("./legacySettings.jsonc");
const requiredBindings = require("./keybindings.jsonc");
const requiredSettings = require("./settings.jsonc");

export async function configSettings() {
    // Remove legacy settings
    for (const [legacyKey, legacyValue] of Object.entries(legacySettings)) {
        const sections = legacyKey.split(".");
        const sectionName = sections.pop()!;
        const configName = sections.join(".");

        const config = workspace.getConfiguration(configName);
        const configValue = config.inspect(sectionName)?.globalValue;

        let updatedValue: any = undefined; // Default to remove the legacy key
        if (Array.isArray(legacyValue) && Array.isArray(configValue)) {
            updatedValue = [...configValue];
            for (const item of legacyValue) {
                remove(updatedValue, (i) => isEqual(i, item));
            }
        }

        await config.update(
            sectionName,
            updatedValue,
            ConfigurationTarget.Global
        );
    }

    // Update the required settings
    for (const [requiredKey, requiredValue] of Object.entries(
        requiredSettings
    )) {
        const sections = requiredKey.split(".");
        const sectionName = sections.pop()!;
        const configName = sections.join(".");

        const config = workspace.getConfiguration(configName);
        const configValue = config.inspect(sectionName)?.globalValue;

        let updatedValue: any = requiredValue;
        if (Array.isArray(requiredValue) && Array.isArray(configValue)) {
            updatedValue = [...configValue];
            for (const item of requiredValue) {
                if (!configValue.find((i) => isEqual(i, item))) {
                    updatedValue.push(item);
                }
            }
        }

        await config.update(
            sectionName,
            updatedValue,
            ConfigurationTarget.Global
        );
    }
}

export async function configKeyBindings() {
    await commands.executeCommand("workbench.action.openGlobalKeybindingsFile");
    if (window.activeTextEditor) {
        const document = window.activeTextEditor.document;
        if (getFilename(document.uri) === "keybindings.json") {
            await editBindingsDoc(document);
        }
    }
}

function getFilename(uri: Uri) {
    const pieces = uri.fsPath.split(/[/\\]/g);
    if (pieces[pieces.length - 1].length === 0) {
        pieces.pop();
    }
    if (pieces.length > 0) {
        return pieces[pieces.length - 1];
    }
    return "";
}

function toHashKey(b: KeyBinding) {
    return `${b.key}${b.command}${b.when ?? ""}`;
}

async function editBindingsDoc(doc: TextDocument) {
    const text = doc.getText();
    // return undefined if text is an empty string
    const node = parseTree(text) as Node | undefined;

    let updatedText;
    if (node && node.type !== "array") {
        // Replace directly if it is not array, that means the keybindings contains the wrong config.
        updatedText = JSON.stringify(requiredBindings, undefined, "\t");
    } else {
        // Else = if the either the node is not undefined, could be all comments
        // or it is an array type and has children
        updatedText = text;

        // Setup lookup tables
        const requiredMap = new Map<string, KeyBinding>();
        for (const b of requiredBindings) {
            requiredMap.set(toHashKey(b), b);
        }
        const legacySet = new Set<string>();
        for (const b of legacyBindings) {
            legacySet.add(toHashKey(b));
        }
        const modOptions = { formattingOptions: { insertSpaces: false } };

        // If the root node is an array and has children
        if (node && node.type === "array" && node.children) {
            for (let i = 0; i < node.children?.length ?? 0; i++) {
                const idx = node.children.length - i - 1;
                const child = node.children[idx];
                const v = getNodeValue(child) as KeyBinding;
                const key = toHashKey(v);

                if (legacySet.has(key)) {
                    // Remove the legacy config
                    const path = [idx] as JSONPath;
                    const edits = modify(
                        updatedText,
                        path,
                        undefined,
                        modOptions
                    );
                    updatedText = applyEdits(updatedText, edits);
                    node.children.splice(idx, 1);
                } else if (requiredMap.has(key)) {
                    // Exclude the bindings that exist
                    requiredMap.delete(key);
                }
            }
        }

        // Append (using update) to the text to avoid removal of comments the much as possible
        let index = node?.children?.length ?? 0;
        for (const binding of requiredMap.values()) {
            const path = [index] as JSONPath;
            const edits = modify(updatedText, path, binding, modOptions);
            updatedText = applyEdits(updatedText, edits);
            index++;
        }
    }

    const fullRange = new Range(doc.positionAt(0), doc.positionAt(text.length));
    const edit = new WorkspaceEdit();
    edit.replace(doc.uri, fullRange, updatedText);
    await workspace.applyEdit(edit);
    await doc.save();
}
