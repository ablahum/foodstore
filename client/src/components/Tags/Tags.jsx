import { useDispatch, useSelector } from 'react-redux'

import { tagsChanges } from '../../app/myReducer/action'
import { Wrapper, Title, Toggle, Tag } from './style'

const Tags = ({ tags }) => {
  let globalState = useSelector((state) => state.my)

  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Title>Search Menu by Tags:</Title>

      <Toggle
        type='checkbox'
        value={globalState.tags}
        onChange={(e) => dispatch(tagsChanges(e))}
      >
        {tags &&
          tags.map((tag, i) => (
            <Tag
              id={`tbg-btn-${i + 1}`}
              key={tag._id}
              value={tag.name}
              variant='outline-primary'
              className='fw-bold'
            >
              {tag.name}
            </Tag>
          ))}
      </Toggle>
    </Wrapper>
  )
}

export default Tags
