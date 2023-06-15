import React, { useEffect, useState } from "react";
import { useAuth } from "../context/context";
import './css/Event.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Display from "../components/display/display";
import LoadingButton from "../components/loadingspin/spinner";




export default function Register() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const {register, currentUser, errmsg, setDisplayMsg} = useAuth();


  useEffect(() => {
    
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser, navigate]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    // Perform form submission or other actions here
    console.log(email, password, password2);
    
    if(password !== password2) {
      setDisplayMsg("your password doesn't match", "failure")
    } else if(!password || !password2 || password.length < 6 || password2.length < 6) {
      setDisplayMsg("password must be at least 6 characters long", "failure")
    } else if (!email || !isValidEmail(email)) {
      setDisplayMsg("incorrect email address", "failure")
    } else {
      try {
        setLoading(true);
        const res = await register(email, password);
  
        
          const data = {
            "email": email,
            "userId": res.user.uid
          }
          await axios.post('/api/user', data);
  
        setLoading(false);
        setDisplayMsg("successfully registered", "success")
        navigate('/')
      } catch (error) {
        console.log("Failed to register", error)
        setDisplayMsg("error encountered, try again!", "failure")
        setLoading(false)
      }
    }

  };

  return (
    <div>
      {errmsg !== '' && <Display /> }
        <form>
          <section className="px-4">
            <div className="event-text1 text-dark">Sign Up</div>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-box">
                <div className="event-title"> ComfirmPassword</div>
                <div>
                  <input
                  
                    required
                    className="event-input"
                    placeholder="password"
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
              </div>
              <button 
              className="create-but"
              disabled={loading}
              style={loading ? {cursor: 'progress'} : null}
              onClick={handleRegister}>
                { loading ? (<LoadingButton />) : "Register"}
              </button>
              <div className="page-text">
                <p>Have an account? <Link className="event-link" to="/login">Sign In</Link></p>
              </div>
            </div>
          </section>
        </form>
    </div>
  );
}
