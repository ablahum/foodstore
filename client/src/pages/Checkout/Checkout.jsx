import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Table, Form } from 'react-bootstrap'
import rupiah from 'rupiah-format'
import { useSelector } from 'react-redux'

import { Heading, ErrorMessages, Title } from '../../components'
import { total } from '../../utils'
import { Wrapper, Summary, Total, Back, Next, Data, Buttons } from './style'
import { getAll as getCart } from '../../apis/carts'
import { getAll as getAddress } from '../../apis/delivery-addresses'
import { Modal } from '../../components'
import { createOne } from '../../apis/orders'

const { Label, Select } = Form

const Checkout = () => {
  const cartState = useSelector((state) => state.cart)
  const globalState = useSelector((state) => state.my)
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])
  const [addresses, setAddresses] = useState([])
  const [data, setData] = useState({
    address: '',
    payment: '',
  })

  const [messages, setMessages] = useState([])
  const [confirm, setConfirm] = useState(false)

  const fee = 20000
  const getOrderId = cartItems.map((item) => item._id)
  const relatedAddress = addresses.filter((address) => address.nama === data.address)
  const payments = ['Bank BCA', 'Bank Mandiri', 'DANA', 'OVO']

  const [notification, setNotification] = useState(false)

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

  useEffect(() => {
    getData()
  }, [])

  if (cartState.length === 0) return navigate('/')
  const nextPage = () => navigate('/invoice', { state: { payment: data.payment } })

  const handleChanges = (e) => {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  const validation = () => {
    let message = []
    if (!data.address || data.address === 'Delivery address') message = [...message, 'Please select delivery address']

    if (!data.payment || data.payment === 'Payment method') message = [...message, 'Please select payment method']

    if (message.length > 0) {
      setMessages(message)
    } else {
      setMessages([])
      setConfirm(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let address

      relatedAddress.forEach((a) => {
        address = {
          provinsi: a.provinsi,
          kabupaten: a.kabupaten,
          kecamatan: a.kecamatan,
          kelurahan: a.kelurahan,
          detail: a.detail,
        }
      })

      const payload = {
        status: 'waiting_payment',
        delivery_fee: fee,
        delivery_address: {
          provinsi: address.provinsi,
          kabupaten: address.kabupaten,
          kecamatan: address.kecamatan,
          kelurahan: address.kelurahan,
          detail: address.detail,
        },
        user: globalState.userId,
        order_items: getOrderId,
      }

      await createOne(payload)

      setNotification(true)
      setConfirm(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Wrapper>
      <Heading title='checkout' />

      <Container className='py-5 d-flex flex-column justify-content-between'>
        <Title
          title={'order summary'}
          className='mb-3'
        />
        <div className='d-flex justify-content-between flex-column flex-md-row'>
          <Summary>
            <Table
              hover
              bordered
              className='mb-0'
            >
              <thead>
                <tr>
                  <th></th>

                  <th>Item Name</th>

                  <th>Qty</th>

                  <th className='text-end'>Sub Total</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className='text-center p-0'>
                      <img
                        src={`http://localhost:4000/public/${item.image}`}
                        alt={item.image}
                        style={{ width: '80px' }}
                      />
                    </td>

                    <td>{item.name}</td>

                    <td>{item.qty}</td>

                    <td className='text-end'>{rupiah.convert(item.qty * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Summary>

          <Data>
            <div className='mb-3'>
              <Label className='fs-5 fw-bold mb-3 text-uppercase'>select address</Label>

              <Select
                className='h-50'
                id='address'
                onChange={(e) => handleChanges(e)}
              >
                <option>Delivery address</option>
                {addresses.map((address) => (
                  <option key={address._id}>{address.nama}</option>
                ))}
              </Select>

              {messages.length > 0 && <ErrorMessages errors={messages.filter((message) => message.includes('address'))} />}
            </div>

            <div className='mb-3'>
              <Label className='fs-5 fw-bold mb-3 text-uppercase'>select payment method</Label>

              <Select
                className='h-50'
                id='payment'
                onChange={(e) => handleChanges(e)}
              >
                <option>Payment method</option>
                {payments.map((payment, i) => (
                  <option key={i}>{payment}</option>
                ))}
              </Select>

              {messages.length > 0 && <ErrorMessages errors={messages.filter((message) => message.includes('payment'))} />}
            </div>
          </Data>
        </div>
        <div className='d-flex flex-column flex-md-row justify-content-between mt-md-3 mt-0'>
          <Total>
            <h3 className='m-0 text-uppercase'>sub total</h3>

            <h3 className='fw-bold m-0'>{rupiah.convert(total(cartItems))}</h3>
          </Total>

          <Buttons>
            <Back onClick={() => navigate('/')}>back to home</Back>

            <Next onClick={validation}>next</Next>
          </Buttons>
        </div>
        <Modal
          isCheckout
          trigger={confirm}
          setTrigger={setConfirm}
          cartItems={cartItems}
          address={data.address}
          payment={data.payment}
          fee={fee}
          total={total}
          submit={handleSubmit}
          messages={messages}
          cancel={'no, change the information'}
          confirm={'yes, proceed the order'}
          isOrder
        />
        {/* {messages.join('').includes('successful') && modalType === '' && ( */}
        <Modal
          title={'Place order successful'}
          setTrigger={setNotification}
          // trigger={messages.join('').includes('successful') && modalType === ''}
          trigger={notification}
          notification
          nextPage={nextPage}
          isCheckout
        />
        {/* // )} */}
      </Container>
    </Wrapper>
  )
}

export default Checkout
