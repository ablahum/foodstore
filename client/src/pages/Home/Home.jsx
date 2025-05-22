import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

import { getAll } from '../../apis/tags'
import { getSpecific } from '../../apis/products'
import { addItem } from '../../app/cart/actions'
import { changeAll, changePage } from '../../app/pagination/action'
import { Heading, Pagination, Tag, Product } from '../../components'

const Home = () => {
  let globalState = useSelector((state) => state.my)
  const { page, perPage } = useSelector((state) => state.pagination)

  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [isNotification, setIsNotification] = useState(false)
  const [tags, setTags] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getTags = async () => {
    try {
      const res = await getAll()

      setTags(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // login validation
  const loginAlert = () => {
    alert('Please login first')
    navigate('/login')
  }

  const setCart = async (product) => {
    setIsNotification(true)
    await dispatch(addItem(product))
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
    if (globalState.categoryKey) {
      params.append('category', globalState.categoryKey)
    }

    // search by search key
    if (globalState.searchKey) {
      params.append('q', globalState.searchKey)
    }

    // search by tags
    globalState.tags.forEach((tag) => params.append('tags[]', tag))

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
  }, [globalState.categoryKey, globalState.searchKey, globalState.tags])

  return (
    <div style={{ minHeight: '100vh' }}>
      <Heading title='our menus' />

      <Container className='py-md-5 py-4'>
        <Tag
          tags={tags}
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
              loginAlert={loginAlert}
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
