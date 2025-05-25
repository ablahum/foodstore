import { Button, Dropdown } from 'react-bootstrap'
import { AiOutlineShoppingCart, AiOutlinePoweroff } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'
import { Nav } from 'react-bootstrap'

const { Toggle, Menu, Item } = Dropdown

const NavBar = ({ cartItems, navigate, setTrigger, handleLogout }) => (
  <Nav>
    <Button
      className='bg-transparent border-0 position-relative p-2 me-2'
      onClick={() => setTrigger(true)}
    >
      <AiOutlineShoppingCart className='fs-4' />

      <p
        className='fw-semibold text-white bg-danger py-0 px-1 rounded-circle position-absolute top-0 end-0'
        style={{ fontSize: '0.7rem' }}
      >
        {cartItems.length}
      </p>
    </Button>

    {localStorage.getItem('token') ? (
      <Dropdown className='p-2'>
        <Toggle className='bg-transparent border-0 p-0'>
          <FiUser className='fs-4' />
        </Toggle>

        <Menu className='py-0 dropdown-menu-end'>
          <Item
            className='text-uppercase py-2'
            onClick={() => navigate('/me')}
          >
            my profile
          </Item>

          <Item
            className='text-uppercase py-2 text-white bg-danger d-flex align-items-center'
            onClick={() => handleLogout()}
          >
            <AiOutlinePoweroff className='me-2' />
            logout
          </Item>
        </Menu>
      </Dropdown>
    ) : (
      <Button
        className='bg-transparent border-0 p-2'
        onClick={() => navigate('/login')}
      >
        <FiUser className='fs-5' />
      </Button>
    )}
  </Nav>
)

export default NavBar
