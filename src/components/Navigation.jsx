import React from 'react'
import closeImg from '../assets/close.svg'
import Search from './sub-components/Search'
import '../sass/navigation.scss'

export default function Navigation({ handleShowNav }) {
  return (
    <div className="navigation">
      <img src={closeImg} alt="close" onClick={handleShowNav} />
      <Search placeholder={'search location'} />
    </div>
  )
}
