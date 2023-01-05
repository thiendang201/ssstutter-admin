import { GroupOption } from 'common/components/InputField/SelectField';
import { TEMP_ID_PREFIX } from 'common/constants/common';
import { CategoryProps } from 'features/category/ListView';
import { uniqueId } from 'lodash';

export const mockCategories: CategoryProps[] = [
  {
    id: 1,
    name: 'nam',
    visible: 1,
    text: 'for him',
    img: 'https://res.cloudinary.com/tdclound201/image/upload/v1653831985/1652146098356_vh0abl.jpg',
    parentsId: null,
    deleted: 0
  },
  {
    id: 2,
    name: 'nữ',
    visible: 1,
    text: 'for her',
    img: 'https://res.cloudinary.com/tdclound201/image/upload/v1653832026/1652146086904_ddwscb.jpg',
    parentsId: null,
    deleted: 0
  },
  {
    id: 3,
    name: 'SƠ MI & ÁO KIỂU',
    visible: 0,
    text: null,
    img: null,
    parentsId: 1,
    deleted: 0
  },
  {
    id: 4,
    name: 'ÁO THUN',
    visible: 1,
    text: null,
    img: null,
    parentsId: 1,
    deleted: 0
  },
  {
    id: 5,
    name: 'QUẦN',
    visible: 0,
    text: null,
    img: null,
    parentsId: 1,
    deleted: 0
  },
  {
    id: 6,
    name: 'LEN DỆT',
    visible: 0,
    text: null,
    img: null,
    parentsId: 1,
    deleted: 0
  },
  {
    id: 8,
    name: 'ÁO BLAZER & ÁO KHOÁC',
    visible: 0,
    text: null,
    img: null,
    parentsId: 1,
    deleted: 0
  },
  {
    id: 9,
    name: 'QUẦN BÒ',
    visible: 0,
    text: null,
    img: null,
    parentsId: 1,
    deleted: 0
  },
  {
    id: 10,
    name: 'QUẦN SHORT',
    visible: 0,
    text: null,
    img: null,
    parentsId: 1,
    deleted: 0
  },
  {
    id: 13,
    name: 'ĐỒ BƠI & ĐỒ ĐI BIỂN',
    visible: 0,
    text: null,
    img: null,
    parentsId: 1,
    deleted: 0
  },
  {
    id: 14,
    name: 'HOODIES & SWEATSHIRT',
    visible: 0,
    text: null,
    img: null,
    parentsId: 1,
    deleted: 0
  },
  {
    id: 15,
    name: 'SƠ MI & ÁO KIỂU',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 16,
    name: 'ÁO BLAZER & ÁO KHOÁC',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 17,
    name: 'ĐẦM & JUMPSUIT',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 18,
    name: 'LEN & DỆT',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 19,
    name: 'QUẦN',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 20,
    name: 'QUẦN BÒ',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 21,
    name: 'CHÂN VÁY',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 22,
    name: 'ÁO THUN',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 23,
    name: 'QUẦN SHORT',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 26,
    name: 'ĐỒ BƠI & ĐỒ ĐI BIỂN',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  },
  {
    id: 28,
    name: 'HOODIES & SWEATSHIRT',
    visible: 0,
    text: null,
    img: null,
    parentsId: 2,
    deleted: 0
  }
];

export const mock = {
  id: uniqueId(TEMP_ID_PREFIX),
  name: 'QUẦNNNN',
  visible: 0,
  text: null,
  img: null,
  parentsId: 1,
  deleted: 0
};

export const groupCategories: GroupOption[] = [
  {
    label: 'nam',
    options: [
      {
        label: 'A',
        value: 1
      },
      {
        label: 'B',
        value: 2
      }
    ]
  },
  {
    label: 'nữ',
    options: [
      {
        label: 'C',
        value: 3
      },
      {
        label: 'D',
        value: 4
      }
    ]
  }
];
