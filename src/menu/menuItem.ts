import { IMenuItem } from "./IMenuItem";
import { IBindingItem, ActionType } from "../IBindingItem";
import { createQuickPick } from "../utils";
import { commands } from "vscode";

export default class MenuItem implements IMenuItem {
    description: string;
    label: string;
    type: ActionType;
    command?: string;
    items?: MenuItem[];

    constructor(item: IBindingItem) {
        this.description = item.name;
        this.label = item.key;
        this.type = item.type;
        this.command = item.command;
        if (this.type === "bindings" && item.bindings) {
            this.items = MenuItem.createItems(item.bindings);
        }
    }

    action(): Thenable<unknown> {
        if (this.type === "command" && this.command) {
            return commands.executeCommand(this.command);
        } else if (this.type === "bindings" && this.items) {
            return createQuickPick(this.description, this.items);
        }

        return Promise.reject();
    }

    static createItems(items: IBindingItem[]) {
        return items.map(i => new MenuItem(i));
    }
}