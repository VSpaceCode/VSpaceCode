import { env, Uri, window } from "vscode";
import { ComparisonResult, Version } from "./version";

export async function showUpdateMessage(cur: string, prev: string) {
    if (Version.compare(cur, prev) === ComparisonResult.Newer) {
        const changeLog = "Changelog";
        const selection = await window.showInformationMessage(
            `VspaceCode is updated to v${cur}. See what's new in the changelog.`,
            changeLog
        );
        if (selection === changeLog) {
            await env.openExternal(
                Uri.parse(
                    "https://github.com/VSpaceCode/VSpaceCode/blob/master/CHANGELOG.md"
                )
            );
        }
    }
}
