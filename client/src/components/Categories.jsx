import React, { useState, useEffect } from "react";
import { Spinner, Button } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import styled from "styled-components";
import NewCategoryBox from "./NewCategoryBox";
import UpdateCategoryBox from "./UpdateCategoryBox";
import DeleteCategoryBox from "./DeleteCategoryBox";

const Update = styled(Button)`
  background-color: transparent;
  font-weight: 600;
  align-self: center;
  margin: 0 7px 0 0;
`;

const Delete = styled(Button)`
  background-color: transparent;
  font-weight: 600;
  align-self: center;
  margin: 0 20px 0 8px;
`;

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [newCategory, setNewCategory] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);

  const handleNew = () => setNewCategory(true);
  const handleUpdate = (params) => {
    setUpdateCategory(true);
    setCategoryId(params);
  };
  const handleDelete = (params) => {
    setDeleteCategory(true);
    setCategoryId(params);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/categories");

        setCategories(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetch();
  }, []);

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between">
        <h2 className="fw-bold fs-3 d-inline mb-0">LIST OF CATEGORIES</h2>
        <Button className="text-light py-0 px-3" onClick={handleNew}>
          ADD NEW CATEGORIES
        </Button>
      </div>
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {categories.map((category) => (
            <div key={category._id}>
              <div className="d-flex justify-content-between" key={category._id}>
                <div className="p-3">
                  <h5 className="mb-2 text-muted">Name:</h5>
                  <h3 className="m-0 fs-4 fw-bold">{category.name}</h3>
                </div>
                <div className="d-flex">
                  <Update onClick={() => handleUpdate(category._id)}>
                    <FiEdit className="fs-5 text-dark" />
                  </Update>
                  <Delete onClick={() => handleDelete(category._id)}>
                    <MdDeleteForever className="fs-5 text-dark" />
                  </Delete>
                </div>
              </div>
              <hr className="my-2" />
            </div>
          ))}
        </>
      )}
      <NewCategoryBox trigger={newCategory} setTrigger={setNewCategory} />
      <UpdateCategoryBox trigger={updateCategory} setTrigger={setUpdateCategory} value={categoryId} />
      <DeleteCategoryBox trigger={deleteCategory} setTrigger={setDeleteCategory} value={categoryId} />
    </div>
  );
};

export default Categories;
