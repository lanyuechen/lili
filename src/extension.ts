// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Panel } from './webview/Panel';
import { ViewProvider } from './webview/ViewProvider';
import { GptViewProvider } from './webview/GptViewProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lili" is now active!');

	// ViewProvider.register('Gpt', context.extensionUri);
	GptViewProvider.register('Gpt', context.extensionUri);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let helloCmd = vscode.commands.registerCommand('lili.hello', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from lili!');
		// HelloPanel.render(context.extensionUri);
		new Panel('Hello', 'Hello world', context.extensionUri);
	});

	context.subscriptions.push(helloCmd);
}

// This method is called when your extension is deactivated
export function deactivate() {}
