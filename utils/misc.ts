export const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(2)
}

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" }
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, options)
}
