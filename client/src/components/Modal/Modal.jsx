import { Alert, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const { Group, Label, Control } = Form

const Popup = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`

const Wrapper = styled.div`
  width: 45em;
  border-radius: 10px;
  padding: 2em;
  background-color: #fff;
  box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);
  position: relative;
`

const Cancel = styled(Button)`
  width: 40%;
  background-color: transparent;
  font-weight: 600;
  margin-right: 1em;
`

const Confirm = styled(Button)`
  width: 60%;
  color: #fff;
  font-weight: 600;
  border: none;
`

const Modal = ({ type, trigger, setTrigger, setName, submit, isUpdate, isDelete }) => {
  return trigger ? (
    <Popup>
      <Wrapper>
        <h2 className='fw-bold mb-4'>
          {isUpdate ? 'UPDATE' : isDelete ? 'DELETE' : 'ADD NEW'}
          <span className='text-uppercase'> {type}</span>
        </h2>
        {isDelete ? (
          <Alert
            variant='danger'
            className='text-center fw-bold fs-5 mt-3 mb-0 py-2'
          >
            Are you sure want to delete {type}?
          </Alert>
        ) : (
          <Form>
            <Group className='d-flex'>
              <Label className='w-50 m-0 align-self-center'>NAME</Label>

              <Control
                className='w-50 h-50 w-75'
                type='text'
                id='nama'
                placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} name...`}
                onChange={(e) => setName(e.target.value)}
              />
            </Group>
          </Form>
        )}
        <div className='mt-4 d-flex'>
          <Cancel onClick={() => setTrigger(false)}>CANCEL</Cancel>

          <Confirm
            onClick={(e) => submit(e)}
            className='m-0'
          >
            CONFIRM
          </Confirm>
        </div>
      </Wrapper>
    </Popup>
  ) : (
    ''
  )
}

export default Modal
