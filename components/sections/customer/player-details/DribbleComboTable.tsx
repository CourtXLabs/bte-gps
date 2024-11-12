import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

const DribbleComboTable = () => {
  const comboData = [
    {
      id: 1,
      type: "1 Dribble Combo",
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
      type: "2 Dribble Combo",
      moves: [
        { id: 1, image: "/DribbleTree1.png", efficient: "11", common: "11" },
        { id: 2, image: "/DribbleTree2.png", efficient: "21", common: "11" },
        { id: 3, image: "/DribbleTree3.png", efficient: "31", common: "11" },
        { id: 4, image: "/DribbleTree4.png", efficient: "41", common: "11" },
        { id: 5, image: "/DribbleTree5.png", efficient: "51", common: "11" },
        { id: 6, image: "/DribbleTree6.png", efficient: "61", common: "11" },
        { id: 7, image: "/DribbleTree7.png", efficient: "71", common: "11" },
      ],
    },
    {
      id: 3,
      type: "3 Dribble Combo",
      moves: [
        { id: 1, image: "/DribbleTree1.png", efficient: "112", common: "211" },
        { id: 2, image: "/DribbleTree2.png", efficient: "112", common: "211" },
        { id: 3, image: "/DribbleTree3.png", efficient: "112", common: "211" },
        { id: 4, image: "/DribbleTree4.png", efficient: "112", common: "211" },
        { id: 5, image: "/DribbleTree5.png", efficient: "112", common: "211" },
        { id: 6, image: "/DribbleTree6.png", efficient: "112", common: "211" },
        { id: 7, image: "/DribbleTree7.png", efficient: "112", common: "211" },
      ],
    },
  ]

  return (
    <Card className="mx-auto w-full max-w-screen-2xl overflow-x-auto">
      <CardHeader className="flex-row items-end justify-between">
        <div>
          <p className="text-lg font-semibold">Boxscore</p>
          <p className="text-sm">This table provides in-depth insights into player performance and tendencies</p>
        </div>
        <p className="font-semibold">MC = Most common</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4 w-full text-white">
          {comboData.map((section) => (
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
                      {section.moves.map((move) => (
                        <TableRow key={move.id}>
                          <TableCell className="h-14 px-1 py-1">
                            <Image src={move.image} width={48} height={48} alt={move.image} className="mx-auto" />
                          </TableCell>
                          <TableCell className="px-4">{""}</TableCell>
                          <TableCell className="px-4">{""}</TableCell>
                          <TableCell className="px-4"></TableCell>
                          <TableCell className="px-4"></TableCell>
                          <TableCell className="px-4"></TableCell>
                        </TableRow>
                      ))}
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
