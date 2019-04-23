import * as React from 'react';

import { send, subscribe } from '../services/ws.service';

const App = () => {
  const [log, setLog] = React.useState('');

  React.useEffect(
    () =>
      subscribe(({ action }) => {
        if (action.__type === 'log') {
          setLog((log: string) => `${log}\n${action.text}`);
        }
      }),
    [setLog],
  );

  const onClick = () => {
    if (log !== '') {
      setLog('[cleared]\n');
    }

    send(
      JSON.stringify({
        action: {
          __type: 'spawn',
          arg: 'status',
        },
      }),
    );
  };

  return (
    <div className="panel">
      <button className="btn" onClick={onClick}>
        Begin Task
      </button>
      <pre className="pre">{log}</pre>
    </div>
  );
};

export default App;
