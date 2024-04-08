import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Table, Form } from 'react-bootstrap'
import rupiah from 'rupiah-format'
import { useSelector } from 'react-redux'

import { Heading, ConfirmBox, ErrorMessages, Title } from '../../components'
import { total } from '../../utils'
import { Main, Summary, Total, Back, Next, Data, Buttons } from './style'
import { getAll as getCart } from '../../apis/carts'
import { getAll as getAddress } from '../../apis/delivery-addresses'
import { Modal } from '../../components'
import { createOne } from '../../apis/orders'

const { Label, Select } = Form

const Checkout = () => {
  const cartState = useSelector((state) => state.cart)
  const globalState = useSelector((state) => state.my)

  const [cartItems, setCartItems] = useState([])
  const [addresses, setAddresses] = useState([])
  const [data, setData] = useState({
    address: '',
    payment: '',
  })

  // const [addressError, setAddressError] = useState([])
  // const [paymentError, setPaymentError] = useState([])
  const [messages, setMessages] = useState([])
  const [confirm, setConfirm] = useState(false)

  const navigate = useNavigate()
  const fee = 20000
  const getOrderId = cartItems.map((item) => item._id)
  const relatedAddress = addresses.filter((address) => address.nama === data.address)
  const payments = ['Bank BCA', 'Bank Mandiri', 'DANA', 'OVO']

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

  const handleChanges = (e) => {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  // const handleSubmit = () => {
  //   if (!data.address) {
  // setAddressError(['Please select delivery address'])
  //   }
  //   if (!data.payment) {
  // setPaymentError(['Please select payment method'])
  //   }

  //   if (data.address && data.payment) {
  //     setConfirm(true)
  // setAddressError([])
  // setPaymentError([])
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let message = []
    if (!data.address) message = [...message, 'Please select delivery address']

    if (!data.payment) message = [...message, 'Please select payment method']

    if (message.length > 0) {
      setMessages(message)
    } else {
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

        const res = await createOne(payload)

        alert('Place order succesful')
        navigate('/invoice', { state: { payment: data.payment } })
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <Main>
      <Heading title='checkout' />

      <Container className='py-5'>
        <Title
          title={'order summary'}
          className='mb-3'
        />

        <div className='d-flex justify-content-between flex-column flex-md-row'>
          <Summary>
            <Table
              hover
              bordered
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

              {/* {messages.length > 0 && <ErrorMessages errors={messages} />} */}
            </div>

            <div>
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

              {messages.length > 0 && <ErrorMessages errors={messages} />}
            </div>
          </Data>
        </div>

        <div className='d-flex flex-column flex-md-row justify-content-between mt-3'>
          <Total>
            <h3 className='m-0 text-uppercase'>sub total</h3>

            <h3 className='fw-bold m-0'>{rupiah.convert(total(cartItems))}</h3>
          </Total>

          <Buttons>
            <Back>back to home</Back>

            <Next onClick={() => setConfirm(true)}>next</Next>
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
      </Container>
    </Main>
  )
}

export default Checkout
