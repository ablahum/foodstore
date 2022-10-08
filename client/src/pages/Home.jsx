import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import { Heading, Pagination, Tags, Product } from '../components'

const Wrapper = styled.div`
  min-height: 100vh;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5em;
  margin-bottom: 0.5em;

  @media (max-width: 991px) {
    padding: 0;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`

const Home = () => {
  return (
    <Wrapper>
      <Heading title='OUR MENUS' />

      <Container className='py-5'>
        <TopBar>
          <Pagination />

          <Tags />
        </TopBar>

        <Product />
      </Container>
    </Wrapper>
  )
}

export default Home
