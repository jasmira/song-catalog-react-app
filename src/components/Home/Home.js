import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import backgroundImg from '../../images/medium-shot-woman-futuristic-portrait.jpg';

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImg})` }} data-testid="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h1 className="title">Welcome to Your Music Catalog</h1>
        <p className="subtitle">Explore a world of music discovery</p>
        <Link to="/catalog" className="btn bg-btn-custom">Show My Catalog</Link>
      </div>
    </div>
  );
};

export default Home;
