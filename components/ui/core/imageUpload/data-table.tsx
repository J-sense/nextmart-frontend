"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200/60 dark:border-gray-800/60 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/40 bg-white dark:bg-gray-950 backdrop-blur-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-gray-200/70 dark:border-gray-800/70 bg-gradient-to-r from-gray-50/80 via-gray-50/60 to-gray-50/80 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/80 hover:from-gray-100/90 hover:via-gray-100/70 hover:to-gray-100/90 dark:hover:from-gray-800/90 dark:hover:via-gray-800/70 dark:hover:to-gray-800/90 transition-all duration-300"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="py-4 px-6 text-xs font-bold text-gray-700 dark:text-gray-200 tracking-wider uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={`
                  border-b border-gray-100/50 dark:border-gray-800/50 
                  hover:bg-gradient-to-r hover:from-blue-50/50 hover:via-transparent hover:to-blue-50/50 
                  dark:hover:from-blue-950/30 dark:hover:via-transparent dark:hover:to-blue-950/30
                  transition-all duration-200 ease-out
                  hover:shadow-sm
                  ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-950"
                      : "bg-gray-50/40 dark:bg-gray-900/30"
                  }
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-4 px-6 text-sm text-gray-700 dark:text-gray-300 font-medium"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="h-48 text-center">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/30 dark:from-gray-700/50 dark:to-gray-800/30 rounded-full blur-xl"></div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-full h-full relative z-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-semibold text-base mb-1">
                    No data available
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
