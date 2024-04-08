import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import { Heading, Navigator } from '../../components'
import { Wrapper } from './style'

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
      <Heading title='account' />

      <Container className='py-md-5 py-4'>
        <div className='d-flex flex-column flex-md-row justify-content-between'>
          <div className='me-md-4 mt-md-0 mb-md-0 mb-3'>
            <Navigator />
          </div>

          <div className='flex-grow-1'>
            <Outlet />
          </div>
        </div>
      </Container>
    </Wrapper>
  )
}

export default Account
