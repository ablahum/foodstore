import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap'
import rupiah from 'rupiah-format'
import { changeTotalItems } from '../../app/pagination/action'
import { addItem } from '../../app/cart/actions'
import { getAll, getSpecific } from '../../apis/products'
import { config } from '../../config'
import { Modal } from '../../components'

const { Body, Img, Title, Text } = Card

const Product = () => {
  let globalState = useSelector((state) => state.my)
  let paginationState = useSelector((state) => state.pagination)

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [isNotification, setIsNotification] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { page, perPage } = paginationState

  const getProducts = async () => {
    try {
      const res = await getAll()

      setProducts(res.data.products)
      dispatch(changeTotalItems(res.data.total))
      setLoading(false)
    } catch (err) {
      console.error(err)
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
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const buildParams = () => {
    const params = new URLSearchParams()
    params.append('page', page)
    params.append('perPage', perPage)

    // search with category
    if (globalState.categoryKey) {
      params.append('category', globalState.categoryKey)
    }

    // search by searchKey
    if (globalState.searchKey) {
      params.append('q', globalState.searchKey)
    }

    // search by tags
    globalState.tags.forEach((tag) => params.append('tags[]', tag))

    return params.toString()
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    getProductByParams(`?${buildParams()}`)
  }, [page, globalState.categoryKey, globalState.searchKey, globalState.tags])

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
                className='p-1 p-md-2'
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

                    <p className='fs-5 fw-semibold mb-2'>{rupiah.convert(product.price)}</p>

                    <div className='text-muted mb-2'>
                      {product.tags.map((tag) => (
                        <p
                          key={tag._id}
                          className='border d-inline p-1 rounded-3 me-2 fw-semibold'
                          style={{
                            fontSize: '0.7rem'
                          }}
                        >
                          {tag.name}
                        </p>
                      ))}
                    </div>
                  </Body>

                  <Button
                    className='align-self-start text-white fw-semibold'
                    style={{
                      fontSize: '0.7rem'
                    }}
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

      <Modal
        notification
        setTrigger={setIsNotification}
        trigger={isNotification}
        title={'Item successfully added to your cart'}
      />
    </>
  )
}

export default Product
