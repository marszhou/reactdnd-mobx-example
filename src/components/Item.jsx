import React from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import {findDOMNode} from 'react-dom'

const Item = ({id, item}) => (
  <div className='item'>
    {item.name}
  </div>
)

export default Item