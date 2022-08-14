import React from "react";
import styled from "styled-components";

const Main = styled.div`
  color: #fff;
  background-color: #1c1f23;
  box-shadow: 0px 10px 50px -15px rgba(0, 0, 0, 1);
  text-align: center;
  margin-top: 1em;
  padding: 1.5em 0;
`;

const Footer = () => {
  return (
    <Main>
      <h6>Made by ablahum | All rights reserved</h6>
    </Main>
  );
};

export default Footer;
