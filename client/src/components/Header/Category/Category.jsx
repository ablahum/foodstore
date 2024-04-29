import { useDispatch } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import { GiHamburgerMenu } from 'react-icons/gi'

import { categoryChanges } from '../../../app/myReducer/action'

const { Toggle, Menu, Item } = Dropdown

const Category = ({ categories }) => {
  const dispatch = useDispatch()

  return (
    <Dropdown>
      <Toggle className='text-white text-uppercase d-none d-sm-inline'>category</Toggle>

      <Toggle className='d-inline d-sm-none text-white'>
        <GiHamburgerMenu className='me-1' />
      </Toggle>

      <Menu>
        <Item
          value=''
          onClick={() => dispatch(categoryChanges(''))}
          className='text-capitalize'
        >
          all products...
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
