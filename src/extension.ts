import { commands, ExtensionContext, extensions, window, workspace } from 'vscode';
import { ConfigKey, extensionId, extensionQualifiedId, GlobalState, spaceCmdId } from './constants';
import { IBindingItem, IOverrideBindingItem } from './iBindingItem';
import { createQuickPick } from './menu/menu';
import MenuItem from './menu/menuItem';
import { checkVim, showWelcomeScreen } from './messages';

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
            createQuickPick("Spacecode", this.items);
        } else {
            window.showErrorMessage("The spacecode.bindings is undefined.");
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

    const spacecode = extensions.getExtension(extensionQualifiedId);
    const currentVersion = spacecode!.packageJSON.version;
    const previousVersion = context.globalState.get<string>(GlobalState.SpacecodeVersion);
    console.log(`Spacecode loaded: v${previousVersion} -> v${currentVersion}`);
    context.globalState.update(GlobalState.SpacecodeVersion, currentVersion);
    if (previousVersion === undefined) {
        showWelcomeScreen();
    } else {
        checkVim();
    }
}

export function deactivate() { }
