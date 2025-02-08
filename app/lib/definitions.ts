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

