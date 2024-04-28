import { Container } from 'react-bootstrap'

import { Wrapper, Title } from './style'

// export const Title = styled.h1`
//   font-size: 6rem;
//   font-family: var(--serif);
//   letter-spacing: 2rem;
//   margin: 0;
//   text-transform: uppercase;

//   @media screen and (max-width: 991px) {
//     text-align: center;
//     letter-spacing: 1rem;
//   }

//   @media screen and (max-width: 767px) {
//     font-size: 4rem;
//     letter-spacing: 0.5rem;
//   }

//   @media screen and (max-width: 576px) {
//     font-size: 3rem;
//     letter-spacing: 0.3rem;
//   }
// `

const Heading = ({ title }) => {
  return (
    <Wrapper>
      <Container>
        <Title>{title}</Title>
      </Container>
    </Wrapper>
  )
}

export default Heading
