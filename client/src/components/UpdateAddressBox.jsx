import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

import { updateOne } from '../apis/delivery-addresses'

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

const UpdateAddressBox = ({ id, trigger, setTrigger }) => {
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
      const res = await updateOne(id, data)

      alert(res.data.message)
      setTrigger(false)
    } catch (err) {
      console.error(err)
    }
  }

  return trigger ? (
    <Popup>
      <Wrapper>
        <h2 className='fw-bold mb-4'>UPDATE ADDRESS</h2>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>NAMA</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='nama' value={data.nama} onChange={(e) => handleChanges(e)} placeholder='Nama alamat' />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>KELURAHAN</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='kelurahan' value={data.kelurahan} onChange={(e) => handleChanges(e)} placeholder='Kelurahan' />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>KECAMATAN</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='kecamatan' value={data.kecamatan} onChange={(e) => handleChanges(e)} placeholder='Kecamatan' />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>KABUPATEN</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='kabupaten' value={data.kabupaten} onChange={(e) => handleChanges(e)} placeholder='Kabupaten' />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>PROVINSI</Form.Label>

            <Form.Control className='w-50 h-50 w-75' type='text' id='provinsi' value={data.provinsi} onChange={(e) => handleChanges(e)} placeholder='Provinsi' />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0'>DETAIL</Form.Label>

            <Form.Control as='textarea' rows={3} className='w-75' type='text' id='detail' value={data.detail} onChange={(e) => handleChanges(e)} placeholder='Detail alamat' />
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

export default UpdateAddressBox
