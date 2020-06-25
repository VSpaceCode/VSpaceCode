import { commands, ExtensionContext, extensions } from 'vscode';
import { ConfigKey, extensionId, extensionQualifiedId, GlobalState, spaceCmdId } from './constants';
import { checkVim, showUpdateMessage, showWelcomeMessage } from './messages';

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
        checkVim();
    }

    const arg = { bindings: [extensionId, ConfigKey.Bindings], overrides: [extensionId, ConfigKey.Overrides], title: 'VSpaceCode' };
    const magitArg = { bindings: [extensionId, ConfigKey.RefBindings] };
    await Promise.all([
        commands.executeCommand('whichkey.register', arg),
        commands.executeCommand('whichkey.register', magitArg)
    ]);

    context.subscriptions.push(commands.registerCommand(spaceCmdId, () => {
        commands.executeCommand("whichkey.show", arg.bindings.join('.'));
    }));
    context.subscriptions.push(commands.registerCommand("vspacecode.showMagitRefMenu", (_args: any[]) => {
        commands.executeCommand("whichkey.show", magitArg.bindings.join('.'));
    }));
}

export function deactivate() { }
