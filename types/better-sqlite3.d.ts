declare module 'better-sqlite3' {
  interface Database {
    prepare(sql: string): Statement;
    serialize(buffer?: Buffer): Buffer;
    close(): void;
  }

  interface Statement {
    run(...params: any[]): RunResult;
    all(...params: any[]): any[];
  }

  interface RunResult {
    changes: number;
    lastInsertRowid: number | bigint;
  }

  interface DatabaseConstructor {
    new (filename: string, options?: any): Database;
    (filename: string, options?: any): Database;
  }

  const Database: DatabaseConstructor;
  export default Database;
}

