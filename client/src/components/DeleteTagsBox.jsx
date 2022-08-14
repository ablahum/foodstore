import React from "react";
import { Alert, Button } from "react-bootstrap";
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

const DeleteTagsBox = (props) => {
  const handleSubmit = (sub) => {
    sub.preventDefault();

    const fetch = async () => {
      await axios.delete(`http://localhost:4000/api/tags/${props.value}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      alert("Delete tag successful");
      window.location.reload();
      props.setTrigger(false);
    };

    fetch();
  };

  return props.trigger ? (
    <Popup>
      <Main>
        <h2 className="fw-bold mb-4">DELETE ADDRESS</h2>
        <Alert variant="danger" className="text-center fw-bold fs-5 mt-3 mb-0 py-2">
          Are you sure want to delete address?
        </Alert>
        <div className="mt-3 d-flex">
          <BackButton onClick={() => props.setTrigger(false)}>CANCEL</BackButton>
          <NextButton onClick={(e) => handleSubmit(e)} className="m-0">
            CONFIRM
          </NextButton>
        </div>
      </Main>
    </Popup>
  ) : (
    ""
  );
};

export default DeleteTagsBox;
