import React from 'react'
import Button from './UI/Button'
import '../sass/modal.scss'

export default function Modal({ children, eventlisteners, show }) {
  window.scrollTo(0, 0)
  return (
    <div className="modal">
      <div className="modal__backdrop"></div>
      <div className="modal__content">
        <p>{children}</p>
        {show && (
          <Button
            extraStyles={{ backgroundColor: '#6E707A' }}
            onClick={eventlisteners?.[0]}
          >
            Don't show again
          </Button>
        )}
        <Button
          extraStyles={{ backgroundColor: '#3C47E9' }}
          onClick={eventlisteners?.[1]}
        >
          OK
        </Button>
      </div>
    </div>
  )
}
