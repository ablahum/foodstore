import { ToggleButton } from 'react-bootstrap'
import styled from 'styled-components'

export const Button = styled(ToggleButton)`
  color: #fff;
  background-color: #1c1f23;
  font-size: 1rem;
  border: none;
  padding: 0 2em;

  @media screen and (max-width: 767px) {
    padding: 0 0.8em;
  }
`
