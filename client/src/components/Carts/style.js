import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const Active = {
  right: '0',
}

export const Disable = {
  right: '-160%',
}

export const Wrapper = styled.div`
  z-index: 999;
  min-width: 40%;
  height: 100vh;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  transition: 350ms;
  box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);

  @media screen and (max-width: 991px) {
    min-width: 50%;
    max-width: 60%;
  }

  @media screen and (max-width: 767px) {
    min-width: 70%;
    max-width: 80%;
  }

  @media screen and (max-width: 575px) {
    max-width: 100%;
  }

  @media screen and (max-width: 425px) {
    min-width: 100%;
  }
`

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
