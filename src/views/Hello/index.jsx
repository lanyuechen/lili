// import * as React from 'react';
// import { createRoot } from 'react-dom/client';

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
