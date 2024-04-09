import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Table, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import rupiah from 'rupiah-format'
import { Main, Back } from './style'

import { Heading, Title } from '../../components'
import { clearItem } from '../../app/cart/actions'
import { getAll } from '../../apis/orders'
import { getOne } from '../../apis/invoices'

const Invoice = () => {
  const cartState = useSelector((state) => state.cart)

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [orderId, setOrderId] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const getOrders = async () => {
    try {
      const res = await getAll()

      setOrderId(res.data.data[0]._id)
    } catch (err) {
      console.error(err)
    }
  }

  const getInvoice = async () => {
    try {
      const res = await getOne(orderId)

      setData(res.data)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    getInvoice()
  }, [orderId])

  if (cartState.length === 0) navigate('/')

  const goHome = () => {
    dispatch(clearItem())
    navigate('/')
  }

  return (
    <Main>
      <Heading title='invoice' />

      {loading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <Container className='py-5'>
          <Title
            title={'order successfully placed'}
            className='mb-3'
          />

          <Table responsive>
            <tbody>
              <tr>
                <td className='fw-bold py-3 fs-5 text-uppercase'>order id</td>
                <td className='py-3 fs-5 text-end'>{data.order._id}</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5 text-uppercase'>status</td>
                <td className='py-3 fs-5 text-end'>{data.payment_status}</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5 text-uppercase'>sub total</td>
                <td className='py-3 fs-5 text-end'>{rupiah.convert(data.sub_total)}</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5 text-uppercase'>grand total</td>
                <td className='py-3 fs-5 text-end'>{rupiah.convert(data.total)} (include delivery fee)</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5 text-uppercase'>ship to</td>
                <td className='py-3 fs-5 text-end'>{data.delivery_address.detail}</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5 text-uppercase'>payment method</td>
                <td className='py-3 fs-5 text-end'>{location.state.payment}</td>
              </tr>
            </tbody>
          </Table>

          {/* <Link to="/" className="text-decoration-none"> */}
          <Back onClick={goHome}>back to home</Back>
          {/* </Link> */}
        </Container>
      )}
    </Main>
  )
}

export default Invoice
