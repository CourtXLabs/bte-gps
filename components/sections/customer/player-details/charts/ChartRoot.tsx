import { Card, CardHeader } from "@/components/ui/card"

interface Props {
  title: string
  subtitle: string
  children: React.ReactNode
}

export default function ChartRoot({ title, subtitle, children }: Props) {
  return (
    <Card className="w-full flex-1">
      <CardHeader className="mx-6 border-b border-[#E7EAEE] border-opacity-50 px-0">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm">{subtitle}</p>
      </CardHeader>
      {children}
    </Card>
  )
}
