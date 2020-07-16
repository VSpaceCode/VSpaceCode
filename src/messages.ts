import { commands, env, Uri, window } from 'vscode';
import { CommandId, manualInstallUrl } from './constants';
import { ComparisonResult, Version } from './version';

const enum WelcomeSelection {
    Auto = "Automatically",
    Manually = "Manually",
}

export async function showWelcomeMessage() {
    const selection = await window.showInformationMessage(
        `Welcome to VSpaceCode. Some configurations are needed to get started. Choose ${WelcomeSelection.Auto} to merge necessary configurations to your user's settings.json and keybindings.json. However, formatting in those file may be lost.`,
        WelcomeSelection.Manually,
        WelcomeSelection.Auto,
    );

    switch (selection) {
        case WelcomeSelection.Manually:
            await env.openExternal(Uri.parse(manualInstallUrl));
            break;
        case WelcomeSelection.Auto:
            await commands.executeCommand(CommandId.Configure);
            break;
    }
}

export async function showUpdateMessage(cur: string, prev: string) {
    if (Version.compare(cur, prev) === ComparisonResult.Newer) {
        const changeLog = "Changelog";
        const selection = await window.showInformationMessage(
            `VspaceCode is updated to v${cur}. See what's new in the changelog.`,
            changeLog
        );
        if (selection === changeLog) {
            await env.openExternal(Uri.parse("https://github.com/VSpaceCode/VSpaceCode/blob/master/CHANGELOG.md"));
        }
    }
}