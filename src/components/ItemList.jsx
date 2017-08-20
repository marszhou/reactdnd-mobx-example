import React from 'react'
import Item from './Item'

const ItemList = ({items}) => (
  <div>
  {
    items.map( item => (<Item key={item.id} item={item}/>))
  }
  </div>
)

export default ItemList