import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

import { Role } from '../components'
import { ShowErrors } from '../utils'
import bgHero from '../assets/banner-1.jpg'
import { register } from '../apis/auth'

const Wrapper = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgHero});
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

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [role, setRole] = useState('user')
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
              <Form.Control type='text' id='name' placeholder='Your name...' value={data.name} onChange={(e) => handleChanges(e)} className='h-50' />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>EMAIL:</Form.Label>
              <Form.Control type='email' id='email' placeholder='Your email...' value={data.email} onChange={(e) => handleChanges(e)} className='h-50' />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>PASSWORD:</Form.Label>
              <Form.Control type='password' id='password' placeholder='Your password...' value={data.password} onChange={(e) => handleChanges(e)} className='h-50' />
            </Form.Group>

            <div className='mb-3 d-flex'>
              <Form.Label className='me-4 mb-0 align-self-center'>ROLE:</Form.Label>
              <Role onChange={(e) => setRole(e)} />
            </div>

            {errorMessages.length > 0 && <ShowErrors errors={errorMessages} />}

            <Submit href='#' className='mt-3' onClick={(e) => handleSubmit(e)}>
              SIGN IN
            </Submit>
          </Form>

          <p className='text-center mt-3 mb-0'>
            Already have an account?{' '}
            <Link to='/login' className='text-decoration-none'>
              Sign In
            </Link>{' '}
            instead
            <br />
            <Link to='/' className='text-decoration-none'>
              ← Back to home
            </Link>
          </p>
        </FormWrapper>
      </Container>
    </Wrapper>
  )
}

export default Register
