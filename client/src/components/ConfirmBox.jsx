import { useState, useEffect } from 'react'
import { Table, Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import rupiah from 'rupiah-format'

import { total } from '../utils'
import { useSelector } from 'react-redux'
import { getAll } from '../apis/carts'
import { createOne } from '../apis/orders'

const Popup = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`

const Wrapper = styled.div`
  width: 45em;
  border-radius: 10px;
  padding: 2em;
  background-color: #fff;
  box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);
  position: relative;
`

const TableBox = styled.div`
  max-height: 450px;
  overflow: auto;
`

const BackButton = styled(Button)`
  width: 50%;
  background-color: transparent;
  font-weight: 600;
  margin-right: 1em;
`

const NextButton = styled(Button)`
  width: 50%;
  color: #fff;
  font-weight: 600;
  border: none;
`

const ConfirmBox = ({ relatedAddress, payment, address, trigger, setTrigger }) => {
  const globalState = useSelector((state) => state.my)

  const [cartItems, setCartItems] = useState([])
  const getOrderId = cartItems.map((item) => item._id)

  const fee = 20000

  const navigate = useNavigate()

  const getCartItems = async () => {
    try {
      const res = await getAll()

      setCartItems(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getCartItems()
  }, [])

  const handleSubmit = async () => {
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

      navigate('/invoice', { state: { payment: payment } })
    } catch (err) {
      console.error(err)
    }
  }

  return trigger ? (
    <Popup>
      <Wrapper>
        <h2 className='fw-bold mb-4'>ORDER CONFIRMATION</h2>

        <div>
          <TableBox>
            <Table hover bordered size='md' className='px-3 py-3'>
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
                      <img src={`http://localhost:4000/public/${item.image}`} alt={item.image} style={{ width: '80px' }} />
                    </td>

                    <td>{item.name}</td>

                    <td>{item.qty}</td>

                    <td className='text-end'>{rupiah.convert(item.qty * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableBox>

          <div>
            <div className='d-flex justify-content-between mb-2'>
              <h5 className='fs-6 m-0 align-self-center'>ADDRESS :</h5>

              <h5 className='m-0'>{address}</h5>
            </div>

            <div className='d-flex justify-content-between mb-2'>
              <h5 className='fs-6 m-0 align-self-center'>PAYMENT METHOD :</h5>

              <h5 className='m-0'>{payment}</h5>
            </div>

            <div className='d-flex justify-content-between mb-3'>
              <h5 className='fs-6 m-0 align-self-center'>FEE :</h5>

              <h5 className='m-0'>{rupiah.convert(fee)}</h5>
            </div>
          </div>

          <div className='d-flex justify-content-between mb-2'>
            <h5 className='m-0'>TOTAL :</h5>

            <h4 className='fw-bold m-0'>{rupiah.convert(total(cartItems) + fee)}</h4>
          </div>
        </div>

        <Alert variant='danger' className='text-center fw-bold fs-5 mt-3 mb-0 py-2'>
          Is the information above correct?
        </Alert>

        <div className='mt-3 d-flex'>
          <BackButton onClick={() => setTrigger(false)}>NO, CHANGE THE INFORMATION</BackButton>

          <NextButton onClick={handleSubmit}>YES, PROCEED THE ORDER</NextButton>
        </div>
      </Wrapper>
    </Popup>
  ) : (
    ''
  )
}

export default ConfirmBox
