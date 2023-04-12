import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { register } from '../../apis/auth'
import { Form, Modal } from '../../components'
import { Wrapper, FormWrapper } from './style'

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })
  // const [role, setRole] = useState('user')
  const [messages, setMessages] = useState([])
  const [show, setShow] = useState(false)

  const navigate = useNavigate()

  if (localStorage.getItem('token')) return <Navigate to='/' />

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const { name, email, password } = data
    const { name, email, password, role } = data

    // validation
    let message = []
    if (name.length === 0) message = [...message, 'Name must be filled']

    if (email.length === 0) message = [...message, 'Email cannot be empty']

    if (password.length === 0) {
      message = [...message, 'Password cannot be empty']
    } else if (password.length < 8) {
      message = [...message, 'Password must be at least 8 characters']
    }

    if (message.length > 0) {
      setMessages(message)
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
          role,
        })
        setMessages([res.data.message])
        setShow(true)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleChanges = (e) => {
    if (e.target.id.includes('radio')) {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      })
    } else {
      setData(() => ({
        ...data,
        [e.target.id]: e.target.value,
      }))
    }
  }

  const handleClose = () => {
    setShow(false)
    setMessages([])
    navigate('/login')
  }

  return (
    <Wrapper>
      <FormWrapper>
        <h2 className='text-center fw-bold mb-4'>SIGN UP</h2>

        <Form
          register
          data={data}
          messages={messages}
          role={data.role}
          handleChanges={handleChanges}
          // handleRoleChanges={handleRoleChanges}
          handleSubmit={handleSubmit}
        />

        <p className='text-center mt-3 mb-0'>
          Already have an account?
          <Link
            to='/login'
            className='text-decoration-none'
          >
            {' '}
            Sign In{' '}
          </Link>
          instead
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
        message='Please login to continue'
      />
    </Wrapper>
  )
}

export default Register
