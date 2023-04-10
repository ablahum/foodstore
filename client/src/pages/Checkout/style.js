import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const Main = styled.div`
  background-color: #fff;
  height: 85vh;
`

export const Summary = styled.div`
  padding: 1em;
  width: 50%;
  max-height: 450px;
  overflow: auto;
`

export const Total = styled.div`
  width: 50%;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
`

export const Next = styled(Button)`
  width: 100%;
  color: #fff;
  font-weight: 600;
  border: none;
`
