import { commands, ExtensionContext, extensions, env, window } from 'vscode';
import { configKeyBindings, configSettings } from './configuration';
import { CommandId, ConfigKey, extensionId, extensionQualifiedId, GlobalState } from './constants';
import { showUpdateMessage, showWelcomeMessage, showActionNotSupportedInRemote } from './messages';

export let logPath: string;

export async function activate(context: ExtensionContext) {
    logPath = context.logPath;
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
    context.subscriptions.push(commands.registerCommand(CommandId.ConfigureSettings, configureSettings));
    context.subscriptions.push(commands.registerCommand(CommandId.ConfigureKeybindings, configureKeybindings));
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
    const isRemote = !!env.remoteName;
    if (!isRemote) {
        return Promise.all([
            commands.executeCommand(CommandId.ConfigureSettings),
            commands.executeCommand(CommandId.ConfigureKeybindings)
        ]);
    } else {
        return showActionNotSupportedInRemote(CommandId.Configure);
    }
}

function configureSettings() {
    const isRemote = !!env.remoteName;
    if (!isRemote) {
        return configSettings();
    } else {
        return showActionNotSupportedInRemote(CommandId.ConfigureSettings);
    }
}

function configureKeybindings() {
    const isRemote = !!env.remoteName;
    if (!isRemote) {
        return configKeyBindings();
    } else {
        return showActionNotSupportedInRemote(CommandId.ConfigureKeybindings);
    }
}

export function deactivate() { }
