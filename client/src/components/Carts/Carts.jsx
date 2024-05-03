import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'

import emptyCart from '../../assets/empty-cart.png'
import { Cart, EmptyCart, Title } from '../../components'
import { putAll } from '../../apis/carts'
import { Button } from 'react-bootstrap'

const Carts = ({ trigger, setTrigger }) => {
  const cartState = useSelector((state) => state.cart)

  const [cartItems, setCartItems] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    setCartItems(cartState)
  }, [cartState])

  const handleSubmit = async () => {
    try {
      await putAll(cartState)

      navigate('/checkout')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div
      className='d-flex flex-column justify-content-between position-fixed top-0 shadow bg-white'
      style={{
        transition: '350ms',
        // zIndex: '99',
        height: '100vh',
        minWidth: '30%',
        maxWidth: '100%',
        ...(trigger ? { right: '0' } : { right: '-200%' }),
      }}
    >
      <div className='m-3 d-flex align-items-center justify-content-between'>
        <Title
          title={'your cart'}
          className='mb-0'
        />

        <Button className='bg-transparent border-0 m-0 fs-4'>
          <AiOutlineClose onClick={() => setTrigger(false)} />
        </Button>
      </div>

      {localStorage.getItem('token') && cartItems.length > 0 ? (
        <Cart
          cartItems={cartItems}
          handleSubmit={handleSubmit}
        />
      ) : (
        <EmptyCart emptyCart={emptyCart} />
      )}
    </div>
  )
}

export default Carts
