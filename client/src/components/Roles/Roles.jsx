import { Button } from './style'

const Roles = ({ roles, role, setRole }) => (
  <>
    {roles.map((radio, idx) => (
      <Button
        key={idx}
        id={`radio-${idx}`}
        type='radio'
        className='text-light'
        variant={idx % 2 ? 'outline-primary' : 'outline-primary'}
        name='radio'
        value={radio.value}
        checked={role === radio.value}
        onChange={(e) => setRole(e.currentTarget.value)}
      >
        {radio.name}
      </Button>
    ))}
  </>
)

export default Roles
