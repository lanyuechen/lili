import * as vscode from 'vscode';

import { getHtmlContent } from '../utils/getHtmlContent';

export class SiderViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'sider-view';

  private _view?: vscode.WebviewView;
  private _extensionUri: vscode.Uri;

  constructor(private readonly extensionUri: vscode.Uri) {
    this._extensionUri = extensionUri;
  }

  public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken) {
		this._view = webviewView;

		this._view.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				vscode.Uri.joinPath(this._extensionUri, 'out')
			]
		};

		this._view.webview.html = getHtmlContent(webviewView.webview, this._extensionUri, 'Bye');
    
    this._setWebviewMessageListener(this._view.webview);
	}

  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;

        switch (command) {
          case "hello":
            vscode.window.showInformationMessage(text);
            return;
        }
      },
    );
  }

  public static render(extensionUri: vscode.Uri): vscode.Disposable {
    const provider = new SiderViewProvider(extensionUri);

    return vscode.window.registerWebviewViewProvider(SiderViewProvider.viewType, provider);
  }
}