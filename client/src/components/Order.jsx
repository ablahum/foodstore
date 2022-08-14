import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Order = () => {
  let globalState = useSelector((state) => state.my);

  const [datas, setDatas] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:4000/api/orders", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setCount(res.data.count);
      setDatas(res.data.data);
      setLoading(false);
    };

    fetch();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <h2 className="fw-bold fs-3 mb-3">YOUR ORDER HISTORY</h2>
          <h3>order count: {count}</h3>
          <Accordion>
            {datas.map((data, idx) => (
              <Accordion.Item eventKey={idx} key={idx}>
                <Accordion.Header>
                  <h3 className="fs-5 m-0">order {idx + 1}</h3>
                </Accordion.Header>
                <Accordion.Body className="p-3">
                  <Form className="d-flex justify-content-around">
                    <div className="d-flex flex-column">
                      <Form.Group>
                        <Form.Label className="w-50 m-0 align-self-center">STATUS</Form.Label>
                        <h4>{data.status}</h4>
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label className="w-50 m-0 align-self-center">JUMLAH ITEMS</Form.Label>
                        <h4>{data.items_count}</h4>
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label className="w-50 m-0 align-self-center">DELIVERY FEE</Form.Label>
                        <h4>{data.delivery_fee}</h4>
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label className="w-50 m-0 align-self-center">ORDER NUMBERS</Form.Label>
                        <h4>{data.order_number}</h4>
                      </Form.Group>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                      <Form.Group className="mt-2">
                        <Form.Label className="w-50 m-0 align-self-center">ORDER ITEMS</Form.Label>
                        {data.order_items.map((d, i) => (
                          <div key={i}>
                            <h4>name: {d.name}</h4>
                            <h5>qty: {d.qty}</h5>
                          </div>
                        ))}
                      </Form.Group>
                    </div>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};

export default Order;
