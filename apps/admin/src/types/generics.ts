export type Paginated<T> = {
  data: T[];
  page: number;
  size: number;
  total: number;
  soTienGui?: number;
  soTienNhan?: number;
};
