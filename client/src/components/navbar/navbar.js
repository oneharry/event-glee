import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../../context/context';


const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const {currentUser, logout, handleSearch} = useAuth();
  const navigate = useNavigate()

  const handleInputClick = () => {
    // Navigate to the search component
    navigate('/discover');
  };



  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link to="/" className="logo navbar-brand" >EventGlee</Link>
          <button onClick={() => setShowNav(!showNav)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={showNav ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarNav">
            <ul className="navbar-nav">
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