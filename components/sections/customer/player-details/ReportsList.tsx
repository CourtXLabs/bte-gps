"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"
import { ReportApiData, Sequence, SequenceApiData, TeamData } from "@/types"
import { downloadCsv } from "@/utils/get-csv-data"
import { getTotalPoints } from "@/utils/get-sequence-data"
import { DownloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"

interface Props {
  data: ReportApiData[]
}

export default function ReportsList({ data }: Props) {
  const { toast } = useToast()
  const supabase = createClient()
  const [searchInput, setSearchInput] = useState("")
  const [filteredData, setFilteredData] = useState<ReportApiData[]>(data)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    setFilteredData(data.filter((report) => report.name?.toLowerCase().includes(value.toLowerCase())))
  }

  const onDownloadReport = (id: string) => async () => {
    try {
      const report = data.find((report) => report.id === id)

      if (!report) {
        throw new Error("Report not found")
      }

      const response = await supabase.from("sequence").select("*, move(*)").eq("report_id", id)
      const sequencesData: SequenceApiData[] | null = response.data

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
    <>
      <Input placeholder="Search report..." className="w-full" value={searchInput} onChange={onChangeInput} />

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead className="w-[200px]">Report Name</TableHead>
            <TableHead className="w-[150px]">Player</TableHead>
            <TableHead className="w-[80px]">Jersey</TableHead>
            <TableHead className="w-[150px]">Team</TableHead>
            <TableHead className="w-[18px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.name}</TableCell>
              <TableCell>{report.player_id?.name}</TableCell>
              <TableCell>{report.player_id?.jersey}</TableCell>
              <TableCell>{(report.player_id?.team_id as TeamData)?.name}</TableCell>
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
    </>
  )
}
