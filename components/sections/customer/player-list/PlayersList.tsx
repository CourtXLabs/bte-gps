"use client"

import { PlayerApiData, TeamData } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "../../../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"

interface Props {
  data: PlayerApiData[]
}

export default function PlayersList({ data }: Props) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("")
  const [filteredData, setFilteredData] = useState<PlayerApiData[]>(data)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInput(value)
    setFilteredData(data.filter((player) => player.name.toLowerCase().includes(value.toLowerCase())))
  }

  const onClickRow = (id: string) => () => {
    router.push(`/players/${id}`)
  }

  return (
    <>
      <Input placeholder="Search player..." className="w-full" value={searchInput} onChange={onChangeInput} />

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Player</TableHead>
            <TableHead className="w-[50px]">Jersey</TableHead>
            <TableHead className="w-[200px]">Team</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((player) => (
            <TableRow key={player.id} onClick={onClickRow(player.id!)} className="cursor-pointer">
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.jersey}</TableCell>
              <TableCell>{(player.team_id as TeamData)?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
