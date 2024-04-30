import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { roleChanges, userIdChanges } from '../../app/myReducer/action'
import { login } from '../../apis/auth'
import { Form, Modal } from '../../components'
import { validateEmail } from '../../utils'
import bg from '../../assets/bg.png'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [messages, setMessages] = useState([])
  const [isNotification, setIsNotification] = useState(false)

  const dispatch = useDispatch()

  if (localStorage.getItem('token') && isNotification === false) return <Navigate to='/' />

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = data

    // validation
    let message = []

    if (email.length === 0 || password.length === 0) message = [...message, 'Email or password cannot be empty']

    if (email.length > 0 && validateEmail(email) === false) message = [...message, 'Invalid email address']

    if (message.length > 0) {
      setMessages(message)
    } else {
      try {
        const res = await login({ email, password })

        setMessages([res.data.message])
        setIsNotification(true)

        localStorage.setItem('token', res.data.token)
        dispatch(roleChanges(res.data.user.role))
        dispatch(userIdChanges(res.data.user._id))
      } catch (err) {
        message = [...message, err.response.data.message]
        setMessages(message)
      }
    }
  }

  const handleChanges = (e) =>
    setData(() => ({
      ...data,
      [e.target.id]: e.target.value,
    }))

  const closeNotification = () => {
    setIsNotification(false)
    setMessages([])
  }

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <div
        className='text-white rounded-4 shadow'
        style={{
          padding: '2em',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          width: '30em',
        }}
      >
        <h2 className='text-center fw-bold mb-3 text-uppercase'>sign in</h2>

        <Form
          data={data}
          messages={messages}
          handleChanges={handleChanges}
          handleSubmit={handleSubmit}
        />

        <p className='text-center mt-3 mb-0'>
          Don't have an account?
          <Link
            to='/register'
            className='text-decoration-none text-capitalize'
          >
            {' '}
            sign up{' '}
          </Link>
          now
        </p>

        <p className='text-center mb-0'>
          <Link
            to='/'
            className='text-decoration-none'
          >
            ← Back to home
          </Link>
        </p>
      </div>

      <Modal
        notification
        trigger={isNotification}
        setTrigger={closeNotification}
        title={messages}
        message='Happy shopping!'
      />
    </div>
  )
}

export default Login
