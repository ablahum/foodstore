import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

import { roleChanges, userIdChanges } from '../app/myReducer/action'
import { ShowErrors } from '../utils'
import bg from '../assets/banner-1.jpg'
import { login } from '../apis/auth'

const Wrapper = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  display: flex;
  align-items: center;
`

const FormWrapper = styled.div`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2em;
  width: 40%;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 1);
`

const Submit = styled(Button)`
  color: #fff;
  width: 100%;
  font-weight: 600;
  border: none;
`

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [errorMessages, setErrorMessages] = useState([])

  const dispatch = useDispatch()

  if (localStorage.getItem('token')) return <Navigate to='/' />

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = data

    // VALIDATION
    let message = []
    if (email.length === 0 || password.length === 0) message = [...message, 'Email or password cannot be empty']

    if (message.length > 0) {
      setErrorMessages(message)
    } else {
      try {
        const res = await login({ email, password })

        alert(res.data.message)
        setErrorMessages([])
        localStorage.setItem('token', res.data.token)

        dispatch(roleChanges(res.data.user.role))
        dispatch(userIdChanges(res.data.user._id))
      } catch (err) {
        alert(err.response.data.message)
        setErrorMessages([])
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
          <h2 className='text-center fw-bold mb-4'>SIGN IN</h2>

          <Form action='/login' method='post'>
            <Form.Group className='mb-3'>
              <Form.Label>EMAIL:</Form.Label>

              <Form.Control type='email' id='email' placeholder='Your email...' value={data.email} onChange={(e) => handleChanges(e)} className='h-50' />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>PASSWORD:</Form.Label>

              <Form.Control type='password' id='password' placeholder='Your password...' value={data.password} onChange={(e) => handleChanges(e)} className='h-50' />
            </Form.Group>

            {errorMessages.length > 0 && <ShowErrors errors={errorMessages} />}

            <Submit href='#' className='mt-3' onClick={(e) => handleSubmit(e)}>
              SIGN IN
            </Submit>
          </Form>

          <p className='text-center mt-3 mb-0'>
            Don't have an account?{' '}
            <Link to='/register' className='text-decoration-none'>
              Sign Up
            </Link>{' '}
            now
            <br></br>
            <Link to='/' className='text-decoration-none'>
              ← Back to home
            </Link>
          </p>
        </FormWrapper>
      </Container>
    </Wrapper>
  )
}

export default Login
