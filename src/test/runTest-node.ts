import { downloadAndUnzipVSCode, resolveCliArgsFromVSCodeExecutablePath, runTests } from '@vscode/test-electron';
import { spawnSync } from 'child_process';
import * as path from 'path';

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index-node');

		// Download vscode manually so we can install dependent extension
		const vscodeExecutablePath = await downloadAndUnzipVSCode('stable');

		// Install dependent extension
		const [cli, ...args] = resolveCliArgsFromVSCodeExecutablePath(vscodeExecutablePath);
		spawnSync(cli, [...args, '--install-extension', 'VSpaceCode.whichkey'], {
			encoding: 'utf-8',
			stdio: 'inherit'
		});

		// Download VS Code, unzip it and run the integration test
		await runTests({
			vscodeExecutablePath,
			extensionDevelopmentPath,
			extensionTestsPath,
		});
	} catch (err) {
		console.error(err);
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
