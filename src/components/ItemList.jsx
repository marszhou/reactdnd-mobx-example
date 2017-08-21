import React from 'react'
import Item from './Item'

const ItemList = ({items}) => (
  <div>
  {
    items.map( item => (
      <Item
        key={item.id}
        item={item}
        id={item.id}
      />))
  }
  </div>
)

export default ItemList