export type DatabaseState = {
  sqlQuery: string;
  dbFile: ArrayBuffer | undefined;
  error: string | null;
};

