import { useDispatch } from 'react-redux'
import { FormControl, InputGroup } from 'react-bootstrap'

import { searchChanges } from '../../app/filter/actions'

const Search = () => {
  const dispatch = useDispatch()

  return (
    <InputGroup className='mx-3'>
      <FormControl
        placeholder='Search products...'
        onKeyUp={(e) => dispatch(searchChanges(e.target.value))}
      />
    </InputGroup>
  )
}

export default Search
