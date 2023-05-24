import React, { useState, useContext, useRef } from "react";
import './css/Event.css';
import { Navbar} from "../components";
import { Link } from "react-router-dom";



export default function Login() {

  const loading = '';

  return (
    <div>
      <Navbar />
      <main>
        <form>
          <section className="event-section1">
            <div className="event-text1">Sign In</div>
            <div className="line-flex">
              
              <div className="line1"></div>
              <div className="line2"></div>
            </div>

            <div className="event-form">
              <div className="input-box">
                <div className="event-title">Email</div>
                <div>
                  <input
              
                    className="event-input"
                    placeholder="Email address"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Password</div>
                <div>
                  <input
                  
                    required
                    className="event-input"
                    placeholder="Password"
                    type="password"
                  />
                </div>
              </div>


              <button className="create-but">
                Log in
              </button>
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
          </section>
        </form>
      </main>
      {loading === true ? (
        <div className="loading-card">
          <div>
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
          <div className="loading-text">Trasaction in Progress</div>
        </div>
      ) : null}
    </div>
  );
}
