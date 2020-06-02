export const enum ActionType {
    Command = "command",
    Commands = "commands",
    Bindings = "bindings"
}

export interface IBindingItem {
    key: string;
    name: string;
    type: ActionType,
    command?: string,
    commands?: string[],
    bindings?: IBindingItem[],
}
