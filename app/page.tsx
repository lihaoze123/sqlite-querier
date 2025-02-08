"use client";

import { useState, useRef } from "react";
import Editor from "@/app/ui/components/editor";
import { Button } from "@/app/ui/components/button";
import SQLiteLogo from "@/app/ui/components/sqlite-logo";
import { exportFile } from "@/app/lib/utils";
import { DatabaseState } from "@/app/lib/definitions";
import { DatabaseControls } from "@/app/ui/components/database/database-controls";
import { useDatabaseOperations } from "@/app/lib/hooks";

export default function Page() {
  const {
    state,
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
      <div className="flex flex-col items-center justify-center w-1/2 h-52 md:h-[500px]">
        {state.error && (
          <div className="text-red-500 mb-2">{state.error}</div>
        )}
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex w-full h-3/4">
            <Editor 
              value={state.sqlQuery} 
              onChange={setSqlQuery} 
            />
          </div>
          <DatabaseControls
            fileInputRef={fileInputRef}
            onExecute={handleExecuteQuery}
            onCreateDb={handleCreateNewDb}
            onExportDb={handleExportDb}
          />
        </div>
      </div>
    </main>
  );
}
