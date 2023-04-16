import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { addItem, removeItem } from '../../../app/cart/actions'
import rupiah from 'rupiah-format'

import { subTotal, total } from '../../../utils'
import { Counter, NextBtn } from './style'

const Cart = ({ cartItems, handleSubmit }) => {
  const cartState = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  return (
    <div className='h-100 d-flex flex-column justify-content-between'>
      <div className='mx-4'>
        <Table
          size='sm'
          hover
          responsive
        >
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Sub Total</th>
            </tr>
          </thead>

          <tbody>
            {cartItems &&
              cartItems.map((item) => (
                <tr key={item._id}>
                  <td style={{ width: '50px' }}>
                    <img
                      src={`http://localhost:4000/public/${item.image}`}
                      alt={item.name}
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{rupiah.convert(item.price)}</td>
                  <td className='d-flex'>
                    <Counter onClick={() => dispatch(removeItem(item))}>
                      <AiOutlineMinus className='text-dark' />
                    </Counter>

                    <span className='mx-1 fw-bold'>{item.qty}</span>

                    <Counter onClick={() => dispatch(addItem(item))}>
                      <AiOutlinePlus className='text-dark' />
                    </Counter>
                  </td>
                  <td className='fw-bold'>{rupiah.convert(subTotal(item.price, item.qty))}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <div className='m-4'>
        <div className='d-flex justify-content-between mb-4'>
          <h4 className='align-self-center m-0 fs-5'>TOTAL:</h4>

          <h3 className='m-0 fw-bold fs-4'>{rupiah.convert(total(cartState))}</h3>
        </div>

        <NextBtn onClick={handleSubmit}>CHECKOUT</NextBtn>
      </div>
    </div>
  )
}

export default Cart
