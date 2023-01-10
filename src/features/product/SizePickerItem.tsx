import { SizeProps } from 'api/sizeApi';
import classNames from 'classnames';
import { Button } from 'common/components/button/Button';
import NumberField from 'common/components/InputField/NumberField';
import * as React from 'react';
import tw from 'twin.macro';

interface SizePickerItemProps {
  size: number;
  quantity: number;
  selected: boolean;
  onClick: (value: SizeProps) => void;
  onChange: (value: SizeProps) => void;
}

const SizePickerItem: React.FunctionComponent<SizePickerItemProps> = ({
  size,
  quantity,
  selected = false,
  onClick,
  onChange
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    onClick({
      size,
      quantity: Number(inputRef.current?.value) || 1,
      deleted: 0
    });
  };

  const handleChange = () => {
    const qty = Number(inputRef.current?.value);

    if (qty === 0) {
      onClick({
        size,
        quantity: 0,
        deleted: 0
      });
      return;
    }

    onChange({
      size,
      quantity: qty,
      deleted: 0
    });
  };

  return (
    <label>
      <span
        onClick={handleClick}
        className={classNames([
          'rounded-t-lg block px-3 py-2 border-2 border-light-blue-grey',
          'font-semibold text-sm text-center border-b-0',
          'peer-focus:border-primary-purple',
          selected && 'bg-primary-purple text-white border-primary-purple'
        ])}
      >{`Cỡ ${size}`}</span>
      <input
        ref={inputRef}
        type='number'
        placeholder='Số lượng'
        value={+quantity || ''}
        name={size + quantity + ''}
        onChange={handleChange}
        className={classNames([
          'rounded-b-lg block w-full px-3 py-2 border-2 border-light-blue-grey',
          'font-semibold text-sm text-center',
          'peer'
        ])}
        disabled={!selected}
      />
    </label>
  );
};

export default SizePickerItem;
