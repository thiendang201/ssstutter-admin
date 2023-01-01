import SideNav, { QuickNav } from 'common/nav';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='flex items-stretch bg-background dark:bg-slate-900'>
      <SideNav />
      <div className='px-12 py-24 flex-1'>
        <Outlet />
      </div>
      <QuickNav />
    </div>
  );
}
