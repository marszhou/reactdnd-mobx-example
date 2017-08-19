import { v4 } from 'node-uuid'

class Item {
  constructor(root, name) {
    this.root = root
    this.id = v4()
    this.name = name
  }

  toJS() {
    return {
      id: this.id,
      name: this.name
    }
  }
}

export default Item