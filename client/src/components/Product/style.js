import styled from 'styled-components'
import { Card, Button } from 'react-bootstrap'

export const Body = styled(Card)`
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  padding: 0.5em;
`

export const CardImg = styled(Card.Img)`
  @media (max-width: 767px) {
    width: 75%;
    margin: 0 auto;
  }
`

export const TagLabel = styled.h6`
  color: #fff;
  background-color: rgba(28, 31, 35, 0.4);
  font-size: 0.8em;
  display: inline;
  padding: 0.1em 0.8em;
  border-radius: 10px;
`

export const CartButton = styled(Button)`
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
`
