import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import './AddProduct.css';

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
  const onSubmit = (data) => console.log(data);

  
  return (
    <div className="container mt-5 pt-5">
        <h1 className="text-white mb-5">Add Product</h1>
      <div className="addProduct-form " >
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            
            id="standard-basic"
            label="Product Name"
            
            {...register("name", { required: true })}
          />
          <br />
          <TextField
           type="number"
            id="standard-basic"
            label="Product Price"
            {...register("price", { required: true })}
          />
          <br />
          <TextField 
          type="file"
          {...register("img", { required: true })}
          />
          <br/>
          <br/>

          <input type="submit" className="mb-5" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
