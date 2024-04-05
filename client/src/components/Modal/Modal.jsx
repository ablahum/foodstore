import { Alert, Form } from 'react-bootstrap'

import { ErrorMessages } from '../../components'
import { Wrapper, Popup, Cancel, Confirm } from './style'

const { Group, Label, Control } = Form

const Modal = ({ title, messages, type, trigger, setTrigger, submit, isUpdate, isDelete, notification, message, name, kelurahan, kecamatan, kabupaten, provinsi, detail, modalFor, isAddress, handleChanges }) => {
  return trigger ? (
    <Popup>
      <Wrapper>
        {notification ? (
          <>
            <h2 className='fw-bold fs-3 mb-4 align-self-center'>{title}!</h2>

            {message ? <p className='m-0'>{message}</p> : ''}

            <Confirm
              onClick={() => setTrigger(false)}
              className='m-0 w-100 text-uppercase'
            >
              ok
            </Confirm>
          </>
        ) : (
          <>
            <h2 className='fw-bold mb-4 text-uppercase'>
              {isUpdate ? 'update' : isDelete ? 'delete' : 'add new'}
              <span> {type}</span>
            </h2>
            {isDelete ? (
              <Alert
                variant='danger'
                className='text-center fw-bold fs-5 mt-3 mb-0 py-2'
              >
                <span className='text-capitalize'>are</span> you sure want to delete '{modalFor}'?
              </Alert>
            ) : isAddress ? (
              <Form>
                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>nama</Label>

                  <Control
                    className='w-50 h-50 w-75'
                    type='text'
                    id='nama'
                    placeholder='Nama alamat'
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? name : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>kelurahan</Label>

                  <Control
                    className='w-50 h-50 w-75'
                    type='text'
                    id='kelurahan'
                    placeholder='Kelurahan'
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? kelurahan : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>kecamatan</Label>

                  <Control
                    className='w-50 h-50 w-75'
                    type='text'
                    id='kecamatan'
                    placeholder='Kecamatan'
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? kecamatan : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>kabupaten</Label>

                  <Control
                    className='w-50 h-50 w-75'
                    type='text'
                    id='kabupaten'
                    placeholder='Kabupaten'
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? kabupaten : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>provinsi</Label>

                  <Control
                    className='w-50 h-50 w-75'
                    type='text'
                    id='provinsi'
                    placeholder='Provinsi'
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? provinsi : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 text-uppercase'>detail</Label>

                  <Control
                    as='textarea'
                    rows={3}
                    className='w-75'
                    type='text'
                    id='detail'
                    placeholder='Detail alamat'
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? detail : undefined}
                  />
                </Group>
              </Form>
            ) : (
              <Form>
                <Group className='d-flex mb-3'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>name</Label>

                  <Control
                    className='w-50 h-50 w-75'
                    type='text'
                    id='nama'
                    placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} name...`}
                    onChange={(e) => handleChanges(e.target.value)}
                    value={isUpdate ? name : undefined}
                  />
                </Group>
              </Form>
            )}
            {isDelete ? '' : <div className='align-self-center'>{messages.length > 0 ? <ErrorMessages errors={messages} /> : ''}</div>}

            <div className='mt-3 d-flex'>
              <Cancel
                onClick={() => setTrigger(false)}
                className='text-uppercase'
              >
                cancel
              </Cancel>

              <Confirm
                onClick={(e) => submit(e)}
                className='m-0 text-uppercase'
              >
                confirm
              </Confirm>
            </div>
          </>
        )}
      </Wrapper>
    </Popup>
  ) : (
    ''
  )
}

export default Modal
