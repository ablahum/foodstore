import { useState, useEffect } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'

import { Modal } from '../Modal'
import { getAll, createOne, updateOne, deleteOne } from '../../apis/tags'

const Tags = () => {
  const [tags, setTags] = useState([])
  const [tagName, setTagName] = useState('')
  const [tagId, setTagId] = useState('')

  const [submitType, setSubmitType] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const [createTag, setCreateTag] = useState(false)
  const [updateTag, setUpdateTag] = useState(false)
  const [deleteTag, setDeleteTag] = useState(false)

  const getTags = async () => {
    const res = await getAll()

    setTags(res.data)
    setIsLoading(false)
  }

  const triggerModal = (type, params = '') => {
    setSubmitType(type)
    setTagId(params)

    if (type === 'create') {
      setCreateTag(true)
    } else if (type === 'update') {
      setUpdateTag(true)
    } else if (type === 'delete') {
      setDeleteTag(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let res = {}

      if (submitType === 'create') {
        res = await createOne({ name: tagName })
        setCreateTag(false)
      } else if (submitType === 'update') {
        res = await updateOne(tagId, { name: tagName })
        setUpdateTag(false)
        setTagId('')
      } else if (submitType === 'delete') {
        res = await deleteOne(tagId)
        setDeleteTag(false)
        setTagId('')
      }

      alert(res.data.message)
      getTags()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  return (
    <>
      <div className='mb-3 d-flex justify-content-between'>
        <h2 className='fw-bold fs-3 d-inline mb-0'>LIST OF TAGS</h2>

        <Button
          className='text-light py-0 px-3'
          onClick={() => triggerModal('create')}
        >
          ADD NEW TAGS
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
              <div className='d-flex justify-content-between p-3'>
                <div className=''>
                  <h5 className='mb-2 text-muted'>Name:</h5>

                  <h3 className='m-0 fs-4 fw-bold'>{tag.name}</h3>
                </div>

                <div className='d-flex'>
                  <Button
                    onClick={() => triggerModal('update', tag._id)}
                    className='bg-transparent align-self-center me-2'
                  >
                    <FiEdit className='fs-5 text-dark' />
                  </Button>

                  <Button
                    onClick={() => triggerModal('delete', tag._id)}
                    className='bg-transparent align-self-center'
                  >
                    <MdDeleteForever className='fs-5 text-dark' />
                  </Button>
                </div>
              </div>

              <hr className='mt-0 mb-3' />
            </div>
          ))}
        </>
      )}

      <Modal
        trigger={createTag}
        setTrigger={setCreateTag}
        type={'tag'}
        setName={setTagName}
        submit={handleSubmit}
      />
      <Modal
        trigger={updateTag}
        setTrigger={setUpdateTag}
        type={'tag'}
        isUpdate
        setName={setTagName}
        submit={handleSubmit}
      />
      <Modal
        trigger={deleteTag}
        setTrigger={setDeleteTag}
        type={'tag'}
        isDelete
        submit={handleSubmit}
      />
    </>
  )
}

export default Tags
