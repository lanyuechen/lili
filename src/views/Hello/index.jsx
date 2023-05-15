import React from 'react';
import ReactDOM from 'react-dom';

import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';

const View = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
      <VSCodeButton>Hello</VSCodeButton>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<View />);
