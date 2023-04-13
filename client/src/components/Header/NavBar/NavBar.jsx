import { Nav, Dropdown } from 'react-bootstrap'
import { AiOutlineShoppingCart, AiOutlinePoweroff } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'

import { CartBtn, Counter, ProfileBtn, MyProfile, Logout } from './style'

const Icons = {
  color: '#000',
  fontSize: '1.5rem',
}

const NavBar = ({ cartState, navigate, loginAlert, toCart, handleLogout }) => (
  <Nav>
    <CartBtn onClick={() => (localStorage.getItem('token') ? toCart() : loginAlert())}>
      <AiOutlineShoppingCart style={Icons} />

      {localStorage.getItem('token') && <Counter>{cartState.length}</Counter>}
    </CartBtn>

    {localStorage.getItem('token') ? (
      <Dropdown>
        <ProfileBtn>
          <FiUser style={Icons} />
        </ProfileBtn>

        <Dropdown.Menu variant='light'>
          <MyProfile onClick={() => navigate('/me')}>MY PROFILE</MyProfile>

          <Logout onClick={() => handleLogout()}>
            <AiOutlinePoweroff className='me-1' />
            LOGOUT
          </Logout>
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <ProfileBtn onClick={() => navigate('/login')}>
        <FiUser style={Icons} />
      </ProfileBtn>
    )}
  </Nav>
)

export default NavBar
