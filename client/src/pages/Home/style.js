import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100vh;
`

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5em;
  margin-bottom: 0.5em;

  @media (max-width: 991px) {
    padding: 0;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`
