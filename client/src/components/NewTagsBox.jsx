import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";

const Popup = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Main = styled.div`
  width: 45em;
  border-radius: 10px;
  padding: 2em;
  background-color: #fff;
  box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);
  position: relative;
`;

const BackButton = styled(Button)`
  width: 40%;
  background-color: transparent;
  font-weight: 600;
  margin-right: 1em;
`;

const NextButton = styled(Button)`
  width: 60%;
  color: #fff;
  font-weight: 600;
  border: none;
`;

const NewTagsBox = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = (sub) => {
    sub.preventDefault();

    axios
      .post(
        "http://localhost:4000/api/tags",
        {
          name,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        alert("Add tag successful");
        window.location.reload();
        props.setTrigger(false);
      })
      .catch((err) => console.error(err));
  };

  return props.trigger ? (
    <Popup>
      <Main>
        <h2 className="fw-bold mb-4">ADD NEW CATEGORY</h2>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-2 d-flex">
            <Form.Label className="w-50 m-0 align-self-center">NAME</Form.Label>
            <Form.Control className="w-50 h-50 w-75" type="text" id="nama" placeholder="Tag name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <div className="mt-4 d-flex">
            <BackButton onClick={() => props.setTrigger(false)}>CANCEL</BackButton>
            <NextButton type="submit" className="m-0">
              CONFIRM
            </NextButton>
          </div>
        </Form>
      </Main>
    </Popup>
  ) : (
    ""
  );
};

export default NewTagsBox;
