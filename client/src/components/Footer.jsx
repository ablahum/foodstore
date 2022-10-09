import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  box-shadow: 0 0 25px -15px rgba(0, 0, 0, 1);

  text-align: center;
  padding: 1.5em 0;
`

const Footer = () => {
  return (
    <Wrapper>
      Made with 🧡 by <span className='fw-bold'>ablahum</span> in 2022
    </Wrapper>
  )
}

export default Footer
