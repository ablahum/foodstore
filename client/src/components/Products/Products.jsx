import { useState, useEffect } from 'react'
import { Spinner, Button } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'

import { config } from '../../config'
import { createOne, updateOne, deleteOne, getSpecific } from '../../apis/products'
import { getAll } from '../../apis/tags'
import { Modal } from '../../components'
import Title from '../Title'

const Products = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [products, setProducts] = useState([])
  const [tags, setTags] = useState([])
  const [productId, setProductId] = useState('')
  const [image, setImage] = useState(null)
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    tags: []
  })

  const [submitType, setSubmitType] = useState('')
  const [modalType, setModalType] = useState('')
  const [messages, setMessages] = useState([])

  const getProducts = async () => {
    try {
      const res = await getSpecific('?perPage=100')
      const resTag = await getAll()

      setProducts(res.data.products)
      setTags(resTag.data)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const triggerModal = (type, id = '', product = {}) => {
    setMessages([])

    setModalType(type)
    setSubmitType(type)
    setProductId(id)
    setProductData(product)
  }

  const handleChanges = (e) => {
    let newData = { ...productData }
    newData[e.target.id] = e.target.value
    setProductData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, price, description, category, tags } = productData

    let message = []
    if (name.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Name must be filled']

    if (price.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Price cannot be empty']

    if (description.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Description must be filled']

    if (category.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Category cannot be empty']

    if (tags.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Tags cannot be empty']

    if (message.length > 0) {
      setMessages(message)
    } else {
      try {
        let res = {}

        if (submitType === 'create') {
          res = await createOne({
            name,
            price,
            description,
            image,
            category,
            tags
          })
        } else if (submitType === 'update') {
          res = await updateOne(productId, {
            name,
            price,
            description,
            image,
            category,
            tags
          })
        } else if (submitType === 'delete') {
          res = await deleteOne(productId)
        }

        setMessages([res.data.message])
        setModalType('')
        setSubmitType('')
        setProductData({
          name: '',
          price: 0,
          description: '',
          category: '',
          tags: []
        })
        setImage(null)
        setProductId('')
        getProducts()
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div className='mb-3 d-flex justify-content-between'>
        <Title
          title={'list of products'}
          className='mb-0'
        />

        <Button
          className='text-light py-0 px-3 text-uppercase'
          onClick={() => triggerModal('create')}
        >
          add new products
        </Button>
      </div>

      {isLoading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <div className='overflow-auto mb-3'>
          {products.map((product) => (
            <div
              className='row g-0'
              key={product._id}
            >
              <div className='col-md-3'>
                <img
                  src={`${config.apiHost}/public/${product.image}`}
                  alt={product.name}
                  className='img-fluid rounded-start'
                />
              </div>

              <div className='col-md-7 p-4 d-flex flex-column justify-content-between'>
                <h3 className='m-0 fs-4 fw-bold'>{product.name}</h3>

                <h5 className='my-2 text-muted'>{product.description}</h5>

                <h3 className='m-0 fs-4'>Rp. {product.price}</h3>
              </div>

              <div className='col-md-2 d-flex justify-content-center gap-3'>
                <Button
                  onClick={() => triggerModal('update', product._id, product)}
                  className='bg-transparent fw-bold align-self-center'
                >
                  <FiEdit className='fs-5 text-dark' />
                </Button>

                <Button
                  onClick={() => triggerModal('delete', product._id, product)}
                  className='bg-transparent fw-bold align-self-center'
                >
                  <MdDeleteForever className='fs-5 text-dark' />
                </Button>
              </div>

              <hr className='my-2' />
            </div>
          ))}
        </div>
      )}

      {modalType === 'create' ? (
        <Modal
          trigger={modalType === 'create'}
          setTrigger={setModalType}
          type={'product'}
          submit={handleSubmit}
          messages={messages}
          handleChanges={handleChanges}
          isProduct
          setImage={setImage}
          cancel='cancel'
          confirm='confirm'
          tagsData={tags}
          handleSelect={handleChanges}
        />
      ) : modalType === 'update' ? (
        <Modal
          trigger={modalType === 'update'}
          setTrigger={setModalType}
          type={'product'}
          isUpdate
          name={productData.name}
          price={productData.price}
          setImage={setImage}
          description={productData.description}
          category={productData.category}
          tags={productData.tags}
          submit={handleSubmit}
          messages={messages}
          isProduct
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
          modalFor={productData.name}
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

export default Products
