import { useState, useEffect } from 'react';
import './css/Home.css';
import { Link } from 'react-router-dom';
import {Sidebar, Header, Navbar, EventCard} from "../components";

export default function Home() {
const loading = '';
const loading1 = '';
const [allEvents, setEvents] = useState([])

useEffect(() => {
  fetch('http://localhost:5000/events')
  .then(res => res.json())
  .then(data => setEvents(data))
  .catch(err => {
    console.log("Error loading events")
  })
}, [])
  
    return (
      <div>
        {/* <Sidebar /> */}
        <Navbar />
        <div className="event">
          <Header />
  
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
  
        <main>
          <section className="home-section1">
            <div className="home-section1-inner">
              <div className="home-text2">Upcoming events</div>
              <div className="home-flow">
                {loading1 && allEvents.length === 0 ? (
                  <div
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontSize: "24px",
                    }}
                  >
                    Loading.......
                  </div>
                ) : null}
                {allEvents.map((item) => {
                  return <EventCard event={item} />
                })}
              </div>
            </div>
          </section>
        </main>
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