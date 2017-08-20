import { v4 } from 'node-uuid'
import { observable, computed, action } from 'mobx'
import { move, deleteFromArray } from './common'

class Box {
  @observable id
  @observable fixed
  @observable itemIds

  constructor(root, isDefault, fixed = false /* 固定box，不可删除，不可移动 */) {
    this.root = root
    this.fixed = fixed
    this.id = isDefault ? 'default' : v4()
    this.itemIds = []
  }

  @action
  addItem(itemId) {
    if (this.itemIds.indexOf(itemId) === -1) {
      this.itemIds.push(itemId)
    }
  }

  @computed get itemList() {
    return this.itemIds.map(itemId => this.root.items[itemId])
  }

  @action
  removeAllItems() {
    const oldItemIds = this.itemIds
    this.itemIds = []
    return oldItemIds
  }

  @action
  removeItem(itemId) {
    this.itemIds = deleteFromArray(itemId, this.itemIds)
  }

  @action
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