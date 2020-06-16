export const extensionId = 'spacecode';
export const extensionQualifiedId = `stevenguh.${extensionId}`;
export const spaceCmdId = `${extensionId}.space`;
export enum GlobalState {
	SpacecodeVersion = 'spacecodeVersion'
}
export enum ConfigKey {
	Bindings = "bindings",
	Overrides = "bindingOverrides",
	CheckVimConfig = "checkVimConfig",
}
export const manualInstallUrl = "https://github.com/stevenguh/spacecode#installation";

export const vimExtensionId = "vim";
export const vimExtensionQualifiedId = `vscodevim.${vimExtensionId}`;
export enum VimConfigKey {
	NormalNonRecursive = "normalModeKeyBindingsNonRecursive",
	VisualNonRecursive = "visualModeKeyBindingsNonRecursive",
}
