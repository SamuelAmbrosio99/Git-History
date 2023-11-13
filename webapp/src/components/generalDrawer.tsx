'use client';
import React from 'react';
import Logo from '@/components/logo';
import { useApi } from '@/context/data';

const DrawerContent = () => {
  const { user, repo, setShowUserChange, setShowRepoChange } = useApi();

  return (
    <div className='flex items-center'>
      <h1 className='drawer-text drawer-text:hover' onClick={() => setShowUserChange(true)}>{user}</h1>
      <h1 className='text-xl px-1 text-slate-600'>/</h1>
      <h1 className='drawer-text drawer-text:hover' onClick={() => setShowRepoChange(true)}>{repo}</h1>
      <div className="badge badge-outline ml-2 text-slate-700"> Public </div>
    </div>
  )
}

const GeneralDrawer = () => {

  return (
    <div className="flex">
      <div className="p-2">
        <div className='flex items-center'>
          <div className='px-2'>
            <Logo />
          </div>
          <DrawerContent />
        </div>
      </div>
    </div>
  );
};

export default GeneralDrawer;
