import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import { Heading, Pagination, Tags, Product } from '../../components'
import { Wrapper, Top } from './style'
import { getAll } from '../../apis/tags'

const Home = () => {
  const [tags, setTags] = useState([])

  const getTags = async () => {
    try {
      const res = await getAll()

      setTags(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <Wrapper>
      <Heading title='OUR MENUS' />

      <Container className='py-5'>
        <Top>
          <Pagination />

          <Tags tags={tags} />
        </Top>

        <Product />
      </Container>
    </Wrapper>
  )
}

export default Home
