const reorder = (items, dragId, newIndex) => {
  const result = [...items]
  const fromIndex = result.findIndex((item) => item.id === dragId)
  const element = result.splice(fromIndex, 1)[0]
  result.splice(newIndex, 0, element)
  return result
}

module.exports = reorder
