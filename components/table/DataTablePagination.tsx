import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  count: number
}

const PAGE_SIZES = [10, 20, 30, 40, 50]

export function DataTablePagination<TData>({ table, count }: DataTablePaginationProps<TData>) {
  const pageSize = table.getState().pagination.pageSize
  const currentPage = table.getState().pagination.pageIndex
  const pageCount = Math.ceil(count / pageSize)
  const canPreviousPage = currentPage > 0
  const canNextPage = currentPage < pageCount - 1

  return (
    <div className="flex items-center justify-end space-x-6 px-4 lg:space-x-8">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {PAGE_SIZES.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {table.getState().pagination.pageIndex + 1} of {pageCount}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!canPreviousPage}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!canNextPage}>
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!canNextPage}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
