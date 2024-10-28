import React from "react"

interface MenuIconProps extends React.SVGProps<SVGSVGElement> {
  strokeWidth?: number
  strokeColor?: string
}

export default function MenuIcon({
  width = 24,
  height = 24,
  strokeWidth = 2,
  strokeColor = "black",
  className,
  ...props
}: MenuIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <g>
        <path d="M4 6H20" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M7 12H20"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 18H20"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
