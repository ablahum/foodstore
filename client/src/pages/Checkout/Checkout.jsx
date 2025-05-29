import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Table, Form } from 'react-bootstrap'
import rupiah from 'rupiah-format'
import { useSelector } from 'react-redux'
import { Heading, ErrorMessages, Title } from '../../components'
import { total } from '../../utils'
import { getAll as getCart } from '../../apis/carts'
import { getAll as getAddress } from '../../apis/delivery-addresses'
import { Modal } from '../../components'
import { createOne } from '../../apis/orders'
import { config } from '../../config'
import { Button } from 'react-bootstrap'

const { Label, Select } = Form

const DELIVERY_FEE = 20000
const payments = [
  {
    id: 1,
    name: 'Bank BCA'
  },
  {
    id: 2,
    name: 'Bank Mandiri'
  },
  {
    id: 3,
    name: 'DANA'
  },
  {
    id: 4,
    name: 'OVO'
  }
]

const Checkout = () => {
  const { userCarts } = useSelector((state) => state.cart)
  const { userId } = useSelector((state) => state.user)

  const [cartItems, setCartItems] = useState([])
  const [addresses, setAddresses] = useState([])
  const [data, setData] = useState({
    address: '',
    payment: ''
  })
  const [messages, setMessages] = useState([])
  const [confirm, setConfirm] = useState(false)
  const [isNotification, setIsNotification] = useState(false)

  const navigate = useNavigate()

  const getProductId = cartItems.map((item) => item._id)
  const selectedAddress = addresses.filter((address) => address.nama === data.address)

  useEffect(() => {
    const getData = async () => {
      try {
        const cart = await getCart()
        const address = await getAddress()

        setCartItems(cart.data)
        setAddresses(address.data.addresses)
      } catch (err) {
        console.error(err)
      }
    }

    getData()
  }, [])

  useEffect(() => {
    if (userCarts.length === 0) navigate('/')
  }, [userCarts, navigate])

  const handleChanges = ({ target: { name, value } }) => setData((prev) => ({ ...prev, [name]: value }))

  const validation = () => {
    const errs = []
    if (!data.address || data.address === 'Delivery address') errs.push('Please select delivery address')
    if (!data.payment || data.payment === 'Payment method') errs.push('Please select payment method')
    setMessages(errs)

    if (errs.length === 0) {
      setConfirm(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedAddress) {
      setMessages(['Selected address not found'])
      return
    }

    const payload = {
      status: 'waiting_payment',
      delivery_fee: DELIVERY_FEE,
      delivery_address: {
        provinsi: selectedAddress[0].provinsi,
        kabupaten: selectedAddress[0].kabupaten,
        kecamatan: selectedAddress[0].kecamatan,
        kelurahan: selectedAddress[0].kelurahan,
        detail: selectedAddress[0].detail
      },
      user: userId,
      order_items: getProductId
    }

    try {
      await createOne(payload)

      setConfirm(false)
      setIsNotification(true)
    } catch (err) {
      console.error(err)
    }
  }

  const nextPage = () => navigate('/invoice', { state: { payment: data.payment } })

  return (
    <div className='min-vh-100'>
      <Heading title='checkout' />

      <Container className='py-md-5 py-4 d-flex flex-column justify-content-between'>
        <Title
          title={'order summary'}
          className='mb-3'
        />

        <div
          className='d-flex md-justify-content-between flex-column flex-md-row gap-3'
          style={{ height: '51vh' }}
        >
          <div className='overflow-auto p-2 w-md-50 w-100'>
            <Table
              hover
              responsive
              className='mb-0'
              size='sm'
            >
              <thead>
                <tr>
                  <th></th>

                  <th className='text-uppercase'>item name</th>

                  <th className='text-uppercase text-center'>qty</th>

                  <th className='text-end text-uppercase'>total</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className='text-center p-0'>
                      <img
                        src={`${config.apiHost}/public/${item.image}`}
                        alt={item.image}
                        style={{ width: '60px' }}
                      />
                    </td>

                    <td>{item.name}</td>

                    <td className='text-center'>{item.qty}</td>

                    <td className='text-end'>{rupiah.convert(item.qty * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className='p-2 w-md-50 w-100 d-flex flex-column gap-3'>
            <div className='d-flex flex-column'>
              <Label className='fw-semibold mb-2 text-capitalize'>select address:</Label>

              <Select
                name='address'
                onChange={(e) => handleChanges(e)}
                className={messages.length > 0 && messages.filter((message) => message.includes('address')) ? 'border-danger' : ''}
              >
                <option>Delivery address</option>
                {addresses.map((address) => (
                  <option
                    key={address._id}
                    value={address.nama}
                  >
                    {address.nama}
                  </option>
                ))}
              </Select>

              {messages.length > 0 && <ErrorMessages errors={messages.filter((message) => message.includes('address'))} />}
            </div>

            <div className='d-flex flex-column'>
              <Label className='fw-semibold mb-2 text-capitalize'>select payment method:</Label>

              <Select
                name='payment'
                onChange={(e) => handleChanges(e)}
                className={messages.length > 0 && messages.filter((message) => message.includes('address')) ? 'border-danger' : ''}
              >
                <option>Payment method</option>
                {payments.map((payment) => (
                  <option
                    key={payment.id}
                    value={payment.name}
                  >
                    {payment.name}
                  </option>
                ))}
              </Select>

              {messages.length > 0 && <ErrorMessages errors={messages.filter((message) => message.includes('payment'))} />}
            </div>
          </div>
        </div>

        <div className='d-flex flex-column flex-md-row justify-content-between gap-3'>
          <div className='d-flex justify-content-between align-items-center w-md-50 w-100'>
            <p className='m-0 fs-5 text-uppercase'>sub total</p>

            <p className='fw-bold fs-5 m-0'>{rupiah.convert(total(cartItems))}</p>
          </div>

          <div className='buttons d-flex justify-content-between w-md-50 w-100 gap-3'>
            <Button
              onClick={() => navigate('/')}
              className='btn-back w-50 text-uppercase fw-semibold bg-transparent'
              style={{ color: 'var(--black)' }}
            >
              back to home
            </Button>

            <Button
              onClick={() => validation()}
              className='btn-next w-50 text-uppercase fw-semibold border-0'
              style={{ color: 'var(--white)' }}
            >
              next
            </Button>
          </div>
        </div>

        <Modal
          isCheckout
          trigger={confirm}
          setTrigger={setConfirm}
          cartItems={cartItems}
          address={data.address}
          payment={data.payment}
          fee={DELIVERY_FEE}
          total={total}
          submit={handleSubmit}
          messages={messages}
          cancel={'no, change the information'}
          confirm={'yes, proceed the order'}
          isOrder
        />
        <Modal
          title={'Place order successful'}
          setTrigger={setIsNotification}
          trigger={isNotification}
          notification
          nextPage={nextPage}
          isCheckout
        />
      </Container>
    </div>
  )
}

export default Checkout
