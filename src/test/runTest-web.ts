import { runTests } from '@vscode/test-web';
import { existsSync, mkdir } from 'fs';
import https from 'https';
import * as path from 'path';
import { promisify } from 'util';

// Use require because DefinitelyTyped definition is outdated.
const AdmZip = require('adm-zip');

function httpsGetBuffer(url: string) {
	const _get = (url: string, resolve: (b: Buffer) => void, reject: (e: Error) => void) => {
		// User-Agent is needed for GitHub request
		const options: https.RequestOptions = {
			headers: {
				'User-Agent': 'node-https',
				'Content-Type': 'application/json; charset=utf-8'
			},
		};
		https.get(url, options, function (res) {
			if ((res.statusCode === 301 || res.statusCode === 302)
				&& res.headers.location) {
				_get(res.headers.location, resolve, reject);
				return;
			}

			const data: Uint8Array[] = [];
			res.on('data', function (chunk: Uint8Array) {
				data.push(chunk);
			});
			res.on('end', function () {
				const buffer = Buffer.concat(data);
				if (res.statusCode === 200) {
					resolve(buffer);
				} else {
					reject(new Error(`Status code: ${res.statusCode}\nResponse: ${buffer.toString()}`));
				}
			});
		}).on('error', function (err) {
			reject(new Error(`Error: ${err}`));
		});
	};

	return new Promise<Buffer>((resolve, reject) => {
		_get(url, resolve, reject);
	});
}

async function httpsGetJson(url: string) {
	const buffer = await httpsGetBuffer(url);
	return JSON.parse(buffer.toString());
}

async function httpsGetZip(url: string) {
	const buffer = await httpsGetBuffer(url);
	return new AdmZip(buffer);
}

// Get the latest release of vscode-which-key
async function downloadWhichKey() {
	console.log("Querying the latest release of whichkey...");
	const data = await httpsGetJson('https://api.github.com/repos/VSpaceCode/vscode-which-key/releases/latest') as any;

	const asset = data['assets'].find((a: any) => a.name.match(/^.+\.vsix$/g));
	const name = asset['name'] as string; // e.g. whichkey-0.9.3.vsix
	const basename = path.basename(name, '.vsix'); // e.g. whichkey-0.9.3
	const url = asset['browser_download_url'] as string;

	const vscodeTestDepDir = path.resolve(process.cwd(), '.vscode-test-dependency');
	const directory = path.join(vscodeTestDepDir, basename); //`${cwd}/.vscode-test-web/${basename}`;
	if (!existsSync(directory)) {
		// Ensures the base vscode test dir exists
		await promisify(mkdir)(vscodeTestDepDir, { recursive: true });
		console.log(`Downloading ${name}`);
		const zip = await httpsGetZip(url);
		console.log(`Extracting ${name} to ${directory}`);
		// Use the sync extract because async version is broken
		// https://github.com/cthackers/adm-zip/issues/389
		zip.extractAllTo(directory);
		// await promisify(zip.extractAllToAsync as any)(directory, false, false);
	} else {
		console.log(`Found ${directory}. Skipping whichkey download.`);
	}

	return path.join(directory, 'extension'); // e.g. ${cwd}/.vscode-test-web/whichkey-0.9.3/extension
}

function getExtensionPaths() {
	return Promise.all([
		downloadWhichKey()
	]);
}

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index-web');

		// Gets VSpaceCode's dependencies
		const extensionPaths = await getExtensionPaths();

		// Start a web server that serves VSCode in a browser, run the tests
		await runTests({
			browserType: 'chromium',
			version: 'stable',
			extensionDevelopmentPath,
			extensionTestsPath,
			extensionPaths,
		});
	} catch (err) {
		console.error(err);
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
