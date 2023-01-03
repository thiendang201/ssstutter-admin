import * as React from 'react';
import FieldContainer from '../fieldContainer/FieldContainer';

interface SelectFieldProps {
  label?: string;
  value: string;
  error?: string;
  name: string;
  option: groupOption[] | option[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface option {
  value: string;
  label: string;
}

interface groupOption {
  groupName: string;
  options: option[];
}

const SelectField: React.FunctionComponent<SelectFieldProps> = (props) => {
  return <FieldContainer>t</FieldContainer>;
};

export default SelectField;
