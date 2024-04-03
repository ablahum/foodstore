import { useState, useEffect } from 'react'
import { Accordion, Form, Button } from 'react-bootstrap'

import { getMe } from '../../apis/auth'
import { getAll } from '../../apis/delivery-addresses'
import { Update, Delete } from './style'
import { Modal } from '../Modal'
import { createOne, updateOne, deleteOne } from '../../apis/delivery-addresses'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    nama: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    detail: '',
  })
  const [address, setAddress] = useState([])
  const [addressName, setAddressName] = useState('')
  const [addressId, setAddressId] = useState('')

  const [submitType, setSubmitType] = useState('')
  const [modalType, setModalType] = useState('')
  const [messages, setMessages] = useState([])

  const getData = async () => {
    try {
      const res = await getMe()

      setData(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const getAddresses = async () => {
    try {
      const res = await getAll()

      setAddress(res.data.addresses)
    } catch (err) {
      console.error(err)
    }
  }

  const triggerModal = (type, id = '', name = '') => {
    setMessages([])

    setModalType(type)
    setSubmitType(type)
    setAddressId(id)
    setAddressName(name)
  }

  const handleChanges = (e) => {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { nama, kelurahan, kecamatan, kabupaten, provinsi, detail } = data

    let message = []
    if (nama.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Name must be filled']

    if (kelurahan.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Kelurahan cannot be empty']

    if (kecamatan.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Kecamatan cannot be empty']

    if (kabupaten.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Kabupaten cannot be empty']

    if (provinsi.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Provinsi cannot be empty']

    if (detail.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Detail address cannot be empty']

    if (message.length > 0) {
      setMessages(message)
    } else {
      try {
        let res = {}

        if (submitType === 'create') {
          res = await createOne({
            nama: '',
            kelurahan: '',
            kecamatan: '',
            kabupaten: '',
            provinsi: '',
            detail: '',
          })
        } else if (submitType === 'update') {
          res = await updateOne(addressId, {
            nama: '',
            kelurahan: '',
            kecamatan: '',
            kabupaten: '',
            provinsi: '',
            detail: '',
          })
        } else if (submitType === 'delete') {
          res = await deleteOne(addressId)
        }

        setMessages([res.data.message])
        setModalType('')
        setSubmitType('')
        setAddressName('')
        setAddressId('')
        getAddresses()
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    getData()
    getAddresses()
  }, [])

  return (
    <div>
      <div>
        <h2 className='fw-bold fs-3 mb-3'>YOUR ACCOUNT</h2>

        <Form className='mb-4'>
          <Form.Group className='d-flex p-2'>
            <Form.Label className='w-50 m-0 fs-5 align-self-center'>NAME</Form.Label>

            <Form.Control
              className='w-50 h-50'
              placeholder={data.name}
              disabled
            />
          </Form.Group>

          <Form.Group className='d-flex p-2'>
            <Form.Label className='w-50 m-0 fs-5 align-self-center'>EMAIL ADDRESS</Form.Label>

            <Form.Control
              className='w-50 h-50'
              placeholder={data.email}
              disabled
            />
          </Form.Group>
        </Form>
      </div>

      <div className='mb-3 d-flex justify-content-between'>
        <h2 className='fw-bold fs-3 d-inline mb-0'>YOUR ADDRESS</h2>

        <Button
          className='text-light py-0 px-3'
          onClick={() => triggerModal('create')}
        >
          ADD NEW ADDRESS
        </Button>
      </div>

      <Accordion>
        {address.map((a, i) => (
          <Accordion.Item
            eventKey={i}
            key={i}
          >
            <Accordion.Header>
              <h3 className='fs-5 m-0'>{a.nama}</h3>
            </Accordion.Header>

            <Accordion.Body className='p-3'>
              <Form className='d-flex justify-content-around'>
                <div className='d-flex flex-column'>
                  <Form.Group>
                    <Form.Label className='w-50 m-0 align-self-center'>KELURAHAN</Form.Label>

                    <Form.Control
                      className='h-50'
                      placeholder={a.kelurahan}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className='mt-2'>
                    <Form.Label className='w-50 m-0 align-self-center'>KECAMATAN</Form.Label>

                    <Form.Control
                      className='h-50'
                      placeholder={a.kecamatan}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group className='mt-2'>
                    <Form.Label className='w-50 m-0 align-self-center'>KABUPATEN</Form.Label>

                    <Form.Control
                      className='h-50'
                      placeholder={a.kabupaten}
                      disabled
                    />
                  </Form.Group>
                </div>

                <div className='d-flex flex-column justify-content-between'>
                  <Form.Group className='d-flex'>
                    <Form.Label className='w-50 m-0 align-self-center'>PROVINSI</Form.Label>

                    <Form.Control
                      className='h-100'
                      placeholder={a.provinsi}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group
                    className='d-flex'
                    controlId='exampleForm.ControlTextarea1'
                  >
                    <Form.Label className='w-50 m-0'>DETAIL ALAMAT</Form.Label>

                    <Form.Control
                      as='textarea'
                      rows={5}
                      placeholder={a.detail}
                      disabled
                    />
                  </Form.Group>
                </div>
              </Form>

              <div className='mt-3 d-flex justify-content-between'>
                <Update onClick={() => triggerModal('update', a._id, a.nama)}>UPDATE ADDRESS</Update>

                <Delete
                  onClick={() => triggerModal('delete', a._id, a.nama)}
                  className='m-0'
                >
                  DELETE ADDRESS
                </Delete>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {modalType === 'create' ? (
        <Modal
          trigger={modalType === 'create'}
          setTrigger={setModalType}
          type={'address'}
          setName={setAddressName}
          submit={handleSubmit}
          messages={messages}
        />
      ) : modalType === 'update' ? (
        <Modal
          trigger={modalType === 'update'}
          setTrigger={setModalType}
          type={'address'}
          isUpdate
          value={addressName}
          setName={setAddressName}
          submit={handleSubmit}
          messages={messages}
        />
      ) : (
        <Modal
          trigger={modalType === 'delete'}
          setTrigger={setModalType}
          type={'address'}
          isDelete
          submit={handleSubmit}
          messages={messages}
          name={addressName}
        />
      )}

      {messages.join('').includes('successful') && modalType === '' && (
        <Modal
          title={messages}
          setTrigger={setModalType}
          trigger={messages.join('').includes('successful') && modalType === ''}
          notification
        />
      )}
    </div>
  )
}

export default Profile
