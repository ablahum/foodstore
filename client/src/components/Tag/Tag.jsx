import { useDispatch, useSelector } from 'react-redux'

import { tagsChanges } from '../../app/filter/actions'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

const Tag = ({ isHome, tagsData, handleSelect }) => {
  const { tags } = useSelector((state) => state.filter)

  const dispatch = useDispatch()

  return (
    <div className='d-flex align-items-center justify-content-center justify-content-md-end mb-2'>
      {isHome && <p className='text-muted m-0 me-2 d-none d-md-inline'>Search Menu by Tags:</p>}

      <ToggleButtonGroup
        type='checkbox'
        className='d-flex flex-wrap'
        value={tags}
        onChange={(e) => (isHome ? dispatch(tagsChanges(e)) : handleSelect(e))}
      >
        {tagsData &&
          tagsData.map((tag, i) => (
            <ToggleButton
              id={`tbg-btn-${i + 1}`}
              key={tag._id}
              value={tag.name}
              variant='outline-primary'
              className='fw-bold py-1 px-2 py-sm-2 px-sm-3'
            >
              {tag.name}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>
    </div>
  )
}

export default Tag
