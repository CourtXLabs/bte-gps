import { Coordinates, Option } from "@/types"
import Image from "next/image"
import { useEffect, useRef } from "react"

interface Props {
  onClose: () => void
  onSubmit: (args: any) => void
  coordinates: Coordinates
}

const options = [
  {
    id: 1,
    image: "/DribbleTree1.png",
    keyShortcut: "1",
    name: "Pound",
    color: "#E52127",
  },
  {
    id: 2,
    image: "/DribbleTree2.png",
    keyShortcut: "2",
    name: "Cross",
    color: "#1E4695",
  },
  {
    id: 3,
    image: "/DribbleTree3.png",
    keyShortcut: "3",
    name: "In + Out",
    color: "#186D38",
  },
  {
    id: 4,
    image: "/DribbleTree4.png",
    keyShortcut: "4",
    name: "Between The Legs",
    color: "#814198",
  },
  {
    id: 5,
    image: "/DribbleTree5.png",
    keyShortcut: "5",
    name: "Behind The Back",
    color: "#FCD407",
  },
  {
    id: 6,
    image: "/DribbleTree6.png",
    keyShortcut: "6",
    name: "Spin",
    color: "#FF9E1F",
  },
  {
    id: 7,
    keyShortcut: "A",
    name: "Missed Shot",
  },
  {
    id: 8,
    keyShortcut: "B",
    name: "Made Shot",
  },
]

export default function CourtDropdown({ onClose, coordinates, onSubmit }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null) // Ref for the dropdown div

  const positionStyle = { left: `${coordinates.x}px`, top: `${coordinates.y}px` }
  const onSelectOption = (option: Option) => () => {
    onSubmit(option)
    onClose()
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  const handleKeyShortcut = (event: KeyboardEvent) => {
    const key = event.key
    const option = options.find((option) => option.keyShortcut.toUpperCase() === key.toUpperCase())
    if (option) {
      onSubmit(option)
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyShortcut)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyShortcut)
    }
  }, [onClose])

  return (
    <div
      ref={dropdownRef}
      className="background-dark-foreground absolute z-10 flex w-max -translate-x-1/2 items-center gap-2 rounded-sm bg-background-dark px-4 py-3"
      style={positionStyle}
    >
      {options.map((option) =>
        option.image ? (
          <Image
            key={option.id}
            src={option.image}
            alt={option.name}
            width={100}
            height={129}
            className="cursor-pointer"
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
  )
}
