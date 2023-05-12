// import * as React from 'react';
// import { createRoot } from 'react-dom/client';

// import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { provideVSCodeDesignSystem, vsCodeButton, vsCodeCheckbox, Button } from '@vscode/webview-ui-toolkit';

provideVSCodeDesignSystem().register(
  vsCodeButton(),
  vsCodeCheckbox(),
);

const vscode = acquireVsCodeApi();

const View = () => {
  return (
    <div>
      <h1>Bye, world!</h1>
      <vscode-button>Bye</vscode-button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<View />);
