import { DEFAULT_PAGINATION_PAGE, DEFAULT_PAGINATION_SIZE } from '../constants';

export class PagingationDto {
  page: number = DEFAULT_PAGINATION_PAGE;

  size: number = DEFAULT_PAGINATION_SIZE;
}