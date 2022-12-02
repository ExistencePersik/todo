import { ITodos } from "../models/models"

export const reorder = <T extends ITodos>(
  items: T[],
  id: string,
  newIndex: number
): T[] => {
  const result = items.slice()
  const fromIndex = result.findIndex((item) => item.id === id)
  const element = result.splice(fromIndex, 1)[0]
  result.splice(newIndex, 0, element)
  return result
}
