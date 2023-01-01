import React, { useEffect, useRef, useState } from 'react';
import { NavItemProps } from 'types/nav';
import NavItem, { NavWrapper } from 'common/nav/NavItem';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import classNames from 'classnames';
import WithCollapse, {
  CollapseContent,
  CollapseTrigger
} from 'common/HOC/withCollapse';
import useDisClosure from 'common/customHooks/useDisclosure';

export default function NavItemWithChildrens({
  displayText,
  path,
  Icon,
  ActiveIcon,
  childrens
}: NavItemProps) {
  const { isOpen, onToggle } = useDisClosure(false);

  return (
    <WithCollapse isOpen={isOpen} onToggle={onToggle}>
      <CollapseTrigger>
        <NavWrapper className='w-full'>
          <Icon className='w-6 h-6 text-icon' />
          <span className='text-sm font-medium'>{displayText}</span>
          <MdOutlineKeyboardArrowDown
            className={classNames(
              'w-6 h-6 text-dark-blue absolute top-1/2 -translate-y-1/2 right-4 transition-all duration-300',
              isOpen ? '-rotate-180' : 'rotate-0',
              'dark:text-slate-400'
            )}
          />
        </NavWrapper>
      </CollapseTrigger>
      <CollapseContent>
        <ul>
          {childrens?.map((nav) => (
            <li key={nav.path}>
              <NavItem {...nav} />
            </li>
          ))}
        </ul>
      </CollapseContent>
    </WithCollapse>
  );
}
