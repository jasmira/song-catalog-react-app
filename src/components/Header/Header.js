import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import withRouter
import './Header.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faMusic } from '@fortawesome/free-solid-svg-icons'; // Import faMusic icon

const Header = ({ renderHeader }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    renderHeader && (
      <nav className={`navbar navbar-expand-lg navbar-light bg-custom full-width ${isMenuOpen ? 'expanded' : ''}`}>
        <div className="container header-container">
          <NavLink to="/" className="navbar-brand clickable">
            <FontAwesomeIcon icon={faMusic} className="music-icon" />
          </NavLink>
          <button className="navbar-toggler" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mb-2 mb-lg-0 text-end">
                <NavLink to="/catalog" className="nav-link link-hover">Show Catalog</NavLink>
              </li>
              <li className="nav-item mb-2 mb-lg-0 text-end">
                <NavLink to="/addSong" className="nav-link link-hover">Add New Song</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  );
};

export default Header;
