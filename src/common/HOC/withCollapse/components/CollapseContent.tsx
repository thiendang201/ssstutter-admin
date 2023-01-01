import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useWithCollapse } from 'common/HOC/withCollapse/context';
import classNames from 'classnames';

export interface CollapseContentProps {
  children: ReactNode;
}

let timeout: number | undefined = undefined;

export default function CollapseContent({ children }: CollapseContentProps) {
  const { show } = useWithCollapse();
  const [clientHeight, setClientHeight] = useState(0);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setClientHeight(childRef?.current?.clientHeight || 0);
  }, []);

  useEffect(() => {
    const overflow = show ? 'visible' : 'hidden';
    clearTimeout(timeout);

    timeout = setTimeout(
      () => {
        const parentElement = childRef?.current?.parentElement;
        if (parentElement) {
          parentElement.style.overflow = overflow;
        }
      },
      show ? 300 : 0
    );

    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <div
      className={classNames([
        'transition-all duration-300',
        show ? 'overflow-visible' : 'overflow-hidden'
      ])}
      style={{
        maxHeight: show ? clientHeight : 0
      }}
    >
      <div ref={childRef}>{children}</div>
    </div>
  );
}
