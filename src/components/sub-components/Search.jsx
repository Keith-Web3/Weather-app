import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import Button from '../UI/Button'
import '../../sass/sub-components/search.scss'
import searchIcon from '../../assets/search.svg'
import { currentData } from '../../store/CurrentPosition'
import Modal from '../Modal'

const buttonStyle = { backgroundColor: '#3C47E9' }
export default function Search({ placeholder }) {
  const ctx = useContext(currentData)
  const [input, setInput] = useState('')
  const reference = useRef(document.getElementById('search'))
  const [showWarning, setShowWarning] = useState(false)
  document.body.style.overflowY = showWarning ? 'hidden' : 'unset'
  document.querySelector('html').style.overflowY = showWarning
    ? 'hidden'
    : 'unset'
  function handleChange(e) {
    setInput(e.target.value)
  }
  function submitLocation(e) {
    if (e.key !== 'Enter') return
    ctx.updateInputLocation(e.target.value.match(/[a-z]+/gi))
  }
  function handleFocus1() {
    setShowWarning(prevVal => !prevVal)
    reference.current.focus()
  }
  function handleFocus2() {
    handleFocus1()
    localStorage.setItem('warning', JSON.stringify(false))
  }
  useEffect(() => {
    localStorage.setItem('warning', JSON.stringify(true))
  }, [])
  return (
    <div className="search">
      <label htmlFor="search">
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder={placeholder}
          id="search"
          onKeyDown={submitLocation}
          onChange={handleChange}
          ref={reference}
          onClick={
            JSON.parse(localStorage.getItem('warning'))
              ? handleFocus1
              : undefined
          }
        />
      </label>
      <Button
        extraStyles={buttonStyle}
        onClick={ctx.updateInputLocation(input.match(/[a-z]+/gi))}
      >
        Search
      </Button>
      {showWarning &&
        ReactDOM.createPortal(
          <Modal eventlisteners={[handleFocus2, handleFocus1]} show={true}>
            Input location in "'state' 'country-code'" format e.g 'paris fr' or
            'lagos ng' e.t.c
          </Modal>,
          document.getElementById('modal-root')
        )}
    </div>
  )
}
