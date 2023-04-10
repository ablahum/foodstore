import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Container, Form } from 'react-bootstrap'

import { Role } from '../../components'
import { ShowErrors } from '../../utils'
import { Wrapper, FormWrapper, SubmitBtn } from './style'
import { register } from '../../apis/auth'

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [role, setRole] = useState('user')
  const roles = [
    { name: 'USER', value: 'user' },
    { name: 'ADMIN', value: 'admin' },
  ]

  const [errorMessages, setErrorMessages] = useState([])

  const navigate = useNavigate()

  if (localStorage.getItem('token')) return <Navigate to='/' />

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = data

    // VALIDATION
    let message = []
    if (name.length === 0) {
      message = [...message, 'Name must be filled']
    }
    if (email.length === 0) {
      message = [...message, 'Email cannot be empty']
    }
    if (password.length < 8) {
      message = [...message, 'Password must be at least 8 characters']
    }

    if (message.length > 0) {
      setErrorMessages(message)
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
          role,
        })

        alert(res.data.message)
        setErrorMessages([])
        navigate('/login')
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleChanges = (e) => {
    setData(() => ({
      ...data,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <Wrapper>
      <Container>
        <FormWrapper>
          <h2 className='text-center fw-bold mb-4'>SIGN UP</h2>

          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>NAME:</Form.Label>

              <Form.Control
                type='text'
                id='name'
                placeholder='Your name...'
                value={data.name}
                onChange={(e) => handleChanges(e)}
                className='h-50'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>EMAIL:</Form.Label>

              <Form.Control
                type='email'
                id='email'
                placeholder='Your email...'
                value={data.email}
                onChange={(e) => handleChanges(e)}
                className='h-50'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>PASSWORD:</Form.Label>

              <Form.Control
                type='password'
                id='password'
                placeholder='Your password...'
                value={data.password}
                onChange={(e) => handleChanges(e)}
                className='h-50'
              />
            </Form.Group>

            <div className='mb-3 d-flex'>
              <Form.Label className='me-4 mb-0 align-self-center'>ROLE:</Form.Label>

              <Role
                roles={roles}
                role={role}
                setRole={setRole}
              />
            </div>

            {errorMessages.length > 0 && <ShowErrors errors={errorMessages} />}

            <SubmitBtn
              href='#'
              className='mt-3'
              onClick={(e) => handleSubmit(e)}
            >
              SIGN UP
            </SubmitBtn>
          </Form>

          <p className='text-center mt-3 mb-0'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-decoration-none'
            >
              Sign In
            </Link>{' '}
            instead
            <br />
            <Link
              to='/'
              className='text-decoration-none'
            >
              ← Back to home
            </Link>
          </p>
        </FormWrapper>
      </Container>
    </Wrapper>
  )
}

export default Register
