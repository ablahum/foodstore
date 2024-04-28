import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap'
import rupiah from 'rupiah-format'

import { addItem } from '../../app/cart/actions'
import { getAll, getSpecific } from '../../apis/products'
import { config } from '../../config'

const { Body, Img, Title, Text } = Card

const Product = () => {
  let globalState = useSelector((state) => state.my)

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getProducts = async () => {
    try {
      setLoading(true)
      const res = await getAll()

      setProducts(res.data.products)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const getProductByParams = async (params) => {
    try {
      setLoading(true)
      const res = await getSpecific(params)

      setProducts(res.data.products)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // search product by category
  useEffect(() => {
    getProductByParams(`?category=${globalState.categoryKey}`)
  }, [globalState.categoryKey])

  // search product by search
  useEffect(() => {
    getProductByParams(`?q=${globalState.searchKey}`)
  }, [globalState.searchKey])

  // pagination
  useEffect(() => {
    getProductByParams(`?page=${globalState.page}`)
  }, [globalState.page])

  // search product by tags
  useEffect(() => {
    let params = ''

    if (globalState.tags.length === 2) {
      params = `?tags[]=${globalState.tags[0]}&tags[]=${globalState.tags[1]}`
    } else if (globalState.tags.length === 3) {
      params = `?tags[]=${globalState.tags[0]}&tags[]=${globalState.tags[1]}&tags[]=${globalState.tags[2]}`
    } else if (globalState.tags.length === 4) {
      params = `?tags[]=${globalState.tags[0]}&tags[]=${globalState.tags[1]}&tags[]=${globalState.tags[2]}&tags[]=${globalState.tags[3]}`
    } else if (globalState.tags.length === 5) {
      params = `?tags[]=${globalState.tags[0]}&tags[]=${globalState.tags[1]}&tags[]=${globalState.tags[2]}&tags[]=${globalState.tags[3]}&tags[]=${globalState.tags[4]}`
    } else {
      params = `?tags[]=${globalState.tags}`
    }

    getProductByParams(params)
  }, [globalState.tags])

  // login validation
  const loginAlert = () => {
    alert('Please login first')
    navigate('/login')
  }

  const setCart = async (product) => {
    alert('Item successfully added to your cart')
    await dispatch(addItem(product))
  }

  return (
    <>
      {loading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col
                xl={3}
                lg={4}
                md={4}
                sm={6}
                xs={6}
                className='p-2'
                key={product._id}
              >
                <Card className='rounded-4 p-3 shadow'>
                  <Body className='p-0 d-flex flex-column justify-content-between'>
                    <Img
                      variant='top'
                      className='mb-2'
                      src={`${config.apiHost}/public/${product.image}`}
                      alt={product.name}
                    />
                    <Title className='fw-bold'>{product.name}</Title>

                    <Text className='mb-2'>{product.description}</Text>

                    <p className='fs-5 fw-semibold'>{rupiah.convert(product.price)}</p>

                    <div className='text-muted mb-3'>
                      {product.tags.map((tag) => (
                        <p
                          key={tag._id}
                          className='border border-primary d-inline p-1 rounded-3 me-2'
                        >
                          {tag.name}
                        </p>
                      ))}
                    </div>
                  </Body>

                  <Button
                    className='align-self-start text-white'
                    onClick={() => {
                      localStorage.getItem('token') ? setCart(product) : loginAlert()
                    }}
                  >
                    + Add to Cart
                  </Button>
                </Card>
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}

export default Product
