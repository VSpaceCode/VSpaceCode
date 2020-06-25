export const extensionId = 'vspacecode';
export const publisherId = 'VSpaceCode';
export const extensionQualifiedId = `${publisherId}.${extensionId}`;
export const spaceCmdId = `${extensionId}.space`;
export enum CommandId {
	ShowSpaceMenu = "vspacecode.space",
	ShowMagitRefMenu = "vspacecode.showMagitRefMenu",
	Configure = "vspacecode.configure",
	ConfigureSettings = "vspacecode.configureSettings",
	ConfigureKeybindings = "vspacecode.configureKeybindings",
	RegisterWhichKey = "whichkey.register",
	ShowWhichKey = "whichkey.show"
};
export enum GlobalState {
	SpacecodeVersion = 'vspacecodeVersion'
}
export enum ConfigKey {
	Bindings = "bindings",
	Overrides = "bindingOverrides",
	RefBindings = "magitRefBindings",
	CheckVimConfig = "checkVimConfig",
}
export const manualInstallUrl = "https://github.com/VSpaceCode/VSpaceCode#installation";

export const vimExtensionId = "vim";
export const vimExtensionQualifiedId = `vscodevim.${vimExtensionId}`;
export enum VimConfigKey {
	NormalNonRecursive = "normalModeKeyBindingsNonRecursive",
	VisualNonRecursive = "visualModeKeyBindingsNonRecursive",
}
