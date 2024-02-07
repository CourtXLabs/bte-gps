import Image from "next/image"
import { useEffect, useRef } from "react"

interface Props {
  onClose: () => void
  coordinates: { x: number; y: number }
}

const options = [
  {
    id: 1,
    image: "/DribbleTree1.webp",
    key: 1,
    name: "Pound",
  },
  {
    id: 2,
    image: "/DribbleTree2.webp",
    key: 2,
    name: "Cross",
  },
  {
    id: 3,
    image: "/DribbleTree3.webp",
    key: 3,
    name: "In + Out",
  },
  {
    id: 4,
    image: "/DribbleTree4.webp",
    key: 4,
    name: "Between The Legs",
  },
  {
    id: 5,
    image: "/DribbleTree5.webp",
    key: 5,
    name: "Behind The Back",
  },
  {
    id: 6,
    image: "/DribbleTree6.webp",
    key: 6,
    name: "Spin",
  },
]

export default function CourtDropdown({ onClose, coordinates }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null) // Ref for the dropdown div

  const positionStyle = { left: `${coordinates.x}px`, top: `${coordinates.y}px` }
  const onSelectOption = (id: number) => () => {
    console.log(id)
    onClose()
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={dropdownRef}
      className="background-dark-foreground absolute z-10 flex w-max -translate-x-1/2 items-center gap-2 rounded-sm bg-background-dark px-4 py-3"
      style={positionStyle}
    >
      {options.map((option) => (
        <Image
          key={option.id}
          src={option.image}
          alt={option.name}
          width={50}
          height={65}
          className="cursor-pointer"
          onClick={onSelectOption(option.id)}
        />
      ))}
    </div>
  )
}
