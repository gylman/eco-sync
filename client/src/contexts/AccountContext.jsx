// AccountContext.js
import React, { createContext, useState, useContext } from 'react';
import { useSDK } from '@metamask/sdk-react';

export const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const contractAddress = '0x1FFa5e8B85B3dC1462ea5362190f9697Ba25c1Ca';
  const contractABI = [
    {
      inputs: [
        {
          internalType: 'string',
          name: '_name',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_profilePhoto',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: '_hasToken',
          type: 'bool',
        },
        {
          internalType: 'string',
          name: '_tokenName',
          type: 'string',
        },
      ],
      name: 'addCompany',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'walletAddress',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
      ],
      name: 'CompanyAdded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'company1',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'company2',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'isPartnership',
          type: 'bool',
        },
      ],
      name: 'EcosystemUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'includer',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'includee',
          type: 'address',
        },
      ],
      name: 'Exclude',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'includer',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'includee',
          type: 'address',
        },
      ],
      name: 'Include',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'observer',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'includedCompany',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'otherParty',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'included',
          type: 'bool',
        },
      ],
      name: 'IncludeeStatusUpdate',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_company2',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: '_includesInEco',
          type: 'bool',
        },
      ],
      name: 'updateEcosystem',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'companies',
      outputs: [
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          internalType: 'address',
          name: 'walletAddress',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'profilePhoto',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: 'hasToken',
          type: 'bool',
        },
        {
          internalType: 'string',
          name: 'tokenName',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'companyAddressAtIndex',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'companyAddresses',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'ecoMapping',
      outputs: [
        {
          internalType: 'bool',
          name: 'includesInEco',
          type: 'bool',
        },
        {
          internalType: 'uint256',
          name: 'createdTimestamp',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'removedTimestamp',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_company1',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '_company2',
          type: 'address',
        },
      ],
      name: 'getInclusionInfo',
      outputs: [
        {
          internalType: 'bool',
          name: 'includesInEco',
          type: 'bool',
        },
        {
          internalType: 'uint256',
          name: 'createdTimestamp',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'removedTimestamp',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalCompanies',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  const connectWallet = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      return accounts?.[0];
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <AccountContext.Provider
      value={{ account, connectWallet, contractAddress, contractABI, provider }}
    >
      {children}
    </AccountContext.Provider>
  );
};
