"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"
import { GPSApiData, ReportApiData, Sequence, SequenceApiData } from "@/types"
import { downloadCsv } from "@/utils/get-csv-data"
import { getTotalPoints } from "@/utils/get-sequence-data"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { DownloadIcon } from "lucide-react"

interface Props {
  data: ReportApiData[]
}

const TABLE_COLUMNS: ColumnDef<any>[] = [
  {
    id: "player",
    size: 200,
    header: () => <div>Individual Dribble %</div>,
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

export default function ReportsList({ data }: Props) {
  const { toast } = useToast()
  const supabase = createClient()

  const table = useReactTable({
    data,
    columns: TABLE_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
  })

  const onDownloadReport = (id: string) => async () => {
    try {
      const report = data.find((report) => report.id === id)

      if (!report) {
        throw new Error("Report not found")
      }

      const [sequenceResponse, gpsResponse] = await Promise.all([
        supabase.from("sequence").select("*, move(*)").eq("report_id", id),
        supabase.from("gps").select("period, url").eq("report_id", id),
      ])

      const sequencesData: SequenceApiData[] | null = sequenceResponse.data
      const gpsData: GPSApiData[] | null = gpsResponse.data

      if (!sequencesData) {
        throw new Error("No sequences found")
      }

      const formattedSequencesData: Sequence[] = sequencesData?.map((sequence) => ({
        ...sequence,
        moves: sequence.move,
      }))

      const dataToDownload = {
        sequences: formattedSequencesData,
        name: report.name || `${report.game_id?.away_team_id?.name} @ ${report.game_id?.home_team_id?.name}`,
        playerInfo: {
          name: report.player_id?.name || "",
          points: getTotalPoints(formattedSequencesData),
          game: `${report.game_id?.away_team_id?.name} @ ${report.game_id?.home_team_id?.name}`,
          date: report.game_id?.date?.split("T")[0] || "",
        },
        imageInfo: gpsData || [],
        error: null,
      }

      downloadCsv(dataToDownload)
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: typeof error === "string" ? error : error.message || "An error occurred",
      })
    }
  }

  return (
    <div>
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
          {data.map((report) => (
            <TableRow key={report.id} className="cursor-pointer">
              <TableCell>sssss</TableCell>
              <TableCell>aa</TableCell>
              <TableCell>cc</TableCell>
              <TableCell>
                <Button
                  variant="link"
                  className="p-0"
                  title="Download Report"
                  type="button"
                  onClick={onDownloadReport(report.id!)}
                >
                  <DownloadIcon width={18} height={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
