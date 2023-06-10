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
      <div id='home'>
        {errmsg !== '' && <Display /> }
        <div className="event">
          <div class="card bg-dark text-dark border-0" >
            <img src="https://images.pexels.com/photos/7794441/pexels-photo-7794441.jpeg?auto=compress&cs=tinysrgb&w=600" class="card-img" alt="..." height="600" />
            <div class="card-img-overlay d-flex flex-column justify-content-center">
              <div>
              <h2 className='d-flex flex-column justify-content-center w-75'>Discover and book events, concerts and more with EventGlee, the ultimate solution for securing tickets to the most exciting events in Nigeria</h2>
              <p>Planning your event is just the beginning, we make your events discoverable and selling tickets easy to make your experience as smooth as possible</p>
              
              </div>
              <div className="home-buttons">
            <button className="home-discover-but">
              <Link  to="/discover" className="home-link">
                Discover your next event
              </Link>
            </button>
          </div>
            </div>
          </div>
          <div className="category-section">
            <div className="home-category w-50 fs-5">
              <div>Arts</div>
              <div>Design</div>
              <div>Fashion</div>
              <div>Tech</div>
              <div>Music</div>
            </div>
            <div className="home-category2 w-50 fs-5">
              <div >Business</div>
              <div>Sports</div>
              <div>Comedy</div>
              <div>Health</div>
              <div>Education</div>
            </div>
          </div>
        </div>

        <section id='feature' className="home-section1 mx-md-5 px-md-5">
        <div class="card-header my-1 bg-white border-0 fs-1 fw-bold">
              Features
            </div>
          <div class="card border-0 w-md-75 my-md-2 py-md-3 d-flex justify-content-center align-items-center" >
            <div class="row g-0 d-flex justify-content-center align-items-center">
              <div class="col-md-4">
                <img src="https://images.pexels.com/photos/7551752/pexels-photo-7551752.jpeg" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8 w-md-50">
                <div class="card-body text-center">
                  <h4 class="card-title fs-2">Create Event</h4>
                  <p class="card-text fs-5">Seamlessly plan and organize various types of events, including parties, conferences, meetings, workshops, concerts, picnics, and more. The intuitive interface and
                    user-friendly tools simplify the entire event planning process.
                    <Link to={"/event"} class="card-text fs-5"><small class="text-muted">Get started</small></Link>
                  </p>
                  
                </div>
              </div>
            </div>
          </div>

          <div class="card border-0 w-md-75 my-md-4 py-md-3 d-flex justify-content-center align-items-center" >
            <div class="row g-0 d-flex justify-content-center align-items-center">
              
              <div class="col-md-8">
                <div class="card-body text-center">
                  <h4 class="card-title fs-2 ">Tickets</h4>
                  <p class=" card-text fs-5 ">We provide awesome experience for attendees, users can find and book for their favourite event and receive digital printable tickets in their emails.
                    Several categories of events such as Business, Music, Tech, Arts, Sports. Search for your favourite events by name or by categories.
                     <Link class="card-text fs-5"><small to={"/discover"} class="text-muted">See events</small></Link>
                  </p>
                  
                </div>
              </div>
              <div class="col-md-4">
                <img src="https://images.pexels.com/photos/8261829/pexels-photo-8261829.jpeg?auto=compress&cs=tinysrgb&w=600" class="img-fluid rounded-start" alt="..." />
              </div>
            </div>
          </div>
          

        </section>
        <hr></hr>
        <section id='about' className="home-section1 mx-md-5 px-5">
          <div class="card text-center border-0 my-2">
            <div class="card-header bg-white fs-1 fw-bold border-0">
              About
            </div>
            <div class="card-group border-0 my-2">
              <div class="card d-flex justify-content-center align-items-center border-0">
                <div class="card-body">
                  <h4 class="card-title fs-2">Why this project?</h4>
                  <p className='fs-5'>
                    The inspiration for this project is born out of the deep passion to build a user friendly platform that allows users easily plan for events.
                    This project is part of my curriculum at Holberton, i was required to create portfolio project that showcases my soft and technical skills, knowledge and creativity in developing software solutions.
                  </p>
                  </div>
              </div>
              <div class="card border-0 d-flex justify-content-center align-items-center">
                
                <div class="card-body ">
                  <h4 class="card-title fs-2">Timeline</h4>
                  <p className='fs-5'>
                    The timeline for this project spanned across 3 weeks of intensive research and 3 weeks of actual development
                  </p>
                 </div>
              </div>
              <div class="card border-0 d-flex justify-content-center align-items-center">
                <div class="card-body">
                  <h4 class="card-title fs-2">Contribution</h4>
                    <p className='fs-5'>
                      This project was developed by Ezugwu Harrison. Feel free to connect with me <span><a href='https://www.linkedin.com/in/ezugwu-harrison-b37493127/'>LinkedIn</a> | <a href='https://twitter.com/chd_harrisn'>Twitter</a> | <a href='https://github.com/oneharry'>Github</a></span>
                    </p>
                    <p className='fs-5'>The source code and project documentation can be found in the github repository for the project <a href='https://github.com/oneharry/event-glee'>here.</a></p>
                  </div>
              </div>
            </div>
          </div>
        </section>
        {/* { <Footer /> } */}
      </div>
    );
  }