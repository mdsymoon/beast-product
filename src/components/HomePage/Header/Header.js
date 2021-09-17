import React, { useContext } from 'react';
import "./Header.css"
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../images/—Pngtree—letter b logo design png_6041747.png";
import { UserContext } from './../../../App';

const Header = () => {
  const [loggedInUser , setLoggedInUser] = useContext(UserContext);

  const handleLogOut = () => {
    setLoggedInUser({});
  };
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
              <Link to="/Dashboard/productList" className="nav-text">Dashboard</Link>
              {loggedInUser.email ? (
                 <Link to="/" className="nav-text" onClick={handleLogOut}>Log out</Link>
              ): ( <Link to="/login" className="nav-text">Login</Link>)}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </div>
    );
};

export default Header;