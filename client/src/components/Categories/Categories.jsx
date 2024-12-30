import { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';

import { Modal } from '../../components';
import { getAll, createOne, updateOne, deleteOne } from '../../apis/categories';
import Title from '../Title';

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryData, setCategoryData] = useState('');

  const [submitType, setSubmitType] = useState('');
  const [modalType, setModalType] = useState('');
  const [messages, setMessages] = useState([]);

  const getCategories = async () => {
    const res = await getAll();

    setCategories(res.data);
    setIsLoading(false);
  };

  const triggerModal = (type, id = '', name = '') => {
    setMessages([]);

    setModalType(type);
    setSubmitType(type);
    setCategoryId(id);
    setCategoryData(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = categoryData;

    let message = [];
    if (name.length === 0 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Name cannot be empty'];

    if (name.length <= 20 && (submitType === 'create' || submitType === 'update')) message = [...message, 'Name must be under 20 characters'];

    if (message.length > 0) {
      setMessages(message);
    } else {
      try {
        let res = {};

        if (submitType === 'create') {
          res = await createOne({ name });
        } else if (submitType === 'update') {
          res = await updateOne(categoryId, { name });
        } else if (submitType === 'delete') {
          res = await deleteOne(categoryId);
        }

        setMessages([res.data.message]);
        setModalType('');
        setSubmitType('');
        setCategoryData('');
        setCategoryId('');
        getCategories();
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className='mb-3 d-flex justify-content-between'>
        <Title
          title={'list of categories'}
          className='mb-0'
        />

        <Button
          className='text-light py-0 px-3 text-uppercase'
          onClick={() => triggerModal('create')}
        >
          add new categories
        </Button>
      </div>

      {isLoading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <>
          {categories.map((tag) => (
            <div key={tag._id}>
              <div className='d-flex justify-content-between p-2'>
                <div className='d-flex flex-column'>
                  <p className='m-0 text-muted text-capitalize'>name:</p>

                  <p className='m-0 fs-5 fw-bold'>{tag.name}</p>
                </div>

                <div className='d-flex'>
                  <Button
                    onClick={() => triggerModal('update', tag._id, tag.name)}
                    className='bg-transparent align-self-center me-2'
                  >
                    <FiEdit className='fs-5 text-dark' />
                  </Button>

                  <Button
                    onClick={() => triggerModal('delete', tag._id, tag.name)}
                    className='bg-transparent align-self-center'
                  >
                    <MdDeleteForever className='fs-5 text-dark' />
                  </Button>
                </div>
              </div>

              <hr className='mb-md-3 mt-0 mb-2' />
            </div>
          ))}
        </>
      )}

      {modalType === 'create' ? (
        <Modal
          trigger={modalType === 'create'}
          setTrigger={setModalType}
          type={'category'}
          handleChanges={setCategoryData}
          submit={handleSubmit}
          messages={messages}
          cancel='cancel'
          confirm='confirm'
        />
      ) : modalType === 'update' ? (
        <Modal
          trigger={modalType === 'update'}
          setTrigger={setModalType}
          type={'category'}
          isUpdate
          name={categoryData}
          handleChanges={setCategoryData}
          submit={handleSubmit}
          messages={messages}
          cancel='cancel'
          confirm='confirm'
        />
      ) : (
        <Modal
          trigger={modalType === 'delete'}
          setTrigger={setModalType}
          type={'category'}
          isDelete
          submit={handleSubmit}
          messages={messages}
          modalFor={categoryData}
          cancel='cancel'
          confirm='confirm'
        />
      )}

      {messages.join('').includes('successful') && modalType === '' && (
        <Modal
          title={messages}
          setTrigger={setModalType}
          trigger={messages.join('').includes('successful') && modalType === ''}
          notification
        />
      )}
    </>
  );
};

export default Categories;
