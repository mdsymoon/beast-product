import React from "react";
import "./Admin.css"
import logo from "../../images/—Pngtree—letter b logo design png_6041747.png";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import AddProduct from "../Addproduct/AddProduct";
import HomePage from "./../HomePage/HomePage";
import Header from "../Header/Header";

const Admin = () => {
  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <div className="d-flex">
            <img id="logo" src={logo} alt="" />
            <p id="title">Beast Product</p>
          </div>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/" className="nav-text">Home</Link>
              <Link to="/Admin/Dashboard" className="nav-text">Dashboard</Link>
              <Link to="/Admin/AddProduct" className="nav-text">Add Product</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Route path="/Admin/Dashboard">
        <Dashboard />
      </Route>
      <Route path="/Admin/AddProduct">
        <AddProduct />
      </Route>
    </div>
  );
};

export default Admin;
