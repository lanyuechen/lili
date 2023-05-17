import * as vscode from 'vscode';

import { getHtmlContent } from '../utils/getHtmlContent';
import { conversation } from '../services/gpt';

export class GptViewProvider implements vscode.WebviewViewProvider {
  private _viewType: string;
  private _extensionUri: vscode.Uri;

  constructor(viewType: string, extensionUri: vscode.Uri) {
    this._extensionUri = extensionUri;
    this._viewType = viewType;
  }

  public resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, _token: vscode.CancellationToken) {
		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [
				vscode.Uri.joinPath(this._extensionUri, 'out')
			]
		};

    webviewView.webview.html = getHtmlContent(webviewView.webview, this._extensionUri, this._viewType);
    
    this._setWebviewMessageListener(webviewView.webview);
	}

  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      async (message: any) => {
        if (message.command === 'conversation') {
          const res = await conversation(message.text);
          webview.postMessage({
            response: 'conversation',
            data: res,
          });
        }
      },
      undefined,
    );
  }

  public static register(viewType: string, extensionUri: vscode.Uri): vscode.Disposable {
    const provider = new GptViewProvider(viewType, extensionUri);

    return vscode.window.registerWebviewViewProvider(viewType, provider);
  }
}