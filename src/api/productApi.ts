import { useUpdate } from './common';
import { ApiResponseWithPaginate, PaginationProps } from 'types/common';
import { objectToSearchParams, useCreate } from 'api/common';
import useSWR from 'swr';
import { SizeProps } from 'api/sizeApi';

const url = '/product';

export interface ImageProps {
  url: string;
  deleted: number;
}
export interface VariantProps {
  colorId: number;
  colorName: string;
  thumbnail?: string;
  deleted: number;
  sizes: SizeProps[];
  images: ImageProps[];
}

export interface PropductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
  categoryId: number;
  deleted: number;
  categoryName?: string;
  variant: VariantProps[];
}

type ProductsResponse = ApiResponseWithPaginate<PropductProps[]>;

export interface useProductsProps {
  keyword?: string;
  page?: number;
  productId?: number;
}

export const useProducts = ({
  keyword = '',
  page,
  productId
}: useProductsProps = {}) => {
  const create = useCreate(url);
  const update = useUpdate(url);

  let key =
    url +
    objectToSearchParams({
      keyword,
      page: page?.toString() || '1'
    });

  if (productId) {
    key = `${url}/${productId}`;
  }

  let { data, isLoading, isValidating, error } = useSWR<
    ProductsResponse | PropductProps,
    Error
  >(key, {
    // keepPreviousData: true
  });

  if (data && !('links' in data)) {
    return {
      product: data,
      isLoading,
      isValidating,
      error,
      create,
      update
    };
  }

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
    error,
    create,
    update
  };
};
