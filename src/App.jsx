import React from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DefaultBox from './components/DefaultBox'
import BoxList from './components/BoxList'
import AddItem from './components/AddItem'
import AddBox from './components/AddBox'

const App = () => (
  <div>
    <AddItem />
    <DefaultBox />
    <AddBox />
    <BoxList />
  </div>
)

export default DragDropContext(HTML5Backend)(App)