import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100vh;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1em;

  @media screen and (max-width: 991px) {
    padding: 0;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`
