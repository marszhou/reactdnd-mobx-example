import React from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DefaultBox from './components/DefaultBox'
import BoxList from './components/BoxList'

const App = () => (
  <div>
    app
    <DefaultBox />
    <BoxList />
  </div>
)

export default DragDropContext(HTML5Backend)(App)