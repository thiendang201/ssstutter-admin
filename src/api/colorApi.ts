import useSWR from 'swr';
export interface ColorProps {
  id: number;
  name: string;
  deleted: number;
}

const url = '/color';

export const useColors = () => {
  const {
    data: colors = [],
    isLoading,
    isValidating,
    error = {}
  } = useSWR<ColorProps[], Error>(url);

  return {
    colors,
    isLoading,
    isValidating,
    error
  };
};
