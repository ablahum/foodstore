import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from 'react-bootstrap'

import { roleChanges, userIdChanges } from '../../app/myReducer/action'
import { Category, Search, NavBar, Carts, Modal } from '../../components'
import { getAll } from '../../apis/categories'
import { logout } from '../../apis/auth'

const { Brand } = Navbar

const Header = () => {
  let cartState = useSelector((state) => state.cart)

  const [categories, setCategories] = useState([])
  const [cartTrigger, setCartTrigger] = useState(false)
  const [isNotification, setIsNotification] = useState(false)
  const [notification, setNotification] = useState({
    title: '',
    message: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const getCategories = async () => {
    try {
      const res = await getAll()

      setCategories(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await logout()

      setIsNotification(true)
      setNotification({
        title: res.data.message,
        message: 'Thank you! We will gonna miss you',
      })

      localStorage.removeItem('token')

      dispatch(roleChanges(''))
      dispatch(userIdChanges(''))

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const closeNotification = () => {
    setIsNotification(false)
    setNotification({ title: '', message: '' })
  }

  useEffect(() => {
    getCategories()
  }, [])

  const isHome = location.pathname === '/'

  return (
    <Navbar className='shadow position-sticky top-0 z-1 bg-white'>
      <Container>
        <Brand
          onClick={() => navigate('/')}
          className='d-none d-sm-inline fw-bold fs-3 text-uppercase'
          style={{
            fontFamily: 'var(--serif)',
            letterSpacing: '-2px',
            cursor: 'pointer',
          }}
        >
          food
          <span
            className='fst-italic fw-normal'
            style={{
              fontFamily: 'var(--serif)',
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
          cartState={cartState}
          navigate={navigate}
          setTrigger={setCartTrigger}
          handleLogout={handleLogout}
        />
      </Container>

      <Carts
        trigger={cartTrigger}
        setTrigger={setCartTrigger}
      />

      <Modal
        notification
        setTrigger={closeNotification}
        trigger={isNotification}
        title={notification.title}
        message={notification.message}
      />
    </Navbar>
  )
}

export default Header
