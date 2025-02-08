"use client";

import MonacoEditor from "@monaco-editor/react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <MonacoEditor
      value={value}
      onChange={(value) => onChange(value ?? "")}
      language="sql"
      theme="vs-light"
      width="100%"
      height="100%"
      className="rounded-lg border-2 border-gray-200"
      defaultValue={`// 查看表结构\nSELECT * FROM sqlite_master`}
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
      }}
    />
  );
}
