import { Button, Dropdown, Nav } from 'react-bootstrap'
import styled from 'styled-components'

const { Toggle, Item } = Dropdown

export const Wrapper = styled(Nav)`
  margin-left: 0.5em;

  @media screen and (max-width: 425px) {
    margin-left: 0;
  }
`

export const CartBtn = styled(Button)`
  background-color: #f8f9fa;
  padding: 0.5em;
  border: none;
  position: relative;

  :hover {
    background-color: var(--primary-light);
  }
`

export const Counter = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--white);
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
    background-color: var(--primary-light);
  }

  ::after {
    display: none !important;
  }
`

export const MyProfile = styled(Item)`
  :hover {
    color: var(--white);
    background-color: var(--primary);
  }

  :active {
    font-weight: 500;
    color: var(--black);
    background-color: var(--primary-light);
  }
`

export const Logout = styled(Item)`
  color: var(--white);
  background-color: #dc3545;

  :hover {
    color: var(--white);
    background-color: #b52b39;
  }

  :active {
    font-weight: 500;
    color: var(--black);
    background-color: var(--primary-light);
  }
`
