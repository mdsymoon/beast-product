import React, { useContext } from "react";
import "./ConfirmForm.css";

import { Form, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { SelectContext } from "../../App";
import { UserContext } from "./../../App";
import { useHistory, useLocation } from "react-router-dom";

const ConfirmForm = () => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const history = useHistory();
  const [selectProduct] = useContext(SelectContext);
  const [loggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
   
    formState: {},
  } = useForm();
  const onSubmit = (data) => {
    const orderData = {
      ...data,
      ...selectProduct,
      orderStatus: "pending",
      orderDate: new Date().toDateString(),
    };

    fetch(`https://enigmatic-spire-83470.herokuapp.com/orderData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push("/dashboard/productList");
      });
  };
  return (
    <div className="confirm-form ">
      <Container>
        <div className="confirm-form-style">
          <h1 style={{ color: "#880808" }}>Product Confirmation</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              className="input-style"
              defaultValue={loggedInUser.name}
              {...register("name", { required: true })}
            />
            <Form.Label>Your Email</Form.Label>
            <Form.Control
              className="input-style"
              defaultValue={loggedInUser.email}
              {...register("email", { required: true })}
            />

            <Form.Label>Product Name</Form.Label>
            <Form.Control
              className="input-style"
              defaultValue={selectProduct.title}
              {...register("title", { required: true })}
            />

            <Form.Label>Product Price</Form.Label>
            <Form.Control
              className="input-style"
              type="number"
              id="standard-basic"
              defaultValue={selectProduct.price}
              {...register("price", { required: true })}
            />
            <br />
            <div className="d-flex justify-content-center ">
              <Button
                variant="contained"
                className="mb-5 mx-5"
                onClick={() => history.replace(from)}
              >
                Back
              </Button>
              <Button variant="contained" type="submit" className="mb-5">
                Confirm
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ConfirmForm;
