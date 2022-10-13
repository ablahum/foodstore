import { useState, useEffect } from 'react'
import { Form, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import styled from 'styled-components'

import { createOne } from '../apis/products'
import { getAll as getAllCategory } from '../apis/categories'
// import { getAll as getAllTag } from '../apis/tag'

const Popup = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
`

const Wrapper = styled.div`
  width: 45em;
  border-radius: 10px;
  padding: 2em;
  background-color: #fff;
  box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);
  position: relative;
`

const CancelBtn = styled(Button)`
  width: 40%;
  background-color: transparent;
  font-weight: 600;
  margin-right: 1em;
`

const ConfirmBtn = styled(Button)`
  width: 60%;
  color: #fff;
  font-weight: 600;
  border: none;
`

// const TagButton = styled(ToggleButton)`
//   font-size: 1rem;
//   padding: 0.2rem 1rem;
// `

const NewProductBox = ({ trigger, setTrigger }) => {
  const [data, setData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    tags: [],
  })
  const [image, setImage] = useState(null)

  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

  const getCategories = async () => {
    try {
      const res = await getAllCategory()

      setCategories(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  // const getTags = async () => {
  //   try {
  //     const res = await getAllTag()

  //     setTags(res.data)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  useEffect(() => {
    getCategories()
    // getTags()
  }, [])

  const handleChanges = (e) => {
    let newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createOne({ ...data, image })

      alert(res.data.message)
      setTrigger(false)
    } catch (err) {
      console.error(err)
    }
  }

  return trigger ? (
    <Popup>
      <Wrapper>
        <h2 className='fw-bold mb-4'>ADD NEW PRODUCT</h2>

        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>NAME</Form.Label>

            <Form.Control className='h-50 w-75' type='text' id='name' placeholder='Product name' onChange={(e) => handleChanges(e)} />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>PRICE</Form.Label>

            <Form.Control className='h-50 w-75' type='text' id='price' placeholder='Product price' onChange={(e) => handleChanges(e)} />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0'>DESCRIPTION</Form.Label>

            <Form.Control as='textarea' rows={3} className='h-50 w-75' type='text' id='description' placeholder='Product description' onChange={(e) => handleChanges(e)} />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>IMAGE</Form.Label>

            <Form.Control type='file' id='image' className='h-50 w-75' onChange={(e) => setImage(e.target.files[0])} />
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center'>CATEGORY</Form.Label>

            <Form.Select className='h-50 w-75' id='category' onChange={(e) => handleChanges(e)}>
              <option>Product category</option>
              {categories.map((category) => (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-2 d-flex'>
            <Form.Label className='w-50 m-0 align-self-center' onClick={() => console.log(data)}>
              TAGS
            </Form.Label>

            {/* <ToggleButtonGroup type='checkbox' className='h-50 w-75' onChange={(e) => handleChanges(e)}>
              {tags &&
                tags.map((tag, i) => (
                  <TagButton id={`tbg-btn-${i + 1}`} key={tag._id} value={tag.name} variant='outline-primary text-dark'>
                    {tag.name}
                  </TagButton>
                ))}
            </ToggleButtonGroup> */}
            <Form.Control className='h-50 w-75' type='text' id='tags' placeholder='Product tags' onChange={(e) => handleChanges(e)} />
          </Form.Group>

          <div className='mt-4 d-flex'>
            <CancelBtn onClick={() => setTrigger(false)}>CANCEL</CancelBtn>

            <ConfirmBtn type='submit' className='m-0'>
              CONFIRM
            </ConfirmBtn>
          </div>
        </Form>
      </Wrapper>
    </Popup>
  ) : (
    ''
  )
}

export default NewProductBox
