'use client';
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Transition } from '@headlessui/react';
import Logo from '@/components/logo';

interface DrawerButtonProps {
  right?: boolean;
  isShowing?: boolean;
  handleToggle?: () => void;
  action?: ButtonAction;
}

enum ButtonAction {
  Open = 'open',
  Close = 'close',
}

const DrawerButton = ({ right, isShowing, handleToggle, action }: DrawerButtonProps) => {
  const floatRight = right ? 'float-right' : '';

  return (
    <Transition
      show={action === ButtonAction.Open ? isShowing : !isShowing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={'flex justify-between items-center'}
    >
      { floatRight && 
        <div className='pl-1'>
          <Logo />
        </div>
      }
      <label htmlFor="my-drawer" className={`btn btn-square drawer-button ${floatRight}`} onClick={handleToggle}>
        
        {action === ButtonAction.Open ? <Bars3Icon className="w-6 h-6" /> : <XMarkIcon className="w-6 h-6" />}
      </label>
    </Transition>
  );
};

const GeneralDrawer = () => {
  const [isShowing, setIsShowing] = useState(true);

  const handleToggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div className="drawer absolute">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-2">
        <div className='flex items-center'>
          <DrawerButton isShowing={isShowing} handleToggle={handleToggle} action={ButtonAction.Open} />
          <div className='px-2'>
            <Logo />
          </div>
          <div className='flex'>
            <h1 className='drawer-text drawer-text:hover'>User</h1>
            <h1 className='text-xl px-1 text-slate-600'>/</h1>
            <h1 className='drawer-text drawer-text:hover'>Repo</h1>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={handleToggle}></label>
        <div className="menu p-2 w-80 min-h-full bg-base-200 text-base-content">
          <div className='w-100'>
            <DrawerButton right isShowing={isShowing} handleToggle={handleToggle} action={ButtonAction.Close} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralDrawer;
