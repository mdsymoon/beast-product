import React, { useContext } from "react";
import "./ConfirmForm.css";
import TextField from "@material-ui/core/TextField";
import { Form, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { SelectContext } from "../../App";
import { UserContext } from "./../../App";
import { useHistory } from 'react-router-dom';

const ConfirmForm = () => {
  const history = useHistory();
  const [selectProduct] = useContext(SelectContext);
  const [loggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const orderData = {
      ...data,
      ...selectProduct,
      ...loggedInUser,
      orderStatus: "pending",
      orderDate: new Date().toDateString(),
    };

    fetch(`http://localhost:5000/orderData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push('/dashboard/productList')
      });
  };
  return (
    <div className="confirm-form ">
      <Container>
        <div className="confirm-form-style">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
             className="form-control"
             
              style={{ width: "400px", margin:'auto' }}
              label="Customer Name"
              defaultValue={loggedInUser.name}
              {...register("name", { required: true })}
            />
            <br />
            
            <input
             className="form-control"
             
              style={{ width: "400px", margin:'auto'}}
              label="Product Name"
              defaultValue={selectProduct.title}
              {...register("title", { required: true })}
            />
            <br />
            

            <input
              className="form-control"
             
              style={{ width: "400px", margin: "auto" }}
              type="number"
              id="standard-basic"
              defaultValue={selectProduct.price}
              {...register("price", { required: true })}
            />
            <br />
            
            <Button variant="contained" type="submit" className="mb-5" >Confirm</Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ConfirmForm;
