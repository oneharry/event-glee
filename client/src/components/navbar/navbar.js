import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../../context/context';


const Navbar = () => {
  const {currentUser, logout} = useAuth();


  return (
    <nav>
      <div className="nav">
        <Link to="/" className="logo">
        EventZea
          {/* <div className="logo"></div> */}
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
          <Link to={'/event'} className="nav-link "> Create event</Link>
          {
            !currentUser ? (<Link className="nav-link" to={'/login'}> Sign In</Link>) : (
              <div>
                <button className="nav-button" onClick={logout}> Sign Out</button>
                
              </div>)
          }
          {
            currentUser ?  (<Link to={'/profile'} className="nav-link">Profile</Link>) : (
              <Link className="nav-link" to={'/register'}> Sign Up</Link>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;