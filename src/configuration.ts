import { getNodeValue, Node, parseTree } from "jsonc-parser";
import { commands, ConfigurationTarget, Range, TextDocument, Uri, window, workspace, WorkspaceEdit } from "vscode";
import { CommandId, VimConfigKey, vimExtensionId } from "./constants";
import { KeyBinding } from "./keyBinding";
import requiredBindings from './keybindings.json';
import { VimKeyBinding } from "./vimKeyBinding";

export async function configSettings() {
    const vimConfig = workspace.getConfiguration(vimExtensionId);
    const normalBindings = vimConfig.get<VimKeyBinding[]>(VimConfigKey.NormalNonRecursive) ?? [];
    const visualBindings = vimConfig.get<VimKeyBinding[]>(VimConfigKey.VisualNonRecursive) ?? [];
    const hasNormalBinding = normalBindings.some(b => b.commands?.some(c => c === CommandId.ShowSpaceMenu));
    const hasVisualBinding = visualBindings.some(b => b.commands?.some(c => c === CommandId.ShowSpaceMenu));
    if (!hasNormalBinding || !hasVisualBinding) {
        if (!hasNormalBinding) {
            normalBindings.push({ "before": ["<space>"], "commands": [CommandId.ShowSpaceMenu] });
            vimConfig.update(VimConfigKey.NormalNonRecursive, normalBindings, ConfigurationTarget.Global);
        }
        if (!hasVisualBinding) {
            visualBindings.push({ "before": ["<space>"], "commands": [CommandId.ShowSpaceMenu] });
            vimConfig.update(VimConfigKey.VisualNonRecursive, visualBindings, ConfigurationTarget.Global);
        }
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

    if (node && node.type === 'array' && node.children) {
        // Exclude the bindings that exists
        for (let child of node.children) {
            const v = getNodeValue(child) as KeyBinding;
            const key = `${v.key}${v.command}`;
            if (additionBindings.has(key)) {
                additionBindings.delete(key);
            }
        }

        // TODO: wait for the support of array insert to preserved comment
        // https://github.com/microsoft/node-jsonc-parser/pull/35
        // let updatedText = text;
        // let index = node.children.length;
        // for (const binding of additionBindings.values()) {
        //     const path = [index] as JSONPath;
        //     const edits = modify(updatedText, path, binding, { formattingOptions: {} });
        //     updatedText = applyEdits(updatedText, edits);
        // }
    }

    const rootArray = (node ? getNodeValue(node) : []) as KeyBinding[];
    for (const binding of additionBindings.values()) {
        rootArray.push(binding);
    }

    if (rootArray.length > 0) {
        const updatedText = JSON.stringify(rootArray, undefined, '\t');

        const fullRange = new Range(
            doc.positionAt(0),
            doc.positionAt(text.length));
        const edit = new WorkspaceEdit();
        edit.replace(doc.uri, fullRange, updatedText);
        await workspace.applyEdit(edit);
        await doc.save();
    }
}
