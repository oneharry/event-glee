import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../../context/context';


const Navbar = () => {
  const[isCollapsed, setIsCollapsed] = useState(false);
  const {currentUser, logout} = useAuth();
  const navigate = useNavigate()

  const handleInputClick = () => {
    // Navigate to the search component
    navigate('/discover');
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <Link to="/" className="logo navbar-brand" >EventGlee</Link>
          <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/discover"} className="nav-link" >Discover</Link>
              </li>
              <li className="nav-item">
                <Link to={"/event"} className="nav-link" >Create Event</Link>
              </li>
              <li className="nav-item">
                {
                  currentUser ?  (<Link to={'/profile'} className="nav-link">Profile</Link>) : (
                    <Link className="nav-link" to={'/login'}> Log In</Link>
                  )
                }
              </li>
          
              
                {
                  !currentUser ? (<Link className="nav-link" to={'/register'}> Sign Up</Link>) : (
                    <div>
                      <button className="nav-button sign-out" onClick={logout}> Sign Out</button>
                      
                    </div>)
              }
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;