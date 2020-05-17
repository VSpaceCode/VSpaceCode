// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands, workspace } from 'vscode';
import { IBindingItem } from './IBindingItem';
import MenuItem from './menu/MenuItem';
import { createQuickPick } from './utils';

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
}

// this method is called when your extension is deactivated
export function deactivate() { }