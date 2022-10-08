import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import styled from 'styled-components'
import { categoryChanges, searchChanges, pageChanges, tagsChanges } from '../app/myReducer/action'
import { addItem } from '../app/cart/actions'
import rupiah from 'rupiah-format'

const Body = styled(Card)`
  border-radius: 10px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.2);
  padding: 0.5em;
`

const CardImg = styled(Card.Img)`
  @media (max-width: 767px) {
    width: 75%;
    margin: 0 auto;
  }
`

const TagLabel = styled.h6`
  color: #fff;
  background-color: rgba(28, 31, 35, 0.4);
  font-size: 0.8em;
  display: inline;
  padding: 0.1em 0.8em;
  border-radius: 10px;
`

const CartButton = styled(Button)`
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
`

const Product = () => {
  let globalState = useSelector((state) => state.my)

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const url = 'http://localhost:4000/api/products'

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${url}`)
      setProducts(response.data.products)
      await dispatch(categoryChanges(''))
      await dispatch(searchChanges(''))
      await dispatch(pageChanges(1))
      await dispatch(tagsChanges([]))
      setLoading(false)
    }

    fetch()
  }, [])

  // SEARCH PRODUCTS BY CATEGORY
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const response = await axios.get(`${url}?category=${globalState.categoryKey}`)
      setProducts(response.data.products)
      setLoading(false)
    }

    fetch()
  }, [globalState.categoryKey])

  // SEARCH PRODUCTS BY SEARCH
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const response = await axios.get(`${url}?q=${globalState.searchKey}`)
      setProducts(response.data.products)
      setLoading(false)
    }

    fetch()
  }, [globalState.searchKey])

  // PAGINATION
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const response = await axios.get(`${url}?page=${globalState.page}`)
      setProducts(response.data.products)
      setLoading(false)
    }

    fetch()
  }, [globalState.page])

  // SEARCH PRODUCTS BY TAGS
  useEffect(() => {
    setLoading(true)
    const fetch = async () => {
      if (globalState.tags.length === 2) {
        const response = await axios.get(`${url}?tags[]=${globalState.tags[0]}&tags[]=${globalState.tags[1]}`)
        setProducts(response.data.products)
        setLoading(false)
      } else if (globalState.tags.length === 3) {
        const response = await axios.get(`${url}?tags[]=${globalState.tags[0]}&tags[]=${globalState.tags[1]}&tags[]=${globalState.tags[2]}`)
        setProducts(response.data.products)
        setLoading(false)
      } else if (globalState.tags.length === 4) {
        const response = await axios.get(`${url}?tags[]=${globalState.tags[0]}&tags[]=${globalState.tags[1]}&tags[]=${globalState.tags[2]}&tags[]=${globalState.tags[3]}`)
        setProducts(response.data.products)
        setLoading(false)
      } else if (globalState.tags.length === 5) {
        const response = await axios.get(`${url}?tags[]=${globalState.tags[0]}&tags[]=${globalState.tags[1]}&tags[]=${globalState.tags[2]}&tags[]=${globalState.tags[3]}&tags[]=${globalState.tags[4]}`)
        setProducts(response.data.products)
        setLoading(false)
      } else {
        const response = await axios.get(`${url}?tags[]=${globalState.tags}`)
        setProducts(response.data.products)
        setLoading(false)
      }
    }

    fetch()
  }, [globalState.tags])

  // LOGIN VALIDATION
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
              <Col xl={3} lg={4} md={6} sm={12} className='my-4' key={product._id}>
                <Body>
                  <Card.Body className='d-flex flex-column justify-content-between pb-0'>
                    <CardImg variant='top' className='pb-3' src={`http://localhost:4000/public/${product.image}`} alt={product.name} />
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
