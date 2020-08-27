import path, { PlatformPath } from "path";
import { env, TextEditor, Uri, window, workspace } from "vscode";
import { CharCode } from "./charCode";
import { defaultStatusBarTimeout } from "./constants";

export function copyWrapper(fn: (activeEditor: TextEditor) => string) {
    return async () => {
        const activeEditor = window.activeTextEditor;
        if (activeEditor) {
            const fsPath = fn(activeEditor);
            await env.clipboard.writeText(fsPath);
            window.setStatusBarMessage(fsPath, defaultStatusBarTimeout);
            return fsPath;
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
    return dirname(active.fsPath, active.path);
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
    return dirname(active.fsPath, active.path);
}
export function getFilename(activeEditor: TextEditor) {
    const active = _getPath(activeEditor, true);
    return basename(active.fsPath, true, active.path);
}

export function getFilenameBase(activeEditor: TextEditor) {
    const active = _getPath(activeEditor, true);
    return basename(active.fsPath, false, active.path);
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

    // Normalize path (e.g. C:/Users -> C:\Users or \home\user\ -> /home/user)
    // This is needed for handle vscode-remote to a server that's a different platform than the host
    // like Windows --remote--> *nix or *nix --remote--> to Windows
    const path = getPlatformPath(uri);
    fsPath = normalizePath(fsPath, path);

    const activePos = activeEditor.selection.active;
    const line = activePos.line;
    const col = activePos.character;
    return { fsPath, path, line, col };
}

function hasDriveLetter(fsPath: string): boolean {
    if (fsPath.length >= 2) {
        // Checks C:\Users
        //        ^^
        const char0 = fsPath.charCodeAt(0);
        const char1 = fsPath.charCodeAt(1);
        return char1 === CharCode.Colon &&
            ((char0 >= CharCode.A && char0 <= CharCode.Z) || (char0 >= CharCode.a && char0 <= CharCode.z));
    }
    return false;
}

function isPathSeparator(code: number): boolean {
    return code === CharCode.Slash || code === CharCode.Backslash;
}

function isUNC(fsPath: string) {
    if (fsPath.length >= 3) {
        // Checks \\localhost\shares\ddd
        //        ^^^
        return isPathSeparator(fsPath.charCodeAt(0)) && isPathSeparator(fsPath.charCodeAt(1)) && !isPathSeparator(fsPath.charCodeAt(2));
    }
    return false;
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

function dirname(fsPath: string, path: PlatformPath) {
    return path.dirname(fsPath) + path.sep;
}

function basename(fsPath: string, withExt: boolean, path:PlatformPath) {
    return withExt ? path.basename(fsPath) : path.basename(fsPath, path.extname(fsPath));
}

function getPlatformPath(uri: Uri) {
    const isRemote = !!env.remoteName;
    if (isRemote && uri.scheme === "vscode-remote") {
        // Guess the remote path platform base on the path
        // This is needed for vscode-remote uri before, because the fsPath returned
        // has local platform's separator. (e.g. remoting from Windows to *nix, will have fsPath of \home\user\)
        // 
        // Another solution instead of guessing uri is to offload these path commands into a separate extension
        // which requires local installation (extensionKind:workspace).
        // The extension can then execute commands locally, which will have the right separator by default.
        const fsPath = uri.fsPath;
        return (hasDriveLetter(fsPath) || isUNC(fsPath)) ? path.win32 : path.posix;
    }
    return path;
}

function normalizePath(fsPath: string, platformPath:PlatformPath) {
    if (platformPath === path.win32 && path === path.posix) {
        return path.normalize(fsPath);
    } else if (platformPath === path.posix && path === path.win32){
        // POSIX path doesn't normalize from "\user\path" to "/user/path"
        // BUG: This doesn't work if the path contains \ as the name of the file or directory
        return fsPath.replace(/\\/g, platformPath.sep);
    } else {
        return fsPath;
    }
}