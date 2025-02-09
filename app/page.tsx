"use client";

import Editor from "@/app/ui/components/editor";
import SQLiteLogo from "@/app/ui/components/sqlite-logo";
import { DatabaseControls } from "@/app/ui/components/database/database-controls";
import { useDatabaseOperations } from "@/app/lib/hooks";
import UpdateSuccess from "@/app/ui/components/database/update-success";
import DataTable from "@/app/ui/components/database/table";
import SchemaInfo from "@/app/ui/components/database/schema-info";
import { Suspense } from "react";

function PageContent() {
  const {
    state,
    showSuccess,
    fileInputRef,
    setSqlQuery,
    handleFileUpload,
    handleCreateNewDb,
    handleExportDb,
    handleExecuteQuery,
  } = useDatabaseOperations();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-2 md:p-4">
      <div className="flex shrink-0 items-center justify-center rounded-lg p-2 md:p-4">
        <SQLiteLogo />
      </div>
      <div className="flex flex-col items-center w-full md:w-2/3">
        {state.error && <div className="text-red-500 mb-2 px-2">{state.error}</div>}
        {state.results?.kind === "update" && (
          <div className="text-green-500 mb-2 px-2">{state.results.message}</div>
        )}
        <div className="fixed top-4 right-4 z-50 w-72 max-w-[90vw]">
          <UpdateSuccess showSuccess={showSuccess} />
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="w-full h-[300px] md:h-[500px] overflow-hidden rounded-lg border-[1px] border-gray-300">
            <Editor value={state.sqlQuery} onChange={setSqlQuery} />
          </div>
          <DatabaseControls
            fileInputRef={fileInputRef}
            onExecute={handleExecuteQuery}
            onUploadDb={handleFileUpload}
            onCreateDb={handleCreateNewDb}
            onExportDb={handleExportDb}
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 flex justify-center mt-4">
        <div className="w-full">
          {state.results?.kind === "query" ? (
            <DataTable results={state.results.results} />
          ) : (
            state.schemaInfo && <SchemaInfo schemaInfo={state.schemaInfo} />
          )}
        </div>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">加载中...</div>}>
      <PageContent />
    </Suspense>
  );
}
