import { window } from "vscode";
import { IMenuItem } from "./menu/IMenuItem";

export function createQuickPick(title: string, items: IMenuItem[]) {
    return new Promise((resolve, reject) => {
      const quickPick = window.createQuickPick<IMenuItem>();
      quickPick.title = title;
      quickPick.items = items;
  
      // Select with single key stroke
      const eventListenerDisposable = quickPick.onDidChangeValue(async () => {
        if (quickPick.value === 'q') {
          quickPick.dispose();
          eventListenerDisposable.dispose();
          acceptListenerDisposable.dispose();
          resolve();
        }
        const chosenItems = quickPick.items.filter(i => i.label === quickPick.value);
        if (chosenItems.length > 0) {
          quickPick.value = '';
          quickPick.dispose();
          eventListenerDisposable.dispose();
          acceptListenerDisposable.dispose();
          try {
  
            await chosenItems[0].action();
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      });
  
      // Select with arrows + enter
      const acceptListenerDisposable = quickPick.onDidAccept(async () => {
        if (quickPick.activeItems.length > 0) {
          const chosenItems = quickPick.activeItems[0] as IMenuItem;
          quickPick.dispose();
          eventListenerDisposable.dispose();
          acceptListenerDisposable.dispose();
          try {
            await chosenItems.action();
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      });
  
      quickPick.show();
    });
}