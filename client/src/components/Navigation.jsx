import { useNavigate } from 'react-router-dom'
import { Nav, Button, Dropdown } from 'react-bootstrap'
import { AiOutlineShoppingCart, AiOutlinePoweroff } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

import { roleChanges, userIdChanges } from '../app/myReducer/action'
import { logout } from '../apis/auth'

const Icons = {
  color: '#000',
  fontSize: '1.5rem',
}

const ProfileButton = styled(Dropdown.Toggle)`
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

const CartButton = styled(Button)`
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

const Navigation = () => {
  let cartState = useSelector((state) => state.cart)

  // const [cartToggle, setCartToggle] = useState(false);
  // const [count, setCount] = useState(cartState.length);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginAlert = async () => {
    alert('Please login first')
    navigate('/login')
  }

  const handleLogout = async () => {
    try {
      const res = await logout()

      alert(res.data.message)
      localStorage.removeItem('token')

      dispatch(roleChanges(''))
      dispatch(userIdChanges(''))

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const toCart = async () => {
    if (cartState.length > 0) {
      try {
        navigate('/cart')
      } catch (err) {
        console.error(err)
      }
    } else {
      alert('Please provide an item')
    }
  }

  return (
    <Nav>
      {localStorage.getItem('token') ? (
        <>
          <CartButton onClick={toCart}>
            <AiOutlineShoppingCart style={Icons} />

            <Counter>{cartState.length}</Counter>
          </CartButton>

          <Dropdown>
            <ProfileButton>
              <FiUser style={Icons} />
            </ProfileButton>

            <Dropdown.Menu variant='light'>
              <MyProfile onClick={() => navigate('/me')}>MY PROFILE</MyProfile>

              <Logout onClick={() => handleLogout()}>
                <AiOutlinePoweroff className='me-1' />
                LOGOUT
              </Logout>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <>
          <CartButton onClick={() => loginAlert()}>
            <AiOutlineShoppingCart style={Icons} />
          </CartButton>

          <ProfileButton onClick={() => navigate('/login')}>
            <FiUser style={Icons} />
          </ProfileButton>
        </>
      )}
      {/* <Carts trigger={cartToggle} setTrigger={setCartToggle} count={count} setCount={setCount} /> */}
    </Nav>
  )
}

export default Navigation
