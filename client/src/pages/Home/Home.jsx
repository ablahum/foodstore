import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { getAll } from '../../apis/tags'
import { getSpecific } from '../../apis/products'
import { addItem } from '../../app/cart/actions'
import { changeAll, changePage } from '../../app/pagination/actions'
import { Heading, Pagination, Tag, Product } from '../../components'

import { clearItems } from '../../app/cart/actions'

const Home = () => {
  const { userId } = useSelector((state) => state.user)
  const { categoryKey, searchKey, tags } = useSelector((state) => state.filter)
  const { page, perPage } = useSelector((state) => state.pagination)

  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [tagsData, setTagsData] = useState([])
  const [isNotification, setIsNotification] = useState(false)

  const dispatch = useDispatch()

  const getTags = async () => {
    try {
      const res = await getAll()

      setTagsData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const setCart = async (product) => {
    setIsNotification(true)
    dispatch(addItem(product, userId))
  }

  const getProductByParams = async (params) => {
    try {
      const res = await getSpecific(params)

      setProducts(res.data.products)
      dispatch(
        changeAll({
          totalItems: res.data.total,
          page: res.data.pagination.page,
          perPage: res.data.pagination.perPage
        })
      )
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const buildParams = () => {
    const params = new URLSearchParams()
    params.append('page', page)
    params.append('perPage', perPage)

    // search by category
    if (categoryKey) {
      params.append('category', categoryKey)
    }

    // search by search key
    if (searchKey) {
      params.append('q', searchKey)
    }

    // search by tags
    tags.forEach((tag) => params.append('tags[]', tag))

    return params.toString()
  }

  useEffect(() => {
    getTags()
  }, [])

  useEffect(() => {
    getProductByParams(`?${buildParams()}`)
  }, [page])

  useEffect(() => {
    setIsLoading(true)

    dispatch(changePage(1))
  }, [categoryKey, searchKey, tags])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Heading title='our menus' />

      <Container className='py-md-5 py-4'>
        <Tag
          tagsData={tagsData}
          isHome
        />

        {isLoading ? (
          <div className='text-center mt-5'>
            <Spinner animation='border' />
          </div>
        ) : products.length === 0 ? (
          <h5 className='text-center fw-bold'>No data found.</h5>
        ) : (
          <>
            <Product
              products={products}
              setCart={setCart}
              isNotification={isNotification}
              setIsNotification={setIsNotification}
            />

            <Pagination />
          </>
        )}
      </Container>
    </div>
  )
}

export default Home
