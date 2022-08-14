import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import bgHero from "../assets/banner-2.jpg";

const Master = styled.div`
  color: #fff;
  height: 18em;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgHero});
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;
  display: flex;
  align-items: center;

  @media (max-width: 575px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 6rem;
  font-family: "Noe Display", serif;
  font-weight: 500;
  letter-spacing: 2rem;
`;

const Heading = (props) => {
  return (
    <Master>
      <Container>
        <Title>{props.title}</Title>
      </Container>
    </Master>
  );
};

export default Heading;
