// import * as React from 'react';
// import { createRoot } from 'react-dom/client';

import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

const vscode = acquireVsCodeApi();

const View = () => {
  return (
    <div>
      <h1>Bye, world!</h1>
      <VSCodeButton>Bye</VSCodeButton>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<View />);
