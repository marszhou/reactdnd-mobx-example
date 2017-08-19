import { v4 } from 'node-uuid'
import { move, deleteFromArray } from './common'

class Box {
  constructor(root, isDefault, fixed = false /* 固定box，不可删除，不可移动 */) {
    this.root = root
    this.fixed = fixed
    this.id = isDefault ? 'default' : v4()
    this.itemIds = []
  }

  addItem(itemId) {
    if (this.itemIds.indexOf(itemId) === -1) {
      this.itemIds.push(itemId)
    }
  }

  get itemList() {
    return this.itemIds.map(itemId => this.root.items[itemId])
  }

  removeAllItems() {
    const oldItemIds = this.itemIds
    this.itemIds = []
    return oldItemIds
  }

  removeItem(itemId) {
    this.itemIds = deleteFromArray(itemId, this.itemIds)
  }

  moveItem(fromIndex, toIndex) {
    this.itemIds = move(this.itemIds, fromIndex, toIndex)
  }

  toJS() {
    return {
      id: this.id,
      items: this.itemList.map(item => item.toJS())
    }
  }
}

export default Box