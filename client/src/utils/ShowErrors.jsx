import React from "react";
import styled from "styled-components";

const List = styled.p`
  color: red;
  margin: auto;
  font-weight: 600;
`;

const ShowErrors = ({ errors }) => {
  return (
    <>
      {errors.map((error, i) => (
        <List key={i}>{error}</List>
      ))}
    </>
  );
};

export default ShowErrors;
