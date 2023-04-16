import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'
import styled from 'styled-components'
import emptyCart from '../assets/empty-cart.png'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'
import { useSelector } from 'react-redux'
import ConfirmDeleteBox from './ConfirmDeleteBox'

const Cart = {
  width: '400px',
  height: '100vh',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'fixed',
  top: '0',
  right: '-150%',
  transition: '850ms',
  boxShadow: '0px 10px 50px -15px rgba(0, 0, 0, 1)',
}

const CartActive = {
  width: '400px',
  height: '100vh',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'fixed',
  top: '0',
  right: '0',
  transition: '350ms',
  boxShadow: '0px 10px 50px -15px rgba(0, 0, 0, 1)',
}

const Counter = styled(Button)`
  background-color: transparent;
  padding: 0 4px;
  font-size: 0.8rem;
`

const BackButton = styled(Button)`
  // width: 40%;
  background-color: transparent;
  font-weight: 600;
`

const NextButton = styled(Button)`
  // width: 60%;
  color: #fff;
  font-weight: 600;
  border: none;
  margin-left: 1em;
`

const Carts = ({ trigger, setTrigger, setCount }) => {
  let globalState = useSelector((state) => state)

  const [cartItems, setCartItems] = useState([])
  const [itemId, setItemId] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemQty, setItemQty] = useState(1)
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [deleteItem, setDeleteItem] = useState(false)

  const navigate = useNavigate()

  const loginAlert = () => {
    alert('Please login first')
    setTrigger(false)
    navigate('/login')
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/carts', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })

        setCartItems(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetch()
  }, [])

  useEffect(() => {
    setCount(cartItems.length)
  }, [cartItems])

  const decrement = (id, name, price) => {
    if (itemQty <= 1) {
      setDeleteItem(true)
      setItemId(id)
      setItemName(name)
    } else {
      setItemQty(itemQty - 1)
    }
  }

  const increment = (price) => {
    setItemQty(itemQty + 1)
  }

  // const price = cartItems.map((item) => {
  //   return item.price;
  // });

  // const qty = cartItems.map((item) => {
  //   return item.qty;
  // });

  // const multiple = price * asd;
  // console.log(multiple);

  console.log(cartItems)

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        'http://localhost:4000/api/carts',
        {
          ...cartItems,
          // name: data.name,
          // qty: itemQty,
          // price: data.price,
          // image: data.image,
          // user: globalState.userId,
          // product: data._id,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      )

      console.log(res.data.cartItems)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      {localStorage.getItem('token') && cartItems.length > 0 ? (
        <div style={trigger ? CartActive : Cart}>
          <div>
            <h2 className='m-4 fw-bold'>YOUR CART</h2>
            <div className='mx-4'>
              <Table hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>Rp. {item.price}</td>
                        <td>
                          <div className='d-flex'>
                            <Counter onClick={() => decrement(item._id, item.name, item.price)}>
                              <AiOutlineMinus className='text-dark' />
                            </Counter>
                            <span className='mx-2 fw-bold'>{itemQty}</span>
                            <Counter onClick={() => increment(item.price)}>
                              <AiOutlinePlus className='text-dark' />
                            </Counter>
                          </div>
                        </td>
                        <td className='fw-bold'>Rp. {subTotal}</td>
                        {/* <td className="fw-bold">Rp. </td> */}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className='mx-4'>
            <div className='d-flex justify-content-between mt-4'>
              <h4 className='align-self-center m-0 fs-5'>TOTAL:</h4>
              <h3 className='fw-bold m-0 fs-4'>Rp. {total}</h3>
            </div>
            <div className='my-4 d-flex justify-content-between'>
              <BackButton onClick={() => setTrigger(false)}>ADD MORE</BackButton>
              <NextButton onClick={handleSubmit}>CHECKOUT</NextButton>
            </div>
          </div>
        </div>
      ) : (
        <div style={trigger ? CartActive : Cart}>
          <h2 className='m-4 fw-bold'>YOUR CART</h2>
          <div className='d-flex flex-column align-items-center'>
            <img
              src={emptyCart}
              alt='empty'
            />
            <h3 className='fs-6 m-3'>YOUR CART IS EMPTY</h3>
          </div>
          <div className='m-4'>
            {localStorage.getItem('token') ? (
              <BackButton
                onClick={() => setTrigger(false)}
                style={{ width: '100%' }}
              >
                BUY SOMETHING
              </BackButton>
            ) : (
              <BackButton
                onClick={() => loginAlert()}
                style={{ width: '100%' }}
              >
                BUY SOMETHING
              </BackButton>
            )}
          </div>
        </div>
      )}
      <ConfirmDeleteBox
        trigger={deleteItem}
        setTrigger={setDeleteItem}
        itemName={itemName}
        value={itemId}
      />
    </div>
  )
}

export default Carts
