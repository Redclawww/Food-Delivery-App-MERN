import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: '#F3F4F6',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%'
}

const OVERLAY_STYLES = {

  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}  />
      <div style={MODAL_STYLES} >
        <button className='btn bg-danger fs-4 fixed top-6 right-8 text-3xl bg-black p-2 px-5 text-white rounded-full ' onClick={onClose}>X</button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}