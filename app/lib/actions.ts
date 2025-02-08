"use server";

import Database from "better-sqlite3";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

let currentDbPath: string | null = null;

async function cleanupTempDb() {
  if (currentDbPath) {
    try {
      await unlink(currentDbPath);
    } catch (err) {
      console.error("清理临时文件失败:", err);
    }
    currentDbPath = null;
  }
}

export async function createNewDb() {
  await cleanupTempDb();
  currentDbPath = join(tmpdir(), `temp-${Date.now()}.db`);
  const db = new Database(currentDbPath);
  db.close();
  return { success: true };
}

export async function uploadDb(dbContent: ArrayBuffer) {
  try {
    await cleanupTempDb();
    currentDbPath = join(tmpdir(), `temp-${Date.now()}.db`);
    const buffer = Buffer.from(dbContent);
    await writeFile(currentDbPath, buffer);
    return { success: true };
  } catch (err) {
    console.error("上传数据库失败:", err);
    throw new Error(err instanceof Error ? err.message : "未知错误");
  }
}

export async function exportDb(): Promise<ArrayBuffer | null> {
  if (!currentDbPath) {
    throw new Error("没有可导出的数据库");
  }

  try {
    const db = new Database(currentDbPath);
    const buffer = db.serialize();
    db.close();
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    ) as ArrayBuffer;
  } catch (err) {
    console.error("导出数据库失败:", err);
    throw new Error(err instanceof Error ? err.message : "未知错误");
  }
}

export async function executeQuery(query: string) {
  try {
    if (!query?.trim()) {
      throw new Error("请输入SQL查询语句");
    }

    if (!currentDbPath) {
      await createNewDb();
    }

    const db = new Database(currentDbPath!);

    let results;
    try {
      if (query.toLowerCase().trim().startsWith("select")) {
        results = { results: db.prepare(query).all(), kind: "query" };
      } else {
        db.prepare(query).run();
        results = {
          message: `操作成功执行： ${query.substring(0, 10)}...`,
          kind: "update",
        };
      }
    } finally {
      db.close();
      return results;
    }
  } catch (err) {
    console.error("查询执行失败:", err);
    throw new Error(err instanceof Error ? err.message : "未知错误");
  }
}

export async function getSchemaInfo() {
  if (!currentDbPath) {
    throw new Error("没有打开的数据库");
  }

  try {
    const db = new Database(currentDbPath);
    const tables = db.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    ).all();

    const schemaInfo = tables.map((table) => {
      const columns = db
        .prepare(`PRAGMA table_info(${table.name})`)
        .all()
        .map((col) => ({
          name: col.name,
          type: col.type,
        }));

      return {
        name: table.name,
        columns,
      };
    });

    db.close();
    return schemaInfo;
  } catch (err) {
    console.error("获取数据库结构信息失败:", err);
    throw new Error(err instanceof Error ? err.message : "未知错误");
  }
}
