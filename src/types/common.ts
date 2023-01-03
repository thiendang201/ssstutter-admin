interface LinkProps {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationProps {
  total: number;
  links: LinkProps[];
  current_page: number;
  last_page: number;
}

export interface ApiResponseWithPaginate<T> extends PaginationProps {
  data: T[];
}
