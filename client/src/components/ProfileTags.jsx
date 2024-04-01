import { useState, useEffect } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import styled from 'styled-components'

import { Modal, NewTagsBox, UpdateTagsBox, DeleteTagsBox } from './Modal'
import { getAll, createOne, updateOne, deleteOne } from '../apis/tags'

const UpdateBtn = styled(Button)`
  background-color: transparent;
  font-weight: 600;
  align-self: center;
  margin: 0 7px 0 0;
`

const DeleteBtn = styled(Button)`
  background-color: transparent;
  font-weight: 600;
  align-self: center;
  margin: 0 20px 0 8px;
`

const Tags = () => {
  const [tags, setTags] = useState([])
  const [tagName, setTagName] = useState('')
  const [tagId, setTagId] = useState('')

  const [loading, setLoading] = useState(true)

  const [newTags, setNewTags] = useState(false)
  const [updateTags, setUpdateTags] = useState(false)
  const [deleteTags, setDeleteTags] = useState(false)

  const handleNew = () => setNewTags(true)

  const handleUpdate = (params) => {
    setUpdateTags(true)
    setTagId(params)
  }

  const handleDelete = (params) => {
    setDeleteTags(true)
    setTagId(params)
  }

  const getTags = async () => {
    const res = await getAll()

    setTags(res.data)
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createOne({ name: tagName })

      alert(res.data.message)
      setNewTags(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdateTag = async (e) => {
    e.preventDefault()

    try {
      const res = await updateOne(tagId, { name: tagName })

      alert(res.data.message)
      setUpdateTags(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteTag = async (e) => {
    e.preventDefault()

    try {
      const res = await deleteOne(tagId)

      alert(res.data.message)
      setDeleteTags(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTags()
  }, [])

  useEffect(() => {
    getTags()
  }, [newTags, updateTags, deleteTags])

  return (
    <div>
      <div className='mb-3 d-flex justify-content-between'>
        <h2 className='fw-bold fs-3 d-inline mb-0'>LIST OF TAGS</h2>

        <Button
          className='text-light py-0 px-3'
          onClick={handleNew}
        >
          ADD NEW TAGS
        </Button>
      </div>

      {loading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <>
          {tags.map((tag) => (
            <div key={tag._id}>
              <div
                className='d-flex justify-content-between'
                key={tag._id}
              >
                <div className='p-3'>
                  <h5 className='mb-2 text-muted'>Name:</h5>

                  <h3 className='m-0 fs-4 fw-bold'>{tag.name}</h3>
                </div>

                <div className='d-flex'>
                  <UpdateBtn onClick={() => handleUpdate(tag._id)}>
                    <FiEdit className='fs-5 text-dark' />
                  </UpdateBtn>

                  <DeleteBtn onClick={() => handleDelete(tag._id)}>
                    <MdDeleteForever className='fs-5 text-dark' />
                  </DeleteBtn>
                </div>
              </div>

              <hr className='my-2' />
            </div>
          ))}
        </>
      )}

      <Modal
        trigger={newTags}
        setTrigger={setNewTags}
        type={'tag'}
        setName={setTagName}
        submit={handleSubmit}
      />
      <Modal
        trigger={updateTags}
        setTrigger={setUpdateTags}
        type={'tag'}
        isUpdate
        setName={setTagName}
        submit={handleUpdateTag}
      />
      <Modal
        trigger={deleteTags}
        setTrigger={setDeleteTags}
        type={'tag'}
        isDelete
        submit={handleDeleteTag}
      />
    </div>
  )
}

export default Tags
