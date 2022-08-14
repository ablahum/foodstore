import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { Role } from "../components";
import { ShowErrors } from "../utils";
import bgHero from "../assets/banner-1.jpg";

const Main = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${bgHero});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Contents = styled.div`
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2em;
  width: 40%;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 1);
`;

const SubmitButton = styled(Button)`
  color: #fff;
  width: 100%;
  font-weight: 600;
  border: none;
`;

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState("user");
  const [errorMessages, setErrorMessages] = useState([]);

  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  // SET NEW DATA TO LOCAL STATE
  const handleChanges = (event) => {
    let newData = { ...data };
    newData[event.target.id] = event.target.value;
    setData(newData);
  };

  const handleSubmit = async (sub) => {
    sub.preventDefault();
    const { name, email, password } = data;

    // VALIDATION
    let message = [];
    if (name.length === 0) {
      message = [...message, "Name must be filled"];
    }
    if (email.length === 0) {
      message = [...message, "Email cannot be empty"];
    }
    if (password.length < 8) {
      message = [...message, "Password must be at least 8 characters"];
    }

    if (message.length > 0) {
      setErrorMessages(message);
    } else {
      try {
        await axios
          .post("http://localhost:4000/auth/register", {
            name,
            email,
            password,
            role,
          })
          .then((res) => {
            if (res.data.error) {
              setErrorMessages([res.data.message]);
            } else {
              alert("Register successful");
              setErrorMessages([]);
              navigate("/login");
            }
          });
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <Main>
      <Container>
        <Contents>
          <h2 className="text-center fw-bold mb-4">SIGN UP</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>NAME:</Form.Label>
              <Form.Control type="text" id="name" placeholder="Your name..." value={data.name} onChange={(e) => handleChanges(e)} className="h-50" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>EMAIL:</Form.Label>
              <Form.Control type="email" id="email" placeholder="Your email..." value={data.email} onChange={(e) => handleChanges(e)} className="h-50" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PASSWORD:</Form.Label>
              <Form.Control type="password" id="password" placeholder="Your password..." value={data.password} onChange={(e) => handleChanges(e)} className="h-50" />
            </Form.Group>
            <div className="mb-3 d-flex">
              <Form.Label className="me-4 mb-0 align-self-center">ROLE:</Form.Label>
              <Role onChange={(e) => setRole(e)} />
            </div>
            {errorMessages.length > 0 && <ShowErrors errors={errorMessages} />}
            <SubmitButton href="#" className="mt-3" onClick={(e) => handleSubmit(e)}>
              SIGN IN
            </SubmitButton>
          </Form>
          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Sign In
            </Link>{" "}
            instead
            <br />
            <Link to="/" className="text-decoration-none">
              ← Back to home
            </Link>
          </p>
        </Contents>
      </Container>
    </Main>
  );
};

export default Register;
