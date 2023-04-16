import { Button, Modal as ModalBootstrap } from 'react-bootstrap'

const { Header, Title, Body, Footer } = ModalBootstrap

const Modal = ({ show, handleClose, title, message }) => (
  <ModalBootstrap
    show={show}
    onHide={handleClose}
    backdrop='static'
    size='md'
    aria-labelledby='contained-modal-title-vcenter'
    centered
  >
    <Header>
      <Title id='contained-modal-title-vcenter'>{title}</Title>
    </Header>

    <Body>
      <p className='m-0'>{message}</p>
    </Body>

    <Footer>
      <Button
        className='text-light w-100'
        onClick={() => handleClose()}
      >
        OK
      </Button>
    </Footer>
  </ModalBootstrap>
)

export default Modal
