import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Heading, ConfirmBox } from "../components";
import { ShowErrors, total } from "../utils";
import rupiah from "rupiah-format";
import { useSelector } from "react-redux";

const Main = styled.div`
  background-color: #fff;
  height: 85vh;
`;

const Summary = styled.div`
  padding: 1em;
  width: 50%;
  max-height: 450px;
  overflow: auto;
`;

const Total = styled.div`
  width: 50%;
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
`;

const Next = styled(Button)`
  width: 100%;
  color: #fff;
  font-weight: 600;
  border: none;
`;

const Checkout = () => {
  const cartState = useSelector((state) => state.cart);

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [data, setData] = useState({
    address: "",
    payment: "",
  });
  const [addressError, setAddressError] = useState([]);
  const [paymentError, setPaymentError] = useState([]);
  const [confirm, setConfirm] = useState(false);

  const relatedAddress = addresses.filter((a) => a.nama === data.address);
  const payments = ["Bank BCA", "Bank Mandiri", "DANA", "OVO"];

  useEffect(() => {
    const fetch = async () => {
      try {
        const cart = await axios.get("http://localhost:4000/api/carts", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        const address = await axios.get("http://localhost:4000/api/delivery-addresses", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setCartItems(cart.data);
        setAddresses(address.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
  }, []);

  if (cartState.length === 0) {
    return <Navigate to="/" />;
  }

  const handleChanges = (e) => {
    let newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const handleSubmit = () => {
    if (!data.address) {
      setAddressError(["Please select delivery address"]);
    }
    if (!data.payment) {
      setPaymentError(["Please select payment method"]);
    }

    if (data.address && data.payment) {
      setConfirm(true);
      setAddressError([]);
      setPaymentError([]);
    }
  };

  return (
    <Main>
      <Heading title="CHECKOUT" />
      <Container className="py-5">
        <h2 className="fw-bold">ORDER SUMMARY</h2>
        <div className="d-flex justify-content-between">
          <Summary>
            <Table hover bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Item Name</th>
                  <th>Qty</th>
                  <th className="text-end">Sub Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="text-center p-0">
                      <img src={`http://localhost:4000/public/${item.image}`} alt={item.image} style={{ width: "80px" }} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td className="text-end">{rupiah.convert(item.qty * item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Summary>
          <div className="w-50">
            <div className="p-3 d-flex flex-column">
              <div className="mb-4">
                <Form.Label className="fs-5 fw-bold">SELECT ADDRESS</Form.Label>
                <Form.Select className="h-50" id="address" onChange={(e) => handleChanges(e)}>
                  <option>Delivery address</option>
                  {addresses.map((address) => (
                    <option key={address._id}>{address.nama}</option>
                  ))}
                </Form.Select>
                {addressError.length > 0 && <ShowErrors errors={addressError} />}
              </div>
              <div className="mb-4">
                <Form.Label className="fs-5 fw-bold">SELECT PAYMENT METHOD</Form.Label>
                <Form.Select className="h-50" id="payment" onChange={(e) => handleChanges(e)}>
                  <option>Payment method</option>
                  {payments.map((payment, i) => (
                    <option key={i}>{payment}</option>
                  ))}
                </Form.Select>
                {paymentError.length > 0 && <ShowErrors errors={paymentError} />}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Total>
            <h3 className="m-0">TOTAL: </h3>
            <h3 className="fw-bold m-0">{rupiah.convert(total(cartItems))}</h3>
          </Total>
          <div className="w-50">
            <Next onClick={handleSubmit}>NEXT</Next>
          </div>
        </div>
        <ConfirmBox trigger={confirm} setTrigger={setConfirm} address={data.address} relatedAddress={relatedAddress} payment={data.payment} />
      </Container>
    </Main>
  );
};

export default Checkout;
