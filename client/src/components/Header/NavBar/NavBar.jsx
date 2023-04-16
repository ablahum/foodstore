import { Dropdown } from 'react-bootstrap'
import { AiOutlineShoppingCart, AiOutlinePoweroff } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'

import { Wrapper, CartBtn, Counter, ProfileBtn, MyProfile, Logout } from './style'

const Icons = {
  color: '#000',
  fontSize: '1.5rem',
}

const { Menu } = Dropdown

const NavBar = ({ cartState, navigate, setTrigger, handleLogout }) => (
  <Wrapper>
    <CartBtn onClick={() => (localStorage.getItem('token') ? setTrigger(true) : navigate('/login'))}>
      <AiOutlineShoppingCart style={Icons} />

      {localStorage.getItem('token') && <Counter>{cartState.length}</Counter>}
    </CartBtn>

    {localStorage.getItem('token') ? (
      <Dropdown>
        <ProfileBtn>
          <FiUser style={Icons} />
        </ProfileBtn>

        <Menu>
          <MyProfile onClick={() => navigate('/me')}>MY PROFILE</MyProfile>

          <Logout onClick={() => handleLogout()}>
            <AiOutlinePoweroff className='me-1' />
            LOGOUT
          </Logout>
        </Menu>
      </Dropdown>
    ) : (
      <ProfileBtn onClick={() => navigate('/login')}>
        <FiUser style={Icons} />
      </ProfileBtn>
    )}
  </Wrapper>
)

export default NavBar
