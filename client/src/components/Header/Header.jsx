import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { roleChanges, userIdChanges } from '../../app/myReducer/action'
import { Category, Search, NavBar, Modal } from '../../components'
import { getAll } from '../../apis/categories'
import { logout } from '../../apis/auth'
import { Wrapper, Brand1, Brand2 } from './style'

const Header = () => {
  let cartState = useSelector((state) => state.cart)

  const [categories, setCategories] = useState([])
  const [show, setShow] = useState(false)
  const [notification, setNotification] = useState({
    title: '',
    message: '',
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getCategories = async () => {
    try {
      const res = await getAll()

      setCategories(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const loginAlert = async () => {
    setShow(true)
    setNotification({
      title: 'Please login first',
      message: 'Please login to continue shopping',
    })

    navigate('/login')
  }

  const toCart = () => {
    if (cartState.length > 0) {
      navigate('/cart')
    } else {
      setShow(true)
      setNotification({
        title: 'Please provide an item',
        message: 'You need to provide an item to continue to cart',
      })
    }
  }

  const handleLogout = async () => {
    try {
      const res = await logout()

      setShow(true)
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

  const handleClose = () => {
    setShow(false)
    setNotification({ title: '', message: '' })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Wrapper>
      <Container>
        <Brand1 onClick={() => navigate('/')}>
          FOOD<Brand2>STORE</Brand2>
        </Brand1>

        <Category categories={categories} />

        <Search />

        <NavBar
          cartState={cartState}
          navigate={navigate}
          loginAlert={loginAlert}
          toCart={toCart}
          handleLogout={handleLogout}
        />
      </Container>

      <Modal
        show={show}
        handleClose={handleClose}
        title={notification.title}
        message={notification.message}
      />
    </Wrapper>
  )
}

export default Header
