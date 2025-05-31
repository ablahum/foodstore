import { useEffect, useState } from 'react'
import { Accordion, Spinner, Table } from 'react-bootstrap'
import rupiah from 'rupiah-format'
import { getAll } from '../../apis/orders'
import { Title } from '..'

const { Item, Header, Body } = Accordion

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const getOrders = async () => {
    const res = await getAll()

    setCount(res.data.count)
    setOrders(res.data.data)
    setLoading(false)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <>
      <div className='mb-3 d-flex justify-content-between align-items-center'>
        <Title
          title={'list of your orders'}
          className='mb-0'
        />

        <p className='m-0 text-uppercase'>total items ordered: {count}</p>
      </div>

      {loading ? (
        <div className='text-center mt-5'>
          <Spinner animation='border' />
        </div>
      ) : (
        <Accordion>
          {orders.map((data, i) => (
            <Item
              eventKey={data.id}
              key={data.id}
            >
              <Header>
                <p className='d-md-none d-block text-capitalize m-0'>
                  order <span className='fw-bold'>{i + 1}</span>
                </p>

                <div className='d-md-flex d-none flex-column'>
                  <p className='fs-5 m-0 text-capitalize'>
                    order <span className='text-uppercase'>id: </span>
                  </p>

                  <p className='fs-5 m-0 fw-bold'>{data.id}</p>
                </div>
              </Header>

              <Body className='p-3'>
                <div className='d-flex flex-column flex-md-row'>
                  <div className='d-flex flex-column w-100'>
                    <div className='mb-2'>
                      <p className='m-0 text-uppercase'>order number:</p>

                      <p className='fw-bold m-0'>{data.order_number}</p>
                    </div>

                    <div className='mb-2'>
                      <p className='m-0 text-uppercase'>status:</p>

                      <p className='fw-bold m-0'>{data.status}</p>
                    </div>

                    <div className='mb-2'>
                      <p className='m-0 text-uppercase'>delivery fee:</p>

                      <p className='fw-bold m-0'>{rupiah.convert(data.delivery_fee)}</p>
                    </div>

                    <div className='mb-2 mb-md-0'>
                      <p className='m-0 text-uppercase'>amount of items:</p>

                      <p className='fw-bold m-0'>{data.items_count}</p>
                    </div>
                  </div>

                  <div className='d-flex flex-column w-100'>
                    <p className='m-0 text-uppercase'>order items:</p>

                    <Table
                      hover
                      responsive
                      className='mb-0'
                      size='sm'
                    >
                      <thead>
                        <tr>
                          <th className='text-uppercase fw-normal'>name</th>

                          <th className='text-uppercase text-end fw-normal'>quantity</th>
                        </tr>
                      </thead>

                      <tbody>
                        {data.order_items.map((item) => (
                          <tr key={item._id}>
                            <td className='fw-bold'>{item.name}</td>

                            <td className='text-end fw-bold'>{item.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Body>
            </Item>
          ))}
        </Accordion>
      )}
    </>
  )
}

export default OrderList
