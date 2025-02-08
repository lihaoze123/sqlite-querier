import React, { Fragment } from 'react';

export default function SchemaInfo({ schemaInfo }: { schemaInfo: any }) {
  return (
    <div className="w-full px-2 md:px-4">
      <h2 className="text-lg md:text-xl font-bold mb-4">数据库结构</h2>
      <div className="space-y-4 md:space-y-6">
        {schemaInfo.map((table: any) => (
          <div key={table.name} className="bg-white/5 p-3 md:p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold mb-2 break-all">表名: {table.name}</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 md:gap-2 text-sm md:text-base">
              <div className="font-medium px-1 bg-black/5 rounded">列名</div>
              <div className="font-medium px-1 bg-black/5 rounded">类型</div>
              {table.columns.map((column: any) => (
                <Fragment key={`${table.name}-${column.name}`}>
                  <div className="break-all px-1">{column.name}</div>
                  <div className="break-all px-1">{column.type}</div>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
