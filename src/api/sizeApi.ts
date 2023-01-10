import useSWR from 'swr';

export interface SizeProps {
  size: number;
  deleted: number;
  quantity: number;
}

const url = '/size';

export const useSizes = () => {
  const {
    data: sizes = [],
    isLoading,
    isValidating,
    error = {}
  } = useSWR<SizeProps[], Error>(url);

  return {
    sizes,
    isLoading,
    isValidating,
    error
  };
};
