"use client"

import { DataTablePagination } from "@/components/table/DataTablePagination"
import { AVAILABLE_PLAYER_IDS } from "@/global-constants"
import { PlayerApiData, TeamData } from "@/types"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"
import PlayersTableToolbar from "./PlayersTableToolbar"

interface Props {
  data: PlayerApiData[]
  count: number
}

const TABLE_COLUMNS: ColumnDef<PlayerApiData>[] = [
  {
    id: "player",
    size: 200,
    header: () => <div>Player</div>,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("player")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "jersey",
    size: 50,
    header: () => <div>Jersey</div>,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("jersey")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "team",
    size: 200,
    header: () => <div>Team</div>,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("team")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
]

export default function PlayersTable({ data, count }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const table = useReactTable({
    data,
    columns: TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
  })

  const onClickRow = (id: string) => () => {
    router.push(`/players/${id}`)
  }

  const tablePagination = table.getState().pagination

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set("page", (tablePagination.pageIndex + 1).toString())
    newSearchParams.set("pageSize", tablePagination.pageSize.toString())

    router.push(`?${newSearchParams.toString()}`)
  }, [tablePagination, router, searchParams])

  return (
    <div className="mt-6 space-y-4 lg:min-w-[600px]">
      <PlayersTableToolbar />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data.map((player) => (
              <TableRow
                key={player.id}
                onClick={onClickRow(player.id!)}
                className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
                aria-disabled={!AVAILABLE_PLAYER_IDS.has(Number(player.id))}
              >
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.jersey}</TableCell>
                <TableCell>{(player.team_id as TeamData)?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} count={count} />
    </div>
  )
}
