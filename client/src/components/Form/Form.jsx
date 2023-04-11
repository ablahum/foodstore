import { Form as Wrapper } from 'react-bootstrap'

import { ShowErrors } from '../../utils'
import { SubmitBtn } from './style'
import Role from '../Roles'

const { Group, Label, Control } = Wrapper

const Form = ({ register, messages, data, role, roles, setRole, handleChanges, handleSubmit }) => (
  <Wrapper
    action='/login'
    method='post'
  >
    {register && (
      <Group className='mb-3'>
        <Label>NAME:</Label>

        <Control
          type='text'
          id='name'
          placeholder='Your name...'
          value={data.name}
          onChange={(e) => handleChanges(e)}
          className='h-50'
        />
      </Group>
    )}

    <Group className='mb-3'>
      <Label>EMAIL:</Label>

      <Control
        type='email'
        id='email'
        placeholder='Your email...'
        value={data.email}
        onChange={(e) => handleChanges(e)}
        className='h-50'
      />
    </Group>

    <Group className='mb-3'>
      <Label>PASSWORD:</Label>

      <Control
        type='password'
        id='password'
        placeholder='Your password...'
        value={data.password}
        onChange={(e) => handleChanges(e)}
        className='h-50'
      />
    </Group>

    {register && (
      <Group className='mb-3'>
        <Label className='me-4 mb-0 align-self-center'>ROLE:</Label>

        <Role
          roles={roles}
          role={role}
          setRole={setRole}
        />
      </Group>
    )}

    {messages.length > 0 && <ShowErrors errors={messages} />}

    <SubmitBtn
      href='#'
      className='mt-3'
      onClick={(e) => handleSubmit(e)}
    >
      SIGN IN
    </SubmitBtn>
  </Wrapper>
)

export default Form
