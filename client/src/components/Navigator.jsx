import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const { Item } = ListGroup

const Navigator = () => {
  let globalState = useSelector((state) => state.my)

  return (
    <div>
      <ListGroup
        as='ul'
        className='fw-bold'
      >
        <Item as='li'>
          <Link
            to='profile'
            className='text-decoration-none'
          >
            PROFILE SETTING
          </Link>
        </Item>

        <Item as='li'>
          {globalState.role === 'admin' ? (
            <Link
              to='order'
              className='text-decoration-none'
            >
              ORDER HISTORY
            </Link>
          ) : (
            <Link
              to='order'
              className='text-decoration-none'
            >
              ORDER HISTORY
            </Link>
          )}
        </Item>

        {globalState.role === 'admin' ? (
          <>
            <Item as='li'>
              <Link
                to='products'
                className='text-decoration-none'
              >
                MANAGE PRODUCTS
              </Link>
            </Item>

            <Item as='li'>
              <Link
                to='categories'
                className='text-decoration-none'
              >
                MANAGE CATEGORIES
              </Link>
            </Item>

            <Item as='li'>
              <Link
                to='tags'
                className='text-decoration-none'
              >
                MANAGE TAGS
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
