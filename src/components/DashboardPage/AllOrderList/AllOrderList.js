import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import LinearProgress from "@material-ui/core/LinearProgress";

const AllOrderList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(null);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    fetch(`https://enigmatic-spire-83470.herokuapp.com/allOrders`)
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
        setLoadData(true);
      });
  }, [allOrders]);

  const handleDelete = (_id) => {
    fetch(`https://enigmatic-spire-83470.herokuapp.com/deleteOrder`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`https://enigmatic-spire-83470.herokuapp.com/allOrders`)
          .then((res) => res.json())
          .then((data) => {
            setAllOrders(data);
            setLoadData(true);
          });
      });
  };

  const handleStatus = (e, _id) => {
    const newStatus = { _id, orderStatus: e.target.value };
    setOrderStatus(newStatus);
    console.log(orderStatus);
  };
  useEffect(() => {
    if (orderStatus) {
      fetch(`https://enigmatic-spire-83470.herokuapp.com/updateStatus`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderStatus),
      })
        .then((res) => res.json())
        .then((data) => {
          fetch(`https://enigmatic-spire-83470.herokuapp.com/allOrders`)
            .then((res) => res.json())
            .then((data) => {
              setAllOrders(data);
              setLoadData(true);
            });
        });
    }
  }, [orderStatus]);
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
          All Order's
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
              <th>Customer Email</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Order Time</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr className="text-white">
                <td>{order.email}</td>
                <td>{order.title}</td>
                <td>${order.price}</td>
                <td>{order.orderDate}</td>
                <td>
                  <select
                    aria-label="Default select example"
                    className="form-select"
                    value={order.orderStatus}
                    name="orderStatus"
                    onChange={(e) => {
                      handleStatus(e, order._id);
                      setLoadData(false);
                    }}
                  >
                    <option value="pending">pending</option>
                    <option value="delivered">delivered</option>
                  </select>
                </td>
                <td>
                  <Tooltip title="Delete" placement="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        handleDelete(order._id);
                        setLoadData(false);
                      }}
                    >
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {!loadData && <LinearProgress style={{ marginTop: "100px" }} />}
      </div>
    </div>
  );
};

export default AllOrderList;
