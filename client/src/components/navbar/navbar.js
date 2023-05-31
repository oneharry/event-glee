import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../../context/context';


const Navbar = () => {
  const {currentUser, logout, handleSearch} = useAuth();
  const navigate = useNavigate()

  const handleInputClick = () => {
    // Navigate to the search component
    navigate('/discover');
  };

  return (
    <nav>
      <div className="nav">
        <Link to="/" className="logo">
        EventGlee
          {/* <div className="logo"></div> */}
        </Link>

        <div className="nav-inner">
          <div className="search">
            <div className="search-inner">
              <input
                className="search-input"
                placeholder="Search event names, category"
                // ref={searchRef}
                onChange={handleSearch}
                onClick={handleInputClick}
              />
            </div>
          </div>
        </div>

        <div className="nav-inner">
          <Link to={'/event'} className="nav-link "> Create event</Link>
          {
            currentUser ?  (<Link to={'/profile'} className="nav-link">Profile</Link>) : (
              <Link className="nav-link" to={'/login'}> Sign In</Link>
            )
          }
          {
            !currentUser ? (<Link className="nav-link" to={'/register'}> Sign Up</Link>) : (
              <div>
                <button className="nav-button sign-out" onClick={logout}> Sign Out</button>
                
              </div>)
          }
          
        </div>
      </div>
      <hr></hr>
    </nav>
  );
};

export default Navbar;