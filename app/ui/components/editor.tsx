"use client";

import MonacoEditor from "@monaco-editor/react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <div className="w-full h-full">
      <MonacoEditor
        value={value}
        onChange={(value) => onChange(value ?? "")}
        language="sql"
        theme="vs-light"
        className="rounded-lg border-2 border-gray-200"
        height="100%"
        defaultValue={`-- 查看表结构\nSELECT * FROM sqlite_master;`}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "monospace",
          wordWrap: "on",
          folding: true,
          lineNumbers: "on",
          automaticLayout: true,
          scrollBeyondLastLine: false,
          fixedOverflowWidgets: true,
          padding: { top: 8, bottom: 8 },
        }}
      />
    </div>
  );
}
