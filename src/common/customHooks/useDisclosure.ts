import { useCallback, useState } from 'react';

const useDisClosure = (initialValue = true) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    onClose,
    onOpen,
    onToggle
  };
};

export default useDisClosure;
