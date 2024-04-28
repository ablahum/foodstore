import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'

import { pageChanges } from '../../app/myReducer/action'

const Pagination = () => {
  let globalState = useSelector((state) => state.my)

  const dispatch = useDispatch()

  const handleClick = (data) => dispatch(pageChanges(data.selected + 1))

  return (
    <div className='d-flex align-items-center justify-content-center justify-content-sm-start mt-2'>
      <ReactPaginate
        pageCount={3}
        onPageChange={handleClick}
        containerClassName={'pagination m-0'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link fw-bold'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />

      <p className='text-muted m-0 ms-2 d-none d-sm-inline'>Page {globalState.page} of 3</p>
    </div>
  )
}

export default Pagination
