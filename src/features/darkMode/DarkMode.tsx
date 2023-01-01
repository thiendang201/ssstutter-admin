import { CircleButton } from 'common/components/button/CircleButton';
import React, { useState } from 'react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import tw from 'twin.macro';

export const DarkModeWrapper = tw.div`bg-white dark:bg-slate-800 dark:text-white`;

export const DarkMode = () => {
  const [darkModeOn, setDarkModeOn] = useState(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      return true;
    } else {
      document.documentElement.classList.remove('dark');
      return false;
    }
  });

  function turnOnDarkMode() {
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
    setDarkModeOn(true);
  }

  function turnOffDarkMode() {
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
    setDarkModeOn(false);
  }

  const onToggleDarkMode = () => {
    if (darkModeOn) {
      turnOffDarkMode();
    } else {
      turnOnDarkMode();
    }
  };

  return (
    <CircleButton
      className='dark:bg-transparent'
      variant='secondary'
      size='lg'
      onClick={onToggleDarkMode}
    >
      {darkModeOn ? (
        <RiSunFill size={24} className='text-icon' />
      ) : (
        <RiMoonFill size={24} className='text-icon' />
      )}
    </CircleButton>
  );
};
