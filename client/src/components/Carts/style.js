import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const CartDisable = {
  zIndex: '999',
  minWidth: '30%',
  maxWidth: '550px',
  height: '100vh',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'fixed',
  top: '0',
  right: '-160%',
  bottom: '0',
  transition: '850ms',
  boxShadow: '0px 10px 50px -15px rgba(0, 0, 0, 1)',
}

export const CartActive = {
  zIndex: '999',
  minWidth: '30%',
  maxWidth: '550px',
  height: '100vh',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  transition: '350ms',
  boxShadow: '0px 10px 50px -15px rgba(0, 0, 0, 1)',
}

export const CloseBtn = styled(Button)`
  background-color: #f8f9fa;
  margin: 0;
  padding: 0.5rem;
  border: none;
  font-size: 1.5rem;

  :hover {
    background-color: var(--primary-light);
  }
`
