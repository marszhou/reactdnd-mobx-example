import React from 'react'

const Item = ({item}) => (
  <div style={{
    display: 'inline-block',
    fontSize: 24,
    fontWeight: 'bold',
    border: '1px solid black',
    borderRadius: '50%',
    background: 'orange',
    textAlign: 'center',
    lineHeight: '1.5em',
    minWidth: 50,
    height: '1.5em',
    color: 'white',
    margin: 5,
    padding: 5
  }}>
    {item.name}
  </div>
)

export default Item