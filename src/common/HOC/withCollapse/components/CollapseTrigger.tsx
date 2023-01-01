import React, { ReactNode } from 'react';
import { useWithCollapse } from 'common/HOC/withCollapse/context';

export interface CollapseTriggerProps {
  children: ReactNode;
}

export default function CollapseTrigger({ children }: CollapseTriggerProps) {
  const { onToggleShow } = useWithCollapse();

  return (
    <div className='flex items-center justify-center' onClick={onToggleShow}>
      {children}
    </div>
  );
}
