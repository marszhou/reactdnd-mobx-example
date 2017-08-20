import React from 'react'
import { inject } from 'mobx-react'

const AddBox = inject('store')(({store}) => (
  <button
    style={{marginBottom: 10}}
    onClick={() => store.createBox()}
  >
    +
  </button>
))

export default AddBox