import classNames from 'classnames';
import React, { ReactNode, Children } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import tw from 'twin.macro';

export interface BreadCrumbsProps {
  children: ReactNode;
  className?: string;
}

const BreadCrumbItemWrapper = tw.div`uppercase text-xs`;

export function BreadCrumbs({ children, className = '' }: BreadCrumbsProps) {
  const childList = Children.toArray(children);

  return (
    <div
      className={classNames(
        'flex items-center text-dark-blue dark:text-slate-400',
        className
      )}
    >
      {childList.map((item, index) => (
        <React.Fragment key={index}>
          <BreadCrumbItemWrapper>{item}</BreadCrumbItemWrapper>
          {index < childList.length - 1 && (
            <MdOutlineKeyboardArrowRight className='w-4 h-4 mx-1' />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
