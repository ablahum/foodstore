import { Navbar } from 'react-bootstrap'
import styled from 'styled-components'

const { Brand } = Navbar

export const Wrapper = styled(Navbar)`
  box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);
  position: sticky;
  top: 0;
  z-index: 999;
`

export const Brand1 = styled(Brand)`
  font-family: var(--serif);
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.13rem;
  margin-right: 2rem;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    display: none;
  }
`

export const Brand2 = styled.span`
  font-family: inherit;
  font-weight: 500;
  font-style: italic;
`
