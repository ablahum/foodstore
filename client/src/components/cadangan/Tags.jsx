import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { tagsChanges } from '../app/myReducer/action'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h2`
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
  margin-right: 1em;

  @media (max-width: 1199px) {
    display: none;
  }
`

const Toggle = styled(ToggleButtonGroup)`
  @media (max-width: 767px) {
    margin-top: 1em;
  }

  @media (max-width: 425px) {
    // display: flex;
    // flex-wrap: wrap;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const TagButton = styled(ToggleButton)`
  font-size: 1rem;
  font-weight: 500;
  padding: 0.2em 1.3em;
`

const Tags = ({ tags }) => {
  let globalState = useSelector((state) => state.my)

  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Title>Search Menu by Tags:</Title>

      <Toggle type='checkbox' value={globalState.tags} onChange={(e) => dispatch(tagsChanges(e))}>
        {tags &&
          tags.map((tag, i) => (
            <TagButton id={`tbg-btn-${i + 1}`} key={tag._id} value={tag.name} variant='outline-primary' className='fw-bold'>
              {tag.name}
            </TagButton>
          ))}
      </Toggle>
    </Wrapper>
  )
}

export default Tags
