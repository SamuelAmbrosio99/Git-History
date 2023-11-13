'use client';
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';
import Logo from '@/components/logo';

const DrawerContent = () => {
  return (
    <div className='flex items-center'>
      <h1 className='drawer-text drawer-text:hover'>User</h1>
      <h1 className='text-xl px-1 text-slate-600'>/</h1>
      <h1 className='drawer-text drawer-text:hover'>Repo</h1>
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
