import * as vscode from 'vscode';

import { getUri } from './getUri';
import { getNonce } from './getNonce';

export function getHtmlContent(webview: vscode.Webview, extensionUri: vscode.Uri, viewName: string) {
  const reactUri = getUri(webview, extensionUri, ['out', 'lib', 'react.min.js']);
  const reactDomUri = getUri(webview, extensionUri, ['out', 'lib', 'react-dom.min.js']);
  const webviewUri = getUri(webview, extensionUri, ['out', 'views', viewName, 'index.js']);

  const nonce = getNonce();

  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; font-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
        <title>Hello World!</title>
      </head>
      <body>
        <div id="root"></div>
        
        <script nonce="${nonce}" src="${reactUri}"></script>
        <script nonce="${nonce}" src="${reactDomUri}"></script>
        <script type="module" nonce="${nonce}" src="${webviewUri}"></script>
      </body>
    </html>
  `;
}
