"use client"

import { DataTablePagination } from "@/components/table/DataTablePagination"
import { DEFAULT_PAGE_SIZE } from "@/constants/misc"
import { AVAILABLE_PLAYER_IDS } from "@/global-constants"
import { LevelTypes, PlayerApiData, TeamData } from "@/types"
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
  isAdmin: boolean
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
  {
    id: "player_level",
    size: 200,
    header: () => <div>Level</div>,
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("player_level")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
]

export default function PlayersTable({ data, count, isAdmin }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize table with the current page from URL
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) - 1 : 0
  const currentPageSize = Number(searchParams.get("pageSize")) || Number(DEFAULT_PAGE_SIZE)

  const table = useReactTable({
    data,
    columns: TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    state: {
      pagination: {
        pageIndex: currentPage,
        pageSize: currentPageSize,
      },
    },
    // Disable table's built-in pagination state management
    manualPagination: true,
    pageCount: Math.ceil(count / currentPageSize),
  })

  const getIsOptionDisabled = (player: PlayerApiData) => {
    if (isAdmin) return false
    return !AVAILABLE_PLAYER_IDS.has(Number(player.id))
  }

  const onClickRow = (id: string) => () => {
    router.push(`/players/${id}`)
  }

  const tablePagination = table.getState().pagination

  useEffect(() => {
    // Only update URL if the current params don't match the table state
    const currentPage = searchParams.get("page")
    const newPage = (tablePagination.pageIndex + 1).toString()
    const currentPageSize = searchParams.get("pageSize")
    const newPageSize = tablePagination.pageSize.toString()

    if (currentPage === newPage && currentPageSize === newPageSize) {
      return
    }

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set("page", newPage)
    newSearchParams.set("pageSize", newPageSize)
    router.push(`?${newSearchParams.toString()}`)
  }, [tablePagination, router, searchParams])

  return (
    <div className="mt-6 space-y-4 lg:min-w-[600px]">
      <PlayersTableToolbar isAdmin={isAdmin} />
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
                aria-disabled={getIsOptionDisabled(player)}
              >
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.jersey}</TableCell>
                <TableCell>{(player.team_id as TeamData)?.name}</TableCell>
                <TableCell>{player.player_level ? LevelTypes[player.player_level] : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} count={count} />
    </div>
  )
}
