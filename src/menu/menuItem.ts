import { commands } from "vscode";
import { ActionType, IBindingItem } from "../iBindingItem";
import { IMenuItem } from "./iMenuItem";
import { createQuickPick } from "./menu";

export default class MenuItem implements IMenuItem {
    name: string;
    key: string;
    type: ActionType;
    command?: string;
    commands?: string[];
    items?: MenuItem[];

    constructor(item: IBindingItem) {
        this.name = item.name;
        this.key = item.key;
        this.type = item.type;
        this.command = item.command;
        this.commands = item.commands;
        if (this.type === ActionType.Bindings && item.bindings) {
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
        if (this.type === ActionType.Command && this.command) {
            return commands.executeCommand(this.command);
        } else if (this.type === ActionType.Commands && this.commands) {
            return this.commands.reduce((prev, current) => {
                return prev.then(() => commands.executeCommand(current));
            }, Promise.resolve());
        } else if (this.type === ActionType.Bindings && this.items) {
            return createQuickPick(this.name, this.items);
        }

        return Promise.reject();
    }

    static createItems(items: IBindingItem[]) {
        return items.map(i => new MenuItem(i));
    }
}