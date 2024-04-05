// import { useState, useEffect } from 'react'
// import { Spinner, Button } from 'react-bootstrap'
// import { FiEdit } from 'react-icons/fi'
// import { MdDeleteForever } from 'react-icons/md'
// import styled from 'styled-components'

// import { getSpecific } from '../apis/products'
// import NewProductBox from './NewProductBox'
// import UpdateProductBox from './UpdateProductBox'
// import DeleteProductBox from './DeleteProductBox'

// const Wrapper = styled.div`
//   overflow: auto;
//   margin-bottom: 1em;
// `

// const Detail = styled.div`
//   padding: 1.5em;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `

// const Update = styled(Button)`
//   background-color: transparent;
//   font-weight: 600;
//   align-self: center;
// `

// const Delete = styled(Button)`
//   background-color: transparent;
//   font-weight: 600;
//   align-self: center;
// `

// const Products = () => {
//   const [loading, setLoading] = useState(true)
//   const [products, setProducts] = useState([])
//   const [productId, setProductId] = useState('')
//   const [newProduct, setNewProduct] = useState(false)
//   const [updateProduct, setUpdateProduct] = useState(false)
//   const [deleteProduct, setDeleteProduct] = useState(false)

//   const handleNew = () => setNewProduct(true)
//   const handleUpdate = (params) => {
//     setUpdateProduct(true)
//     setProductId(params)
//   }
//   const handleDelete = (params) => {
//     setDeleteProduct(true)
//     setProductId(params)
//   }

//   const getProducts = async () => {
//     try {
//       const res = await getSpecific('?perPage=100')

//       setProducts(res.data.products)
//       setLoading(false)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   useEffect(() => {
//     getProducts()
//   }, [])

//   useEffect(() => {
//     getProducts()
//   }, [newProduct, updateProduct, deleteProduct])

//   return (
//     <div>
//       <div className='mb-3 d-flex justify-content-between'>
//         <h2 className='fw-bold fs-3 d-inline mb-0'>LIST OF PRODUCTS</h2>

//         <Button
//           className='text-light py-0 px-3'
//           onClick={handleNew}
//         >
//           ADD NEW PRODUCTS
//         </Button>
//       </div>

//       {loading ? (
//         <div className='text-center mt-5'>
//           <Spinner animation='border' />
//         </div>
//       ) : (
//         <Wrapper>
//           {products.map((product) => (
//             <div
//               className='row g-0'
//               key={product._id}
//             >
//               <div className='col-md-3'>
//                 <img
//                   src={`http://localhost:4000/public/${product.image}`}
//                   alt={product.name}
//                   className='img-fluid rounded-start'
//                 />
//               </div>

//               <Detail className='col-md-7'>
//                 <h3 className='m-0 fs-4 fw-bold'>{product.name}</h3>

//                 <h5 className='my-2 text-muted'>{product.description}</h5>

//                 <h3 className='m-0 fs-4'>Rp. {product.price}</h3>
//               </Detail>

//               <div className='col-md-2 d-flex justify-content-evenly'>
//                 <Update onClick={() => handleUpdate(product._id)}>
//                   <FiEdit className='fs-5 text-dark' />
//                 </Update>

//                 <Delete
//                   onClick={() => handleDelete(product._id)}
//                   className='m-0'
//                 >
//                   <MdDeleteForever className='fs-5 text-dark' />
//                 </Delete>
//               </div>

//               <hr className='my-2' />
//             </div>
//           ))}
//         </Wrapper>
//       )}

//       <NewProductBox
//         trigger={newProduct}
//         setTrigger={setNewProduct}
//       />
//       <UpdateProductBox
//         trigger={updateProduct}
//         setTrigger={setUpdateProduct}
//         id={productId}
//       />
//       <DeleteProductBox
//         trigger={deleteProduct}
//         setTrigger={setDeleteProduct}
//         id={productId}
//       />
//     </div>
//   )
// }

// export default Products
