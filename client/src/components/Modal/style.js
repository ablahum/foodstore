import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export const Popup = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`

export const Wrapper = styled.div`
  width: 40em;
  border-radius: 10px;
  padding: 2em;
  background-color: #fff;
  box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);
  position: relative;
  display: flex;
  flex-direction: column;
`

export const Cancel = styled(Button)`
  width: 40%;
  background-color: transparent;
  font-weight: 600;
  margin-right: 1em;
`

export const Confirm = styled(Button)`
  width: 60%;
  color: #fff;
  font-weight: 600;
  border: none;
`

export const TableBox = styled.div`
  max-height: 450px;
  overflow: auto;
`
