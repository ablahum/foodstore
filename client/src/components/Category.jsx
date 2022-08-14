import React from "react";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import { categoryChanges } from "../app/myReducer/action";

const Button = styled(Dropdown.Toggle)`
  color: #fff;
  font-weight: 500;
  margin: 0.5em;
  border: none;
`;

const Item = styled(Dropdown.Item)`
  :hover {
    color: #fff;
    background-color: #fd7e14;
  }

  :active {
    font-weight: 500;
    color: #000;
    background-color: #fd9843;
  }
`;

const Category = () => {
  const dispatch = useDispatch();

  const categories = [
    { name: "ALL PRODUCTS...", value: "" },
    { name: "FOOD", value: "Food" },
    { name: "DRINK", value: "Drink" },
    { name: "DESSERT", value: "Dessert" },
  ];

  return (
    <Dropdown>
      <Button variant="primary">| CATEGORY</Button>
      <Dropdown.Menu variant="light">
        {categories.map((category, i) => (
          <Item key={i} value={category.value} onClick={() => dispatch(categoryChanges(category.value))}>
            {category.name}
          </Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Category;
