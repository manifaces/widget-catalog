import { App } from 'App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const containerElement = document.getElementById('root');

if (containerElement) {
  const root = ReactDOM.createRoot(containerElement);

  root.render(
    <React.StrictMode>
      <App dealers={['0c4aab30', '86e64a33']}/>
    </React.StrictMode>
  );
}