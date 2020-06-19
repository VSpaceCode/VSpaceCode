import { commands, ExtensionContext, extensions, window, workspace } from 'vscode';
import { ConfigKey, extensionId, extensionQualifiedId, GlobalState, spaceCmdId } from './constants';
import { IBindingItem, IOverrideBindingItem } from './iBindingItem';
import { createQuickPick } from './menu/menu';
import MenuItem from './menu/menuItem';
import { checkVim, showUpdateMessage, showWelcomeMessage } from './messages';

class SpacecodeCmd {
    private items?: MenuItem[];

    load() {
        const config = workspace.getConfiguration(extensionId);
        const bindings = config.get<IBindingItem[]>(ConfigKey.Bindings);
        if (bindings) {
            this.items = MenuItem.createItems(bindings);
        } else {
            this.items = undefined;
        }

        const overrides = config.get<IOverrideBindingItem[]>(ConfigKey.Overrides);
        MenuItem.overrideItems(this.items, overrides);
    }

    execute() {
        if (this.items) {
            createQuickPick("VSpaceCode", this.items);
        } else {
            window.showErrorMessage("The vspacecode.bindings is undefined.");
        }
    }
}

export function activate(context: ExtensionContext) {
    const cmd = new SpacecodeCmd();
    cmd.load();

    workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(extensionId)) {
            cmd.load();
        }
    });
    context.subscriptions.push(commands.registerTextEditorCommand(spaceCmdId, cmd.execute.bind(cmd)));

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
}

export function deactivate() { }
