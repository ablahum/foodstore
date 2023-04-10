import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import { Heading, Navigator } from '../components'

const Wrapper = styled.div`
  min-height: 87vh;
`

const Account = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/me/profile')
  }, [])

  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />
  }

  return (
    <Wrapper>
      <Heading title='ACCOUNT' />

      <Container className='py-5'>
        <div className='d-flex justify-content-between'>
          <div className='w-25'>
            <Navigator />
          </div>

          <div className='px-3 w-75'>
            <Outlet />
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}

export default Account
