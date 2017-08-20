import React from 'react'
import { observer } from 'mobx-react'
import ItemList from './ItemList'

const style = {
  display: 'inline-block',
  maxWidth: 500,
  minWidth: 200,
  minHeight: 200,
  background: 'gainsboro',
  padding: 5,
  margin: 5
}

const fixedStyle = {
  // border: '5px solid gray',
  minHeight: 200,
  border: '10px dotted gray',
  marginBottom: 10,
  padding: 5
}

const Box = observer(({box}) => {
  const items = box.itemList.slice()

  return (
    <div style={box.fixed ? fixedStyle : style}>
      <ItemList items={items}/>
    </div>
  )
})

export default Box