import { useState, useEffect } from 'react'
import { Accordion, Form, Button, Spinner } from 'react-bootstrap'

import { getMe } from '../../apis/auth'
import { getAll } from '../../apis/delivery-addresses'
import { Update, Delete } from './style'
import { Modal } from '../Modal'
import { createOne, updateOne, deleteOne } from '../../apis/delivery-addresses'
import Title from '../Title'

const { Item, Header, Body } = Accordion
const { Group, Label, Control } = Form

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [address, setAddress] = useState([])
  const [addressId, setAddressId] = useState('')
  const [addressData, setAddressData] = useState({
    nama: '',
    kelurahan: '',
    kecamatan: '',
    kabupaten: '',
    provinsi: '',
    detail: '',
  })
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  })

  const [submitType, setSubmitType] = useState('')
  const [modalType, setModalType] = useState('')
  const [messages, setMessages] = useState([])

  const getData = async () => {
    try {
      const res = await getMe()

      setProfileData(res.data)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const getAddresses = async () => {
    try {
      const res = await getAll()

      setAddress(res.data.addresses)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const triggerModal = (type, id = '', address = {}) => {
    setMessages([])

    setModalType(type)
    setSubmitType(type)
    setAddressId(id)
    setAddressData(address)
  }

  const handleChanges = (e) => {
    let newData = { ...addressData }
    newData[e.target.id] = e.target.value
    setAddressData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { nama, kelurahan, kecamatan, kabupaten, provinsi, detail } = addressData

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
            nama,
            kelurahan,
            kecamatan,
            kabupaten,
            provinsi,
            detail,
          })
        } else if (submitType === 'update') {
          res = await updateOne(addressId, {
            nama,
            kelurahan,
            kecamatan,
            kabupaten,
            provinsi,
            detail,
          })
        } else if (submitType === 'delete') {
          res = await deleteOne(addressId)
        }

        setMessages([res.data.message])
        setModalType('')
        setSubmitType('')
        setAddressData({
          nama: '',
          kelurahan: '',
          kecamatan: '',
          kabupaten: '',
          provinsi: '',
          detail: '',
        })
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
    <>
      <Title
        title={'your account'}
        className='mb-3'
      />

      {isLoading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <Form className='mb-md-4 mb-3'>
          <Group className='d-flex p-2'>
            <Label className='w-50 m-0 align-self-center text-uppercase'>name</Label>

            <Control
              className='w-50'
              placeholder={profileData.name}
              disabled
            />
          </Group>

          <Group className='d-flex p-2'>
            <Label className='w-50 m-0 align-self-center text-uppercase'>email address</Label>

            <Control
              className='w-50'
              placeholder={profileData.email}
              disabled
            />
          </Group>
        </Form>
      )}

      <div className='mb-3 d-flex justify-content-between'>
        <Title
          title={'your address'}
          className='mb-0'
        />

        <Button
          className='text-light py-0 px-3 text-uppercase'
          onClick={() => triggerModal('create')}
        >
          add new address
        </Button>
      </div>

      {isLoading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <Accordion>
          {address.map((a, i) => (
            <Item
              eventKey={i}
              key={i}
            >
              <Header>
                <p className='fs-5 m-0'>{a.nama}</p>
              </Header>

              <Body className='p-3'>
                <Form className='d-flex flex-md-row flex-column justify-content-between'>
                  <div className='d-flex flex-column me-md-3 me-0 mb-md-0 mb-3 w-100'>
                    <Group>
                      <Label className='m-0 align-self-center text-uppercase mb-2'>kelurahan</Label>

                      <Control
                        placeholder={a.kelurahan}
                        disabled
                      />
                    </Group>

                    <Group className='mt-3'>
                      <Label className='m-0 align-self-center text-uppercase mb-2'>kecamatan</Label>

                      <Control
                        placeholder={a.kecamatan}
                        disabled
                      />
                    </Group>

                    <Group className='mt-3'>
                      <Label className='m-0 align-self-center text-uppercase mb-2'>kota/kabupaten</Label>

                      <Control
                        placeholder={a.kabupaten}
                        disabled
                      />
                    </Group>
                  </div>

                  <div className='d-flex flex-column justify-content-between w-100'>
                    <Group>
                      <Label className='m-0 align-self-center text-uppercase mb-2'>provinsi</Label>

                      <Control
                        placeholder={a.provinsi}
                        disabled
                      />
                    </Group>

                    <Group
                      className='mt-md-0 mt-3'
                      controlId='exampleControlTextarea1'
                    >
                      <Label className='m-0 text-uppercase mb-2'>detail</Label>

                      <Control
                        as='textarea'
                        rows={4}
                        placeholder={a.detail}
                        disabled
                      />
                    </Group>
                  </div>
                </Form>

                <div className='mt-3 d-flex justify-content-between'>
                  <Update onClick={() => triggerModal('update', a._id, a)}>update address</Update>

                  <Delete onClick={() => triggerModal('delete', a._id, a)}>delete address</Delete>
                </div>
              </Body>
            </Item>
          ))}
        </Accordion>
      )}

      {modalType === 'create' ? (
        <Modal
          trigger={modalType === 'create'}
          setTrigger={setModalType}
          type={'address'}
          submit={handleSubmit}
          messages={messages}
          handleChanges={handleChanges}
          isProfile
          cancel='cancel'
          confirm='confirm'
        />
      ) : modalType === 'update' ? (
        <Modal
          trigger={modalType === 'update'}
          setTrigger={setModalType}
          type={'address'}
          isUpdate
          name={addressData.nama}
          kelurahan={addressData.kelurahan}
          kecamatan={addressData.kecamatan}
          kabupaten={addressData.kabupaten}
          provinsi={addressData.provinsi}
          detail={addressData.detail}
          submit={handleSubmit}
          messages={messages}
          isProfile
          handleChanges={handleChanges}
          cancel='cancel'
          confirm='confirm'
        />
      ) : (
        <Modal
          trigger={modalType === 'delete'}
          setTrigger={setModalType}
          type={'address'}
          isDelete
          submit={handleSubmit}
          messages={messages}
          modalFor={addressData.nama}
          cancel='cancel'
          confirm='confirm'
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
    </>
  )
}

export default Profile
