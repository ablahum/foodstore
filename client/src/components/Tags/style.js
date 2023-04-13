import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Title = styled.h2`
  color: var(--muted);
  font-size: 1rem;
  margin: 0;
  margin-right: 1em;

  @media screen and (max-width: 1199px) {
    display: none;
  }
`

export const Toggle = styled(ToggleButtonGroup)`
  @media screen and (max-width: 767px) {
    margin-top: 1em;
  }

  @media screen and (max-width: 425px) {
    /* display: flex;
    flex-wrap: wrap; */

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export const Tag = styled(ToggleButton)`
  /* font-size: 1rem; */
  /* font-weight: 500; */
  padding: 0.2em 1.3em;
`
