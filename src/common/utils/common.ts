import {
  REG_HEAD_SPACE,
  REG_MIDDLE_SPACE,
  REG_TAIL_SPACE
} from 'common/constants/common';

export const formatInputValue = (value: string): string => {
  if (REG_HEAD_SPACE.test(value)) {
    value = value.trimStart();
  }

  if (REG_MIDDLE_SPACE.test(value)) {
    value = value.replace(/\s+/g, ' ');
  }

  if (REG_TAIL_SPACE.test(value)) {
    value = value.trimEnd();
  }

  return value;
};
