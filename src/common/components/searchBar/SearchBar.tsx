import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';
import debounce from 'lodash/debounce';
import tw, { styled } from 'twin.macro';
import { formatInputValue } from 'common/utils/common';
import { useParams, useSearchParams } from 'react-router-dom';
import { INPUT_MAX_LENGTH } from 'common/constants/common';

interface SearchBarProps {
  placeHolder: string;
  onChange: (value: string) => void;
  variant: 'solid' | 'outline';
  debounceTimeout?: number;
  defaultValue?: string;
}

const SearchField = styled.input(
  ({ variant }: Pick<SearchBarProps, 'variant'>) => [
    tw`pl-10 py-3 rounded-lg min-w-66`,
    variant === 'outline' &&
      tw`bg-transparent border-2 border-light-blue-grey
      dark:(border-slate-600 placeholder:text-slate-600 text-slate-400)`
  ]
);

export function SearchBar({
  placeHolder,
  variant,
  onChange,
  debounceTimeout = 500,
  defaultValue = ''
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    debounce(
      (searchValue: string) => {
        onChange(searchValue);
      },
      debounceTimeout,
      {
        maxWait: 1500
      }
    ),
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = formatInputValue(e.target.value);

    handleSearch(value.toLocaleLowerCase());
    setSearchValue(value);

    searchParams.set('keyword', value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <label className='relative'>
      <RiSearchLine
        size={24}
        className='text-icon dark:text-slate-600 absolute top-1/2 -translate-y-1/2 left-3 peer-focus:text-primary-purple'
      />
      <SearchField
        variant={variant}
        autoComplete='off'
        value={searchValue}
        placeholder={placeHolder}
        maxLength={INPUT_MAX_LENGTH}
        className='peer'
        onChange={handleChange}
      />
    </label>
  );
}
