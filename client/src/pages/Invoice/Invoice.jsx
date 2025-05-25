import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Table, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import rupiah from 'rupiah-format'
import { Main, Back } from './style'
import { Heading, Title } from '../../components'
import { clearItems } from '../../app/cart/actions'
import { getAll } from '../../apis/orders'
import { getOne } from '../../apis/invoices'

const Invoice = () => {
  const { userCarts } = useSelector((state) => state.cart)
  const { userId } = useSelector((state) => state.user)

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderRes = await getAll()
        const id = orderRes.data.data[0]?._id

        if (id) {
          const invoiceRes = await getOne(id)
          setData(invoiceRes.data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (userCarts.length === 0) navigate('/')
  }, [userCarts, navigate])

  const goHome = () => {
    dispatch(clearItems(userId))
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
        <Container className='py-md-5 py-4'>
          <Title
            title={'order successfully placed'}
            className='mb-3'
          />

          <Table responsive>
            <tbody>
              <tr>
                <td className='py-3 text-uppercase'>order id</td>
                <td className='fw-bold py-3 text-end'>{data?.order?._id || '-'}</td>
              </tr>
              <tr>
                <td className='py-3 text-uppercase'>status</td>
                <td className='fw-bold py-3 text-end'>{data.payment_status}</td>
              </tr>
              <tr>
                <td className='py-3 text-uppercase'>sub total</td>
                <td className='fw-bold py-3 text-end'>{rupiah.convert(data.sub_total)}</td>
              </tr>
              <tr>
                <td className='py-3 text-uppercase'>grand total</td>
                <td className='fw-bold py-3 text-end'>{rupiah.convert(data.total)} (include delivery fee)</td>
              </tr>
              <tr>
                <td className='py-3 text-uppercase'>ship to</td>
                <td className='fw-bold py-3 text-end'>{data.delivery_address.detail}</td>
              </tr>
              <tr>
                <td className='py-3 text-uppercase'>payment method</td>
                <td className='fw-bold py-3 text-end'>{location?.state?.payment || '-'}</td>
              </tr>
            </tbody>
          </Table>

          <Back onClick={goHome}>back to home</Back>
        </Container>
      )}
    </Main>
  )
}

export default Invoice
