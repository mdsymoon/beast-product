import React, { useState } from 'react';
import './Dashboard.css'
import { Card, Table } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import { useEffect } from 'react';
import { RiDeleteBack2Fill } from 'react-icons/ri';

const Dashboard = () => {
    const [product , setProduct] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/products")
          .then((res) => res.json())
          .then((data) => {
            
            setProduct(data);
          })
          });

          const deleteProduct = (id) => {
            fetch('http://localhost:5000/deleteProduct',{
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({id})
            })
            .then(res => res.json())
            .then(data => {})
          }
        


    return (
        <div className="Dashboard container">
           <Card>
        <Card.Body>
          <h3 className="pb-3">Dashboard</h3>
          <Table style={{ minWidth: '500px' }} responsive>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product.map((pd) => {
                return (
                  <tr >
                    <td>{pd.name}</td>
                    <td>${pd.price}</td>
                    <td>
                      <IconButton aria-label="delete" color="secondary" onClick={() => deleteProduct(pd._id)}>
                        <RiDeleteBack2Fill/>
                      </IconButton>
                    </td>
                  </tr>
                )})}

            </tbody>
          </Table>
        </Card.Body>
      </Card>
        </div>
    );
};

export default Dashboard;