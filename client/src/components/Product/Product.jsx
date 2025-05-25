import { Row, Col, Card, Button } from 'react-bootstrap'
import rupiah from 'rupiah-format'
import { config } from '../../config'
import { Modal } from '../../components'

const { Body, Img, Title, Text } = Card

const Product = ({ products, setCart, isNotification, setIsNotification }) => (
  <>
    <Row>
      {products &&
        products.map((product) => (
          <Col
            xl={3}
            lg={4}
            md={4}
            sm={6}
            xs={6}
            className='p-1 p-md-2'
            key={product._id}
          >
            <Card className='rounded-4 p-3 shadow'>
              <Body className='p-0 d-flex flex-column justify-content-between'>
                <Img
                  variant='top'
                  className='mb-2'
                  src={`${config.apiHost}/public/${product.image}`}
                  alt={product.name}
                />
                <Title className='fw-bold'>{product.name}</Title>

                <Text className='mb-2'>{product.description}</Text>

                <p className='fs-5 fw-semibold mb-2'>{rupiah.convert(product.price)}</p>

                <div className='text-muted mb-2'>
                  {product.tags.map((tag) => (
                    <p
                      key={tag._id}
                      className='border d-inline p-1 rounded-3 me-2 fw-semibold'
                      style={{ fontSize: '0.7rem' }}
                    >
                      {tag.name}
                    </p>
                  ))}
                </div>
              </Body>

              <Button
                className='align-self-start text-white fw-semibold'
                style={{ fontSize: '0.7rem' }}
                onClick={() => setCart(product)}
              >
                + Add to Cart
              </Button>
            </Card>
          </Col>
        ))}
    </Row>

    <Modal
      notification
      setTrigger={setIsNotification}
      trigger={isNotification}
      title={'Item successfully added to your cart'}
    />
  </>
)
export default Product
