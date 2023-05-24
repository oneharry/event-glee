import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);



  return (
    <nav>
      <div className="nav">
        <Link to="/" className="anone">
          <div className="logo">EventZea</div>
        </Link>

        <div className="nav-inner">
          <div className="search">
            <div className="search-inner">
              <input
                className="search-input"
                placeholder="Search event names, category"
                // ref={searchRef}
                // onChange={search}
              />
            </div>
          </div>
        </div>

        <div className="nav-inner">
          <button className="nav-button"> Create event</button>
          <button className="nav-button"> Sign In</button>
          <button
            className="nav-button">
            Profile
          </button>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;