import { commands, ExtensionContext, extensions, window, workspace } from 'vscode';
import { ConfigKey, extensionId, extensionQualifiedId, GlobalState, spaceCmdId } from './constants';
import { IBindingItem } from './iBindingItem';
import { createQuickPick } from './menu/menu';
import MenuItem from './menu/menuItem';
import { checkVim, showWelcomeScreen } from './messages';

class SpacecodeCmd {
    private key: string;
    private items?: MenuItem[];

    constructor(key: string) {
        this.key = key;
    }

    load() {
        const bindings = workspace.getConfiguration(extensionId).get<IBindingItem[]>(this.key);
        if (bindings) {
            this.items = MenuItem.createItems(bindings);
        } else {
            this.items = undefined;
        }
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
    const cmd = new SpacecodeCmd(ConfigKey.Bindings);
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
