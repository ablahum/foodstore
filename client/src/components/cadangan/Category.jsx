import { useDispatch } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

import { categoryChanges } from '../app/myReducer/action'

const Btn = styled(Dropdown.Toggle)`
  color: #fff;
  font-weight: 500;
  margin: 0.5em;
  border: none;

  &:before {
    content: '|';
    margin-right: 0.5rem;
  }

  @media (max-width: 425px) {
    display: none;
  }
`

const Item = styled(Dropdown.Item)`
  :hover {
    color: #fff;
    background-color: #fd7e14;
  }

  :active {
    font-weight: 500;
    color: #000;
    background-color: #fd9843;
  }
`

const Category = ({ categories }) => {
  const dispatch = useDispatch()

  return (
    <Dropdown>
      <Btn variant='primary'>CATEGORY</Btn>

      <Dropdown.Menu>
        <Item
          value=''
          onClick={() => dispatch(categoryChanges(''))}
        >
          All Products...
        </Item>
        {categories.map((category, i) => (
          <Item
            key={i}
            value={category.name}
            onClick={() => dispatch(categoryChanges(category.name))}
          >
            {category.name}
          </Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default Category
