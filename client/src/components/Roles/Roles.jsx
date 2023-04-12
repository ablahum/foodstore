import { Button } from './style'

const Roles = ({ role, handleChanges }) => (
  <>
    <Button
      id='radio-1'
      type='radio'
      name='role'
      value='user'
      className='text-light'
      variant='outline-primary'
      checked={role === 'user'}
      onChange={(e) => handleChanges(e)}
    >
      USER
    </Button>

    <Button
      id='radio-2'
      type='radio'
      name='role'
      value='admin'
      className='text-light'
      variant='outline-primary'
      checked={role === 'admin'}
      onChange={(e) => handleChanges(e)}
    >
      ADMIN
    </Button>
  </>
)

export default Roles
