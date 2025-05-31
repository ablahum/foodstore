import React from 'react'
import { Navbar } from 'react-bootstrap'

const BrandLogo = ({ navigate }) => (
  <Navbar.Brand
    onClick={() => navigate('/')}
    className='d-none d-sm-inline fw-bold fs-3 text-uppercase'
    style={{
      fontFamily: 'var(--serif)',
      letterSpacing: '-2px',
      cursor: 'pointer'
    }}
  >
    food
    <span
      className='fst-italic fw-normal'
      style={{
        fontFamily: 'var(--serif)'
      }}
    >
      store
    </span>
  </Navbar.Brand>
)
export default BrandLogo
