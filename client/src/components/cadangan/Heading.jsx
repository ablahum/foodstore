import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import bgHero from '../assets/banner-2.jpg'

const Wrapper = styled.div`
  color: #fff;
  height: 20em;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgHero});
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;
  box-shadow: 0px 5px 50px -15px rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    height: 15em;
  }

  @media (max-width: 425px) {
    display: none;
  }
`

const Title = styled.h1`
  font-size: 6rem;
  font-family: 'Noe Display', serif;
  font-weight: 500;
  letter-spacing: 2rem;

  @media (max-width: 767px) {
    font-size: 4rem;
  }
`

const Heading = (props) => {
  return (
    <Wrapper>
      <Container>
        <Title>{props.title}</Title>
      </Container>
    </Wrapper>
  )
}

export default Heading
