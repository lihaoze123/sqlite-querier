import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/components/table"

export default function SchemaInfo({ schemaInfo }: { schemaInfo: any }) {
  if (!schemaInfo || schemaInfo.length === 0) {
    return (
      <div className="w-full px-2 md:px-4">
        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <p className="text-lg">数据库中暂无表格</p>
              <p className="mt-2">请先创建表格或导入数据库文件</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full px-2 md:px-4">
      <h2 className="text-lg md:text-xl font-bold mb-4">数据库结构</h2>
      <div className="space-y-4 md:space-y-6">
        {schemaInfo.map((table: any) => (
          <Card key={table.name} className="bg-card">
            <CardHeader>
              <CardTitle className="text-base md:text-lg break-all">
                表名: {table.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>列名</TableHead>
                    <TableHead>类型</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {table.columns.map((column: any) => (
                    <TableRow key={`${table.name}-${column.name}`}>
                      <TableCell className="break-all">{column.name}</TableCell>
                      <TableCell className="break-all">{column.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
