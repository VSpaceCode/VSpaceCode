export const extensionId = "vspacecode";
export const publisherId = "VSpaceCode";
export const extensionQualifiedId = `${publisherId}.${extensionId}`;
export const spaceCmdId = `${extensionId}.space`;
export enum CommandId {
    ShowSpaceMenu = "vspacecode.space",
    ShowMagitRefMenu = "vspacecode.showMagitRefMenu",
    ShowMagitRefreshMenu = "vspacecode.showMagitRefreshMenu",

    Configure = "vspacecode.configure",
    ConfigureSettings = "vspacecode.configureSettings",
    ConfigureKeybindings = "vspacecode.configureKeybindings",

    OpenDocumentationUrl = "vspacecode.openDocumentationUrl",
    OpenWalkthrough = "workbench.action.openWalkthrough",

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
    ShowWhichKey = "whichkey.show",
}
export enum WalkthroughId {
    Welcome = "vspacecode.welcome",
}
export enum GlobalState {
    SpacecodeVersion = "vspacecodeVersion",
}
export enum ConfigKey {
    Bindings = "bindings",
    Overrides = "bindingOverrides",
    RefBindings = "magitRefBindings",
    RefreshBindings = "magitRefreshBindings",
}

export const BindingsId = {
    VSpaceCode: `${extensionId}.${ConfigKey.Bindings}`,
    Overrides: `${extensionId}.${ConfigKey.Overrides}`,
    RefBindings: `${extensionId}.${ConfigKey.RefBindings}`,
    RefreshBindings: `${extensionId}.${ConfigKey.RefreshBindings}`,
};

export const defaultStatusBarTimeout = 5000;
