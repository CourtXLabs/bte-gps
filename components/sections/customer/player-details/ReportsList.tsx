"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ReportApiData, TeamData } from "@/types"
import { DownloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"

interface Props {
  data: ReportApiData[]
}

export default function ReportsList({ data }: Props) {
  const [searchInput, setSearchInput] = useState("")
  const [filteredData, setFilteredData] = useState<ReportApiData[]>(data)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    setFilteredData(data.filter((report) => report.name?.toLowerCase().includes(value.toLowerCase())))
  }

  //   const onClickRow = (id: string) => () => {
  //     router.push(`/players/${id}`)
  //   }

  console.log(data)

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
                <Button variant="link" className="p-0" title="Download Report">
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
