import { dribbleOptions, moveOptions, nonDribbleMoves } from "@/constants/sequence-options"
import useBteStore from "@/stores/bteDataStore"
import { Coordinates, Option } from "@/types"
import Image from "next/image"
import { useCallback, useEffect, useRef } from "react"

interface Props {
  onClose: () => void
  onSubmit: (args: any) => void
  coordinates: Coordinates
}

export default function CourtDropdown({ onClose, coordinates, onSubmit }: Props) {
  const { isActiveCombo } = useBteStore()
  const dropdownRef = useRef<HTMLDivElement>(null) // Ref for the dropdown div

  const positionStyle = { left: `${coordinates.x}px`, top: `${coordinates.y}px` }
  const onSelectOption = (option: Option) => () => {
    onSubmit(option)
    onClose()
  }

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    },
    [onClose],
  )

  const handleKeyShortcut = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key
      const option = moveOptions.find((option) => option.keyShortcut.toUpperCase() === key.toUpperCase())
      if (option) {
        onSubmit(option)
        onClose()
      }
    },
    [onSubmit, onClose],
  )

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyShortcut)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyShortcut)
    }
  }, [onClose, handleClickOutside, handleKeyShortcut])

  return (
    <div
      ref={dropdownRef}
      className="background-dark-foreground absolute z-10 flex w-max -translate-x-1/2 flex-col items-center gap-8 rounded-sm bg-background-dark p-4"
      style={positionStyle}
    >
      <div className="flex items-center">
        {dribbleOptions.map((option) =>
          option.image ? (
            <Image
              key={option.id}
              src={option.image}
              alt={option.name}
              width={120}
              height={120}
              className=" cursor-pointer"
              onClick={onSelectOption(option)}
            />
          ) : (
            <p
              key={option.id}
              className="m-0 flex w-[100px] cursor-pointer flex-col items-center gap-1 text-center text-2xl font-semibold"
              onClick={onSelectOption(option)}
            >
              <span>{option.keyShortcut} </span>
              <span>{option.name}</span>
            </p>
          ),
        )}
      </div>
      <div className="flex items-center">
        {nonDribbleMoves.flatMap((option) => {
          if (isActiveCombo && option.isStartCombo) {
            return []
          }

          if (!isActiveCombo && option.isLastCombo) {
            return []
          }

          return (
            <p
              key={option.id}
              className="m-0 flex w-[100px] cursor-pointer flex-col items-center gap-1 text-center text-2xl font-semibold"
              onClick={onSelectOption(option)}
            >
              <span>{option.keyShortcut} </span>
              <span>{option.name}</span>
            </p>
          )
        })}
      </div>
    </div>
  )
}
