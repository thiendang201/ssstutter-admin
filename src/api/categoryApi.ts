import { PaginationProps } from './../types/common';
import { axiosInstant } from './common';
import { CategoryProps } from 'features/category/ListView';
import { objectToSearchParams, useCreate } from 'api/common';
import useSWR, { mutate } from 'swr';
import { cloneDeep, create } from 'lodash';
import { ApiResponseWithPaginate } from 'types/common';

const url = '/category';

type CategoriesResponse = ApiResponseWithPaginate<CategoryProps>;

export interface useCategoriesProps {
  keyword?: string;
  page: number;
}

export const useCategories = ({ keyword = '', page }: useCategoriesProps) => {
  const key =
    url +
    objectToSearchParams({
      keyword,
      page: page.toString()
    });

  let { data, isLoading, isValidating, error } = useSWR<
    CategoriesResponse,
    Error
  >(key, {
    // keepPreviousData: true
  });

  const createCategory = useCreate(key);

  const {
    links = [],
    data: list = [],
    current_page = 1,
    total = 1,
    last_page = 1
  } = data ?? {};

  const pagination: PaginationProps = {
    links,
    current_page,
    total,
    last_page
  };

  return {
    categories: list,
    pagination,
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
