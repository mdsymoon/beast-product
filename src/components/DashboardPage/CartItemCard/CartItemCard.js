import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import {  SelectContext } from "../../../App";
import { useHistory } from "react-router-dom";


const CartItemCard = ({ cartItem, title, price, img }) => {
  const [, setSelectProduct] = useContext(SelectContext);
  const history = useHistory();

  const handleSelect = () => {
    setSelectProduct({ title, price, img });
    history.push("/confirmForm");
  };

  const handleDeleteCart = (_id) => {
    fetch(`https://enigmatic-spire-83470.herokuapp.com/deleteCart`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((data) => {});
  };
  return (
    <div className=" col-lg-4 col-md-6 d-flex justify-content-center align-items-center">
      <Card className="product-card">
        <Card.Img
          variant="top"
          src={`data:image/png;base64,${cartItem.img.img}`}
        />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="text-white">{cartItem.title}</Card.Title>
            <h4 style={{ color: "red" }}>
              $<span style={{ color: "#880808" }}>{cartItem.price}</span>
            </h4>
          </div>

          <div className="d-flex justify-content-between">
            <Button
              className="text-white"
              variant="outlined"
              color="secondary"
              onClick={handleSelect}
            >
              Buy Now
            </Button>
            <Button
              className=" text-white"
              variant="outlined"
              color="primary"
              onClick={() => {
                handleDeleteCart(cartItem._id);
              }}
            >
              Remove
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartItemCard;
