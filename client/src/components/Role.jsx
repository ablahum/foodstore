import { ToggleButton } from 'react-bootstrap'
import styled from 'styled-components'

const Button = styled(ToggleButton)`
  color: #fff;
  background-color: #1c1f23;
  font-size: 1rem;
  border: none;
  padding: 0 2em;

  @media (max-width: 440px) {
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    padding: 0 1em;
  }
`

const Role = ({ roles, role, setRole }) => {
  return (
    <>
      {roles.map((radio, idx) => (
        <Button
          key={idx}
          id={`radio-${idx}`}
          type='radio'
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
}

export default Role
