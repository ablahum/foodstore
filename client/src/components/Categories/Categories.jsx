import { useState, useEffect } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'

import { Modal } from '../Modal'
import { getAll, createOne, updateOne, deleteOne } from '../../apis/categories'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const [submitType, setSubmitType] = useState('')

  const [isLoading, setIsLoading] = useState(true)

  const [createCategory, setCreateCategory] = useState(false)
  const [updateCategory, setUpdateCategory] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState(false)

  const getCategories = async () => {
    const res = await getAll()

    setCategories(res.data)
    setIsLoading(false)
  }

  const triggerModal = (type, params = '') => {
    setSubmitType(type)
    setCategoryId(params)

    if (type === 'create') {
      setCreateCategory(true)
    } else if (type === 'update') {
      setUpdateCategory(true)
    } else if (type === 'delete') {
      setDeleteCategory(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let res = {}

      if (submitType === 'create') {
        res = await createOne({ name: categoryName })
        setCreateCategory(false)
      } else if (submitType === 'update') {
        res = await updateOne(categoryId, { name: categoryName })
        setUpdateCategory(false)
        setCategoryId('')
      } else if (submitType === 'delete') {
        res = await deleteOne(categoryId)
        setDeleteCategory(false)
        setCategoryId('')
      }

      alert(res.data.message)
      getCategories()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <div className='mb-3 d-flex justify-content-between'>
        <h2 className='fw-bold fs-3 d-inline mb-0'>LIST OF CATEGORIES</h2>

        <Button
          className='text-light py-0 px-3'
          onClick={() => triggerModal('create')}
        >
          ADD NEW CATEGORIES
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
        trigger={createCategory}
        setTrigger={setCreateCategory}
        type={'category'}
        setName={setCategoryName}
        submit={handleSubmit}
      />
      <Modal
        trigger={updateCategory}
        setTrigger={setUpdateCategory}
        type={'category'}
        isUpdate
        setName={setCategoryName}
        submit={handleSubmit}
      />
      <Modal
        trigger={deleteCategory}
        setTrigger={setDeleteCategory}
        type={'category'}
        isDelete
        submit={handleSubmit}
      />
    </>
  )
}

export default Categories
