import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import styled from 'styled-components'
import { createOne } from '../apis/delivery-addresses'

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

const NewAddressBox = ({ trigger, setTrigger }) => {
  const [data, setData] = useState({
    nama: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    detail: '',
  })

  const handleChanges = (e) => {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createOne(data)

      alert(res.data.message)
      setTrigger(false)
    } catch (err) {
      console.error(err)
    }
  }

  return trigger ? (
    <Popup>
      <Wrapper>
        <h2 className='fw-bold mb-4'>ADD NEW ADDRESS</h2>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>NAMA</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='nama' placeholder='Nama alamat' onChange={(e) => handleChanges(e)} />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>KELURAHAN</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='kelurahan' placeholder='Kelurahan' onChange={(e) => handleChanges(e)} />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>KECAMATAN</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='kecamatan' placeholder='Kecamatan' onChange={(e) => handleChanges(e)} />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>KABUPATEN</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='kabupaten' placeholder='Kabupaten' onChange={(e) => handleChanges(e)} />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>PROVINSI</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='provinsi' placeholder='Provinsi' onChange={(e) => handleChanges(e)} />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0'>DETAIL</Form.Label>

            <Form.Control as='textarea' rows={3} className='w-75' type='text' id='detail' placeholder='Detail alamat' onChange={(e) => handleChanges(e)} />
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

export default NewAddressBox
