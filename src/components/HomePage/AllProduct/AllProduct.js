import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { AllProducts } from "../../../App";
import AllProductCard from "../AllProductCard/AllProductCard";
import "./AllProduct.css";

const AllProduct = () => {
  const [products, setProducts] = useContext(AllProducts);

  return (
    <Container className="mb-5">
      <div className="d-flex justify-content-center my-5">
        <input className="search-input" value="search product" disabled />
        <button className="search-button" disabled>
          Search
        </button>
      </div>
      <div className=" row  Container   ">
        {products.map((product) => (
          <AllProductCard
            key={product._id}
            product={product}
            title={product.title}
            price={product.price}
            img={product.img}
          ></AllProductCard>
        ))}
      </div>
    </Container>
  );
};

export default AllProduct;
