import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100vh;
`

export const Summary = styled.div`
  padding: 0.5em;
  margin-right: 1.5em;
  width: 50%;
  max-height: 52.5vh;
  overflow: auto;

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-right: 0em;
    margin-bottom: 1em;
  }
`

export const Data = styled.div`
  width: 50%;
  padding: 0.5em;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

export const Total = styled.div`
  width: 50%;
  margin-right: 1em;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1em;
  }
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

export const Back = styled(Button)`
  width: 40%;
  background-color: transparent;
  color: var(--black);
  font-weight: 600;
  margin-right: 1em;
  text-transform: uppercase;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

export const Next = styled(Button)`
  width: 60%;
  color: var(--white);
  font-weight: 600;
  border: none;
  text-transform: uppercase;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`
