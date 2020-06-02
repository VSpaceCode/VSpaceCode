import { commands } from "vscode";
import { ActionType, IBindingItem } from "../iBindingItem";
import { IMenuItem } from "./iMenuItem";
import { createQuickPick } from "./menu";

export default class MenuItem implements IMenuItem {
    name: string;
    key: string;
    type: ActionType;
    command?: string;
    items?: MenuItem[];

    constructor(item: IBindingItem) {
        this.name = item.name;
        this.key = item.key;
        this.type = item.type;
        this.command = item.command;
        if (this.type === "bindings" && item.bindings) {
            this.items = MenuItem.createItems(item.bindings);
        }
    }

    get label() {
        return this.key === ' ' ? '␣' : this.key;
    }

    get description() {
        // Add tab so the description is aligned
        return `\t${this.name}`;
    }

    action(): Thenable<unknown> {
        if (this.type === "command" && this.command) {
            return commands.executeCommand(this.command);
        } else if (this.type === "bindings" && this.items) {
            return createQuickPick(this.name, this.items);
        }

        return Promise.reject();
    }

    static createItems(items: IBindingItem[]) {
        return items.map(i => new MenuItem(i));
    }
}