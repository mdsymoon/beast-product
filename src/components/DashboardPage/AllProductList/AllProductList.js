import React, { useContext, useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Table } from "react-bootstrap";
import { AllProducts, LoaderContext } from './../../../App';
import LinearProgress from '@material-ui/core/LinearProgress';

const AllProductList = () => {
  const [products, setProducts] = useContext(AllProducts);
  const [status , setStatus] = useState(null);
  const [loadData , setLoadData] = useContext(LoaderContext);

  const handleStatus =(e , _id) => {
    const newStatus = { _id, status: e.target.value};
    setStatus(newStatus);
}

useEffect(() => {
  if (status) {
    fetch(`http://localhost:5000/updateProductStatus`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(status),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`http://localhost:5000/allProduct`)
          .then((res) => res.json())
          .then((data) => {
            setProducts(data);
            setLoadData(true)
           
          });
       
      });
  }
}, [status]);
  return (
    <div>
      <div className="mt-5 pt-5 container ">
        <h1
          style={{
            color: "#880808",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          All Products List
        </h1>
        <Table
          striped
          bordered
          hover
          className="text-white"
          style={{ minWidth: "700px" }}
          responsive
        >
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product Price</th>

              <th>Storage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr className="text-white">
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <select
                  aria-label="Default select example"
                  className="form-select"
                  value={product.status}
                  name="status"
                  onChange = {e => {handleStatus(e , product._id);setLoadData(false)}}
                >
                  <option value="available">available</option>
                  <option value="unavailable">unavailable</option>
                </select>
              </td>
              <td>
                <Tooltip title="Delete" placement="right">
                  <IconButton aria-label="delete">
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
            ))}
            
          </tbody>
        </Table>
        {!loadData && <LinearProgress style={{marginTop:"50px"}}/>}
      </div>
    </div>
  );
};

export default AllProductList;
