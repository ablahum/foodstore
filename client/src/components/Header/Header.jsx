import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from 'react-bootstrap'
import { changeRole, changeUserId } from '../../app/user/actions'
import { Category, Search, NavBar, Sidebar, Modal } from '../../components'
import { getAll } from '../../apis/categories'
import { logout } from '../../apis/auth'
import { putAll } from '../../apis/carts'

const { Brand } = Navbar

const Header = () => {
  const { guestCart, userCarts } = useSelector((state) => state.cart)
  const { userId } = useSelector((state) => state.user)

  const [categories, setCategories] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [cartTrigger, setCartTrigger] = useState(false)
  const [isNotification, setIsNotification] = useState(false)
  const [notification, setNotification] = useState({
    title: '',
    message: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const getCategories = async () => {
    try {
      const res = await getAll()

      setCategories(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await logout()

      setIsNotification(true)
      setNotification({
        title: res.data.message,
        message: 'Thank you! We will gonna miss you.'
      })

      localStorage.removeItem('token')

      dispatch(changeRole(''))
      dispatch(changeUserId(''))

      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  const handleCheckout = async () => {
    if (userId) {
      try {
        await putAll(userCarts[userId] || [])

        navigate('/checkout')
      } catch (err) {
        console.error(err)
      }
    } else {
      setIsNotification(true)
      setNotification({
        title: 'Please login before continue',
        message: 'You must logged in first to proceed to checkout.'
      })
    }
  }

  const closeNotification = () => {
    setIsNotification(false)

    if (notification.title === 'Please login before continue') {
      navigate('/login')
    }

    setNotification({ title: '', message: '' })
  }

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    setCartItems(userId ? userCarts[userId] : guestCart)
  }, [guestCart, userCarts, userId])

  const isHome = location.pathname === '/'

  return (
    <>
      <Navbar className='shadow position-sticky top-0 z-1 bg-white'>
        <Container>
          <Brand
            onClick={() => navigate('/')}
            className='d-none d-sm-inline fw-bold fs-3 text-uppercase'
            style={{
              fontFamily: 'var(--serif)',
              letterSpacing: '-2px',
              cursor: 'pointer'
            }}
          >
            food
            <span
              className='fst-italic fw-normal'
              style={{
                fontFamily: 'var(--serif)'
              }}
            >
              store
            </span>
          </Brand>

          {isHome && (
            <>
              <Category categories={categories} />

              <Search />
            </>
          )}

          <NavBar
            cartItems={cartItems}
            navigate={navigate}
            setTrigger={setCartTrigger}
            handleLogout={handleLogout}
          />
        </Container>

        <Sidebar
          trigger={cartTrigger}
          setTrigger={setCartTrigger}
          cartItems={cartItems}
          handleCheckout={handleCheckout}
        />

        <Modal
          notification
          setTrigger={closeNotification}
          trigger={isNotification}
          title={notification.title}
          message={notification.message}
        />
      </Navbar>
    </>
  )
}

export default Header
