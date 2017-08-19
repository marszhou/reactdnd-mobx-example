import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Store from './stores/Store'
import { Provider } from 'mobx-react'

const store = new Store()
store.createItem('A')
store.createItem('B')
store.createItem('C')
store.createItem('D')
window.store = store

ReactDOM.render(
  (
    <Provider store={store}>
      <App/>
    </Provider>
  ),
  document.getElementById('root')
)