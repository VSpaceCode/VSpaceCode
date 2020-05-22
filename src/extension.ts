// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands, workspace, Uri } from 'vscode';
import { IBindingItem } from './IBindingItem';
import MenuItem from './menu/MenuItem';
import { createQuickPick } from './utils';
import { extensionQualifiedId, GlobalState } from './constants';

class SpacecodeCmd {
  private key: string;
  private items?: MenuItem[];

  constructor(key: string) {
    this.key = key;
  }

  load() {
    const bindings = workspace.getConfiguration("spacecode").get<IBindingItem[]>(this.key);
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
      vscode.window.showErrorMessage("The spacecode.bindings is undefined.");
    }
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const cmd = new SpacecodeCmd("bindings");
  cmd.load();

  workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("spacecode")) {
      cmd.load();
    }
  });
  context.subscriptions.push(commands.registerTextEditorCommand('spacecode.space', cmd.execute.bind(cmd)));

  const codespace = vscode.extensions.getExtension(extensionQualifiedId);
  const currentVersion = codespace!.packageJSON.version;
  const previousVersion = context.globalState.get<string>(GlobalState.SpacecodeVersion);
  context.globalState.update(GlobalState.SpacecodeVersion, currentVersion);
  showWelcomeScreen(currentVersion, previousVersion);
}

// this method is called when your extension is deactivated
export function deactivate() { }

async function showWelcomeScreen(currentVersion: string, previousVersion: string | undefined) {
  if (previousVersion === undefined) {
    console.log(`spacecode upgraded from v${previousVersion} to v${currentVersion}`);
    // New install or just updated from 0.2.1
    const selection = await vscode.window.showInformationMessage(
      "Welcome to spacecode. There is a configuration step you need to do manually to set up the extension.",
      "View"
    );
    if (selection === "View") {
      await vscode.env.openExternal(Uri.parse("https://github.com/stevenguh/spacecode#installation"));
    }
  }
}