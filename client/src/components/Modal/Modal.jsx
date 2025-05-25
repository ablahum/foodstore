import { Alert, Table, Form } from 'react-bootstrap'
import rupiah from 'rupiah-format'

import { ErrorMessages } from '../../components'
import { Wrapper, PopUp, Cancel, Confirm, TableBox } from './style'

const { Group, Label, Control } = Form

const Modal = ({
  title,
  messages,
  type,
  trigger,
  setTrigger,
  submit,
  isUpdate,
  isDelete,
  notification,
  message,
  name,
  kelurahan,
  kecamatan,
  kabupaten,
  provinsi,
  detail,
  modalFor,
  isProfile,
  handleChanges,
  isProduct,
  setImage,
  price,
  description,
  image,
  category,
  tags,
  isCheckout,
  cartItems,
  address,
  payment,
  fee,
  total,
  cancel,
  confirm,
  isOrder,
  nextPage,
  tagsData,
  handleSelect
}) =>
  trigger ? (
    <PopUp>
      <Wrapper>
        {notification ? (
          <>
            <h3 className='fw-bold fs-4 m-0 align-self-center'>{title}!</h3>

            {message ? <p className='mt-3 mb-0'>{message}</p> : ''}

            <Confirm
              onClick={isCheckout ? () => nextPage() : () => setTrigger(false)}
              className='mt-3 w-100 text-uppercase'
            >
              ok
            </Confirm>
          </>
        ) : (
          <>
            <h3 className='fs-4 fw-bold mb-3 text-uppercase'>
              {isUpdate ? 'update' : isDelete ? 'delete' : isOrder ? 'order confirmation' : 'add new'}
              <span> {type}</span>
            </h3>

            {isDelete ? (
              <Alert
                variant='danger'
                className='text-center fw-bold fs-5 mt-3 mb-0 py-2'
              >
                <span className='text-capitalize'>are</span> you sure want to delete '{modalFor}'?
              </Alert>
            ) : isProfile ? (
              <Form>
                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>nama</Label>

                  <Control
                    className='w-50 h-50 w-75'
                    type='text'
                    id='nama'
                    placeholder='Address name...'
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
                    placeholder='Kelurahan name...'
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
                    placeholder='Kecamatan name...'
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? kecamatan : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>kota/kabupaten</Label>

                  <Control
                    className='w-50 h-50 w-75'
                    type='text'
                    id='kabupaten'
                    placeholder='Kabupaten name...'
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
                    placeholder='Provinsi name...'
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
                    placeholder='Address detail...'
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? detail : undefined}
                  />
                </Group>
              </Form>
            ) : isProduct ? (
              <Form>
                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>name</Label>

                  <Control
                    className='h-50 w-75'
                    type='text'
                    id='name'
                    placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} name...`}
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? name : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>price</Label>

                  <Control
                    className='h-50 w-75'
                    type='number'
                    id='price'
                    placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} price...`}
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? price : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 text-uppercase'>description</Label>

                  <Control
                    as='textarea'
                    rows={3}
                    className='h-50 w-75'
                    type='text'
                    id='description'
                    placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} description...`}
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? description : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>image</Label>

                  <Control
                    type='file'
                    id='image'
                    accept='image/*'
                    className='h-50 w-75'
                    onChange={(e) => setImage(e.target.files[0])}
                    value={isUpdate ? image : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>category</Label>

                  <Control
                    className='h-50 w-75'
                    type='text'
                    id='category'
                    placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} category...`}
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? category : undefined}
                  />
                </Group>

                <Group className='mb-2 d-flex'>
                  <Label className='w-50 m-0 align-self-center text-uppercase'>tags</Label>

                  {/* <div className='w-75 h-50'>
                    <Tag
                      tags={tagsData}
                      handleSelect={handleSelect}
                    />
                  </div> */}

                  <Control
                    className='h-50 w-75'
                    type='text'
                    id='tags'
                    placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} tags...`}
                    onChange={(e) => handleChanges(e)}
                    value={isUpdate ? tags : undefined}
                  />
                </Group>
              </Form>
            ) : isCheckout ? (
              <>
                <TableBox>
                  <Table
                    hover
                    responsive
                    size='sm'
                  >
                    <thead>
                      <tr>
                        <th></th>

                        <th>Item Name</th>

                        <th className='text-center'>Qty</th>

                        <th className='text-end'>Sub Total</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item._id}>
                          <td className='text-center p-0'>
                            <img
                              src={`http://localhost:4000/public/${item.image}`}
                              alt={item.image}
                              style={{ width: '50px' }}
                            />
                          </td>

                          <td>{item.name}</td>

                          <td className='text-center'>{item.qty}</td>

                          <td className='text-end'>{rupiah.convert(item.qty * item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TableBox>

                <div className='mt-3'>
                  <div className='d-flex justify-content-between mb-2'>
                    <p className='m-0 align-self-center text-uppercase'>ship to</p>

                    <p className='m-0 fw-bold'>{address}</p>
                  </div>

                  <div className='d-flex justify-content-between mb-2'>
                    <p className='m-0 align-self-center text-uppercase'>payment method</p>

                    <p className='m-0 fw-bold'>{payment}</p>
                  </div>

                  <div className='d-flex justify-content-between'>
                    <p className='m-0 align-self-center text-uppercase'>fee</p>

                    <p className='m-0 fw-bold'>{rupiah.convert(fee)}</p>
                  </div>
                </div>

                <div className='d-flex justify-content-between mt-3'>
                  <p className='fs-5 m-0 text-uppercase'>grand total</p>

                  <p className='fs-5 fw-bold m-0'>{rupiah.convert(total(cartItems) + fee)}</p>
                </div>

                <Alert
                  variant='danger'
                  className='text-center fw-bold fs-5 mt-3 mb-0 py-2'
                >
                  <span className='text-capitalize'>is</span> the information above correct?
                </Alert>
              </>
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
              <Cancel onClick={() => setTrigger(false)}>{cancel}</Cancel>

              <Confirm onClick={(e) => submit(e)}>{confirm}</Confirm>
            </div>
          </>
        )}
      </Wrapper>
    </PopUp>
  ) : (
    ''
  )

export default Modal
