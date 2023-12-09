// AccountContext.js
import React, { createContext, useState, useContext } from 'react';
import { useSDK } from '@metamask/sdk-react';

export const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connectWallet = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <AccountContext.Provider value={{ account, connectWallet }}>
      {children}
    </AccountContext.Provider>
  );
};
