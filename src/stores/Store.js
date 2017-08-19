import Item from './Item'
import Box from './Box'
import {
  move,
  deleteFromMap,
  deleteFromArray
} from './common'

class Store {
  items = {} // 所有已有item
  boxes = {} // 所有已有box，不含default
  boxIds = [] // 不含default的box排序序列
  defaultBox = null

  constructor() {
    // init defaultBox
    this.defaultBox = this.createBox(true)
  }

  createItem(name) {
    const item = new Item(this, name)
    this.items[item.id] = item
    this.defaultBox.addItem(item.id)
    return item
  }

  deleteItem(itemId) {
    Object.values(this.getBoxes()).forEach(box => box.removeItem(itemId))
    this.items = deleteFromMap(itemId, this.items)
  }

  getBoxes(includeDefault = true) {
    return includeDefault ? {default: this.defaultBox, ...this.boxes} : this.boxes
  }

  createBox(isDefault = false) {
    const box = new Box(this, isDefault, isDefault?true:false)
    if (!isDefault) {
      this.boxes[box.id] = box
      this.boxIds.push(box.id)
    }
    return box
  }

  deleteBox(boxId) {
    this.boxIds = deleteFromArray(boxId, this.boxIds)
    this.boxes = deleteFromMap(boxId, this.boxes)
  }

  get boxList() {
    return this.boxIds.map(boxId => this.boxes[boxId])
  }

  moveBox(fromIndex, toIndex) {
    this.boxIds = move(this.boxIds, fromIndex, toIndex)
  }

  moveItemBetweenBox(itemId, fromBoxId, toBoxId) {
    const boxes = this.getBoxes()

    if (fromBoxId) {
      const boxA = boxes[fromBoxId]
      boxA.removeItem(itemId)
    } else {
      throw new Error('formBoxId not supply')
    }

    if (toBoxId) {
      const boxB = boxes[toBoxId]
      boxB.addItem(itemId)
    }
  }

  toJS() {
    return {
      items: Object.values(this.items).map(item => item.toJS()),
      defaultBox: this.defaultBox.toJS(),
      boxes: this.boxList.map(box => box.toJS())
    }
  }

  toJSON() {
    return JSON.stringify(this.toJS())
  }
}

export default Store