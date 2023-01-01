import React from 'react'
import Button from '../UI/Button'

const buttonStyle = { backgroundColor: '#3C47E9' }
export default function Search() {
  return (
    <div>
      <input type="text" />
      <Button extraStyles={buttonStyle}>Search</Button>
    </div>
  )
}
