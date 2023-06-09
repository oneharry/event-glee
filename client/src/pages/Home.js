import { useState, useEffect } from 'react';
import './css/Home.css';
import { Link } from 'react-router-dom';
import { EventCard, Display } from "../components";
import { useAuth } from '../context/context';



export default function Home() {
const {currentUser, loading, getUserJWT, allEvents, getAllEvents, errmsg} = useAuth();


useEffect(() => {
  if (currentUser) {
     getUserJWT()
  }
  getAllEvents();
  
}, [ currentUser ])

console.log(allEvents)

  
    return (
      <div className='home'>
        {errmsg !== '' && <Display /> }
        <div className="event">
          <div class="card bg-dark text-white" >
            <img src="https://img.freepik.com/premium-photo/green-3d-abstract-motion-dark-background_53876-162900.jpg?w=740" class="card-img" alt="..." height="600" />
            <div class="card-img-overlay d-flex flex-column justify-content-center w-75">
            <h2 className=''>Discover and book events, concerts and more with EventGlee, the ultimate solution for securing tickets to the most exciting events in Nigeria</h2>
            <p>Planning your event is just the beginning, we make your events discoverable and selling tickets easy to make your experience as smooth as possible</p>
            </div>
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

        <section id='feature' className="home-section1">

          <div class="card border-0 w-md-75 mb-3 px-md-5 py-md-3 d-flex justify-content-center" >
            <div class="row g-0">
              <div class="col-md-4">
                <img src="https://images.pexels.com/photos/7551752/pexels-photo-7551752.jpeg" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8 w-md-50">
                <div class="card-body">
                  <h5 class="card-title">Create Event</h5>
                  <p class="card-text">Seamlessly plan and organize various types of events, including parties, conferences, meetings, workshops, concerts, picnics, and more. The intuitive interface and user-friendly tools simplify the entire event planning process</p>
                  <Link to={"/event"} class="card-text"><small class="text-muted">Get started here</small></Link>
                </div>
              </div>
            </div>
          </div>

          <div class="card border-0 w-md-75 mb-3 px-md-5 py-md-3 d-flex justify-content-center" >
            <div class="row g-0">
              
              <div class="col-md-8 w-md-50">
                <div class="card-body">
                  <h5 class="card-title">Tickets</h5>
                  <p class="card-text">An awesome experience for attendees, allowing them to easily get tickets for their favourite event and receive digital printable tickets in their emails</p>
                  <Link class="card-text"><small to={"/discover"} class="text-muted">Discover your events</small></Link>
                </div>
              </div>
              <div class="col-md-4">
                <img src="https://images.pexels.com/photos/68760/pexels-photo-68760.jpeg" class="img-fluid rounded-start" alt="..." />
              </div>
            </div>
          </div>
          

        </section>
        <hr></hr>
        <section id='about' className="home-section1">
          <div class="card text-center">
            <div class="card-header bg-white">
              About
            </div>
            <div class="card-body">
              <h5 class="card-title">Special title treatment</h5>
              <p class="card-text">
                <p>
                  This web app was inspired by a personal need to seamlessly organize a social event, which would allow interested persons to register for the event. Also, the learning and deep curiosity of building a full-stack application using Nodejs
                </p>
                This project is part of my curriculum, to portfolio project that showcases my soft and technical skills, knowledge and creativity in developing software solutions.
                This project is so special to me because of the amount of hardwork, dedication, learning and growth throughout my ALX journey.
              </p>
              <p>
                The timeline for this project spanned across 3 weeks of intensive research and 3 weeks of actual development
              </p>
              <p>
                As time went on, the goal shifted from just building a functional full-stack application
                to creating an application that makes life easier for users. 
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            
          </div>
        </section>
        {/* { <Footer /> } */}
      </div>
    );
  }