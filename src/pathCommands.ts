import path from "path";
import { env, TextEditor, Uri, window, workspace } from "vscode";
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
    return dirname(active.fsPath);
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
    return dirname(active.fsPath);
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
    // uri.fsPath:
    // Windows machine remoting into a linux will return a "\" as separator
    // *nix machine remoting into a windows will return "/" as separator
    const uri = activeEditor.document.uri;
    let fsPath = relative ? asRelativePath(uri) : uri.fsPath;

    if (hasDriveLetter(fsPath)) {
        // Normalized from c:\path to => C:\path
        fsPath = fsPath[0].toUpperCase() + fsPath.substr(1);
    }

    const activePos = activeEditor.selection.active;
    const line = activePos.line;
    const col = activePos.character;
    return { fsPath, line, col };
}

function hasDriveLetter(path: string): boolean {
    return !!(path && path[1] === ':');
}

function asRelativePath(uri: Uri) {
    // - asRelativePath always return "/" as separator
    // - In comparison, "copyRelativeFilePath" returns the right separator regardless platform and remote status
    // - If uri is not in any of the workspace directories, a full path will be returned (This is on par with "copyRelativeFilePath").
    // - Needs to pass uri instead as a string so the information about scheme of the file is not lost like if the file is in network drive, vscode-remote or local drive.
    // - Passing false to includeWorkspaceFolder because "copyRelativeFilePath" doesn't include the workspace folder.
    let relative = workspace.asRelativePath(uri, false);
    if (relative !== uri.fsPath) {
        // Correction for the local platform
        relative = relative.replace("/", path.sep);
    }
    return relative;
}

function dirname(fsPath: string) {
    // Use the local path separator("/" or "\" depending on the system)
    return path.dirname(fsPath) + path.sep;
}