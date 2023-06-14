import { useEffect } from 'react';
import './css/Home.css';
import myfoto from './img/myfoto.jpg';
import { Link } from 'react-router-dom';
import { Display } from "../components";
import { useAuth } from '../context/context';



export default function Home() {
const {currentUser, getUserJWT, allEvents, getAllEvents, errmsg} = useAuth();


useEffect(() => {
  if (currentUser) {
     getUserJWT()
  }
  getAllEvents();
  
}, [ currentUser, getUserJWT, getAllEvents ])

console.log(allEvents)

  
    return (
      <div id='home'>
        {errmsg !== '' && <Display /> }
        <div className="event">
          <div class="card bg-dark text-white border-0" >
            <img src="https://images.pexels.com/photos/6315037/pexels-photo-6315037.jpeg?auto=compress&cs=tinysrgb&w=600" class="card-img" alt="..." height="500" />
            <div class="card-img-overlay d-flex flex-column justify-content-center">
              <div className='d-flex flex-column justify-content-center align-items-center text-center text-md-start'>
                <h1 className='d-flex flex-column justify-content-center align-items-center text-dark text-center text-md-start w-75 fw-bolder'>Discover and book events, concerts and more with EventGlee, the ultimate solution for securing tickets to the most exciting events in Nigeria</h1>
              </div>
              <div className="home-buttons d-flex justify-content-center">
                <button className="btn btn-success"  >
                  <Link  to="/discover" className="home-link fw-normal fs-5 text-light w-100">
                    Discover events
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="category-section">
            <div className="home-category w-75 mx-1 fs-5">
              <div>Arts</div>
              <div>Design</div>
              <div>Fashion</div>
              <div>Tech</div>
              <div>Music</div>
            </div>
            <div className="home-category2 w-100 mx-1  fs-5">
              <div >Business</div>
              <div>Sports</div>
              <div>Comedy</div>
              <div>Health</div>
              <div>Education</div>
            </div>
          </div>
        </div>

        <section id='feature' className="home-section1 my-3 mx-md-5 px-md-5">
          <div class="card-header col bg-white border-0 fs-1 fw-bold">
              <p className='fs-1 text-success'>Features</p>
          </div>
          <div class="card col border-0 my-2 mb-5 py-md-3 d-flex justify-content-center align-items-center" >
            <div class="row g-0 d-flex justify-content-center align-items-center">
              <div class="col-md-6">
                <img src="https://images.pexels.com/photos/7551752/pexels-photo-7551752.jpeg" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col">
                <div class="card-body text-center">
                  <h4 class="card-title fs-1">Have Plans?</h4>
                  <p class="card-text fs-4">Set up your events in just minutes and let your attendees get tickets.... Be it for Business, Music, Tech, Arts, Sports, Comedy.<br></br> Search for your favourite events by name or by categories.
                
                    <Link to={"/event"} class="card-text fs-5"><small class="text-muted">Get started</small></Link>
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
          <hr></hr>
          <div class="card col  border-0 w-md-75 my-md-4 pt-2 py-md-3 d-flex justify-content-center align-items-center" >
            <div class="row g-0 d-flex justify-content-center align-items-center">
              
              <div class="col">
                <div class="card-body text-center">
                  <h4 class="card-title fs-1 ">Tickets</h4>
                  <p class=" card-text fs-4 "> It's incredibly easy for you to find your best events, book your seat early. Your printable ticket is sent to your emails.
                     <Link class="card-text fs-5"><small to={"/discover"} class="text-muted">See events</small></Link>
                  </p>
                  
                </div>
              </div>
              <div class="col-md-6">
                <img src="https://images.pexels.com/photos/8261829/pexels-photo-8261829.jpeg?auto=compress&cs=tinysrgb&w=600" class="img-fluid rounded-start" alt="..." />
              </div>
            </div>
          </div>
        </section>
        <hr></hr>
        <section id='about' className="home-section1 my-3 mx-md-5 px-md-5">
          <div className="card text-center border-0 my-2">
            <div className="card-header bg-white fs-1 fw-bold border-0">
              <p className='fs-1 text-success'>About EventGlee</p>
            </div>
            <div className="d-flex flex-column justify-content-between border-0 my-2">
              <div className="card d-flex justify-content-center align-items-center border-0">
                <div className="card-body">
                  <p className='fs-5'>
                    The inspiration for this project is born out of the deep passion to build a user friendly platform that allows users easily plan for events.

                    This project is part of my curriculum at Holberton, i was required to create portfolio project that showcases my soft and technical skills, knowledge and creativity in developing software solutions.
                  </p>
                  <p className='fs-5'>
                    The timeline for this project spanned across 3 weeks of intensive research and 3 weeks of actual development
                  </p>
                  <p className='fs-5'>The source code and project documentation can be found in the github repository for the project.</p>
                  <p><a className='btn btn-success' href='https://github.com/oneharry/event-glee'>Go to Github repository</a></p>
                  </div>
              </div>
              <hr></hr>
              <div className=" card d-flex flex-column flex-md-row border-0 pt-5 justify-content-center align-items-center">
                <div>
                  <img src={myfoto} className='card-img-top' style={{maxWidth: "400px"}} alt='Harrison img' />
                </div>
                <div className='card-body'>
                  <div>
                    <h4 class="card-title fs-1">Ezugwu Harrison</h4>
                    <p className='fs-5'>Sofwtare Engineer</p>
                  </div>
                  <div className='d-flex justify-content-center pt-4'>
                  <a href='https://twitter.com/chd_harrisn'><i className="fa-brands fa-twitter text-success fs-1 px-2"></i></a>
                  <a href='https://github.com/oneharry'><i className="fa-brands fa-github text-success fs-1 px-2"></i></a>
                  <a href='https://www.linkedin.com/in/ezugwu-harrison-b37493127/'><i className="fa-brands fa-linkedin text-success fs-1 px-2"></i></a>
                </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }