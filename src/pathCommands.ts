import path from "path";
import { env, TextEditor, window, workspace } from "vscode";
import { defaultStatusBarTimeout } from "./constants";

export function copyWrapper(fn: (activeEditor: TextEditor) => string) {
    return async () => {
        const activeEditor = window.activeTextEditor;
        if (activeEditor) {
            const path = fn(activeEditor);
            await env.clipboard.writeText(path);
            window.setStatusBarMessage(path, defaultStatusBarTimeout);
            return path;
        }
        return undefined;
    };
}

export function getPath(activeEditor: TextEditor) {
    return _getPath(activeEditor, false).fsPath;
}

export function getPathWithLine(activeEditor: TextEditor) {
    const active = _getPath(activeEditor, false);
    return `${active.fsPath}:${active.line}`;
}

export function getPathWithLineColumn(activeEditor: TextEditor) {
    const active = _getPath(activeEditor, false);
    return `${active.fsPath}:${active.line}:${active.col}`;
}

export function getDirectoryPath(activeEditor: TextEditor) {
    const active = _getPath(activeEditor, false);
    return path.dirname(active.fsPath);
}

export function getRelativePath(activeEditor: TextEditor) {
    return _getPath(activeEditor, true).fsPath;
}

export function getRelativePathWithLine(activeEditor: TextEditor) {
    const active = _getPath(activeEditor, true);
    return `${active.fsPath}:${active.line}`;
}

export function getRelativePathWithLineColumn(activeEditor: TextEditor) {
    const active = _getPath(activeEditor, true);
    return `${active.fsPath}:${active.line}:${active.col}`;
}

export function getRelativeDirectoryPath(activeEditor: TextEditor) {
    const active = _getPath(activeEditor, true);
    return path.dirname(active.fsPath);
}
export function getFilename(activeEditor: TextEditor) {
    const fsPath = activeEditor.document.uri.fsPath;
    return path.basename(fsPath);
}

export function getFilenameBase(activeEditor: TextEditor) {
    const fsPath = activeEditor.document.uri.fsPath;
    return path.basename(fsPath, path.extname(fsPath));
}

function _getPath(activeEditor: TextEditor, relative: boolean) {
    let fsPath = activeEditor.document.uri.fsPath;
    if (relative) {
        fsPath = workspace.asRelativePath(fsPath);
    }
    const activePos = activeEditor.selection.active;
    const line = activePos.line;
    const col = activePos.character;
    return { fsPath, line, col };
}