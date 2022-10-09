import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { createOne } from '../apis/category'

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

const CancelBtn = styled(Button)`
  width: 40%;
  background-color: transparent;
  font-weight: 600;
  margin-right: 1em;
`

const ConfirmBtn = styled(Button)`
  width: 60%;
  color: #fff;
  font-weight: 600;
  border: none;
`

const NewCategoryBox = ({ trigger, setTrigger }) => {
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createOne({ name })

      alert(res.data.message)
      setTrigger(false)
    } catch (err) {
      console.log(err)
    }
  }

  return trigger ? (
    <Popup>
      <Wrapper>
        <h2 className='fw-bold mb-4'>ADD NEW CATEGORY</h2>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>NAME</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='nama' placeholder='Category name' onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <div className='mt-4 d-flex'>
            <CancelBtn onClick={() => setTrigger(false)}>CANCEL</CancelBtn>

            <ConfirmBtn type='submit' className='m-0'>
              CONFIRM
            </ConfirmBtn>
          </div>
        </Form>
      </Wrapper>
    </Popup>
  ) : (
    ''
  )
}

export default NewCategoryBox
