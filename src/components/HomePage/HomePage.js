import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./HomePage.css";

const HomePage = () => {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [isProductLoaded, setIsProductLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        setIsProductLoaded(true);
        setProduct(data);
      });
  }, []);
  return (
    <div>
      <div className="search-field">
        <input
          style={{ textAlign: "center" }}
          type="text"
          defaultValue="search product"
          className="search-input"
          disabled
        ></input>
        <Button id="search-button" disabled>
          SEARCH
        </Button>
      </div>

      <div className="all-products container">
        {!isProductLoaded && <Spinner animation="border" variant="danger" />}
        {product.map((pd) => {
          return (
            <Card className="product-card" style={{ width: "18rem" }}>
              <Card.Img className="product-img" variant="top" src={pd.image} />
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    paddingBottom: "50px",
                    fontSize: "22px",
                  }}
                >
                  {pd.name}
                </Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-font-color">{pd.price}$</h5>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push(`/checkout/${pd._id}`)}
                  >
                    Buy Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
