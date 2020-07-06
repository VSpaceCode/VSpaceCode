import { getNodeValue, Node, parseTree, JSONPath, modify, applyEdits } from "jsonc-parser";
import isEqual from 'lodash/isEqual';
import { commands, ConfigurationTarget, Range, TextDocument, Uri, window, workspace, WorkspaceEdit } from "vscode";
import { KeyBinding } from "./keyBinding";

const requiredBindings = require('./keybindings.jsonc');
const requiredSettings  = require('./settings.jsonc');

export async function configSettings() {
    for (const [requiredKey, requiredValue] of Object.entries(requiredSettings)) {
        const sections = requiredKey.split(".");
        const sectionName = sections.pop()!;
        const configName = sections.join(".");

        const config = workspace.getConfiguration(configName);
        const configValue = config.get(sectionName);

        let updatedValue: any = requiredValue;
        if (Array.isArray(requiredValue) && Array.isArray(configValue)) {
            updatedValue = [...configValue];
            for (const item of requiredValue) {
                if (!configValue.find(i => isEqual(i, item))) {
                    updatedValue.push(item);
                }
            }
        }

        config.update(sectionName, updatedValue, ConfigurationTarget.Global);
    }
}

export async function configKeyBindings() {
    await commands.executeCommand("workbench.action.openGlobalKeybindingsFile");
    if (window.activeTextEditor) {
        const document = window.activeTextEditor.document;
        if (getFilename(document.uri) === 'keybindings.json') {
            await editBindingsDoc(document);
        }
    }
}

function getFilename(uri: Uri) {
    let pieces = uri.fsPath.split(/[/\\]/g);
    if (pieces[pieces.length - 1].length === 0) {
        pieces.pop();
    }
    if (pieces.length > 0) {
        return pieces[pieces.length - 1];
    }
    return '';
}

async function editBindingsDoc(doc: TextDocument) {
    const text = doc.getText();
    // return undefined if text is an empty string
    const node = parseTree(text) as Node | undefined;

    const additionBindings = new Map<string, KeyBinding>();
    for (const override of requiredBindings) {
        const key = `${override.key}${override.command}`;
        additionBindings.set(key, override);
    }

    let updatedText;
    if (node && node.type !== 'array') {
        // Replace directly if it is not array, that means the keybindings contains the wrong config.
        updatedText = JSON.stringify([...additionBindings.values()], undefined, '\t');
    } else {
        // Else if the either the node is not undefined, could be all comments
        // or it is an array type and has children
        if (node && node.type === 'array' && node.children) {
            // If the root node is an array and has children
            // Exclude the bindings that exists
            for (let child of node.children) {
                const v = getNodeValue(child) as KeyBinding;
                const key = `${v.key}${v.command}`;
                if (additionBindings.has(key)) {
                    additionBindings.delete(key);
                }
            }
        }

        // Update the text to avoid remove comments the much as possible
        updatedText = text;
        let index = node?.children?.length ?? 0;
        for (const binding of additionBindings.values()) {
            const path = [index] as JSONPath;
            const edits = modify(updatedText, path, binding, { formattingOptions: { insertSpaces: false } });
            updatedText = applyEdits(updatedText, edits);
            index++;
        }
    }

    const fullRange = new Range(
        doc.positionAt(0),
        doc.positionAt(text.length));
    const edit = new WorkspaceEdit();
    edit.replace(doc.uri, fullRange, updatedText);
    await workspace.applyEdit(edit);
    await doc.save();
}
