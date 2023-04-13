import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { pageChanges } from '../../app/myReducer/action'
import { Title } from './style'

const Pagination = () => {
  let globalState = useSelector((state) => state.my)

  const dispatch = useDispatch()

  const handleClick = (data) => dispatch(pageChanges(data.selected + 1))

  return (
    <div className='d-flex align-items-center'>
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
      <Title>Page {globalState.page} of 3</Title>
    </div>
  )
}

export default Pagination
