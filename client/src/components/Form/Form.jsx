import { Button, Form as Wrapper } from 'react-bootstrap'

import { ErrorMessages } from '../../components'
import { Roles } from '../../components'

const { Group, Label, Control } = Wrapper

const Form = ({ register, messages, data, roles, handleChanges, handleSubmit }) => (
  <Wrapper
    action='/login'
    method='post'
  >
    {register && (
      <Group className='mb-3 text-uppercase'>
        <Label>name:</Label>

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

    <Group className='mb-3 text-uppercase'>
      <Label>email:</Label>

      <Control
        type='email'
        id='email'
        placeholder='Your email...'
        value={data.email}
        onChange={(e) => handleChanges(e)}
        className='h-50'
      />
    </Group>

    <Group className='mb-3 text-uppercase'>
      <Label>password:</Label>

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
      <Group className='mb-3 text-uppercase'>
        <Label className='me-3 mb-0 align-self-center'>role:</Label>

        <Roles
          role={roles}
          handleChanges={handleChanges}
        />
      </Group>
    )}

    {messages.length > 0 && <ErrorMessages errors={messages} />}

    <Button
      href='#'
      className='mt-2 text-uppercase text-white w-100 fw-semibold'
      onClick={(e) => handleSubmit(e)}
    >
      {register ? 'sign up' : 'sign in'}
    </Button>
  </Wrapper>
)

export default Form
