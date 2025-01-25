import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { roleChanges, userIdChanges } from '../../app/myReducer/action';
import { login } from '../../apis/auth';
import { Form, Modal } from '../../components';
import { validateEmail } from '../../utils';
import { Wrapper } from './style';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [isNotification, setIsNotification] = useState(false);

  const dispatch = useDispatch();

  if (localStorage.getItem('token') && isNotification === false) return <Navigate to='/' />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    // validation
    let messages = [];

    if (email.length === 0 || password.length === 0) messages = [...messages, 'Email or password cannot be empty'];
    if (email.length > 0 && !validateEmail(email)) messages = [...messages, 'Invalid email address'];

    if (messages.length > 0) {
      setErrorMessages(messages);
    } else {
      try {
        const res = await login({ email, password });

        setErrorMessages([res.data.message]);
        setIsNotification(true);

        localStorage.setItem('token', res.data.token);
        dispatch(roleChanges(res.data.user.role));
        dispatch(userIdChanges(res.data.user._id));
      } catch (err) {
        messages = [...messages, err.response.data.message];
        setErrorMessages(messages);
      }
    }
  };

  const handleChanges = (e) =>
    setData(() => ({
      ...data,
      [e.target.id]: e.target.value,
    }));

  const closeNotification = () => {
    setIsNotification(false);
    setErrorMessages([]);
  };

  return (
    <Wrapper>
      <Form
        data={data}
        errorMessages={errorMessages}
        handleChanges={handleChanges}
        handleSubmit={handleSubmit}
      />

      <Modal
        notification
        trigger={isNotification}
        setTrigger={closeNotification}
        title={errorMessages}
        message='Happy shopping!'
      />
    </Wrapper>
  );
};

export default Login;
