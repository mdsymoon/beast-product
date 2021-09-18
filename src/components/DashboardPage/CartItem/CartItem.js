import React, { useContext, useState } from "react";
import { useEffect } from "react";
import CartItemCard from "./../CartItemCard/CartItemCard";
import {
  
  UserContext,
} from "./../../../App";
import LinearProgress from "@material-ui/core/LinearProgress";

const CartItem = () => {
  const [cart, setCart] = useState([]);
  const [loggedInUser] = useContext(UserContext);
  const [cartLoader, setCartLoader] = useState(false);

  useEffect(() => {
    fetch(`https://enigmatic-spire-83470.herokuapp.com/cartProduct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loggedInUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setCartLoader(true);
      });
  });
  return (
    <div>
      <h1 style={{ color: "#880808", textAlign: "center" }}>Cart Product</h1>
      {!cartLoader && (
        <LinearProgress
          style={{ width: "80%", margin: "auto", marginTop: "100px" }}
        />
      )}
      <div className="row mt-5 d-flex justify-content-center">
        {cart.map((cartItem) => (
          <CartItemCard
            key={cartItem._id}
            cartItem={cartItem}
            title={cartItem.title}
            price={cartItem.price}
            img={cartItem.img}
          ></CartItemCard>
        ))}
      </div>
    </div>
  );
};

export default CartItem;
