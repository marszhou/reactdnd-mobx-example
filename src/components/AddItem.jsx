import React from 'react'
import { inject } from 'mobx-react'

const AddItem = inject('store')(({store}) => {
  let input

  return (
    <form
      style={{
        border: '1px solid #EFEFEF',
        marginBottom: 10,
        padding: 10
      }}
      onSubmit={ e => {
        e.preventDefault()
        const text = input.value.trim()
        if (text.length > 0) {
          store.createItem(text)
        }
        input.value = ''
      }}
    >
      <input type='text' ref={node => input = node} />
      <button >Add</button>
    </form>
  )
})

export default AddItem