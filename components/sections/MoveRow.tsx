import { moveIdToNames } from "@/constants/misc"
import useBteStore from "@/stores/bteDataStore"
import { MoveSequence } from "@/types"
import { CheckIcon, EditIcon, TrashIcon, XIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TableCell, TableRow } from "../ui/table"

type Props = {
  move: MoveSequence
  moveIndex: number
}

const MoveRow = ({ move, moveIndex }: Props) => {
  const { x: initialX, y: initialY } = { x: move.x, y: move.y }
  const { editMove, deleteMove, activeSequenceIndex } = useBteStore()
  const [isEditing, setIsEditing] = useState(false)
  const [xCoordinate, setXCoordinate] = useState(initialX)
  const [yCoordinate, setYCoordinate] = useState(initialY)

  const onChangeXCoordinate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXCoordinate(Number(e.target.value))
  }

  const onChangeYCoordinate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYCoordinate(Number(e.target.value))
  }

  const onCancelEditing = () => {
    setIsEditing(false)
    setXCoordinate(initialX)
    setYCoordinate(initialY)
  }

  const onUpdate = () => {
    setIsEditing(false)
    editMove({ moveIndex, sequenceIndex: activeSequenceIndex, newMove: { ...move, x: xCoordinate, y: yCoordinate } })
  }

  const onStartEditing = () => {
    setIsEditing(true)
  }

  const onDelete = () => {
    deleteMove({ moveIndex, sequenceIndex: activeSequenceIndex })
  }

  const tableRowContents = isEditing ? (
    <>
      <TableCell>M{moveIndex + 1}</TableCell>
      <TableCell>
        <Input
          placeholder="X coordinate"
          type="number"
          min={-47}
          max={47}
          value={xCoordinate}
          onChange={onChangeXCoordinate}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="Y coodrdinate"
          type="number"
          min={-25}
          max={25}
          value={yCoordinate}
          onChange={onChangeYCoordinate}
        />
      </TableCell>
      <TableCell>{moveIdToNames[move.moveId]}</TableCell>
      <TableCell>
        <Button className="p-2" variant="ghost" onClick={onUpdate}>
          <CheckIcon size={20} className="stroke-primary" />
        </Button>
      </TableCell>
      <TableCell>
        <Button className="p-2" variant="ghost" onClick={onCancelEditing}>
          <XIcon size={20} className="stroke-destructive" />
        </Button>
      </TableCell>
    </>
  ) : (
    <>
      <TableCell>M{moveIndex + 1}</TableCell>
      <TableCell>{xCoordinate}</TableCell>
      <TableCell>{yCoordinate}</TableCell>
      <TableCell>{moveIdToNames[move.moveId]}</TableCell>
      <TableCell>
        <Button className="p-2" variant="ghost" onClick={onStartEditing}>
          <EditIcon size={20} className="stroke-primary" />
        </Button>
      </TableCell>
      <TableCell>
        <Button className="p-2" variant="ghost" onClick={onDelete}>
          <TrashIcon size={20} className="stroke-destructive" />
        </Button>
      </TableCell>
    </>
  )

  return <TableRow>{tableRowContents}</TableRow>
}

export default MoveRow
