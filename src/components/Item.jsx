import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { inject } from 'mobx-react'
import {findDOMNode} from 'react-dom'
import types from '../Consts'

let Item = ({id, item, connectDragSource, connectDropTarget, isDragging}) => {
  const style = {
    opacity: isDragging ? 0 : 1
  }
  return connectDropTarget(connectDragSource(
    <div className='item' style={style}>
      {item.name}
    </div>
  ))
}

const itemSource = {
  beginDrag(props, monitor, component) {
    const {id, store} = props
    const nest = store.getItemNestInfo(id)
    return {id, originalNest: nest}
  },

  endDrag(props, monitor, component) {
    const { id: droppedId, originalNest } = monitor.getItem()
    const { store } = props
    const didDrop = monitor.didDrop()

    if (!didDrop) {
      store.moveItemById(droppedId, originalNest.boxId, originalNest.index)
    }
  }
}
Item = DragSource(
  types.ITEM,
  itemSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Item)

const itemTarget = {
  canDrop() {
    return true
  },

  hover(props, monitor, component) {
    const { id: draggedId } = monitor.getItem()
    const { id: overId, store } = props
    if (draggedId !== overId) {
      const overNest = store.getItemNestInfo(overId)
      store.moveItemById(draggedId, overNest.boxId, overNest.index)
    }
  }
}
Item = DropTarget(
  types.ITEM,
  itemTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  })
)(Item)

export default inject('store')(Item)