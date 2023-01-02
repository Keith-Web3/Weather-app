import React, { useContext } from 'react'
import Button from '../UI/Button'
import locationImg from '../../assets/location-crosshairs-solid.svg'
import '../../sass/sub-components/header.scss'
import { currentData } from '../../store/CurrentPosition'

const buttonStyles = {
  backgroundColor: '#6E707A',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
}
const imgButtonStyles = {
  backgroundColor: 'rgba(110, 112, 122, 0.3)',
  aspectRatio: '1 / 1',
  borderRadius: '50%',
  padding: '0.4em',
}

export default function Header({ handleShowNav }) {
  const ctx = useContext(currentData)
  return (
    <div className="header">
      <Button extraStyles={buttonStyles} onClick={handleShowNav}>
        Search for places
      </Button>
      <Button extraStyles={imgButtonStyles} onClick={ctx.reRender}>
        <img src={locationImg} alt="location" />
      </Button>
    </div>
  )
}
