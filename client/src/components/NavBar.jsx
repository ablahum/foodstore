import { Nav, Button, Dropdown } from 'react-bootstrap'
import { AiOutlineShoppingCart, AiOutlinePoweroff } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'
import styled from 'styled-components'

const Icons = {
  color: '#000',
  fontSize: '1.5rem',
}

const CartBtn = styled(Button)`
  background-color: #f8f9fa;
  padding: 0.5em;
  border: none;
  position: relative;

  :hover {
    background-color: #fd9843;
  }
`

const Counter = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  background-color: red;
  padding: 0 6px;
  border-radius: 100%;
  position: absolute;
  top: 0;
  right: 0;
`

const ProfileBtn = styled(Dropdown.Toggle)`
  background-color: #f8f9fa;
  padding: 0.5em;
  border: none;
  list-style: none;
  margin-left: 0.3em;

  :hover {
    background-color: #fd9843;
  }

  ::after {
    display: none !important;
  }
`

const MyProfile = styled(Dropdown.Item)`
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

const Logout = styled(Dropdown.Item)`
  color: #fff;
  background-color: #dc3545;

  :hover {
    color: #fff;
    background-color: #b52b39;
  }

  :active {
    font-weight: 500;
    color: #000;
    background-color: #fd9843;
  }
`

const NavBar = ({ cartState, navigate, loginAlert, toCart, handleLogout }) => {
  return (
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
}

export default NavBar
