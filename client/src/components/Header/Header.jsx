import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { roleChanges, userIdChanges } from '../../app/myReducer/action'
import { Category, Search, NavBar, Modal, Carts } from '../../components'
import { getAll } from '../../apis/categories'
import { logout } from '../../apis/auth'
import { Wrapper, Brand1, Brand2 } from './style'

const Header = () => {
  let cartState = useSelector((state) => state.cart)

  const [categories, setCategories] = useState([])
  const [cartTrigger, setCartTrigger] = useState(false)
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
        <div onClick={() => navigate('/')}>
          <Brand1>
            FOOD<Brand2>STORE</Brand2>
          </Brand1>
        </div>

        <Category categories={categories} />

        <Search />

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
        show={show}
        handleClose={handleClose}
        title={notification.title}
        message={notification.message}
      />
    </Wrapper>
  )
}

export default Header
