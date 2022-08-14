import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import { tagsChanges } from "../app/myReducer/action";

const Master = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
  margin-right: 1em;

  @media (max-width: 1199px) {
    display: none;
  }
`;

const Toggle = styled.div`
  @media (max-width: 767px) {
    margin-top: 1em;
  }
`;

const TagButton = styled(ToggleButton)`
  font-size: 1rem;
  font-weight: 500;
  padding: 0.2em 1.3em;
`;

const Tags = () => {
  let globalState = useSelector((state) => state.my);

  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();

  // SHOW TAGS
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/tags");

        setTags(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
  }, []);

  return (
    <Master>
      <Title>Search Menu by Tags:</Title>
      <Toggle>
        <ToggleButtonGroup type="checkbox" value={globalState.tags} onChange={(e) => dispatch(tagsChanges(e))}>
          {tags &&
            tags.map((tag, i) => (
              <TagButton id={`tbg-btn-${i + 1}`} key={tag._id} value={tag.name} variant="outline-primary" className="fw-bold">
                {tag.name}
              </TagButton>
            ))}
        </ToggleButtonGroup>
      </Toggle>
    </Master>
  );
};

export default Tags;
