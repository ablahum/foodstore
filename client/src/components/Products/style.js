import styled from 'styled-components'
import { Button } from 'react-bootstrap'

export const Wrapper = styled.div`
  overflow: auto;
  margin-bottom: 1em;
`

export const Detail = styled.div`
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Update = styled(Button)`
  background-color: transparent;
  font-weight: 600;
  align-self: center;
`

export const Delete = styled(Button)`
  background-color: transparent;
  font-weight: 600;
  align-self: center;
`
