// import { Alert, Button } from 'react-bootstrap'
// import styled from 'styled-components'

// import { deleteOne } from '../apis/carts'

// const Popup = styled.div`
//   width: 100%;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(0, 0, 0, 0.8);
//   z-index: 999;
// `

// const Wrapper = styled.div`
//   width: 45em;
//   border-radius: 10px;
//   padding: 2em;
//   background-color: #fff;
//   box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);
//   position: relative;
// `

// const BackButton = styled(Button)`
//   width: 40%;
//   background-color: transparent;
//   font-weight: 600;
//   margin-right: 1em;
// `

// const NextButton = styled(Button)`
//   width: 60%;
//   color: #fff;
//   font-weight: 600;
//   border: none;
// `

// const ConfirmDeleteBox = ({id, trigger, setTrigger, itemName}) => {
//   const handleSubmit = (e) => {
//     e.preventDefault()

//     const res = await deleteOne(id)

//       alert('Delete item successful')
//       setTrigger(false)
//   }

//   return trigger ? (
//     <Popup>
//       <Wrapper>
//         <h2 className='fw-bold mb-4'>DELETE ITEM</h2>

//         <Alert variant='danger' className='text-center fw-bold fs-5 mt-3 mb-0 py-2'>
//           Are you sure want to delete {itemName} from cart?
//         </Alert>

//         <div className='mt-3 d-flex'>
//           <BackButton onClick={() => setTrigger(false)}>CANCEL</BackButton>

//           <NextButton onClick={(e) => handleSubmit(e)} className='m-0'>
//             CONFIRM
//           </NextButton>
//         </div>
//       </Wrapper>
//     </Popup>
//   ) : (
//     ''
//   )
// }

// export default ConfirmDeleteBox
