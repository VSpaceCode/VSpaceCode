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

    const arg = { bindings: [extensionId, ConfigKey.Bindings], overrides: [extensionId, ConfigKey.Overrides], title: 'VSpaceCode' };
    const magitArg = { bindings: [extensionId, ConfigKey.RefBindings] };
    await Promise.all([
        commands.executeCommand(CommandId.RegisterWhichKey, arg),
        commands.executeCommand(CommandId.RegisterWhichKey, magitArg)
    ]);

    context.subscriptions.push(commands.registerCommand(CommandId.ShowSpaceMenu, () => {
        commands.executeCommand(CommandId.ShowWhichKey, arg.bindings.join('.'));
    }));
    context.subscriptions.push(commands.registerCommand(CommandId.ShowMagitRefMenu, () => {
        commands.executeCommand(CommandId.ShowWhichKey, magitArg.bindings.join('.'));
    }));

    context.subscriptions.push(commands.registerCommand(CommandId.Configure, () => {
        configSettings();
        configKeyBindings(context);
    }));
    context.subscriptions.push(commands.registerCommand(CommandId.ConfigureSettings, () => {
        configSettings();
    }));
    context.subscriptions.push(commands.registerCommand(CommandId.ConfigureKeybindings, () => {
        configKeyBindings(context);
    }));
}

export function deactivate() { }
