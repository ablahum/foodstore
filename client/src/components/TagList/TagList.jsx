import { useState, useEffect } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { Modal } from '..'
import { getAll, createOne, updateOne, deleteOne } from '../../apis/tags'
import Title from '../Title'

const TagList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [tags, setTags] = useState([])
  const [tagId, setTagId] = useState('')
  const [tagData, setTagData] = useState('')
  const [submitType, setSubmitType] = useState('')
  const [modalType, setModalType] = useState('')
  const [messages, setMessages] = useState([])

  const getTags = async () => {
    const res = await getAll()

    setTags(res.data)
    setIsLoading(false)
  }

  const triggerModal = (type, id = '', name = '') => {
    setMessages([])

    setModalType(type)
    setSubmitType(type)
    setTagId(id)
    setTagData(name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = tagData

    let message = []
    if (!name.trim()) message.push('Name cannot be empty')

    if (message.length > 0) {
      setMessages(message)
    } else {
      try {
        let res = {}

        if (submitType === 'create') {
          res = await createOne({ name })
        } else if (submitType === 'update') {
          res = await updateOne(tagId, { name })
        } else if (submitType === 'delete') {
          res = await deleteOne(tagId)
        }

        setMessages([res.data.message])
        setModalType('')
        setSubmitType('')
        setTagData('')
        setTagId('')
        getTags()
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <>
      <div className='mb-3 d-flex justify-content-between'>
        <Title
          title={'list of tags'}
          className='mb-0'
        />

        <Button
          className='text-light py-0 px-3 text-uppercase'
          onClick={() => triggerModal('create')}
        >
          add new tags
        </Button>
      </div>

      {isLoading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <>
          {tags.map((tag) => (
            <div key={tag._id}>
              <div className='d-flex justify-content-between p-2'>
                <div className='d-flex flex-column'>
                  <p className='m-0 text-muted text-capitalize'>name:</p>

                  <p className='m-0 fs-5 fw-bold'>{tag.name}</p>
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

              <hr className='mb-md-3 mt-0 mb-2' />
            </div>
          ))}
        </>
      )}

      {modalType === 'create' ? (
        <Modal
          trigger={modalType === 'create'}
          setTrigger={setModalType}
          type={'tag'}
          handleChanges={setTagData}
          submit={handleSubmit}
          messages={messages}
          cancel='cancel'
          confirm='confirm'
        />
      ) : modalType === 'update' ? (
        <Modal
          trigger={modalType === 'update'}
          setTrigger={setModalType}
          type={'tag'}
          isUpdate
          name={tagData}
          handleChanges={setTagData}
          submit={handleSubmit}
          messages={messages}
          cancel='cancel'
          confirm='confirm'
        />
      ) : (
        <Modal
          trigger={modalType === 'delete'}
          setTrigger={setModalType}
          type={'tag'}
          isDelete
          submit={handleSubmit}
          messages={messages}
          modalFor={tagData}
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

export default TagList
