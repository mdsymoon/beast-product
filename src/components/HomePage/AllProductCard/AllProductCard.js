import React, { useContext } from "react";
import "./AllProductCard.css";
import { Card } from "react-bootstrap";
import { Button, IconButton } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { SelectContext } from "../../../App";
import { useHistory } from 'react-router-dom';

const AllProductCard = ({ product , title , price , img }) => {
    const [selectProduct , setSelectProduct] = useContext(SelectContext);
    const history = useHistory();

    const handleSelect =() => {
        setSelectProduct({title , price , img});
        history.push("/confirmForm");
        console.log(selectProduct);
    }
  return (
    <div className=" col-lg-4 col-md-6 d-flex justify-content-center align-items-center">
      <Card className="product-card">
        <Card.Img
          variant="top"
          src={`data:image/png;base64,${product.img.img}`}
        />
        <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="text-white">{product.title}</Card.Title>
            <h4 style={{color:'red'}}>$<span style={{color:'#880808'}}>{product.price}</span></h4>
            </div>
          
          <div className="d-flex justify-content-between">
            <Button className="buy-button" variant="outlined" color="secondary" onClick={handleSelect}>
              Buy Now
            </Button>
            <IconButton color="secondary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AllProductCard;
