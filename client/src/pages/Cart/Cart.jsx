import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'
import { Heading } from '../../components'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { addItem, clearItem, removeItem } from '../../app/cart/actions'
import rupiah from 'rupiah-format'
import { subtotal, total } from '../../utils'
import { Wrapper, Counter, Next } from './style'

const Cart = () => {
  const cartState = useSelector((state) => state.cart)

  const [cartItems, setCartItems] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setCartItems(cartState)
  }, [])

  useEffect(() => {
    setCartItems(cartState)
  }, [cartState])

  if (cartState.length === 0) {
    return <Navigate to='/' />
  }

  const decrement = (item) => {
    dispatch(removeItem(item))
  }

  const increment = (item) => {
    dispatch(addItem(item))
  }

  const handleSubmit = async () => {
    try {
      await axios.put('http://localhost:4000/api/carts', { items: cartState }, { headers: { Authorization: localStorage.getItem('token') } })

      navigate('/checkout')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Wrapper>
      <Heading title='CART' />
      <Container className='py-5'>
        <Table>
          <thead>
            <tr>
              <td></td>
              <td>Name</td>
              <td>Price</td>
              <td>Qty</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <img
                    src={`http://localhost:4000/public/${item.image}`}
                    alt={item.name}
                    style={{ width: '100px' }}
                  />
                </td>
                <td className='fs-1'>{item.name}</td>
                <td className='fs-1'>{rupiah.convert(item.price)}</td>
                <td>
                  <div className='d-flex'>
                    <Counter onClick={() => decrement(item)}>
                      <AiOutlineMinus className='text-dark' />
                    </Counter>
                    <span className='mx-2 fw-bold'>{item.qty}</span>
                    <Counter onClick={() => increment(item)}>
                      <AiOutlinePlus className='text-dark' />
                    </Counter>
                  </div>
                </td>
                <td className='fs-1'>{rupiah.convert(item.qty * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='d-flex justify-content-end'>
          <h2>TOTAL:</h2>
          <h3 className='ms-4'>{rupiah.convert(total(cartState))}</h3>
        </div>
        <Next onClick={handleSubmit}>CONTINUE TO CHECKOUT</Next>
      </Container>
    </Wrapper>
  )
}

export default Cart
