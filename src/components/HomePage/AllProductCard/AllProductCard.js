import React, { useContext, useState } from "react";
import "./AllProductCard.css";
import { Alert, Card } from "react-bootstrap";
import { Button, IconButton } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {  SelectContext } from "../../../App";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../../../App";
import Tooltip from "@material-ui/core/Tooltip";

const AllProductCard = ({ product, title, price, img }) => {
  const [loggedInUser] = useContext(UserContext);
  const [, setSelectProduct] = useContext(SelectContext);
  const [show, setShow] = useState(true);

  const history = useHistory();

  const handleSelect = () => {
    setSelectProduct({ title, price, img });
    history.push("/confirmForm");
  };

  const handleCart = () => {
    const cartItem = {
      title,
      price,
      img,
      email: loggedInUser.email,
    };

    fetch(`https://enigmatic-spire-83470.herokuapp.com/addToCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItem),
    })
      .then((res) => res.json())
      .then((data) => {
        setShow(false);
      });
  };
  return (
    <div className=" col-lg-4 col-md-6 d-flex justify-content-center align-items-center mb-5">
      <Card className="product-card">
        <Card.Img
          variant="top"
          src={`data:image/png;base64,${product.img.img}`}
        />
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="text-white">{product.title}</Card.Title>
            <h4 style={{ color: "red" }}>
              $<span style={{ color: "#880808" }}>{product.price}</span>
            </h4>
          </div>
          {product.status === "available" && (
            <div className="d-flex justify-content-between">
              <Button
                className=" text-white"
                variant="outlined"
                color="secondary"
                onClick={handleSelect}
              >
                Buy Now
              </Button>
              {loggedInUser.email ? (
                <Tooltip title="Add To Cart" placement="left">
                  <IconButton
                    color="secondary"
                    aria-label="add to shopping cart"
                    onClick={handleCart}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Add To Cart" placement="left">
                  <IconButton
                    color="secondary"
                    aria-label="add to shopping cart"
                    onClick={() => {
                      alert("Please Login First");
                    }}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          )}
          {product.status === "unavailable" && (
            <h3 style={{ textAlign: "center", color: "#F50057" }}>Sold Out</h3>
          )}
        </Card.Body>
        {!show && (
          <Alert
            className="hideThis"
            variant="success"
            onClose={() => setShow(true)}
            dismissible
            style={{ height: "60px ", padding: "0px", display: "flex" }}
          >
            <p>{product.title} added to cart</p>
          </Alert>
        )}
      </Card>
    </div>
  );
};

export default AllProductCard;
