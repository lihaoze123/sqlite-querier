import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/ui/components/table";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/card";

import { TablePagination } from "./table-pagination";
import { DataTableProps } from "@/app/lib/definitions";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function TableContent<T extends Record<string, any>>({
  results,
  pageSize = 5,
}: DataTableProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page") as string)
    : 1;

  if (!results || results.length === 0) {
    return <div className="text-gray-500 p-4">没有查询或没有数据</div>;
  }

  const totalPages = Math.ceil(results.length / pageSize);
  const headers = Object.keys(results[0]);
  const paginatedResults = results.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <>
      <Card className="w-full overflow-x-auto px-2 md:px-4">
        <CardHeader>
          <CardTitle>查询结果</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead
                    key={header}
                    className="whitespace-nowrap px-2 py-3 bg-muted/50 first:rounded-l-sm last:rounded-r-sm"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedResults.map((row, rowIndex) => {
                return (
                  <TableRow key={rowIndex}>
                    {headers.map((header) => {
                      const str = row[header]?.toString() || "";
                      const value = str;
                      return (
                        <TableCell
                          key={header}
                          className="whitespace-nowrap px-2"
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default function DataTable<T extends Record<string, any>>(
  props: DataTableProps<T>
) {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <TableContent {...props} />
    </Suspense>
  );
}
