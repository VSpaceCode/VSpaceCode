import { env, Uri, window } from "vscode";
import { ComparisonResult, Version } from "./version";

export const configSettingsConfirmTitle =
    "Configuring settings may change the format of your settings.json file. Are you sure?";
export const configKeybindingsConfirmTitle =
    "Configuring keybindings may change the format of your keybindings.json file. Are you sure?";
export const configConfirmTitle =
    "Configuration may change the format of your settings.json and keybindings.json file. Are you sure?";

export function confirmWrapper(title: string, fn: () => Thenable<any>) {
    return async () => {
        const confirmText = "Sure";
        const cancelText = "Cancel";
        const selection = await window.showQuickPick(
            [confirmText, cancelText],
            { title }
        );
        if (selection === confirmText) {
            await fn();
        }
    };
}

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
