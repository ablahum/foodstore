import styled from 'styled-components'
import bg from '../../assets/banner-1.jpg'

export const Wrapper = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bg});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FormWrapper = styled.div`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2em;
  width: 40%;
  border-radius: 10px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 1);

  @media screen and (max-width: 991px) {
    width: 50%;
  }

  @media screen and (max-width: 767px) {
    width: 70%;
  }

  @media screen and (max-width: 425px) {
    width: 90%;
  }
`
