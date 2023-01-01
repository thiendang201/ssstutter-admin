import { IconType } from 'react-icons';

export interface NavItemProps {
  displayText: string;
  path: string;
  Icon: IconType;
  ActiveIcon: IconType;
  childrens?: NavItemProps[];
}
