import { AiOutlineClose } from 'react-icons/ai'
import emptyCart from '../../assets/empty-cart.png'
import { Filled, Empty, Title } from '..'
import { Button } from 'react-bootstrap'

const Cart = ({ trigger, setTrigger, cartItems, handleCheckout }) => (
  <div
    className='d-flex flex-column justify-content-between position-fixed top-0 shadow bg-white'
    style={{
      transition: '350ms',
      height: '100vh',
      minWidth: '30%',
      maxWidth: '100%',
      ...(trigger ? { right: '0' } : { right: '-200%' })
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

    {cartItems?.length > 0 ? (
      <Filled
        cartItems={cartItems}
        handleCheckout={handleCheckout}
      />
    ) : (
      <Empty emptyCart={emptyCart} />
    )}
  </div>
)

export default Cart
