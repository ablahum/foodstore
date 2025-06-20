import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { addItem, removeItem } from '../../app/cart/actions'
import rupiah from 'rupiah-format'
import { subTotal, total } from '../../utils'

const Filled = ({ cartItems, handleCheckout }) => {
  const { userId } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  return (
    <div className='h-100 d-flex flex-column justify-content-between'>
      <div
        className='mx-3 table-responsive flex-grow-1'
        style={{
          height: '0'
        }}
      >
        <Table
          hover
          responsive
        >
          <thead>
            <tr>
              <th className='text-uppercase'>item name</th>
              <th className='text-uppercase text-center'>qty</th>
              <th className='text-uppercase text-end'>total</th>
            </tr>
          </thead>

          <tbody>
            {cartItems &&
              cartItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <div className='d-flex align-items-center justify-content-center'>
                      <Button
                        className='bg-transparent py-0 px-1'
                        onClick={() => dispatch(removeItem(item, userId))}
                      >
                        <AiOutlineMinus className='text-dark' />
                      </Button>

                      <span className='mx-1 fw-bold'>{item.qty}</span>

                      <Button
                        className='bg-transparent py-0 px-1'
                        onClick={() => dispatch(addItem(item, userId))}
                      >
                        <AiOutlinePlus className='text-dark' />
                      </Button>
                    </div>
                  </td>
                  <td className='fw-bold text-end'>{rupiah.convert(subTotal(item.price, item.qty))}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <div className='m-3'>
        <div className='d-flex justify-content-between mb-3'>
          <p className='align-self-center m-0 text-uppercase'>sub total:</p>

          <p className='m-0 fw-bold fs-4'>{rupiah.convert(total(cartItems))}</p>
        </div>

        <Button
          className='w-100 text-white fw-semibold text-uppercase'
          onClick={() => handleCheckout()}
        >
          checkout
        </Button>
      </div>
    </div>
  )
}

export default Filled
