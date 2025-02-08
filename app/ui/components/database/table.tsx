import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/ui/components/table";

export default function DataTable({ results }: { results: any[] }) {
    if (!results || results.length === 0) {
        return <div className="text-gray-500 p-4">没有查询或没有数据</div>;
    }

    const headers = Object.keys(results[0]);

    return (
        <div className="rounded-md border w-full overflow-x-auto px-2 md:px-4">
            <div className="min-w-full inline-block align-middle">
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
                        {results.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {headers.map((header) => (
                                    <TableCell 
                                        key={header} 
                                        className="whitespace-nowrap truncate max-w-[200px] px-2"
                                    >
                                        {row[header]?.toString() || ''}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}