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

	OpenDocumentationUrl = "vspacecode.openDocumentationUrl",

	CopyPath = "vspacecode.copyPath",
	CopyPathWithLine = "vspacecode.copyPathWithLine",
	CopyPathWithLineColumn = "vspacecode.copyPathWithLineColumn",
	CopyDirectoryPath = "vspacecode.copyDirectoryPath",
	CopyRelativePath = "vspacecode.copyRelativePath",
	CopyRelativePathWithLine = "vspacecode.copyRelativePathWithLine",
	CopyRelativePathWithLineColumn = "vspacecode.copyRelativePathWithLineColumn",
	CopyRelativeDirectoryPath = "vspacecode.copyRelativeDirectoryPath",
	CopyFilename = "vspacecode.copyFilename",
	CopyFilenameBase = "vspacecode.copyFilenameBase",

	CopyWholeBuffer = "vspacecode.copyWholeBuffer",

	RegisterWhichKey = "whichkey.register",
	ShowWhichKey = "whichkey.show"
}
export enum GlobalState {
	SpacecodeVersion = 'vspacecodeVersion'
}
export enum ConfigKey {
	Bindings = "bindings",
	Overrides = "bindingOverrides",
	RefBindings = "magitRefBindings",
}
export const manualInstallUrl = "https://github.com/VSpaceCode/VSpaceCode#installation";

export const defaultStatusBarTimeout = 5000;