import { useState, useEffect } from 'react'
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom'
import { Container, Table, Spinner } from 'react-bootstrap'
import { Heading } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import rupiah from 'rupiah-format'
import { Main, BackButton } from './style'
import { clearItem } from '../../app/cart/actions'

const Invoice = () => {
  const cartState = useSelector((state) => state.cart)

  const [orderId, setOrderId] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/orders', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })

        setOrderId(res.data.data[0]._id)
      } catch (err) {
        console.error(err)
      }
    }

    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/invoices/${orderId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })

        setData(res.data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      }
    }

    fetch()
  }, [orderId])

  if (cartState.length === 0) {
    return <Navigate to='/' />
  }

  const goHome = () => {
    dispatch(clearItem())
    navigate('/')
  }

  return (
    <Main>
      <Heading title='INVOICE' />
      {loading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <Container className='py-5'>
          <h2 className='fw-bold fs-3 mb-3'>ORDER SUCCESSFULY PLACED</h2>
          <Table>
            <tbody>
              <tr>
                <td className='fw-bold py-3 fs-5'>ORDER ID</td>
                <td className='fw-bold py-3'>:</td>
                <td className='py-3 fs-5'>{data.order._id}</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5'>STATUS</td>
                <td className='fw-bold py-3'>:</td>
                <td className='py-3 fs-5'>{data.payment_status}</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5'>SUBTOTAL</td>
                <td className='fw-bold py-3'>:</td>
                <td className='py-3 fs-5'>{rupiah.convert(data.sub_total)}</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5'>TOTAL AMOUNT</td>
                <td className='fw-bold py-3'>:</td>
                <td className='py-3 fs-5'>{rupiah.convert(data.total)} (include delivery fee)</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5'>SHIPPING TO</td>
                <td className='fw-bold py-3'>:</td>
                <td className='py-3 fs-5'>{data.delivery_address.detail}</td>
              </tr>
              <tr>
                <td className='fw-bold py-3 fs-5'>PAYMENT METHOD</td>
                <td className='fw-bold py-3'>:</td>
                <td className='py-3 fs-5'>{location.state.payment}</td>
              </tr>
            </tbody>
          </Table>
          {/* <Link to="/" className="text-decoration-none"> */}
          <BackButton onClick={goHome}>BACK TO HOME</BackButton>
          {/* </Link> */}
        </Container>
      )}
    </Main>
  )
}

export default Invoice
