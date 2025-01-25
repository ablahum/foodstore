import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { register } from '../../apis/auth';
import { Form, Modal } from '../../components';
import { validateEmail } from '../../utils';
import { Wrapper } from './style';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [errorMessages, setErrorMessages] = useState([]);
  const [isNotification, setIsNotification] = useState(false);

  const navigate = useNavigate();

  if (localStorage.getItem('token')) return <Navigate to='/' />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = data;

    // validation
    let message = [];

    if (name.length === 0) message = [...message, 'Name must be filled'];
    if (email.length === 0) message = [...message, 'Email cannot be empty'];
    if (email.length > 0 && !validateEmail(email)) message = [...message, 'Invalid email address'];
    if (password.length === 0) message = [...message, 'Password cannot be empty'];
    else if (password.length < 8) message = [...message, 'Password must be at least 8 characters'];

    if (message.length > 0) {
      setErrorMessages(message);
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
          role,
        });

        setErrorMessages([res.data.message]);
        setIsNotification(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChanges = (e) => {
    if (e.target.id.includes('radio'))
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    else
      setData(() => ({
        ...data,
        [e.target.id]: e.target.value,
      }));
  };

  const closeNotification = () => {
    setIsNotification(false);
    setErrorMessages([]);
    navigate('/login');
  };

  return (
    <Wrapper>
      <Form
        register
        data={data}
        errorMessages={errorMessages}
        roles={data.role}
        handleChanges={handleChanges}
        handleSubmit={handleSubmit}
      />

      <Modal
        notification
        trigger={isNotification}
        setTrigger={closeNotification}
        title={errorMessages}
        message='Please login to continue.'
      />
    </Wrapper>
  );
};

export default Register;
