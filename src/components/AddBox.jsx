import React from 'react'
import { inject } from 'mobx-react'

const AddBox = inject('store')(({store}) => (
  <span
    style={{
      fontSize: 40,
      color: 'white',
      background: 'black',
      border: '1px dashed white',
      display: 'inline-block',
      width: 50,
      height: 50,
      lineHeight: '50px',
      textAlign: 'center',
      marginBottom: 10
    }}
    onClick={() => store.createBox()}
  >
    +
  </span>
))

export default AddBox