import path, { PlatformPath } from "path";
import { env, TextEditor, Uri, window, workspace } from "vscode";
import { CharCode } from "./charCode";
import { defaultStatusBarTimeout } from "./constants";
import { UriScheme } from "./uriScheme";

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
    const uri = activeEditor.document.uri;
    let fsPath = relative ? relativePathToWorkspace(uri) : uriToFsPath(uri);

    const platformPath = getPlatformPath(uri);
    if (platformPath === path.win32) {
        // Replace all / to \
        fsPath = fsPath.replace(/\//g, "\\");
    }

    const activePos = activeEditor.selection.active;
    const line = activePos.line;
    const col = activePos.character;
    return { fsPath, path: platformPath, line, col };
}

function hasDriveLetter(fsPath: string, offset = 0): boolean {
    if (fsPath.length >= 2 + offset) {
        // Checks C:\Users
        //        ^^
        const char0 = fsPath.charCodeAt(0 + offset);
        const char1 = fsPath.charCodeAt(1 + offset);
        return (
            char1 === CharCode.Colon &&
            ((char0 >= CharCode.A && char0 <= CharCode.Z) ||
                (char0 >= CharCode.a && char0 <= CharCode.z))
        );
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
        return (
            isPathSeparator(fsPath.charCodeAt(0)) &&
            isPathSeparator(fsPath.charCodeAt(1)) &&
            !isPathSeparator(fsPath.charCodeAt(2))
        );
    }
    return false;
}

/**
 * Compute the closest relative path of the input uri to the workspace folder(s).
 *
 * When there are no workspace folders or when the path
 * is not contained in them, the input is returned.
 *
 * This similar to the `workspace.asRelativePath` that the relative path is always
 * going to use `/`. However, one difference is if we need to return input path,
 * it will always be `/` (won't normalized to `\` if the host is on Windows).
 * So we can handle the case if we are remoting into a Windows machine from *nix.
 */
function relativePathToWorkspace(uri: Uri) {
    const folder = workspace.getWorkspaceFolder(uri);
    return folder
        ? relativePath(folder.uri, uri) ?? uriToFsPath(uri)
        : uriToFsPath(uri);
}

function dirname(fsPath: string, path: PlatformPath) {
    return path.dirname(fsPath) + path.sep;
}

function basename(fsPath: string, withExt: boolean, path: PlatformPath) {
    return withExt
        ? path.basename(fsPath)
        : path.basename(fsPath, path.extname(fsPath));
}

/**
 * Get the platform path base on the uri.
 *
 * This is similar with the assumption in `uriToFsPath`. If the path has drive letter
 * or is an UNC path, assumed the uri to be a Windows path.
 */
function getPlatformPath(uri: Uri) {
    const fsPath = uriToFsPath(uri);
    return hasDriveLetter(fsPath) || isUNC(fsPath) ? path.win32 : path.posix;
}

/**
 * Compute `fsPath` with slash normalized to `/` for the given uri.
 *
 * This is what vscode uses internally to compute uri.fsPath; however,
 * backslash conversion for Windows host is removed, and drive letter is always normalized to uppercase.
 *
 * The problems with the internal `uri.fsPath`:
 *  - Windows machine remoting into a linux will return a `\` as separator
 *  - *nix machine remoting into a windows will return `/` as separator
 *
 * Modified from https://github.com/microsoft/vscode/blob/f74e473238aca7b79c08be761d99a0232838ca4c/src/vs/base/common/uri.ts#L579-L604
 */
function uriToFsPath(uri: Uri): string {
    let value: string;
    if (uri.authority && uri.path.length > 1 && uri.scheme === "file") {
        // unc path: file://shares/c$/far/boo
        value = `//${uri.authority}${uri.path}`;
    } else if (
        // e.g. local file and vscode-remote file
        uri.path.charCodeAt(0) === CharCode.Slash &&
        hasDriveLetter(uri.path, 1)
    ) {
        // windows drive letter: file:///c:/far/boo
        // Normalized drive letter -> C:/far/boo
        value = uri.path[1].toUpperCase() + uri.path.substr(2);
    } else {
        // other path
        value = uri.path;
    }
    return value;
}

function equalsIgnoreCase(a1: string, a2: string) {
    return a1.length === a1.length && a1.toLowerCase() === a2.toLowerCase();
}

function isEqualAuthority(a1: string, a2: string) {
    return a1 === a2 || equalsIgnoreCase(a1, a2);
}

/**
 * Compute the relative path of two uris.
 *
 * This differs from the vscode version is that this doesn't normalize slash for Windows; therefore,
 * we can use posix path to compute relative instead of host machine specific path.
 *
 * Modified from https://github.com/microsoft/vscode/blob/f74e473238aca7b79c08be761d99a0232838ca4c/src/vs/base/common/resources.ts#L228-L249
 */
function relativePath(
    from: Uri,
    to: Uri,
    ignorePathCasing = false
): string | undefined {
    if (
        from.scheme !== to.scheme ||
        !isEqualAuthority(from.authority, to.authority)
    ) {
        return undefined;
    }
    if (from.scheme === UriScheme.File) {
        return path.posix.relative(uriToFsPath(from), uriToFsPath(to));
    }
    let fromPath = from.path || "/";
    const toPath = to.path || "/";
    if (ignorePathCasing) {
        // make casing of fromPath match toPath
        let i = 0;
        for (
            const len = Math.min(fromPath.length, toPath.length);
            i < len;
            i++
        ) {
            if (fromPath.charCodeAt(i) !== toPath.charCodeAt(i)) {
                if (
                    fromPath.charAt(i).toLowerCase() !==
                    toPath.charAt(i).toLowerCase()
                ) {
                    break;
                }
            }
        }
        fromPath = toPath.substr(0, i) + fromPath.substr(i);
    }
    return path.posix.relative(fromPath, toPath);
}
