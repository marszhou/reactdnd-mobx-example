import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Store from './stores/Store'
import { Provider } from 'mobx-react'

const store = new Store()
const itemA = store.createItem('A')
const itemB = store.createItem('B')
store.createItem('C')
store.createItem('D')
store.createBox()
store.createBox()
const box3 = store.createBox()
const box4 = store.createBox()
store.moveItem(itemA.id, box4.id)
store.moveItem(itemB.id, box3.id)
window.store = store

ReactDOM.render(
  (
    <Provider store={store}>
      <App/>
    </Provider>
  ),
  document.getElementById('root')
)