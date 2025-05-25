import { List } from './style'

const ErrorMessages = ({ errors }) => (
  <>
    {errors.map((error, i) => (
      <List key={i}>{error}</List>
    ))}
  </>
)

export default ErrorMessages
