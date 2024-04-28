import { useDispatch, useSelector } from 'react-redux'

import { tagsChanges } from '../../app/myReducer/action'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
const Tag = ({ tags }) => {
  let globalState = useSelector((state) => state.my)

  const dispatch = useDispatch()

  return (
    <div className='d-flex align-items-center justify-content-center justify-content-md-end mb-2'>
      <p className='text-muted m-0 me-2 d-none d-md-inline'>Search Menu by Tags:</p>

      <ToggleButtonGroup
        type='checkbox'
        className='d-flex flex-wrap'
        value={globalState.tags}
        onChange={(e) => dispatch(tagsChanges(e))}
      >
        {tags &&
          tags.map((tag, i) => (
            <ToggleButton
              id={`tbg-btn-${i + 1}`}
              key={tag._id}
              value={tag.name}
              variant='outline-primary'
              className='fw-bold'
            >
              {tag.name}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </div>
  )
}

export default Tag
