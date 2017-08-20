import React from 'react'
import Box from '../components/Box'
import { inject } from 'mobx-react'

const DefaultBox = inject('store')(({store}) => {
  return (
    <Box box={store.defaultBox}/>
  )
})

export default DefaultBox