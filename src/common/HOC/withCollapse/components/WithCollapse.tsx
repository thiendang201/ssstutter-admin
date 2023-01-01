import React from 'react';
import {
  WithCollapseProvider,
  WithCollapseProviderProps
} from 'common/HOC/withCollapse/context';

export const WithCollapse = ({
  children,
  isOpen,
  onToggle
}: WithCollapseProviderProps) => {
  return (
    <WithCollapseProvider isOpen={isOpen} onToggle={onToggle}>
      {children}
    </WithCollapseProvider>
  );
};
