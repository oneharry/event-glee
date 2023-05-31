import { useState, useEffect } from 'react';
import './css/Home.css';
import { Link } from 'react-router-dom';
import {Header, Navbar, EventCard} from "../components";
import { useAuth } from '../context/context';
import axios from 'axios';


export default function Home() {
const loading = '';
const loading1 = '';
const [allEvents, setEvents] = useState([])
const {currentUser, token, getUserJWT} = useAuth();

const getAllEvents = async () => {
  try {
    const res = await axios.get('http://localhost:5000/events')
    setEvents(res.data)
    console.log(allEvents)
  } catch (error) {
    console.log("Error loading events")
  }
}

useEffect(() => {
  console.log("Hone", currentUser, token)
  if (currentUser) {
     getUserJWT()
  }
  getAllEvents();
  
}, [getUserJWT, currentUser])


  
    return (
      <div>
        {/* <Sidebar /> */}
        {/* <Navbar /> */}
        <div className="event">
          <div className="home-text1">Buy event tickets using crypto</div>
  
          <div>
            <button className="home-discover-but">
              <Link to="/discover" className="anone">
                Discover your next event
              </Link>
            </button>
  
            <button className="home-discover-but1">
              <Link to="/event" className="anone">
                Create your event
              </Link>
            </button>
          </div>
          <div className="category-section">
            <div className="home-category">
              <div>Arts</div>
              <div>Design</div>
              <div>Fashion</div>
              <div>Tech</div>
              <div>Music</div>
            </div>
            <div className="home-category2">
              <div>Business</div>
              <div>Sports</div>
              <div>Comedy</div>
              <div>Health</div>
              <div>Education</div>
            </div>
          </div>
        </div>

        <section className="home-section1">
            <div className="home-section1-inner">
              <div className="home-flow">
                {
                  (!allEvents && loading) ? <h1>Loading...</h1> : ((!allEvents && !loading) ? <h1>There are no upcoming event(s)</h1> :
                    (
                    allEvents.map((item) => {
                      return <EventCard event={item} />
                    }))
                  )
                }
              </div>
            </div>
        </section>
        {/* { <Footer /> } */}
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