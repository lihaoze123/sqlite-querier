import { useState, useRef } from "react";
import { DatabaseState } from "@/app/lib/definitions";
import { exportFile } from "@/app/lib/utils";
import { executeQuery, uploadDb, createNewDb, exportDb, getSchemaInfo } from "@/app/lib/actions";

export const useDatabaseOperations = () => {
  const [state, setState] = useState<DatabaseState>({
    sqlQuery: "-- 查看表结构\nSELECT * FROM sqlite_master;",
    error: null,
    results: null,
    isLoading: false,
    schemaInfo: null
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setSqlQuery = (query: string) => {
    setState(prev => ({ ...prev, sqlQuery: query }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setState(prev => ({ ...prev, error: null, isLoading: true }));
      try {
        const buffer = await file.arrayBuffer();
        await uploadDb(buffer);
        const schemaInfo = await getSchemaInfo();
        setState(prev => ({
          ...prev,
          error: null,
          isLoading: false,
          schemaInfo
        }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // 3秒后自动隐藏
      } catch (err) {
        console.error('上传数据库失败:', err);
        setState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : '未知错误',
          isLoading: false,
          schemaInfo: null
        }));
      }
    }
  };

  const handleCreateNewDb = async () => {
    setState(prev => ({ ...prev, error: null, isLoading: true }));
    try {
      await createNewDb();
      const schemaInfo = await getSchemaInfo();
      setState(prev => ({
        ...prev,
        error: null,
        isLoading: false,
        schemaInfo
      }));
    } catch (err) {
      console.error('创建数据库失败:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : '未知错误',
        isLoading: false,
        schemaInfo: null
      }));
    }
  };

  const handleExportDb = async () => {
    setState(prev => ({ ...prev, error: null, isLoading: true }));
    try {
      const buffer = await exportDb();
      if (buffer) {
        const date = new Date().toISOString().split('.')[0].replace(/-|:|T/g, '');
        exportFile(buffer, `database-${date}.db`);
      }
      setState(prev => ({
        ...prev,
        error: null,
        isLoading: false
      }));
    } catch (err) {
      console.error('导出数据库失败:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : '未知错误',
        isLoading: false
      }));
    }
  };

  const handleExecuteQuery = async () => {
    if (!state.sqlQuery.trim()) {
      setState(prev => ({ ...prev, error: "请输入SQL查询语句" }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const results = await executeQuery(state.sqlQuery);
      if (!results) {
        throw new Error("执行查询失败：未收到结果");
      }
      
      if (results.kind === "update" && 
          /^(CREATE|ALTER|DROP)\s+TABLE/i.test(state.sqlQuery.trim())) {
        const schemaInfo = await getSchemaInfo();
        setState(prev => ({
          ...prev,
          results,
          schemaInfo,
          error: null,
          isLoading: false
        }));
      } else {
        setState(prev => ({
          ...prev,
          results,
          error: null,
          isLoading: false
        }));
      }
    } catch (err: unknown) {
      console.error('执行查询失败:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : '未知错误',
        results: null,
        isLoading: false
      }));
    }
  };

  return {
    state,
    showSuccess,
    fileInputRef,
    setSqlQuery,
    handleFileUpload,
    handleCreateNewDb,
    handleExportDb,
    handleExecuteQuery,
  };
};