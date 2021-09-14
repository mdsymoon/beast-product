import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "./AddProduct.css";
import { Form } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const AddProduct = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    reset,
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

    fetch(`http://localhost:5000/addProduct`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {});
    console.log(data);
  };

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-white mb-5">Add Product</h1>
      
      <div className="addProduct-form ">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="standard-basic"
            label="Product Name"
            {...register("title", { required: true })}
          />
          <br />
          <TextField
            type="number"
            id="standard-basic"
            label="Product Price"
            {...register("price", { required: true })}
          />
          <br />
          <Form.Select aria-label="Default select example" {...register("status", { required: true })} style={{width:'200px', margin:'auto', marginTop:'10px'}}>
            
            <option value="available">available</option>
            <option value="unavailable">unavailable</option>
            
          </Form.Select>
          <br />
          <TextField
            type="file"
            {...register("img", { required: true })}
            onChange={handleFileChange}
          />
          <br />
          <br />

          <input type="submit" className="mb-5" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
