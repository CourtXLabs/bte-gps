import { useState } from "react"

const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)
  const onTrue = () => setValue(true)
  const onFalse = () => setValue(false)
  const onToggle = () => setValue((prev) => !prev)
  return { value, onTrue, onFalse, onToggle }
}

export default useBoolean
