import { env, window } from "vscode";
import { defaultStatusBarTimeout } from "./constants";

export async function copyWholeBuffer() {
    const activeEditor = window.activeTextEditor;
    if (activeEditor) {
        const lineNumber = activeEditor.document.lineCount;
        await env.clipboard.writeText(activeEditor.document.getText());
        window.setStatusBarMessage(`${lineNumber} lines copied`, defaultStatusBarTimeout);
    }
}