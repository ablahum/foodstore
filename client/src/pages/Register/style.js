import styled from 'styled-components';
import bg from '../../assets/bg.png';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg});
  background-size: cover;
  background-position: center;
  height: 100vh;
`;
