import { useState, useRef } from "react";
import { DatabaseState } from "@/app/lib/definitions";
import { exportFile } from "@/app/lib/utils";

export const useDatabaseOperations = () => {
  const [state, setState] = useState<DatabaseState>({
    sqlQuery: "",
    dbFile: undefined,
    error: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setSqlQuery = (query: string) => {
    setState(prev => ({ ...prev, sqlQuery: query }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setState(prev => ({ ...prev, error: null }));
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as ArrayBuffer;
        setState(prev => ({
          ...prev,
          dbFile: content,
          isLoading: false
        }));
      };
      reader.onerror = () => {
        setState(prev => ({
          ...prev,
          error: "文件读取失败",
          isLoading: false
        }));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleCreateNewDb = () => {
    setState(prev => ({ ...prev, dbFile: undefined, error: null }));
  };

  const handleExportDb = () => {
    if (!state.dbFile) {
      setState(prev => ({ ...prev, error: "没有可导出的数据库" }));
      return;
    }

    try {
      const date = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
      exportFile(state.dbFile, `database-${date}.db`);
    } catch (err) {
      console.error('导出数据库失败:', err);
      setState(prev => ({ ...prev, error: "导出数据库失败,请重试" }));
    }
  };

  const handleExecuteQuery = () => {
    if (!state.sqlQuery.trim()) {
      setState(prev => ({ ...prev, error: "请输入SQL查询语句" }));
      return;
    }
    console.log("SQL Query:", state.sqlQuery);
    // TODO: 实现实际的查询逻辑
  };

  return {
    state,
    fileInputRef,
    setSqlQuery,
    handleFileUpload,
    handleCreateNewDb,
    handleExportDb,
    handleExecuteQuery,
  };
};