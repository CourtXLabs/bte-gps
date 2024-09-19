const calculateTickStep = (maxValue: number): number => {
  if (maxValue <= 50) return 5
  if (maxValue <= 100) return 10
  if (maxValue <= 500) return 25
  if (maxValue <= 1000) return 50
  return 100
}

export default calculateTickStep
