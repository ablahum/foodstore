import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
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
  z-index: 999;
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

const NewProductBox = (props) => {
  const [data, setData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    tags: [],
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChanges = (event) => {
    let newData = { ...data };
    newData[event.target.id] = event.target.value;
    setData(newData);
  };

  const handleSubmit = (sub) => {
    sub.preventDefault();
    const { name, price, description, category, tags } = data;

    axios
      .post(
        "http://localhost:4000/api/products",
        {
          name,
          price,
          description,
          image,
          category,
          tags,
        },
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
        props.setTrigger(false);
      })
      .catch((err) => console.error(err));
  };

  return props.trigger ? (
    <Popup>
      <Main>
        <h2 className="fw-bold mb-4">ADD NEW PRODUCT</h2>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-2 d-flex">
            <Form.Label className="w-50 m-0 align-self-center">NAME</Form.Label>
            <Form.Control className="h-50 w-75" type="text" id="name" placeholder="Product name" onChange={(e) => handleChanges(e)} />
          </Form.Group>
          <Form.Group className="mb-2 d-flex">
            <Form.Label className="w-50 m-0 align-self-center">PRICE</Form.Label>
            <Form.Control className="h-50 w-75" type="text" id="price" placeholder="Product price" onChange={(e) => handleChanges(e)} />
          </Form.Group>
          <Form.Group className="mb-2 d-flex">
            <Form.Label className="w-50 m-0">DESCRIPTION</Form.Label>
            <Form.Control as="textarea" rows={3} className="h-50 w-75" type="text" id="description" placeholder="Product description" onChange={(e) => handleChanges(e)} />
          </Form.Group>
          <Form.Group className="mb-2 d-flex">
            <Form.Label className="w-50 m-0 align-self-center">IMAGE</Form.Label>
            <Form.Control type="file" id="image" className="h-50 w-75" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Group>
          <Form.Group className="mb-2 d-flex">
            <Form.Label className="w-50 m-0 align-self-center">CATEGORY</Form.Label>
            <Form.Select className="h-50 w-75" id="category" onChange={(e) => handleChanges(e)}>
              <option>Product category</option>
              {categories.map((category) => (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2 d-flex">
            <Form.Label className="w-50 m-0 align-self-center" onClick={() => console.log(data)}>
              TAGS
            </Form.Label>
            <Form.Control className="h-50 w-75" type="text" id="tags" placeholder="Product tags" onChange={(e) => handleChanges(e)} />
          </Form.Group>
          <div className="mt-4 d-flex">
            <BackButton onClick={() => props.setTrigger(false)}>CANCEL</BackButton>
            <NextButton type="submit" className="m-0">
              CONFIRM
            </NextButton>
          </div>
        </Form>
      </Main>
    </Popup>
  ) : (
    ""
  );
};

export default NewProductBox;
