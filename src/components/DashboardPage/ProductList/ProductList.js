import React, { useContext, useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { UserContext } from "./../../../App";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import LinearProgress from "@material-ui/core/LinearProgress";

const ProductList = () => {
  const [orderList, setOrderList] = useState([]);
  const [loggedInUser] = useContext(UserContext);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    fetch(`https://enigmatic-spire-83470.herokuapp.com/orderList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setOrderList(data);
        setLoadData(true);
      });
  }, [loggedInUser.email, orderList]);

  const handleDelete = (_id) => {
    fetch(`https://enigmatic-spire-83470.herokuapp.com/deleteOrder`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`https://enigmatic-spire-83470.herokuapp.com/orderList`)
          .then((res) => res.json())
          .then((data) => {
            setOrderList(data);
          });
      });
  };
  return (
    <div className="mt-5 pt-5 container ">
      <h1
        style={{ color: "#880808", textAlign: "center", marginBottom: "20px" }}
      >
        My Order List
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
            <th>Order Time</th>
            <th>Delivery Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((list) => (
            <tr key={list._id} className="text-white">
              <td>{list.title}</td>
              <td>${list.price}</td>
              <td>{list.orderDate}</td>
              <td className="d-flex align-items-center">
                {list.orderStatus}
                {list.orderStatus === "pending" && (
                  <Spinner
                    animation="border"
                    variant="danger"
                    style={{ marginLeft: "5px", marginTop: "5px" }}
                    size="sm"
                  />
                )}
              </td>
              <td>
                {list.orderStatus === "pending" && (
                  <Tooltip title="Delete" placement="right">
                    <DeleteIcon
                      color="secondary"
                      onClick={() => {
                        handleDelete(list._id);
                        setLoadData(false);
                      }}
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                    />
                  </Tooltip>
                )}
                {list.orderStatus === "delivered" && (
                  <CheckCircleOutlineIcon
                    style={{
                      color: "green",
                      fontSize: "25px",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!loadData && <LinearProgress className="mt-5" />}
    </div>
  );
};

export default ProductList;
