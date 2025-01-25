import { Button, Form as FormWrapper } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ErrorMessages } from '../../components';
import { Roles } from '../../components';
import { Wrapper } from './style';

const { Group, Label, Control } = FormWrapper;

const Form = ({ register, errorMessages, data, roles, handleChanges, handleSubmit }) => (
  <Wrapper>
    <h2 className='text-center fw-bold mb-3 text-uppercase'>{register ? 'sign up' : 'sign in'}</h2>

    <FormWrapper
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

      {errorMessages.length > 0 && <ErrorMessages messages={errorMessages} />}

      <Button
        href='#'
        className='mt-2 text-uppercase text-white w-100 fw-semibold'
        onClick={(e) => handleSubmit(e)}
      >
        {register ? 'sign up' : 'sign in'}
      </Button>
    </FormWrapper>

    {register ? (
      <>
        <p className='text-center mt-3 mb-0'>
          Already have an account?
          <Link
            to='/login'
            className='text-decoration-none text-capitalize'
          >
            {' '}
            sign in{' '}
          </Link>
          instead
        </p>

        <p className='text-center mb-0'>
          <Link
            to='/'
            className='text-decoration-none'
          >
            ← Back to home
          </Link>
        </p>
      </>
    ) : (
      <>
        <p className='text-center mt-3 mb-0'>
          Don't have an account?
          <Link
            to='/register'
            className='text-decoration-none text-capitalize'
          >
            {' '}
            sign up{' '}
          </Link>
          now
        </p>

        <p className='text-center mb-0'>
          <Link
            to='/'
            className='text-decoration-none'
          >
            ← Back to home
          </Link>
        </p>
      </>
    )}
  </Wrapper>
);

export default Form;
