import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../../context/context';


const Navbar = () => {
  const {currentUser, logout} = useAuth();


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
          {
            !currentUser ? (<Link className="nav-button" to={'/login'}> Sign In</Link>) : (
              <div>
                <button className="nav-button" onClick={logout}> Sign Out</button>
                <button
                  className="nav-button">
                  Profile
                </button>
              </div>
            )
          }
          
          
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;