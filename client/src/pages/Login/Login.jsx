import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { roleChanges, userIdChanges } from '../../app/myReducer/action'
import { login } from '../../apis/auth'
import { Form, Modal } from '../../components'
import { Wrapper, FormWrapper } from './style'
import { validateEmail } from '../../utils'

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [messages, setMessages] = useState([])
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  if (localStorage.getItem('token') && show === false) return <Navigate to='/' />

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
        setShow(true)

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

  const handleClose = () => {
    setShow(false)
    setMessages([])
  }

  return (
    <Wrapper>
      <FormWrapper>
        <h2 className='text-center fw-bold mb-4'>SIGN IN</h2>

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
            className='text-decoration-none'
          >
            {' '}
            Sign Up{' '}
          </Link>
          now
        </p>

        <p className='text-center'>
          <Link
            to='/'
            className='text-decoration-none'
          >
            ← Back to home
          </Link>
        </p>
      </FormWrapper>

      <Modal
        show={show}
        handleClose={handleClose}
        title={messages}
        message='Happy shopping!'
      />
    </Wrapper>
  )
}

export default Login
