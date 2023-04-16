import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'

import emptyCart from '../../assets/empty-cart.png'
import { Cart, EmptyCart } from '../../components'
import { Active, Disable, Wrapper, CloseBtn } from './style'
import { putAll } from '../../apis/carts'

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
    <Wrapper style={trigger ? Active : Disable}>
      <div className='m-4 d-flex align-items-center justify-content-between'>
        <h2 className='m-0 fw-bold'>YOUR CART</h2>

        <CloseBtn>
          <AiOutlineClose onClick={() => setTrigger(false)} />
        </CloseBtn>
      </div>

      {localStorage.getItem('token') && cartItems.length > 0 ? (
        <Cart
          cartItems={cartItems}
          handleSubmit={handleSubmit}
        />
      ) : (
        <EmptyCart emptyCart={emptyCart} />
      )}
    </Wrapper>
  )
}

export default Carts
