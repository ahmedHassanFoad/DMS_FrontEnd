export interface PaginatedResponse<T> {
    count: number;
    pageSize: number;
    pageNumber: number;
    data: T[];
  }