import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Row, Col, Card } from 'react-bootstrap'
import rupiah from 'rupiah-format'

import { addItem } from '../../app/cart/actions'
import { getAll, getSpecific } from '../../apis/products'
import { config } from '../../config'
import { Body, CardImg, TagLabel, CartButton } from './style'

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
    alert('Item sucessfully added to your cart')
    await dispatch(addItem(product))
  }

  return (
    <div>
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
                md={6}
                sm={12}
                className='my-4'
                key={product._id}
              >
                <Body>
                  <Card.Body className='d-flex flex-column justify-content-between pb-0'>
                    <CardImg
                      variant='top'
                      className='pb-3'
                      src={`${config.apiHost}/public/${product.image}`}
                      alt={product.name}
                    />
                    <Card.Title className='card-title mb-3 fw-bold'>{product.name}</Card.Title>
                    <Card.Text className='card-desc text-muted '>{product.description}</Card.Text>
                    <h5 className='mb-2'>{rupiah.convert(product.price)}</h5>
                    <div className='card-subtitle text-muted my-2'>
                      {product.tags.map((tag) => (
                        <TagLabel key={tag._id}>{tag.name}</TagLabel>
                      ))}
                    </div>
                  </Card.Body>
                  <CartButton
                    className='align-self-start mx-3 mb-3'
                    onClick={() => {
                      localStorage.getItem('token') ? setCart(product) : loginAlert()
                    }}
                  >
                    + Add to Cart
                  </CartButton>
                </Body>
              </Col>
            ))}
        </Row>
      )}
    </div>
  )
}

export default Product
