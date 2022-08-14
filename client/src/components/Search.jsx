import React from "react";
import { useDispatch } from "react-redux";
import { FormControl, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { searchChanges } from "../app/myReducer/action";

const Master = styled(InputGroup)`
  margin: 0 1em;
`;

const Search = () => {
  const dispatch = useDispatch();

  return (
    <Master>
      <FormControl placeholder="Search products..." onKeyUp={(e) => dispatch(searchChanges(e.target.value))} />
    </Master>
  );
};

export default Search;
