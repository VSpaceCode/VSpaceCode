import {
    commands,
    env,
    ExtensionContext,
    extensions,
    Uri,
    window,
} from "vscode";
import { copyWholeBuffer } from "./bufferCommands";
import {
    configKeyBindings,
    configSettings,
} from "./configuration/configuration";
import {
    BindingsId,
    CommandId,
    extensionQualifiedId,
    GlobalState,
    WalkthroughId,
} from "./constants";
import { showUpdateMessage } from "./messages";
import {
    copyWrapper,
    getDirectoryPath,
    getFilename,
    getFilenameBase,
    getPath,
    getPathWithLine,
    getPathWithLineColumn,
    getRelativeDirectoryPath,
    getRelativePath,
    getRelativePathWithLine,
    getRelativePathWithLineColumn,
} from "./pathCommands";

export async function activate(context: ExtensionContext) {
    const vspacecode = extensions.getExtension(extensionQualifiedId);
    const currentVersion = vspacecode!.packageJSON.version;
    const previousVersion = context.globalState.get<string>(
        GlobalState.SpacecodeVersion
    );
    console.log(`VSpaceCode loaded: v${previousVersion} -> v${currentVersion}`);
    context.globalState.update(GlobalState.SpacecodeVersion, currentVersion);
    if (previousVersion === undefined) {
        // Open to side if there's an active tab
        const toSide = window.tabGroups.activeTabGroup.activeTab != null;
        commands.executeCommand(
            CommandId.OpenWalkthrough,
            {
                category: `${extensionQualifiedId}#${WalkthroughId.Welcome}`,
            },
            toSide
        );
    } else {
        showUpdateMessage(currentVersion, previousVersion);
    }

    await setUpWhichKey();

    context.subscriptions.push(
        commands.registerCommand(CommandId.ShowSpaceMenu, showSpaceMenu)
    );
    context.subscriptions.push(
        commands.registerCommand(CommandId.ShowMagitRefMenu, showMagitRefMenu)
    );

    context.subscriptions.push(
        commands.registerCommand(CommandId.Configure, configure)
    );
    context.subscriptions.push(
        commands.registerCommand(CommandId.ConfigureSettings, configSettings)
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.ConfigureKeybindings,
            configKeyBindings
        )
    );

    context.subscriptions.push(
        commands.registerCommand(
            CommandId.OpenDocumentationUrl,
            openDocumentationUrl
        )
    );

    context.subscriptions.push(
        commands.registerCommand(CommandId.CopyPath, copyWrapper(getPath))
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.CopyPathWithLine,
            copyWrapper(getPathWithLine)
        )
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.CopyPathWithLineColumn,
            copyWrapper(getPathWithLineColumn)
        )
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.CopyDirectoryPath,
            copyWrapper(getDirectoryPath)
        )
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.CopyRelativePath,
            copyWrapper(getRelativePath)
        )
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.CopyRelativePathWithLine,
            copyWrapper(getRelativePathWithLine)
        )
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.CopyRelativePathWithLineColumn,
            copyWrapper(getRelativePathWithLineColumn)
        )
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.CopyRelativeDirectoryPath,
            copyWrapper(getRelativeDirectoryPath)
        )
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.CopyFilename,
            copyWrapper(getFilename)
        )
    );
    context.subscriptions.push(
        commands.registerCommand(
            CommandId.CopyFilenameBase,
            copyWrapper(getFilenameBase)
        )
    );

    context.subscriptions.push(
        commands.registerTextEditorCommand(
            CommandId.CopyWholeBuffer,
            copyWholeBuffer
        )
    );
}

function setUpWhichKey() {
    const arg = {
        bindings: BindingsId.VSpaceCode,
        overrides: BindingsId.Overrides,
        title: "VSpaceCode",
    };
    const magitArg = { bindings: BindingsId.RefBindings };
    return Promise.all([
        commands.executeCommand(CommandId.RegisterWhichKey, arg),
        commands.executeCommand(CommandId.RegisterWhichKey, magitArg),
    ]);
}

function showSpaceMenu() {
    return commands.executeCommand(
        CommandId.ShowWhichKey,
        BindingsId.VSpaceCode
    );
}

function showMagitRefMenu() {
    return commands.executeCommand(
        CommandId.ShowWhichKey,
        BindingsId.RefBindings
    );
}

function configure() {
    return Promise.all([
        commands.executeCommand(CommandId.ConfigureSettings),
        commands.executeCommand(CommandId.ConfigureKeybindings),
    ]);
}

function openDocumentationUrl() {
    return env.openExternal(Uri.parse("https://vspacecode.github.io/docs/"));
}
