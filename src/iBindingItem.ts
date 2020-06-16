export const enum ActionType {
    Command = "command",
    Commands = "commands",
    Bindings = "bindings",
    Transient = "transient",
}

export interface IBindingItem {
    key: string;
    name: string;
    type: ActionType,
    command?: string,
    commands?: string[],
    bindings?: IBindingItem[],
}

export interface IOverrideBindingItem {
    keys: string | string[];
    position?: number;
    name?: string;
    type?: ActionType,
    command?: string,
    commands?: string[],
    bindings?: IBindingItem[],
}
