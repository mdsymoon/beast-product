import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Alert, Container } from "react-bootstrap";
import { AllProducts, LoaderContext } from "../../../App";
import AllProductCard from "../AllProductCard/AllProductCard";
import "./AllProduct.css";
import LinearProgress from '@material-ui/core/LinearProgress';

const AllProduct = () => {
  const [products, setProducts] = useContext(AllProducts);
  const [loadData , setLoadData] = useContext(LoaderContext);

  return (
    <Container className="mb-5">
      <div className="d-flex justify-content-center my-5">
        <input className="search-input" value="search product" disabled />
        <button className="search-button" disabled>
          Search
        </button>
      </div>
      {!loadData && <LinearProgress style={{marginTop: '200px'}} />}
      
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
