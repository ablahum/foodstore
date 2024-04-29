import { Container } from 'react-bootstrap'

import banner from '../../assets/banner.png'

const Heading = ({ title }) => {
  return (
    <div
      className='text-white shadow-lg d-flex align-items-center'
      style={{
        height: '30vh',
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundAttachment: 'fixed',
      }}
    >
      <Container>
        <h1
          className='m-0 text-uppercase text-md-start text-center display-1 fw-normal'
          style={{
            fontFamily: 'var(--serif)',
            letterSpacing: '2rem',
          }}
        >
          {title}
        </h1>
      </Container>
    </div>
  )
}

export default Heading
