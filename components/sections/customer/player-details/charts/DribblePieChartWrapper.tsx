interface Props {
  children: React.ReactNode
  title: string
  subtitle: string
}

export default function DribblePieChartWrapper({ children, title, subtitle }: Props) {
  return (
    <div className="w-full">
      <div className="border-b border-[#E7EAEE] border-opacity-50 pb-6">
        <div className="space-y-1.5">
          <p className="text-lg font-bold">{title}</p>
          <p className="text-sm">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
