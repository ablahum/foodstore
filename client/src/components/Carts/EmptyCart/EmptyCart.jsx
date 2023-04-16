const EmptyCart = ({ emptyCart }) => (
  <>
    <div className='h-100 d-flex flex-column justify-content-center align-items-center'>
      <img
        src={emptyCart}
        alt='empty'
      />

      <h3 className='fs-6 m-3'>YOUR CART IS EMPTY</h3>
    </div>
  </>
)

export default EmptyCart
