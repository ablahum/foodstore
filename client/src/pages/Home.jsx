import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Heading, Pagination, Tags, Product } from "../components";

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5em;
  margin-bottom: 0.5em;

  @media (max-width: 991px) {
    padding: 0;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Master = styled.div`
  min-height: 100vh;
`;

const Home = () => {
  return (
    <Master>
      <Heading title="OUR MENUS" />
      <Container className="py-5">
        <TopBar>
          <Pagination />
          <Tags />
        </TopBar>
        <div>
          <Product />
        </div>
      </Container>
    </Master>
  );
};

export default Home;
