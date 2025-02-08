import React, { Fragment } from 'react';

export default function SchemaInfo({ schemaInfo }: { schemaInfo: any }) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">数据库结构</h2>
      <div className="space-y-6">
        {schemaInfo.map((table: any) => (
          <div key={table.name} className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">表名: {table.name}</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">列名</div>
              <div className="font-medium">类型</div>
              {table.columns.map((column: any) => (
                <Fragment key={`${table.name}-${column.name}`}>
                  <div>{column.name}</div>
                  <div>{column.type}</div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
