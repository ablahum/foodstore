// import { useState, useEffect } from 'react'
// import { Accordion, Form, Button } from 'react-bootstrap'
// import styled from 'styled-components'

// import NewAddressBox from './NewAddressBox'
// import UpdateAddressBox from './UpdateAddressBox'
// import DeleteAddressBox from './DeleteAddressBox'
// import { getMe } from '../apis/auth'
// import { getAll } from '../apis/delivery-addresses'

// const Update = styled(Button)`
//   width: 50%;
//   background-color: transparent;
//   font-weight: 600;
//   margin-right: 1em;
// `

// const Delete = styled(Button)`
//   width: 50%;
//   background-color: transparent;
//   font-weight: 600;
// `

// const Profile = () => {
//   const [data, setData] = useState({})
//   const [address, setAddress] = useState([])
//   const [addressId, setAddressId] = useState('')

//   const [newAddress, setNewAddress] = useState(false)
//   const [updateAddress, setUpdateAddress] = useState(false)
//   const [deleteAddress, setDeleteAddress] = useState(false)

//   const handleNew = () => setNewAddress(true)
//   const handleUpdate = (params) => {
//     setUpdateAddress(true)
//     setAddressId(params)
//   }
//   const handleDelete = (params) => {
//     setDeleteAddress(true)
//     setAddressId(params)
//   }

//   const getData = async () => {
//     try {
//       const res = await getMe()

//       setData(res.data)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const getDeliveryAddress = async () => {
//     try {
//       const res = await getAll()

//       setAddress(res.data.addresses)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   useEffect(() => {
//     getData()
//     getDeliveryAddress()
//   }, [])

//   useEffect(() => {
//     getData()
//     getDeliveryAddress()
//   }, [newAddress, updateAddress, deleteAddress])

//   return (
//     <div>
//       <div>
//         <h2 className='fw-bold fs-3 mb-3'>YOUR ACCOUNT</h2>

//         <Form className='mb-4'>
//           <Form.Group className='d-flex p-2'>
//             <Form.Label className='w-50 m-0 fs-5 align-self-center'>NAME</Form.Label>

//             <Form.Control
//               className='w-50 h-50'
//               placeholder={data.name}
//               disabled
//             />
//           </Form.Group>

//           <Form.Group className='d-flex p-2'>
//             <Form.Label className='w-50 m-0 fs-5 align-self-center'>EMAIL ADDRESS</Form.Label>

//             <Form.Control
//               className='w-50 h-50'
//               placeholder={data.email}
//               disabled
//             />
//           </Form.Group>
//         </Form>
//       </div>

//       <div className='mb-3 d-flex justify-content-between'>
//         <h2 className='fw-bold fs-3 d-inline mb-0'>YOUR ADDRESS</h2>

//         <Button
//           className='text-light py-0 px-3'
//           onClick={handleNew}
//         >
//           ADD NEW ADDRESS
//         </Button>
//       </div>

//       <Accordion>
//         {address.map((a, i) => (
//           <Accordion.Item
//             eventKey={i}
//             key={i}
//           >
//             <Accordion.Header>
//               <h3 className='fs-5 m-0'>{a.nama}</h3>
//             </Accordion.Header>

//             <Accordion.Body className='p-3'>
//               <Form className='d-flex justify-content-around'>
//                 <div className='d-flex flex-column'>
//                   <Form.Group>
//                     <Form.Label className='w-50 m-0 align-self-center'>KELURAHAN</Form.Label>

//                     <Form.Control
//                       className='h-50'
//                       placeholder={a.kelurahan}
//                       disabled
//                     />
//                   </Form.Group>

//                   <Form.Group className='mt-2'>
//                     <Form.Label className='w-50 m-0 align-self-center'>KECAMATAN</Form.Label>

//                     <Form.Control
//                       className='h-50'
//                       placeholder={a.kecamatan}
//                       disabled
//                     />
//                   </Form.Group>

//                   <Form.Group className='mt-2'>
//                     <Form.Label className='w-50 m-0 align-self-center'>KABUPATEN</Form.Label>

//                     <Form.Control
//                       className='h-50'
//                       placeholder={a.kabupaten}
//                       disabled
//                     />
//                   </Form.Group>
//                 </div>

//                 <div className='d-flex flex-column justify-content-between'>
//                   <Form.Group className='d-flex'>
//                     <Form.Label className='w-50 m-0 align-self-center'>PROVINSI</Form.Label>

//                     <Form.Control
//                       className='h-100'
//                       placeholder={a.provinsi}
//                       disabled
//                     />
//                   </Form.Group>

//                   <Form.Group
//                     className='d-flex'
//                     controlId='exampleForm.ControlTextarea1'
//                   >
//                     <Form.Label className='w-50 m-0'>DETAIL ALAMAT</Form.Label>

//                     <Form.Control
//                       as='textarea'
//                       rows={5}
//                       placeholder={a.detail}
//                       disabled
//                     />
//                   </Form.Group>
//                 </div>
//               </Form>

//               <div className='mt-3 d-flex justify-content-between'>
//                 <Update onClick={() => handleUpdate(a._id)}>UPDATE ADDRESS</Update>

//                 <Delete
//                   onClick={() => handleDelete(a._id)}
//                   className='m-0'
//                 >
//                   DELETE ADDRESS
//                 </Delete>
//               </div>
//             </Accordion.Body>
//           </Accordion.Item>
//         ))}
//       </Accordion>

//       <NewAddressBox
//         trigger={newAddress}
//         setTrigger={setNewAddress}
//       />
//       <UpdateAddressBox
//         trigger={updateAddress}
//         setTrigger={setUpdateAddress}
//         id={addressId}
//       />
//       <DeleteAddressBox
//         trigger={deleteAddress}
//         setTrigger={setDeleteAddress}
//         id={addressId}
//       />
//     </div>
//   )
// }

// export default Profile
