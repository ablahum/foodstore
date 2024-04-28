import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

import { Heading, Pagination, Tag, Product } from '../../components'
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
    <>
      <Heading title='our menus' />

      <Container className='py-md-5 py-4'>
        <Tag tags={tags} />

        <Product />

        <Pagination />
      </Container>
    </>
  )
}

export default Home
