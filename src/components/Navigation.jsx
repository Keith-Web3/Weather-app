import React from 'react'
import closeImg from '../assets/close.svg'
import Search from './sub-components/Search'
import '../sass/navigation.scss'

export default function Navigation({ handleShowNav, showNav }) {
  return (
    <div className="navigation" style={{ display: showNav[0] }}>
      <img src={closeImg} alt="close" onClick={handleShowNav} />
      <Search placeholder={'search location'} />
    </div>
  )
}
