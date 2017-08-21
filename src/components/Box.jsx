import React from 'react'
import cx from 'classnames'
import {findDOMNode} from 'react-dom'
import { observer, inject } from 'mobx-react'
import { DragSource, DropTarget } from 'react-dnd';
import ItemList from './ItemList'
import types from '../Consts'

let Box = (
  observer(({store, id, box, connectDragSource, connectDropTarget, connectDropItemTarget, isDragging, canDrop}) => {
    const items = box.itemList.slice()
    const classnames = {
      fixedBox: box.fixed,
      box: !box.fixed,
      canDrop: canDrop && store.draggingBoxId !== id
    }
    const style = {
      opacity: isDragging ? 0 : 1
    }
    return connectDropItemTarget(connectDropTarget(connectDragSource(
      <div className={cx(classnames)} style={style}>
        {
          box.fixed ? null : (
            <div
              className='boxDragHandler'
              onMouseDown={() => store.setDraggingBoxId(id)}
              onMouseUp={() => store.setDraggingBoxId(null)}
            >
              Drag handler
            </div>
          )
        }
        <ItemList items={items}/>
      </div>
    )))
  })
)

const boxSource = {
  canDrag(props, monitor) {
    const { store, id } = props
    return !props.box.fixed && store.draggingBoxId === id
  },

  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    const {id, store} = props
    const index = store.getBoxIndex(id)
    return {id, originalIndex: index};
  },

  endDrag(props, monitor, component) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const { store } = props
    const didDrop = monitor.didDrop();
    // const dropResult = monitor.getDropResult()
    store.setDraggingBoxId(null)

    if (!didDrop) {
      store.moveBoxById(droppedId, originalIndex)
    }
  }
}
Box = DragSource(
  types.BOX,
  boxSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Box)

const boxTarget = {
  canDrop(props, monitor) {
    return !props.box.fixed
  },

  hover(props, monitor, component) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId, store } = props;
    if (draggedId !== overId) {
      const overIndex = store.getBoxIndex(overId)
      store.moveBoxById(draggedId, overIndex)
    }
  }
}
Box = DropTarget(
  types.BOX,
  boxTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  })
)(Box)

const itemTarget = {
  canDrop() {
    return true
  },
  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    const { id: fromItemId } = monitor.getItem();
    const { store, id: toBoxId } = props
    store.moveItem(fromItemId, toBoxId)

    // return { dropInBox: true };
  }
}
Box = DropTarget(
  types.ITEM,
  itemTarget,
  (connect, monitor)=> ({
    connectDropItemTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  })
)(Box)

Box = inject('store')(Box)

export default Box