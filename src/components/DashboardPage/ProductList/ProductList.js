import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { UserContext } from './../../../App';

const ProductList = () => {
  const [orderList , setOrderList] = useState([]);
  const [loggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:5000/orderList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderList(data);
       
      });
  },[loggedInUser.email]);
  return (
    <div className="mt-5 pt-5 container ">
      <Table striped bordered hover className="text-white" style={{ minWidth: "700px" }} responsive>
        <thead>
          <tr>
            
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Order Time</th>
            <th>Delivery Status</th>
          </tr>
        </thead>
        <tbody >
          {orderList.map((list) => (
            <tr className="text-white">
            <td>{list.title}</td>
            <td>{list.price}</td>
            <td>{list.orderDate}</td>
            <td>{list.orderStatus}</td>
          </tr>
          ))}
          
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;
