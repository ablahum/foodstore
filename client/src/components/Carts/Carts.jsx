import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'

import emptyCart from '../../assets/empty-cart.png'
import ConfirmDeleteBox from '../ConfirmDeleteBox'
import { Cart, EmptyCart, Modal } from '../../components'
import { CartActive, CartDisable, CloseBtn } from './style'
import { putAll } from '../../apis/carts'

const Carts = ({ trigger, setTrigger }) => {
  // let globalState = useSelector((state) => state)
  const cartState = useSelector((state) => state.cart)

  const [cartItems, setCartItems] = useState([])

  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState({
    title: '',
    message: '',
  })

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

  const handleClose = () => {
    setShow(false)
    setNotification({ title: '', message: '' })
  }

  return (
    <div style={trigger ? CartActive : CartDisable}>
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

      <Modal
        show={show}
        handleClose={handleClose}
        title={notification.title}
        message={notification.message}
      />

      {/* <ConfirmDeleteBox
        trigger={deleteItem}
        setTrigger={setDeleteItem}
        itemName={itemName}
        value={itemId}
      /> */}
    </div>
  )
}

export default Carts
