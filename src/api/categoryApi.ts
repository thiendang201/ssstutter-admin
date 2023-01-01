import { axiosInstant } from './common';
import { CategoryProps } from 'features/category/ListView';
import { objectToSearchParams, useCreate } from 'api/common';
import useSWR, { mutate } from 'swr';
import { cloneDeep, create } from 'lodash';

const url = '/category';

export const useCategories = (keyword: string = '') => {
  const key = url + objectToSearchParams({ keyword });
  let {
    data = [],
    isLoading,
    isValidating,
    error
  } = useSWR<CategoryProps[], Error>(key, {
    dedupingInterval: 60 * 1000
  });
  const createCategory = useCreate(key);

  return {
    categories: data,
    isLoading,
    isValidating,
    error,
    createCategory
  };
};

export const categoryApi = {
  getAll(keyword: string = '') {
    return axiosInstant.get<CategoryProps[]>(url, { params: { keyword } });
  },

  create() {},
  update() {},
  delete() {}
};
