import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { register } from '../../apis/auth'
import { Form, Modal } from '../../components'
import { validateEmail } from '../../utils'
import bg from '../../assets/bg.png'

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  })
  const [messages, setMessages] = useState([])
  const [isNotification, setIsNotification] = useState(false)

  const navigate = useNavigate()

  if (localStorage.getItem('token')) return <Navigate to='/' />

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, role } = data

    // validation
    let message = []
    if (name.length === 0) message = [...message, 'Name must be filled']

    if (email.length === 0) message = [...message, 'Email cannot be empty']

    if (email.length > 0 && validateEmail(email) === false) message = [...message, 'Invalid email address']

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
        setIsNotification(true)
      } catch (err) {
        console.error(err)
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

  const closeNotification = () => {
    setIsNotification(false)
    setMessages([])
    navigate('/login')
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
        <h2 className='text-center fw-bold mb-3 text-uppercase'>sign up</h2>

        <Form
          register
          data={data}
          messages={messages}
          roles={data.role}
          handleChanges={handleChanges}
          handleSubmit={handleSubmit}
        />

        <p className='text-center mt-3 mb-0'>
          Already have an account?
          <Link
            to='/login'
            className='text-decoration-none text-capitalize'
          >
            {' '}
            sign in{' '}
          </Link>
          instead
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
        message='Please login to continue'
      />
    </div>
  )
}

export default Register
