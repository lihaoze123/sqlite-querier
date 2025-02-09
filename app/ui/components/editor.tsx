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
        defaultValue={`SELECT * FROM sqlite_master;`}
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
