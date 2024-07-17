"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import {
  COUNTER_DIRECTION,
  INITIAL_DIRECTION,
  LAST_DRIBBLE_TYPE,
  PLAY_CODE,
  dribbleOptions,
  frequencyOptions,
  laneOptions,
  shotsOffDribbleOptions,
  shotsStationaryOptions,
} from "@/constants/sequence-options"
import { createClient } from "@/lib/supabase/client"
import { GPSApiData, ReportApiData, SequenceApiData } from "@/types"
import {
  getComboToPointRatio,
  getCounterDirectionPercent,
  getEfficiencyScore,
  getFrequency,
  getIndividualDribblePercent,
  getInitialDirectionPercent,
  getLaneDribblePercent,
  getLastHandPercent,
  getPlayCodePercent,
  getShootingOffDribblesPercent,
  getShootingStationaryPercent,
} from "@/utils/calculate-boxscore-data"
import { downloadCsv } from "@/utils/get-csv-data"
import { getTotalPoints } from "@/utils/get-sequence-data"
import { formatDate } from "@/utils/misc"
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
import BoxscoreColumnSelect from "./charts/boxscore/BoxscoreColumnSelect"

interface Props {
  data: ReportApiData[]
}

export default function ReportsList({ data }: Props) {
  const { toast } = useToast()
  const supabase = createClient()

  const [activeData, setActiveData] = useState({
    individualDribble: dribbleOptions[1].uid,
    lane: laneOptions[0].value,
    playCode: PLAY_CODE.options[0].value,
    shootingOffDribbles: shotsOffDribbleOptions[0].value,
    shootingStationary: shotsStationaryOptions[0].value,
    frequency: frequencyOptions[0].value,
    initialDirection: INITIAL_DIRECTION.options[0].value,
    counterDirection: COUNTER_DIRECTION.options[0].value,
    lastHand: LAST_DRIBBLE_TYPE.options[0].value,
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
      id: "date",
      header: () => <div className="py-4 text-center text-white">Date</div>,
      enableSorting: false,
      enableHiding: false,
      size: 150,
    },
    {
      id: "teams",
      header: () => <div className="py-4 text-center text-white">Teams</div>,
      enableSorting: false,
      enableHiding: false,
      size: 150,
    },
    {
      id: "individualDribble",
      header: () => (
        <BoxscoreColumnSelect
          value={activeData.individualDribble}
          title="Individual Dribble %"
          placeholder="Dribble Type"
          options={dribbleOptions.map((option) => ({ value: option.uid, label: option.name }))}
          onValueChange={handleValueChange("individualDribble")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "lane",
      header: () => (
        <BoxscoreColumnSelect
          value={activeData.lane}
          title="Lane Dribble %"
          placeholder="Lane"
          options={laneOptions}
          onValueChange={handleValueChange("lane")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "playCode",
      header: () => (
        <BoxscoreColumnSelect
          value={activeData.playCode}
          title="Play Code %"
          placeholder="Play Code"
          options={PLAY_CODE.options}
          onValueChange={handleValueChange("playCode")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "shootingOffDribbles",
      header: () => (
        <BoxscoreColumnSelect
          value={activeData.shootingOffDribbles}
          title="Shooting (off dribbles) %"
          placeholder="Shot Type"
          options={shotsOffDribbleOptions}
          onValueChange={handleValueChange("shootingOffDribbles")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "shootingStationary",
      header: () => (
        <BoxscoreColumnSelect
          value={activeData.shootingStationary}
          title="Shooting (stationary) %"
          placeholder="Shot Type"
          options={shotsStationaryOptions}
          onValueChange={handleValueChange("shootingStationary")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "frequency",
      header: () => (
        <BoxscoreColumnSelect
          value={activeData.frequency}
          title="Frequency"
          placeholder="Frequency"
          options={frequencyOptions}
          onValueChange={handleValueChange("frequency")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "combo-to-point",
      header: () => <div className="py-4 text-center text-white">Combo to point ratio</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "initialDirection",
      size: 170,
      header: () => (
        <BoxscoreColumnSelect
          value={activeData.initialDirection}
          title="Initial Direction %"
          placeholder="Initial Direction"
          options={INITIAL_DIRECTION.options}
          onValueChange={handleValueChange("initialDirection")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "counterDirection",
      header: () => (
        <BoxscoreColumnSelect
          value={activeData.counterDirection}
          title="Counter Direction %"
          placeholder="Counter Direction"
          options={COUNTER_DIRECTION.options}
          onValueChange={handleValueChange("counterDirection")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "lastHand",
      header: () => (
        <BoxscoreColumnSelect
          value={activeData.lastHand}
          title="Last Hand"
          placeholder="Last Hand"
          options={LAST_DRIBBLE_TYPE.options}
          onValueChange={handleValueChange("lastHand")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "efficiencyScore",
      header: () => <div className="py-4 text-center text-white">Efficiency Score</div>,
      size: 80,
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
    <div className="mx-auto max-w-[112.5rem]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="align-bottom"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {data.map((report) => {
            return (
              <TableRow key={report.id}>
                <TableCell className="text-center">{formatDate(report.game_id?.date)}</TableCell>
                <TableCell className="text-center">
                  {report.game_id?.home_team_id?.abbreviation} @ {report.game_id?.away_team_id?.abbreviation}{" "}
                </TableCell>
                <TableCell className="text-center">
                  {getIndividualDribblePercent(report, activeData.individualDribble).toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {getLaneDribblePercent(report, activeData.lane).toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {getPlayCodePercent(report, activeData.playCode).toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {getShootingOffDribblesPercent(report, activeData.shootingOffDribbles).toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {getShootingStationaryPercent(report, activeData.shootingStationary).toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">{getFrequency(report, activeData.frequency).toFixed(1)}%</TableCell>
                <TableCell className="text-center">{getComboToPointRatio(report)}</TableCell>
                <TableCell className="text-center">
                  {getInitialDirectionPercent(report, activeData.initialDirection).toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {getCounterDirectionPercent(report, activeData.counterDirection).toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {getLastHandPercent(report, activeData.lastHand).toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">{getEfficiencyScore(report).toFixed(1)}</TableCell>
                <TableCell className="text-center">
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
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
