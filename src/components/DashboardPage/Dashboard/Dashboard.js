import React from 'react';
import { Route } from 'react-router';
import AddProduct from '../AddProduct/AddProduct';
import SideBar from '../SideBar/SideBar';
import ProductList from './../ProductList/ProductList';
import logo from '../../../images/—Pngtree—letter b logo design png_6041747.png'
const Dashboard = () => {
    return (
        <div className="home" style={{overflow:'hidden'}}>
            
            <div className="container-fluid">
            <div className="row">
            <div className="col-md-">
            <SideBar></SideBar>
            </div>
            <div className="col-md-">
                <Route path="/dashboard/addProduct">
                <AddProduct></AddProduct>
                </Route>
                <Route path="/dashboard/productList">
                <ProductList></ProductList>
                </Route>
                
            </div>
            
            
        </div>
            </div>
        </div>
    );
};

export default Dashboard;