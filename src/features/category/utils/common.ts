import { GroupOption } from 'common/components/InputField/SelectField';
import { CategoryProps } from '../ListView';

type GroupCategories = Record<number, GroupOption>;

export const groupCategories = (list: CategoryProps[]) => {
  const records: GroupCategories = {};

  for (let i of list) {
    if (!i.parentsId) {
      const group = {
        label: i.name,
        options: []
      };

      records[i.id] = group;
      continue;
    }

    console.log(i.parentsId, !i.parentsId, records);
    const option = {
      label: i.name,
      value: i.id
    };
    records[i.parentsId].options.push(option);
  }

  return Object.values(records);
};

export const getParentsCategories = (list: CategoryProps[]) =>
  list.filter((c) => !c.parentsId);
