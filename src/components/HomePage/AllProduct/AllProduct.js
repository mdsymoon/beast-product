import React, { useEffect, useState } from "react";
import {  Container} from "react-bootstrap";
import AllProductCard from "../AllProductCard/AllProductCard";
import './AllProduct.css';


const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/allProduct`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <Container className="mb-5">
        <div className="d-flex justify-content-center my-5">
            <input className="search-input" value="search product" disabled/>
            <button className="search-button" disabled>Search</button>
        </div>
        <div className=" row  Container   ">
        {products.map((product) => <AllProductCard product={product}></AllProductCard>
        
        )}
      </div>
    </Container>
      
   
  );
};

export default AllProduct;
