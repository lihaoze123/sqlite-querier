export type TableSchema = {
  name: string;
  columns: {
    name: string;
    type: string;
  }[];
};

export type DatabaseState = {
  sqlQuery: string;
  error: string | null;
  results: any | null;
  isLoading: boolean;
  schemaInfo: TableSchema[] | null;
};

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface DataTableProps<T> {
  results: T[];
  pageSize?: number;
}

