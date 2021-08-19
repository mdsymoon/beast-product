import React, { useState } from "react";
import "./AddProduct.css";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddProduct = () => {
  const { register, handleSubmit, watch } = useForm();
  const [imageURL , setImageURL] = useState(null);
  const onSubmit = (data) => {
    const eventData= {
      name: data.name,
      price: data.price,
      image: imageURL
    }
    console.log(eventData);
    const url = `http://localhost:5000/addProduct`
    
    fetch(url, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(eventData)
  })
  .then(res => console.log("server side ", res))
  };
  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "66bace482af0cb9c02f712d2d225ca4d");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="AddProduct">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" {...register("name")} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Product Price</Form.Label>
          <Form.Control type="number" {...register("price")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
        </Form.Group>
        <Button variant="danger"  type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
