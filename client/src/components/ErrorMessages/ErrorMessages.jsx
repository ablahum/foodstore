import { List } from './style';

const ErrorMessages = ({ messages }) => (
  <>
    {messages.map((error, i) => (
      <List key={i}>{error}</List>
    ))}
  </>
);

export default ErrorMessages;
