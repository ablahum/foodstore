import { useState, useEffect } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import styled from 'styled-components'

import NewTagsBox from './NewTagsBox'
import UpdateTagsBox from './UpdateTagsBox'
import DeleteTagsBox from './DeleteTagsBox'

import axios from 'axios'
import { getAll } from '../apis/tags'

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
  const [tagsId, setTagsId] = useState('')

  const [loading, setLoading] = useState(true)

  const [newTags, setNewTags] = useState(false)
  const [updateTags, setUpdateTags] = useState(false)
  const [deleteTags, setDeleteTags] = useState(false)

  const handleNew = () => setNewTags(true)
  const handleUpdate = (params) => {
    setUpdateTags(true)
    setTagsId(params)
  }
  const handleDelete = (params) => {
    setDeleteTags(true)
    setTagsId(params)
  }

  const getTags = async () => {
    const res = await getAll()

    setTags(res.data)
    setLoading(false)
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

      <NewTagsBox
        trigger={newTags}
        setTrigger={setNewTags}
      />
      <UpdateTagsBox
        trigger={updateTags}
        setTrigger={setUpdateTags}
        id={tagsId}
      />
      <DeleteTagsBox
        trigger={deleteTags}
        setTrigger={setDeleteTags}
        id={tagsId}
      />
    </div>
  )
}

export default Tags
