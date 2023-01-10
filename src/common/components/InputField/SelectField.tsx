import * as React from 'react';
import FieldContainer from 'common/components/InputField/FieldContainer';
import Select, {
  ActionMeta,
  GroupBase,
  SingleValue,
  StylesConfig
} from 'react-select';
import { find } from 'lodash';

interface SelectFieldProps {
  required?: boolean;
  label?: string;
  value: string | number;
  error?: string;
  name: string;
  placeHolder?: string;
  options: Option[] | GroupOption[];
  onChange: (value: Option) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  initValue?: boolean;
}

export interface Option {
  value: string | number;
  label: string;
}

export interface GroupOption {
  label: string;
  options: Option[];
}

const customStyles: StylesConfig<Option> = {
  indicatorSeparator: () => ({
    display: 'none'
  }),
  control: (base) => ({
    ...base,
    padding: 8,
    border: 'none',
    background: '#FFF',
    cursor: 'pointer',
    boxShadow: '0px 1px 2px rgba(133, 140, 148, 0.05)',
    fontWeight: 500,
    fontSize: 14
  }),
  menu: (base) => ({
    ...base,
    boxShadow: '2px 6px 23px rgba(133, 140, 148, 0.2)'
  }),
  menuList: (base) => ({
    ...base,
    background: '#FFF',
    padding: 4,
    paddingLeft: 8,
    paddingBottom: 8,
    borderRadius: 4,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '4px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#ddd'
    }
  }),
  placeholder: (base) => ({
    ...base
    // display: 'none'
  }),
  option: (base, state) => {
    return {
      ...base,
      marginTop: 4,
      padding: 10,
      background: state.isSelected ? '#7166F9' : '#FFF',
      color: state.isSelected ? '#FFF' : '#2B2F42',
      borderRadius: 4,
      '&:hover': {
        background: '#7166F9',
        cursor: 'pointer',
        color: '#FFF'
      }
    };
  },
  clearIndicator: (base) => ({
    ...base,
    display: 'none'
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#2B2F42'
  })
};

const SelectField: React.FunctionComponent<SelectFieldProps> = ({
  options,
  name,
  required,
  label,
  error,
  value,
  placeHolder,
  initValue = true,
  onChange,
  onBlur
}) => {
  const [selectValue, setSelectValue] = React.useState<Option>();
  const [isMounted, setIsMounted] = React.useState(false);

  const findSelectedOption = () => {
    if (options.length === 0) {
      return;
    }

    if ('options' in options[0]) {
      const list = options as GroupOption[];
      const optionList = list.reduce<Option[]>(
        (prev, group) => [...prev, ...group.options],
        []
      );
      return optionList.find((o) => o.value === value);
    }

    const list = options as Option[];
    return list.find((o) => o.value === value);
  };

  React.useEffect(() => {
    if (!initValue || isMounted) return;

    let option = findSelectedOption();
    if (!option) return;

    setIsMounted(true);
    onChange(option);
  }, [options]);

  React.useEffect(() => {
    let option = findSelectedOption();
    if (!option) return;

    setSelectValue(option);
  }, [value]);

  const handleChange = (
    newValue: SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (!newValue) return;

    onChange(newValue);
    setSelectValue(newValue);
  };

  return (
    <FieldContainer required={required} label={label} error={error}>
      <Select
        name={name}
        value={selectValue}
        options={options}
        isMulti={false}
        placeholder={placeHolder}
        styles={customStyles}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </FieldContainer>
  );
};

export default SelectField;
