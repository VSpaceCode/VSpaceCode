import { commands, ExtensionContext, extensions } from 'vscode';
import { configKeyBindings, configSettings } from './configuration';
import { CommandId, ConfigKey, extensionId, extensionQualifiedId, GlobalState } from './constants';
import { showUpdateMessage, showWelcomeMessage } from './messages';
import { getPath, getRelativePathWithLine, copyWrapper, getPathWithLine, getPathWithLineColumn, getRelativePath, getRelativePathWithLineColumn, getFilename, getFilenameBase, getDirectoryPath, getRelativeDirectoryPath } from './pathCommands';


export async function activate(context: ExtensionContext) {
    const vspacecode = extensions.getExtension(extensionQualifiedId);
    const currentVersion = vspacecode!.packageJSON.version;
    const previousVersion = context.globalState.get<string>(GlobalState.SpacecodeVersion);
    console.log(`VSpaceCode loaded: v${previousVersion} -> v${currentVersion}`);
    context.globalState.update(GlobalState.SpacecodeVersion, currentVersion);
    if (previousVersion === undefined) {
        showWelcomeMessage();
    } else {
        showUpdateMessage(currentVersion, previousVersion);
    }

    await setUpWhichKey();

    context.subscriptions.push(commands.registerCommand(CommandId.ShowSpaceMenu, showSpaceMenu));
    context.subscriptions.push(commands.registerCommand(CommandId.ShowMagitRefMenu, showMagitRefMenu));

    context.subscriptions.push(commands.registerCommand(CommandId.Configure, configure));
    context.subscriptions.push(commands.registerCommand(CommandId.ConfigureSettings, configSettings));
    context.subscriptions.push(commands.registerCommand(CommandId.ConfigureKeybindings, configKeyBindings));

    context.subscriptions.push(commands.registerCommand(CommandId.CopyPath, copyWrapper(getPath)));
    context.subscriptions.push(commands.registerCommand(CommandId.CopyPathWithLine, copyWrapper(getPathWithLine)));
    context.subscriptions.push(commands.registerCommand(CommandId.CopyPathWithLineColumn, copyWrapper(getPathWithLineColumn)));
    context.subscriptions.push(commands.registerCommand(CommandId.CopyDirectoryPath, copyWrapper(getDirectoryPath)));
    context.subscriptions.push(commands.registerCommand(CommandId.CopyRelativePath, copyWrapper(getRelativePath)));
    context.subscriptions.push(commands.registerCommand(CommandId.CopyRelativePathWithLine, copyWrapper(getRelativePathWithLine)));
    context.subscriptions.push(commands.registerCommand(CommandId.CopyRelativePathWithLineColumn, copyWrapper(getRelativePathWithLineColumn)));
    context.subscriptions.push(commands.registerCommand(CommandId.CopyRelativeDirectoryPath, copyWrapper(getRelativeDirectoryPath)));
    context.subscriptions.push(commands.registerCommand(CommandId.CopyFilename, copyWrapper(getFilename)));
    context.subscriptions.push(commands.registerCommand(CommandId.CopyFilenameBase, copyWrapper(getFilenameBase)));
}

function setUpWhichKey() {
    const arg = { bindings: [extensionId, ConfigKey.Bindings], overrides: [extensionId, ConfigKey.Overrides], title: 'VSpaceCode' };
    const magitArg = { bindings: [extensionId, ConfigKey.RefBindings] };
    return Promise.all([
        commands.executeCommand(CommandId.RegisterWhichKey, arg),
        commands.executeCommand(CommandId.RegisterWhichKey, magitArg)
    ]);
}

function showSpaceMenu() {
    return commands.executeCommand(CommandId.ShowWhichKey, `${extensionId}.${ConfigKey.Bindings}`);
}

function showMagitRefMenu() {
    return commands.executeCommand(CommandId.ShowWhichKey, `${extensionId}.${ConfigKey.RefBindings}`);
}

function configure() {
    return Promise.all([
        commands.executeCommand(CommandId.ConfigureSettings),
        commands.executeCommand(CommandId.ConfigureKeybindings)
    ]);
}

export function deactivate() { }
