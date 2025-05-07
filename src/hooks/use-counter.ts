import { useState } from "react"

interface IUseCounterProps {
  initial: number
}

export const useCounter = ({ initial = 0 }: IUseCounterProps) => {
  const [count, setCount] = useState(initial)
  const increment = () => setCount((prev) => prev + 1)
  const reset = () => setCount(0)

  return { count, increment, reset }
}
