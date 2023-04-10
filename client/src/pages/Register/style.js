import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import bgHero from '../../assets/banner-1.jpg'

export const Wrapper = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgHero});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  display: flex;
  align-items: center;
`

export const FormWrapper = styled.div`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2em;
  width: 40%;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 1);

  @media (max-width: 991px) {
    width: 65%;
  }

  @media (max-width: 767px) {
    width: 85%;
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`

export const SubmitBtn = styled(Button)`
  color: #fff;
  width: 100%;
  font-weight: 600;
  border: none;
`
