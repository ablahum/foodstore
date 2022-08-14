import React, { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styled from "styled-components";

const Button = styled(ToggleButton)`
  color: #fff;
  background-color: #1c1f23;
  font-size: 1rem;
  border: none;
  padding: 0 2em;
`;

const RoleButton = (props) => {
  const [radioValue, setRadioValue] = useState("user");

  const radios = [
    { name: "USER", value: "user" },
    { name: "ADMIN", value: "admin" },
  ];

  useEffect(() => {
    props.onChange(radioValue);
  });

  return (
    <ButtonGroup>
      {radios.map((radio, idx) => (
        <Button
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          variant={idx % 2 ? "outline-primary" : "outline-primary"}
          name="radio"
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          {radio.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default RoleButton;
