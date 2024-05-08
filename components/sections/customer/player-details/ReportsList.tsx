"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { dribbleOptions, laneOptions } from "@/constants/sequence-options"
import { createClient } from "@/lib/supabase/client"
import { GPSApiData, ReportApiData, SequenceApiData } from "@/types"
import { getDribblesData, getSequenceBoxscoreData } from "@/utils/calculate-boxscore-data"
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
import { useState } from "react"

interface Props {
  data: ReportApiData[]
}

const getIndividualDribblePercent = (
  dribbleCode: string,
  dribbleTypes: Record<string, number>,
  totalDribbles: number,
) => {
  return ((dribbleTypes[dribbleCode] || 0) / totalDribbles) * 100
}

export default function ReportsList({ data }: Props) {
  const { toast } = useToast()
  const supabase = createClient()

  const { totalDribbles, dribbleTypes } = getDribblesData(data[0])
  getSequenceBoxscoreData(data[0])

  const [activeData, setActiveData] = useState({
    individualDribble: dribbleOptions[1].uid,
    lane: laneOptions[0].value,
    playCode: "",
    shootingOffDribbles: "",
    shootingStationary: "",
    frequency: "",
    initialDirection: "",
    counterDirection: "",
    lastHand: "",
  })

  const onChangeActiveData = (key: string, value: string) => {
    setActiveData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleValueChange = (key: string) => (value: string) => {
    onChangeActiveData(key, value)
  }

  const TABLE_COLUMNS: ColumnDef<any>[] = [
    {
      id: "individualDribble",
      header: () => (
        <div className="flex flex-col gap-1 py-4">
          <span className="text-white">Individual Dribble %</span>
          <Select value={activeData.individualDribble} onValueChange={handleValueChange("individualDribble")}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Dribble Type" />
            </SelectTrigger>
            <SelectContent side="top">
              {dribbleOptions.flatMap((dribbleOption) =>
                dribbleOption.isFinalMove || dribbleOption.isFirstMove ? (
                  []
                ) : (
                  <SelectItem key={dribbleOption.uid} value={`${dribbleOption.uid}`}>
                    {dribbleOption.name}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "lane",
      header: () => (
        <div className="flex flex-col gap-1 py-4">
          <span className="text-white">Lane Dribble %</span>
          <Select value={activeData.lane} onValueChange={handleValueChange("lane")}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Lane" />
            </SelectTrigger>
            <SelectContent side="top">
              {laneOptions.map((laneOption) => (
                <SelectItem key={laneOption.value} value={laneOption.value}>
                  {laneOption.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ]

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

      const formattedSequencesData = sequencesData?.map((sequence) => ({
        ...sequence,
        moves: sequence.move,
      }))

      const dataToDownload = {
        sequences: formattedSequencesData,
        name: report.name || `${report.game_id?.away_team_id?.name} @ ${report.game_id?.home_team_id?.name}`,
        playerInfo: {
          name: report.player_id?.name || "",
          points: getTotalPoints(formattedSequencesData as any),
          game: `${report.game_id?.away_team_id?.name} @ ${report.game_id?.home_team_id?.name}`,
          date: report.game_id?.date?.split("T")[0] || "",
        },
        imageInfo: gpsData || [],
        error: null,
      }

      downloadCsv(dataToDownload as any)
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
            <TableRow key={report.id}>
              <TableCell>
                {getIndividualDribblePercent(activeData.individualDribble, dribbleTypes, totalDribbles).toFixed(1)}%
              </TableCell>
              <TableCell>0</TableCell>
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
