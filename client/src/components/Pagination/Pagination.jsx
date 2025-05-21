import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'

import { changePage } from '../../app/pagination/action'

const Pagination = () => {
  let paginationState = useSelector((state) => state.pagination)
  const { page, perPage, totalItems } = paginationState

  const dispatch = useDispatch()

  const shown = page * perPage > totalItems ? totalItems - (page - 1) * perPage : perPage
  const pageCount = Math.ceil(totalItems / perPage)

  const handleClick = (data) => dispatch(changePage(data.selected + 1))

  return (
    <div className='d-flex align-items-center justify-content-center justify-content mt-2 gap-2'>
      <p className='text-muted m-0 d-none d-sm-inline'>
        Page {page} of {pageCount}
      </p>

      <ReactPaginate
        pageCount={pageCount}
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

      <p className='text-muted m-0 d-none d-sm-inline'>
        Showing {shown} of {totalItems}
      </p>
    </div>
  )
}

export default Pagination
