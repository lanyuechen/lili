import * as vscode from 'vscode';

import { getHtmlContent } from '../utils/getHtmlContent';

export class Panel {
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  constructor(viewType: string, title: string, extensionUri: vscode.Uri) {
    this._panel = vscode.window.createWebviewPanel(viewType, title, vscode.ViewColumn.One, {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'out')],
    });

    this._panel.webview.html = getHtmlContent(this._panel.webview, extensionUri, viewType);

    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._setWebviewMessageListener(this._panel.webview);
  }

  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        vscode.window.showInformationMessage(JSON.stringify(message));
      },
      undefined,
      this._disposables
    );
  }

  public dispose() {
    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}