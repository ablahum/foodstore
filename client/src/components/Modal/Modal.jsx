import { Button, Modal as ModalBootstrap } from 'react-bootstrap'

const { Header, Title, Body, Footer } = ModalBootstrap

const Modal = (props) => {
  return (
    <ModalBootstrap
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Header closeButton>
        <Title id='contained-modal-title-vcenter'>{props.title}</Title>
      </Header>

      <Body>
        <p>{props.message}</p>
      </Body>

      <Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Footer>
    </ModalBootstrap>
  )
}

export default Modal
