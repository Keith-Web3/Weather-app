import React, { useContext, useRef } from 'react'
import Button from '../UI/Button'
import '../../sass/sub-components/search.scss'
import searchIcon from '../../assets/search.svg'
import { currentData } from '../../store/CurrentPosition'

const buttonStyle = { backgroundColor: '#3C47E9' }
export default function Search({ placeholder }) {
  const ctx = useContext(currentData)
  const input = useRef()
  function submitLocation(e) {
    if (e.key !== 'Enter') return
    console.log(e.target.value.split(' '))
    ctx.updateInputLocation(e.target.value.split(' '))
  }
  return (
    <div className="search">
      <label htmlFor="search">
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder={placeholder}
          id="search"
          ref={input}
          onKeyDown={submitLocation}
        />
      </label>
      <Button
        extraStyles={buttonStyle}
        onClick={ctx.updateInputLocation(input.current?.value.split(' '))}
      >
        Search
      </Button>
    </div>
  )
}
