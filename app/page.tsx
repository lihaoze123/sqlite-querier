"use client";

import { useState, useRef } from "react";
import Editor from "@/app/ui/components/editor";
import { Button } from "@/app/ui/components/button";
import SQLiteLogo from "@/app/ui/components/sqlite-logo";
import { exportFile } from "@/app/lib/utils";
import { DatabaseState } from "@/app/lib/definitions";
import { DatabaseControls } from "@/app/ui/components/database/database-controls";
import { useDatabaseOperations } from "@/app/lib/hooks";
import UpdateSuccess from "@/app/ui/components/database/update-success";
import DataTable from "@/app/ui/components/database/table";
import SchemaInfo from "@/app/ui/components/database/schema-info";
export default function Page() {
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
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex shrink-0 items-center justify-center rounded-lg p-4">
        <SQLiteLogo />
      </div>
      <div className="flex flex-col items-center justify-center w-2/3 h-52 md:h-[600px]">
        {state.error && <div className="text-red-500 mb-2">{state.error}</div>}
        {state.results?.kind === "update" && (
          <div className="text-green-500 mb-2">{state.results.message}</div>
        )}
        <div className="fixed top-4 right-4 z-50 w-72">
          <UpdateSuccess showSuccess={showSuccess} />
        </div>
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex w-full h-full">
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
      <div className="w-2/3 flex justify-center">
        {state.results?.kind === "query" ? (
          <DataTable results={state.results.results} />
        ) : (
          state.schemaInfo && <SchemaInfo schemaInfo={state.schemaInfo} />
        )}
      </div>
    </main>
  );
}
