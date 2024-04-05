import { useState, useEffect } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'

import { Modal } from '../Modal'
import { getAll, createOne, updateOne, deleteOne } from '../../apis/categories'

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const [submitType, setSubmitType] = useState('')
  const [modalType, setModalType] = useState('')
  const [messages, setMessages] = useState([])

  const getCategories = async () => {
    const res = await getAll()

    setCategories(res.data)
    setIsLoading(false)
  }

  const triggerModal = (type, id = '', name = '') => {
    setMessages([])

    setModalType(type)
    setSubmitType(type)
    setCategoryId(id)
    setCategoryName(name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = categoryName

    let message = []
    if (name.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Name cannot be empty']

    if (message.length > 0) {
      setMessages(message)
    } else {
      try {
        let res = {}

        if (submitType === 'create') {
          res = await createOne({ name })
        } else if (submitType === 'update') {
          res = await updateOne(categoryId, { name })
        } else if (submitType === 'delete') {
          res = await deleteOne(categoryId)
        }

        setMessages([res.data.message])
        setModalType('')
        setSubmitType('')
        setCategoryName('')
        setCategoryId('')
        getCategories()
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <div className='mb-3 d-flex justify-content-between'>
        <h2 className='fw-bold fs-3 d-inline mb-0 text-uppercase'>list of categories</h2>

        <Button
          className='text-light py-0 px-3 text-uppercase'
          onClick={() => triggerModal('create')}
        >
          add new categories
        </Button>
      </div>

      {isLoading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <>
          {categories.map((tag) => (
            <div key={tag._id}>
              <div className='d-flex justify-content-between p-2'>
                <div>
                  <h5 className='mb-2 text-muted text-capitalize'>name:</h5>

                  <h3 className='m-0 fs-4 fw-bold'>{tag.name}</h3>
                </div>

                <div className='d-flex'>
                  <Button
                    onClick={() => triggerModal('update', tag._id, tag.name)}
                    className='bg-transparent align-self-center me-2'
                  >
                    <FiEdit className='fs-5 text-dark' />
                  </Button>

                  <Button
                    onClick={() => triggerModal('delete', tag._id, tag.name)}
                    className='bg-transparent align-self-center'
                  >
                    <MdDeleteForever className='fs-5 text-dark' />
                  </Button>
                </div>
              </div>

              <hr className='mt-2 mb-3' />
            </div>
          ))}
        </>
      )}

      {modalType === 'create' ? (
        <Modal
          trigger={modalType === 'create'}
          setTrigger={setModalType}
          type={'category'}
          handleChanges={setCategoryName}
          submit={handleSubmit}
          messages={messages}
        />
      ) : modalType === 'update' ? (
        <Modal
          trigger={modalType === 'update'}
          setTrigger={setModalType}
          type={'category'}
          isUpdate
          name={categoryName}
          handleChanges={setCategoryName}
          submit={handleSubmit}
          messages={messages}
        />
      ) : (
        <Modal
          trigger={modalType === 'delete'}
          setTrigger={setModalType}
          type={'category'}
          isDelete
          submit={handleSubmit}
          messages={messages}
          modalFor={categoryName}
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

export default Categories
