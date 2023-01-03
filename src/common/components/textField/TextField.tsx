import * as React from 'react';
import FieldContainer from 'common/components/fieldContainer/FieldContainer';

interface TextFieldProps {
  required?: boolean;
  label?: string;
  value: string;
  error?: string;
  name: string;
  placeHolder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FunctionComponent<TextFieldProps> = ({
  required = false,
  label,
  value,
  error,
  name,
  placeHolder,
  onChange
}) => {
  return (
    <FieldContainer required={required} label={label} error={error}>
      <input
        className='w-full text-sm font-semibold py-4 px-5 rounded shadow-primary'
        type='text'
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeHolder}
      />
    </FieldContainer>
  );
};

export default TextField;
