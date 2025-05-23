import { Row, Col, Card, Button } from 'react-bootstrap'
import rupiah from 'rupiah-format'
import { config } from '../../config'
import { Modal } from '../../components'

const { Body, Img, Title, Text } = Card

const Product = ({ products, setCart, loginAlert, isNotification, setIsNotification }) => (
  <>
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
                      style={{ fontSize: '0.7rem' }}
                    >
                      {tag.name}
                    </p>
                  ))}
                </div>
              </Body>

              <Button
                className='align-self-start text-white fw-semibold'
                style={{ fontSize: '0.7rem' }}
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

    <Modal
      notification
      setTrigger={setIsNotification}
      trigger={isNotification}
      title={'Item successfully added to your cart'}
    />
  </>
)
// let globalState = useSelector((state) => state.my)
// const { page, perPage } = useSelector((state) => state.pagination)

// const [loading, setLoading] = useState(true)
// const [products, setProducts] = useState([])
// const [isNotification, setIsNotification] = useState(false)

// const dispatch = useDispatch()
// const navigate = useNavigate()

// // login validation
// const loginAlert = () => {
//   alert('Please login first')
//   navigate('/login')
// }

// const setCart = async (product) => {
//   setIsNotification(true)
//   await dispatch(addItem(product))
// }

// // const getProducts = async () => {
// //   try {
// //     const res = await getAll()

// //     setProducts(res.data.products)

// //     dispatch(changeTotal(res.data.total))
// //     setLoading(false)
// //   } catch (err) {
// //     console.error(err)
// //   }
// // }

// const getProductByParams = async (params) => {
//   try {
//     const res = await getSpecific(params)

//     setProducts(res.data.products)
//     dispatch(
//       changeAll({
//         totalItems: res.data.total,
//         page: res.data.pagination.page,
//         perPage: res.data.pagination.perPage
//       })
//     )
//     setLoading(false)
//   } catch (err) {
//     console.error(err)
//   }
// }

// const buildParams = () => {
//   const params = new URLSearchParams()
//   params.append('page', page)
//   params.append('perPage', perPage)

//   // search by category
//   if (globalState.categoryKey) {
//     params.append('category', globalState.categoryKey)
//   }

//   // search by search key
//   if (globalState.searchKey) {
//     params.append('q', globalState.searchKey)
//   }

//   // search by tags
//   globalState.tags.forEach((tag) => params.append('tags[]', tag))

//   return params.toString()
// }

// // useEffect(() => {
// //   getProducts()
// // }, [])

// useEffect(() => {
//   getProductByParams(`?${buildParams()}`)
// }, [page, globalState.categoryKey, globalState.searchKey, globalState.tags])

// useEffect(() => {
//   dispatch(changePage(1))
// }, [globalState.categoryKey, globalState.searchKey, globalState.tags])

export default Product
