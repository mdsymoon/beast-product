import React from 'react';
import './Home.css';
import Header from '../Header/Header';
import AllProduct from '../AllProduct/AllProduct';

const Home = () => {
    return (
        <div className="home">
            <Header></Header>
            <AllProduct></AllProduct>
        </div>
    );
};

export default Home;