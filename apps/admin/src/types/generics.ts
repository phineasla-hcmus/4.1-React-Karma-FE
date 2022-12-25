export type Paginated<T> = {
  data: T[];
  page: number;
  size: number;
  total: number;
};
