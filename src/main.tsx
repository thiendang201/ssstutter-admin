import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import './index.css';
import { SWRConfig } from 'swr';
import { fetcher } from 'api/common';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        refreshInterval: 5 * 60 * 1000,
        fetcher
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
);
