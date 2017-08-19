export const move = (list, fromIndex, toIndex) => {
  const placeholder = -1
  const listCopy = list.slice()
  const [target] = listCopy.splice(fromIndex, 1, placeholder)
  listCopy.splice(toIndex, 0, target)
  return listCopy.filter(item => item !== placeholder)
}

export const deleteFromMap = (id, map) => {
  return Object
    .keys(map)
    .reduce((next, _id) => {
      if (id !== _id) {
        next[id] = map[id]
      }
      return next
    }, {})
}

export const deleteFromArray = (id, arr) => {
  return arr.filter(_id => id!==_id)
}