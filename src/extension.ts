import { commands, ExtensionContext, extensions } from 'vscode';
import { configKeyBindings, configSettings } from './configuration';
import { CommandId, ConfigKey, extensionId, extensionQualifiedId, GlobalState } from './constants';
import { showUpdateMessage, showWelcomeMessage } from './messages';


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
