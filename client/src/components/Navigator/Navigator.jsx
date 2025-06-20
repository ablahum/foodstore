import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const { Item } = ListGroup

const Navigator = () => {
  const { role } = useSelector((state) => state.user)

  return (
    <div>
      <ListGroup
        as='ul'
        className='fw-bold'
      >
        <Item as='li'>
          <Link
            to='profile'
            className='text-decoration-none text-uppercase'
          >
            profile setting
          </Link>
        </Item>

        <Item as='li'>
          <Link
            to='order'
            className='text-decoration-none text-uppercase'
          >
            order history
          </Link>
        </Item>

        {role === 'admin' ? (
          <>
            <Item as='li'>
              <Link
                to='products'
                className='text-decoration-none text-uppercase'
              >
                manage products
              </Link>
            </Item>

            <Item as='li'>
              <Link
                to='categories'
                className='text-decoration-none text-uppercase'
              >
                manage categories
              </Link>
            </Item>

            <Item as='li'>
              <Link
                to='tags'
                className='text-decoration-none text-uppercase'
              >
                manage tags
              </Link>
            </Item>
          </>
        ) : (
          ''
        )}
      </ListGroup>
    </div>
  )
}

export default Navigator
