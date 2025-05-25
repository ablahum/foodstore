// import { useEffect, useState } from 'react'
// import { Navbar, Container } from 'react-bootstrap'
// import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

// import { roleChanges, userIdChanges } from '../app/myReducer/action'
// import { Category, Search, NavBar } from '../components'
// import { getAll } from '../apis/categories'
// import { logout } from '../apis/auth'

// const Wrapper = styled(Navbar)`
//   box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);
//   position: sticky;
//   top: 0;
//   z-index: 999;
// `

// const Brand1 = styled(Navbar.Brand)`
//   font-family: 'Noe Display', serif;
//   font-size: 1.8rem;
//   font-weight: 800;
//   letter-spacing: -0.13rem;
//   margin-right: 2rem;
//   cursor: pointer;

//   @media (max-width: 767px) {
//     display: none;
//   }
// `

// const Brand2 = styled.span`
//   font-family: 'Noe Display', serif;
//   font-weight: 500;
//   font-style: italic;
// `

// const Header = () => {
//   let cartState = useSelector((state) => state.cart)

//   const [categories, setCategories] = useState([])

//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const getCategories = async () => {
//     const res = await getAll()

//     setCategories(res.data)
//   }

//   const loginAlert = () => {
//     alert('Please login first')
//     navigate('/login')
//   }

//   const toCart = () => {
//     if (cartState.length > 0) {
//       navigate('/cart')
//     } else {
//       alert('Please provide an item')
//     }
//   }

//   const handleLogout = async () => {
//     try {
//       const res = await logout()

//       alert(res.data.message)
//       localStorage.removeItem('token')

//       dispatch(roleChanges(''))
//       dispatch(userIdChanges(''))

//       navigate('/')
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     getCategories()
//   }, [])

//   return (
//     <Wrapper bg='light'>
//       <Container>
//         <Brand1 onClick={() => navigate('/')}>
//           FOOD<Brand2>STORE</Brand2>
//         </Brand1>

//         <Category categories={categories} />

//         <Search />

//         <NavBar cartState={cartState} navigate={navigate} loginAlert={loginAlert} toCart={toCart} handleLogout={handleLogout} />
//       </Container>
//     </Wrapper>
//   )
// }

// export default Header
