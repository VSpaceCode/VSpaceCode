import { QuickPickItem } from 'vscode';

export interface IMenuItem extends QuickPickItem {
  action: () => Thenable<unknown>;
}