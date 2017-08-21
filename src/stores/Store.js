import { observable, computed, action } from 'mobx'
import Item from './Item'
import Box from './Box'
import {
  move,
  deleteFromMap,
  deleteFromArray
} from './common'

class Store {
  @observable items = {} // 所有已有item
  @observable boxes = {} // 所有已有box，不含default
  @observable boxIds = [] // 不含default的box排序序列
  @observable defaultBox = null

  constructor() {
    // init defaultBox
    this.defaultBox = this.createBox(true)
  }

  getBoxIndex(boxId) {
    return this.boxIds.indexOf(boxId)
  }

  getItemNestInfo(itemId) {
    let box = this.findItemBox(itemId)
    if (box) {
      const boxId = box.id
      const index = box.itemIndexOf(itemId)
      return {
        boxId,
        index
      }
    }
  }

  @observable draggingBoxId = null
  @action
  setDraggingBoxId(id) {
    this.draggingBoxId = id
  }

  @action
  createItem(name) {
    const item = new Item(this, name)
    this.items[item.id] = item
    this.defaultBox.addItem(item.id)
    return item
  }

  @action
  deleteItem(itemId) {
    Object.values(this.getBoxes()).forEach(box => box.removeItem(itemId))
    this.items = deleteFromMap(itemId, this.items)
  }

  getBoxes(includeDefault = true) {
    return includeDefault ? {default: this.defaultBox, ...this.boxes} : this.boxes
  }

  @action
  createBox(isDefault = false) {
    const box = new Box(this, isDefault, isDefault?true:false)
    if (!isDefault) {
      this.boxes[box.id] = box
      this.boxIds.push(box.id)
    }
    return box
  }

  @action
  deleteBox(boxId) {
    this.boxIds = deleteFromArray(boxId, this.boxIds)
    this.boxes = deleteFromMap(boxId, this.boxes)
  }

  @computed get boxList() {
    return this.boxIds.map(boxId => this.boxes[boxId])
  }

  moveBoxById(boxId, toIndex) {
    const fromIndex = this.getBoxIndex(boxId)
    return this.moveBox(fromIndex, toIndex)
  }

  @action
  moveBox(fromIndex, toIndex) {
    this.boxIds = move(this.boxIds, fromIndex, toIndex + (fromIndex < toIndex ? 1 : 0))
  }

  findItemBox(itemId) {
    return Object.values(this.getBoxes()).find(box => box.containsItem(itemId))
  }

  moveItemById(itemId, toBoxId, toIndex) {
    const {boxId: fromBoxId} = this.getItemNestInfo(itemId)
    if (fromBoxId!==toBoxId) {
      this.moveItem(itemId, toBoxId)
    }
    const toBox = this.getBoxes()[toBoxId]
    toBox.moveItemById(itemId, toIndex)
  }

  moveItem(itemId, toBoxId) {
    const box = this.findItemBox(itemId)
    if (box) {
      this.moveItemBetweenBox(itemId, box.id, toBoxId)
    }
  }

  @action
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