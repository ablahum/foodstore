import { Container } from 'react-bootstrap'

import { Wrapper, Title } from './style'

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
