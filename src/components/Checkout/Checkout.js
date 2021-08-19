import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { Button, Card, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


const Checkout = () => {
    const [product , setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data)
          console.log(product);
        })
    },[id])
    return (
        <div className="container checkout-table">
            <h2 style={{color: 'rgb(145, 9, 9)'}}>Checkout</h2>
            <Card>
          <Card.Body>
            <Table style={{ minWidth: "500px" }} responsive>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '2px solid gray' }}>
                  <td>{product.name}</td>
                  <td>01</td>
                  <td>${product.price}</td>
                </tr>
                <tr>
                  <td></td>
                  <th>Total</th>
                  <td>${product.price}</td>
                </tr>
              </tbody>
            </Table>
            <Button variant="danger">Check Out</Button>
          </Card.Body>
        </Card>
        </div>
    );
};

export default Checkout;