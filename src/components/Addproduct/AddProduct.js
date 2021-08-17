import React from "react";
import "./AddProduct.css";
import { useForm } from "react-hook-form";
import { Form ,Button } from "react-bootstrap";


const AddProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="AddProduct">
        
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Product Name</Form.Label>
    <Form.Control type="text"   />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Product Price</Form.Label>
    <Form.Control type="text"  />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    
  </Form.Group>
  <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Product Image</Form.Label>
    <Form.Control type="file" />
    </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
