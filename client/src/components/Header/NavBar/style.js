import { Button, Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

const { Toggle, Item } = Dropdown

export const CartBtn = styled(Button)`
  background-color: #f8f9fa;
  padding: 0.5em;
  border: none;
  position: relative;

  :hover {
    background-color: #fd9843;
  }
`

export const Counter = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  background-color: red;
  padding: 0 6px;
  border-radius: 100%;
  position: absolute;
  top: 0;
  right: 0;
`

export const ProfileBtn = styled(Toggle)`
  background-color: #f8f9fa;
  padding: 0.5em;
  border: none;
  list-style: none;
  margin-left: 0.3em;

  :hover {
    background-color: #fd9843;
  }

  ::after {
    display: none !important;
  }
`

export const MyProfile = styled(Item)`
  :hover {
    color: #fff;
    background-color: #fd7e14;
  }

  :active {
    font-weight: 500;
    color: #000;
    background-color: #fd9843;
  }
`

export const Logout = styled(Item)`
  color: #fff;
  background-color: #dc3545;

  :hover {
    color: #fff;
    background-color: #b52b39;
  }

  :active {
    font-weight: 500;
    color: #000;
    background-color: #fd9843;
  }
`
