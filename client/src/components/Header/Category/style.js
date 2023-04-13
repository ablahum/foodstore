import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

const { Toggle } = Dropdown

export const Btn = styled(Toggle)`
  color: #fff;
  font-weight: 500;
  margin: 0 0.5em;
  border: none;

  &:before {
    content: '|';
    margin-right: 0.5em;
  }

  @media screen and (max-width: 767px) {
    margin-left: 0;
  }

  @media screen and (max-width: 425px) {
    display: none;
  }
`

export const BtnSm = styled(Toggle)`
  color: #fff;
  font-weight: 500;
  margin: 0;
  border: none;
  display: none;

  @media screen and (max-width: 425px) {
    display: inline;

    &:after {
      display: none;
    }
  }
`

export const Item = styled(Dropdown.Item)`
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
