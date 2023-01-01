import * as React from 'react';
import { navList } from 'common/constants/common';
import { NavItemWithChildrens, NavItem } from 'common/nav';
import { ReactComponent as Logo } from 'assets/svgs/ssstutter.svg';

const SideNav = () => {
  return (
    // bg-white border-r border-light-blue-grey
    <div className='w-69 h-screen bg-white dark:bg-slate-800 sticky top-0 left-0'>
      <div className='pr-24 pl-11 py-7'>
        <Logo className='dark:invert w-full' />
      </div>
      <ul>
        {navList.map((nav) => (
          <li key={nav.path}>
            {nav.childrens ? (
              <NavItemWithChildrens {...nav} />
            ) : (
              <NavItem {...nav} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
