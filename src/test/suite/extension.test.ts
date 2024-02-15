import * as assert from "assert";
import * as vscode from "vscode";
import { extensionQualifiedId } from "../../constants";

suite("Extension Test Suite", () => {
    vscode.window.showInformationMessage("Start all tests.");

    test("VSpaceCode can be activated", async function () {
        this.timeout(1 * 60 * 1000);
        // await vscode.commands.executeCommand("workbench.extensions.installExtension" , "VSpaceCode.whichkey");
        const extension = vscode.extensions.getExtension(extensionQualifiedId);
        if (extension) {
            await extension.activate();
            assert.ok(extension.isActive);
        } else {
            assert.fail("Extension is not available");
        }
    });
});
