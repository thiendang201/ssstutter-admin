import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItemProps } from 'types/nav';
import tw, { styled } from 'twin.macro';
import classNames from 'classnames';

export const NavWrapper = styled.div(
  ({ isActive = false }: { isActive?: boolean }) => [
    tw`pl-11 py-5 pr-4 flex gap-4 items-center relative`,
    tw`transition-all bg-gradient-to-r from-primary-purple/0 to-primary-purple/0`,
    tw`hover:(from-primary-purple/5 to-primary-purple/10)`,
    isActive && tw`bg-gradient-to-r from-primary-purple/5 to-primary-purple/10`,
    tw`dark:text-slate-400`
  ]
);

export default function NavItem({
  displayText,
  path,
  Icon,
  ActiveIcon
}: NavItemProps) {
  return (
    <NavLink to={path} className='block text-dark-blue'>
      {({ isActive }) => (
        <NavWrapper isActive={isActive}>
          {isActive ? (
            <>
              <ActiveIcon className='w-6 h-6 text-primary-purple' />
              <div className='absolute w-1 h-full bg-primary-purple rounded-l-full top-0 right-0' />
            </>
          ) : (
            <Icon className='w-6 h-6 text-icon' />
          )}
          <span
            className={classNames([
              'text-sm font-medium',
              isActive ? 'font-semibold' : ''
            ])}
          >
            {displayText}
          </span>
        </NavWrapper>
      )}
    </NavLink>
  );
}
