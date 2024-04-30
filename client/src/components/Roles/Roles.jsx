import { ToggleButton } from 'react-bootstrap'

const Roles = ({ role, handleChanges }) => (
  <>
    <ToggleButton
      id='radio-1'
      type='radio'
      name='role'
      value='user'
      className='text-light text-uppercase py-0 px-3 rounded-0 rounded-start'
      variant='outline-primary'
      checked={role === 'user'}
      onChange={(e) => handleChanges(e)}
    >
      user
    </ToggleButton>

    <ToggleButton
      id='radio-2'
      type='radio'
      name='role'
      value='admin'
      className='text-light text-uppercase py-0 px-3 rounded-0 rounded-end'
      variant='outline-primary'
      checked={role === 'admin'}
      onChange={(e) => handleChanges(e)}
    >
      admin
    </ToggleButton>
  </>
)

export default Roles
