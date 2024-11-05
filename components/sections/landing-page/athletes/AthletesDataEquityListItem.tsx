interface Props {
  number: string
  title: string
  description: string
}

export default function AthletesDataEquityListItem({ number, title, description }: Props) {
  return (
    <div>
      <p className="text-5xl font-bold">{number}</p>
      <h3 className="pt-1 text-lg font-medium">{title}</h3>
      <p>{description}</p>
    </div>
  )
}
