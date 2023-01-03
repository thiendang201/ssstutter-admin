import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel
} from '@tanstack/react-table';
import { PaginationProps } from 'types/common';
import Pagination from 'common/components/pagination/Pagination';

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: PaginationProps;
  onPaginationItemClick: (page: number) => void;
}

export function Table<T>({
  data,
  columns,
  pagination,
  onPaginationItemClick
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  const showPagination = pagination.last_page > 1;

  return (
    <div className='p-2'>
      <table className='w-full'>
        <thead className='border-b border-light-blue-grey dark:border-slate-600 '>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div className='py-2'>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className='border-b border-light-blue-grey dark:border-slate-600 py-2'
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className='py-2'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showPagination && (
        <div className='mt-4'>
          <Pagination
            total={pagination.last_page}
            active={pagination.current_page}
            padding={2}
            onClick={onPaginationItemClick}
          />
        </div>
      )}
    </div>
  );
}
