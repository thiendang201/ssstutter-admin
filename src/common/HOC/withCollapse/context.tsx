import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface WithCollapseProps {
  show: boolean;
  onToggleShow: () => void;
}

export interface WithCollapseProviderProps {
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const withCollapseContext = createContext<WithCollapseProps>({
  show: false,
  onToggleShow: () => {}
});

export const useWithCollapse = (): WithCollapseProps => {
  const context = useContext(withCollapseContext);

  if (!context) {
    throw new Error(
      'Collapse compound components cannot be rendered outside the WithCollapse component'
    );
  }
  return context;
};

export const WithCollapseProvider = ({
  children,
  isOpen,
  onToggle
}: WithCollapseProviderProps): JSX.Element => {
  const [show, setShow] = useState(false);

  const onToggleShow = () => setShow(!show);

  return (
    <withCollapseContext.Provider
      value={{
        show: isOpen ?? show,
        onToggleShow: onToggle ?? onToggleShow
      }}
    >
      {children}
    </withCollapseContext.Provider>
  );
};
