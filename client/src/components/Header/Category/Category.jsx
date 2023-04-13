import { useDispatch } from 'react-redux'
import { Dropdown } from 'react-bootstrap'

import { categoryChanges } from '../../../app/myReducer/action'
import { Btn, Item } from './style'

const { Menu } = Dropdown

const Category = ({ categories }) => {
  const dispatch = useDispatch()

  return (
    <Dropdown>
      <Btn variant='primary'>CATEGORY</Btn>

      <Menu>
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
      </Menu>
    </Dropdown>
  )
}

export default Category
