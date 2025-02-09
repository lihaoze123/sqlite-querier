import { useState, useRef, useEffect } from "react";
import { DatabaseState } from "@/app/lib/definitions";
import { exportFile } from "@/app/lib/utils";
import { executeQuery, uploadDb, createNewDb, exportDb, getSchemaInfo } from "@/app/lib/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { PaginationState } from "./definitions";

export const useDatabaseOperations = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<DatabaseState>({
    sqlQuery: searchParams.get('query') || "SELECT * FROM sqlite_master;",
    error: null,
    results: null,
    isLoading: false,
    schemaInfo: null
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const query = searchParams.get('query');
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (query) {
        executeQueryInternal(query);
      }
      return;
    }
    
    if (query && query !== state.sqlQuery) {
      setState(prev => ({ ...prev, sqlQuery: query }));
      executeQueryInternal(query);
    }
  }, [searchParams]);

  const executeQueryInternal = async (query: string) => {
    if (!query.trim()) {
      setState(prev => ({ ...prev, error: "请输入SQL查询语句" }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const results = await executeQuery(query);
      if (!results) {
        throw new Error("执行查询失败：未收到结果");
      }

      if (results.kind === "update" && 
          /^(CREATE|ALTER|DROP)\s+TABLE/i.test(query.trim())) {
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

  const setSqlQuery = (query: string) => {
    setState(prev => ({ ...prev, sqlQuery: query }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setState(prev => ({ ...prev, error: null, results: null, isLoading: true }));
      try {
        const buffer = await file.arrayBuffer();
        await uploadDb(buffer);
        const schemaInfo = await getSchemaInfo();
        setState(prev => ({
          ...prev,
          error: null,
          results: null,
          isLoading: false,
          schemaInfo,
          sqlQuery: "SELECT * FROM sqlite_master;"
        }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        
        router.push("/");
      } catch (err) {
        console.error('上传数据库失败:', err);
        setState(prev => ({
          ...prev,
          error: err instanceof Error ? err.message : '未知错误',
          isLoading: false,
          schemaInfo: null
        }));
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleCreateNewDb = async () => {
    setState(prev => ({ ...prev, error: null, results: null, isLoading: true }));
    try {
      await createNewDb();
      const schemaInfo = await getSchemaInfo();
      setState(prev => ({
        ...prev,
        error: null,
        isLoading: false,
        schemaInfo,
        sqlQuery: "SELECT * FROM sqlite_master;"
      }));
    } catch (err) {
      console.error('创建数据库失败:', err);
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : '未知错误',
        isLoading: false,
        schemaInfo: null
      }));
    } finally {
      router.push("/");
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
    await executeQueryInternal(state.sqlQuery);
    
    const params = new URLSearchParams(searchParams);
    params.set('query', state.sqlQuery);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
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