import * as React from 'react';
import FieldContainer from 'common/components/InputField/FieldContainer';

interface NumberFieldProps {
  required?: boolean;
  label?: string;
  value: string;
  error?: string;
  name: string;
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const NumberField: React.FunctionComponent<NumberFieldProps> = ({
  required = false,
  label,
  value,
  error,
  name,
  placeHolder,
  onChange,
  onBlur
}) => {
  return (
    <FieldContainer required={required} label={label} error={error}>
      <input
        className='w-full text-sm font-medium py-4 px-5 rounded shadow-primary'
        type='number'
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        placeholder={placeHolder}
      />
    </FieldContainer>
  );
};

export default NumberField;
