export type PageableResponse<T extends Array<unknown>> = {
  totalCount: number;
  totalPages: number;
  content: T;
  last: boolean;
};
