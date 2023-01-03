import { ApiResponseWithPaginate, PaginationProps } from 'types/common';
import { objectToSearchParams } from 'api/common';
import useSWR from 'swr';

const url = '/product';

export interface PropductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
  categoryId: number;
  deleted: number;
}

type ProductsResponse = ApiResponseWithPaginate<PropductProps>;

export interface useProductsProps {
  keyword?: string;
  page: number;
}

export const useProducts = ({ keyword = '', page }: useProductsProps) => {
  const key =
    url +
    objectToSearchParams({
      keyword,
      page: page.toString()
    });

  let { data, isLoading, isValidating, error } = useSWR<
    ProductsResponse,
    Error
  >(key, {
    // keepPreviousData: true
  });

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
    products: list,
    pagination,
    isLoading,
    isValidating,
    error
  };
};
