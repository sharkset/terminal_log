'use client';

import React from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

import Log from '../../components/log/log';
import ConnectButton from '../../components/connectButton/button';

export default function TerminalPage () {
  const { primaryWallet } = useDynamicContext();
  
  return (
    <>
      {primaryWallet?.isAuthenticated ? <Log/> : 
        <div className="
            h-[calc(100vh-5rem)] 
            flex 
            flex-col 
            justify-center 
            items-center 
            gap-8
          ">
          <h3 className='text-center'>
            You need to be connected to a wallet to access terminal
          </h3>
          <ConnectButton className="px-4 py-2 text-base border border-primary"/>
        </div>
      }
    </>
  );
}