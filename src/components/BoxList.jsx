import React from 'react'
import Box from './Box'
import { inject, observer } from 'mobx-react'

const BoxList = inject('store')(observer(({store}) => (
  <div style={{
    border: '1px dashed #EFEFEF',
    padding: 10
  }}>
    {
      store.boxList.map( box => (<Box key={box.id} id={box.id} box={box}/>))
    }
    <div style={{clear: 'both'}}></div>
  </div>
)))

export default BoxList