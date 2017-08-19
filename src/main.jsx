import Store from './stores/Store'

const store = new Store()
store.createItem('A')
store.createItem('B')
store.createItem('C')
store.createItem('D')
window.store = store