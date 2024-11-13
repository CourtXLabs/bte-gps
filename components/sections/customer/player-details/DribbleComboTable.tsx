import GoPremiumCard from "@/components/cards/GoPremiumCard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface DribbleStats {
  oneDribbleMCCombo: string[]
  oneDribbleMCInitialDirection: string[]
  oneDribbleMCCounterDirection: string[]
  oneDribbleMCLastType: string[]
  oneDribbleMECombo: string[]
  twoDribbleMCCombo: string[]
  twoDribbleMCInitialDirection: string[]
  twoDribbleMCCounterDirection: string[]
  twoDribbleMCLastType: string[]
  twoDribbleMECombo: string[]
  threeDribbleMCCombo: string[]
  threeDribbleMCInitialDirection: string[]
  threeDribbleMCCounterDirection: string[]
  threeDribbleMCLastType: string[]
  threeDribbleMECombo: string[]
}

interface Move {
  id: number
  image: string
}

interface Section {
  id: number
  type: string
  moves: Move[]
}

interface Props {
  dribbleStats: DribbleStats
  isPremium: boolean
}

interface MoveData {
  meCombo: string
  mcCombo: string
  mcInitialDirection: string
  mcCounterDirection: string
  mcLastType: string
}

const sections: Section[] = [
  {
    id: 1,
    type: "1 Dribble",
    moves: [
      { id: 1, image: "/DribbleTree1.png" },
      { id: 2, image: "/DribbleTree2.png" },
      { id: 3, image: "/DribbleTree3.png" },
      { id: 4, image: "/DribbleTree4.png" },
      { id: 5, image: "/DribbleTree5.png" },
      { id: 6, image: "/DribbleTree6.png" },
      { id: 7, image: "/DribbleTree7.png" },
    ],
  },
  {
    id: 2,
    type: "2 Dribbles",
    moves: [
      { id: 1, image: "/DribbleTree1.png" },
      { id: 2, image: "/DribbleTree2.png" },
      { id: 3, image: "/DribbleTree3.png" },
      { id: 4, image: "/DribbleTree4.png" },
      { id: 5, image: "/DribbleTree5.png" },
      { id: 6, image: "/DribbleTree6.png" },
      { id: 7, image: "/DribbleTree7.png" },
    ],
  },
  {
    id: 3,
    type: "3 Dribbles",
    moves: [
      { id: 1, image: "/DribbleTree1.png" },
      { id: 2, image: "/DribbleTree2.png" },
      { id: 3, image: "/DribbleTree3.png" },
      { id: 4, image: "/DribbleTree4.png" },
      { id: 5, image: "/DribbleTree5.png" },
      { id: 6, image: "/DribbleTree6.png" },
      { id: 7, image: "/DribbleTree7.png" },
    ],
  },
]

const DribbleComboTable = ({ dribbleStats, isPremium }: Props) => {
  // Helper function to get the correct data for each section and move
  const getData = (sectionId: number, moveIndex: number): MoveData => {
    const prefix = sectionId === 1 ? "oneDribble" : sectionId === 2 ? "twoDribble" : "threeDribble"
    return {
      meCombo: dribbleStats[`${prefix}MECombo` as keyof DribbleStats][moveIndex],
      mcCombo: dribbleStats[`${prefix}MCCombo` as keyof DribbleStats][moveIndex],
      mcInitialDirection: dribbleStats[`${prefix}MCInitialDirection` as keyof DribbleStats][moveIndex],
      mcCounterDirection: dribbleStats[`${prefix}MCCounterDirection` as keyof DribbleStats][moveIndex],
      mcLastType: dribbleStats[`${prefix}MCLastType` as keyof DribbleStats][moveIndex],
    }
  }

  return (
    <Card className="mx-auto w-full max-w-screen-2xl overflow-x-auto">
      <CardHeader className="flex-row items-end justify-between">
        <div>
          <p className="text-lg font-semibold">Boxscore</p>
          <p className="text-sm">This table provides in-depth insights into player performance and tendencies</p>
        </div>
        <p className="font-semibold">MC = Most common</p>
      </CardHeader>
      <CardContent className="relative">
        {!isPremium && <GoPremiumCard className="bg-background" />}
        <div className={cn("mb-4 w-full text-white", { "pointer-events-none blur": !isPremium })}>
          {sections.map((section) => (
            <div key={section.id}>
              <div className="flex">
                {/* First column with images */}
                <div className="border-b border-l border-t border-white">
                  <div className="flex h-14 items-center border-b border-white px-4">{section.type}</div>
                  <div className="flex w-48 items-center p-4">
                    {section.id === 1 && (
                      <Image src="/dribble-tree-player-pound.png" width={205} height={175} alt="pound dribble" />
                    )}
                    {section.id === 2 && (
                      <div className="flex w-full flex-col items-center gap-5">
                        <Image src="/dribble-tree-player-pound.png" width={140} height={110} alt="pound dribble" />
                        <Image src="/dribble-tree-player-cross-over.png" width={140} height={110} alt="cross over" />
                      </div>
                    )}
                    {section.id === 3 && (
                      <div className="flex w-full flex-col items-center gap-5">
                        <Image src="/dribble-tree-player-pound.png" width={48} height={78} alt="pound dribble" />
                        <Image src="/dribble-tree-player-cross-over.png" width={94} height={78} alt="cross over" />
                        <Image src="/dribble-tree-player-in-out.png" width={94} height={78} alt="in + out" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Rest of the table */}
                <div className="flex-1">
                  <Table className="w-full border-collapse text-base [&_td]:border [&_td]:border-white [&_th]:border [&_th]:border-white">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="h-14 px-4 text-center">Move</TableHead>
                        <TableHead className="h-14 px-4 text-center">Most Efficient Combo</TableHead>
                        <TableHead className="h-14 px-4 text-center">MC Combo</TableHead>
                        <TableHead className="h-14 px-4 text-center">MC Initial Direction</TableHead>
                        <TableHead className="h-14 px-4 text-center">MC Counter Direction</TableHead>
                        <TableHead className="h-14 border-r-0 px-4 text-center">MC Last Hand</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {section.moves.map((move, index) => {
                        const data = getData(section.id, index)
                        return (
                          <TableRow key={move.id}>
                            <TableCell className="h-14 px-1 py-1">
                              <Image src={move.image} width={48} height={48} alt={move.image} className="mx-auto" />
                            </TableCell>
                            <TableCell className="px-4">{data.meCombo}</TableCell>
                            <TableCell className="px-4">{data.mcCombo}</TableCell>
                            <TableCell className="px-4">{data.mcInitialDirection}</TableCell>
                            <TableCell className="px-4">{data.mcCounterDirection}</TableCell>
                            <TableCell className="px-4">{data.mcLastType}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default DribbleComboTable
