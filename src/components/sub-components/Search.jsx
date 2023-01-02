import React from 'react'
import Button from '../UI/Button'
import '../../sass/sub-components/search.scss'
import searchIcon from '../../assets/search.svg'

const buttonStyle = { backgroundColor: '#3C47E9' }
export default function Search({ placeholder }) {
  return (
    <div className="search">
      <label htmlFor="search">
        <img src={searchIcon} alt="search" />
        <input type="text" placeholder={placeholder} id={'search'} />
      </label>
      <Button extraStyles={buttonStyle}>Search</Button>
    </div>
  )
}
