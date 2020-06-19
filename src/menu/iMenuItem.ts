import { QuickPickItem } from 'vscode';

export interface IMenuItem extends QuickPickItem {
  key: string;
  action: () => Thenable<unknown>;
}