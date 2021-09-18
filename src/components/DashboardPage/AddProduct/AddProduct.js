import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddProduct.css";
import { Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";

const AddProduct = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("status", data.status);

    fetch(`https://enigmatic-spire-83470.herokuapp.com/addProduct`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {});
    console.log(data);
  };

  return (
    <div className="d-flex justify-content-center">
      <div>
        <h1 className="text-white mb-5">Add Product</h1>

        <div className="addProduct-form ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="form-control input-style"
              placeholder="Product Name"
              {...register("title", { required: true })}
            />
            <br />
            <input
              className="form-control input-style"
              placeholder="Product Price"
              type="number"
              {...register("price", { required: true })}
            />
            <br />
            <Form.Select
              className="input-style"
              aria-label="Default select example"
              {...register("status", { required: true })}
            >
              <option value="available">available</option>
              <option value="unavailable">unavailable</option>
            </Form.Select>
            <br />
            <input
              className="input-style"
              type="file"
              {...register("img", { required: true })}
              onChange={handleFileChange}
            />
            <br />
            <br />

            <Button variant="contained" type="submit" className="mb-5">
              Add Product
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
