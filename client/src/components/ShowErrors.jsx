import styled from 'styled-components'

const List = styled.p`
  color: red;
  margin: auto;
  font-weight: 600;
`

const ErrorMessages = ({ errors }) => {
  return (
    <>
      {errors.map((error, i) => (
        <List key={i}>{error}</List>
      ))}
    </>
  )
}

export default ErrorMessages
