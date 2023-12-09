import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { MetaMaskProvider } from '@metamask/sdk-react';

document.getElementById('root') &&
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          checkInstallationImmediately: false,
          dappMetadata: {
            name: 'Demo React App',
            url: 'http://localhost:5173',
          },
        }}
      >
        <App />
      </MetaMaskProvider>{' '}
    </React.StrictMode>
  );
