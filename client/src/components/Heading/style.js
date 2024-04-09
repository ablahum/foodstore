import styled from 'styled-components'
import banner from '../../assets/banner.png'

export const Wrapper = styled.div`
  color: var(--white);
  height: 30vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner});
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;
  box-shadow: 0px 10px 30px -15px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;

  @media screen and (max-width: 767px) {
    height: 15em;
  }

  @media screen and (max-width: 425px) {
    height: 10em;
  }
`

export const Title = styled.h1`
  font-size: 6rem;
  font-family: var(--serif);
  letter-spacing: 2rem;
  margin: 0;
  text-transform: uppercase;

  @media screen and (max-width: 991px) {
    text-align: center;
    letter-spacing: 1rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 4rem;
    letter-spacing: 0.5rem;
  }

  @media screen and (max-width: 576px) {
    font-size: 3rem;
    letter-spacing: 0.3rem;
  }
`
