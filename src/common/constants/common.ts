import { NavItemProps } from 'types/nav';
import {
  RiHome5Line,
  RiHome5Fill,
  RiBillLine,
  RiBillFill,
  RiAppsLine,
  RiAppsFill
} from 'react-icons/ri';
import { VscCircleFilled } from 'react-icons/vsc';
import { HiOutlineReceiptPercent, HiReceiptPercent } from 'react-icons/hi2';
import { IoImage, IoImageOutline } from 'react-icons/io5';

export const navList: NavItemProps[] = [
  {
    displayText: 'Tổng quan',
    path: '/dashboard',
    Icon: RiHome5Line,
    ActiveIcon: RiHome5Fill
  },
  {
    displayText: 'Quản lý thông tin',
    path: '/',
    Icon: RiAppsLine,
    ActiveIcon: RiAppsFill,
    childrens: [
      {
        displayText: 'Thể loại',
        path: '/category',
        Icon: VscCircleFilled,
        ActiveIcon: VscCircleFilled
      },
      {
        displayText: 'Sản phẩm',
        path: '/product',
        Icon: VscCircleFilled,
        ActiveIcon: VscCircleFilled
      },
      {
        displayText: 'Tài khoản',
        path: '/user',
        Icon: VscCircleFilled,
        ActiveIcon: VscCircleFilled
      }
    ]
  },
  {
    displayText: 'Đơn hàng',
    path: '/receipt',
    Icon: RiBillLine,
    ActiveIcon: RiBillFill
  },
  {
    displayText: 'Khuyến mãi',
    path: '/sale',
    Icon: HiOutlineReceiptPercent,
    ActiveIcon: HiReceiptPercent
  },
  {
    displayText: 'Bộ sưu tập',
    path: '/collection',
    Icon: IoImageOutline,
    ActiveIcon: IoImage
  }
];

export const INPUT_MAX_LENGTH = 255;

export const REG_HEAD_SPACE = new RegExp(/^ /); // Start with space
export const REG_TAIL_SPACE = new RegExp(/([ ]{2,}).*$/); // More than 1 space at tail
export const REG_MIDDLE_SPACE = new RegExp(/(\w|\W)[ ]{2,}(\w|\W)/); // More than 1 space between words or non-words
export const TEMP_ID_PREFIX = 'temp_id_';
