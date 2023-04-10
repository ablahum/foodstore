import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import { Heading, Pagination, Tags, Product } from '../../components'
import { Wrapper, TopBar } from './style'
import { getAll } from '../../apis/tags'

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
