export type BaseResponseType<T> = {
  response: T;
  isSuccess: boolean;
  statusCode: number;
  pageDetails?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
  validatorError: {
    message: string;
    statusCode: number;
  };
};
