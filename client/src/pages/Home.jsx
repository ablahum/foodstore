import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { Heading, Pagination, Tags, Product } from '../components'
import { getAll } from '../apis/tag'

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
  const [tags, setTags] = useState([])

  const getTags = async () => {
    const res = await getAll()

    setTags(res.data)
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <Wrapper>
      <Heading title='OUR MENUS' />

      <Container className='py-5'>
        <TopBar>
          <Pagination />

          <Tags tags={tags} />
        </TopBar>

        <Product />
      </Container>
    </Wrapper>
  )
}

export default Home
