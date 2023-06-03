import { useState, useEffect } from 'react';
import './css/Home.css';
import { Link } from 'react-router-dom';
import { EventCard } from "../components";
import { useAuth } from '../context/context';



export default function Home() {
const {currentUser, loading, getUserJWT, allEvents, getAllEvents} = useAuth();


useEffect(() => {
  if (currentUser) {
     getUserJWT()
  }
  getAllEvents();
  
}, [ currentUser ])

console.log(allEvents)

  
    return (
      <div className='home'>
        <div className="event">
          <div className="home-text1">
            <h2>Discover and book events, concerts and more with EventGlee, the ultimate solution for securing tickets to the most exciting events in Nigeria</h2>
            <p>Planning your event is just the beginning, we make your events discoverable and selling tickets easy to make your experience as smooth as possible</p>
          </div>
  
          <div className="home-buttons">
            <button className="home-discover-but">
              <Link  to="/discover" className="home-link">
                Discover your next event
              </Link>
            </button>
  
            <button className="home-discover-but1">
              <Link to="/event" className="home-link1">
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
            <div className="home-text2">Upcoming events</div>
              <div className="home-flow">
                {
                (allEvents.length === 0 && loading) ? <h1>Loading...</h1> : (allEvents.length === 0 && !loading) ? <h1>There are no upcoming event(s)</h1> :
                    (
                    allEvents.map((item) => {
                      return <EventCard event={item} />
                    }))
                }
              </div>
            </div>
        </section>
        {/* { <Footer /> } */}
      </div>
    );
  }