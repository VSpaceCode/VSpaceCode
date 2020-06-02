export type ActionType = "command" | "bindings";

export interface IBindingItem {
    key: string;
    name: string;
    type: ActionType,
    command?: string,
    bindings?: IBindingItem[],
}
