import './css/Discover.css';
import { useAuth } from '../context/context';
import { EventCard } from "../components";
import { useEffect } from 'react';


export default function Discover() {

  const { filteredEvents, searchQuery, allEvents, getAllEvents, handleSearch } = useAuth();
  let myEvents;
  if(searchQuery === '') {
    myEvents = allEvents
  } else {
    myEvents = filteredEvents
  }

  useEffect(() => {
    getAllEvents();
    window.scrollTo(0, 0);
  })
const today = new Date();
  myEvents = [{
    name: "Harry",
    description: "Test",
    venue: "here",
    organizer: "Hiya",
    start: today,
    imageUrl: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60",
    amount: 0
  }, {
    name: "Harry",
    description: "Test",
    venue: "here",
    organizer: "Hiya",
    start: today,
    imageUrl: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60",
    amount: 0
  }, {
    name: "Harry",
    description: "Test",
    venue: "here",
    organizer: "Hiya",
    start: today,
    imageUrl: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60",
    amount: 0
  }, {
    name: "Harry",
    description: "Test",
    venue: "here",
    organizer: "Hiya",
    start: today,
    imageUrl: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=700&q=60",
    amount: 0
  }]


  console.log("Discov", filteredEvents);
  return (
    <div className="main d-flex flex-column align-items-center">
      <input class="form-control me-2 w-50" 
      type="search" 
      placeholder="Search event name, category" 
      aria-label="Search"
      onChange={handleSearch}
      />
      <main className="main-home bg-white w-100">
        <section className="disc-section1 bg-white">
      
          <div className="disc-section1-inner">
            <div className='disc-text2 fs-1'>Upcoming Events</div>
            {
              searchQuery ? <p style={{textAlign: "center"}}>Your search: <strong>{searchQuery}</strong></p> : null
            }
            
            <div className="disc-flow">
              {
                  (myEvents.length === 0 && searchQuery) ? <h1 style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}>No match found!!..</h1> : (myEvents.length === 0 && searchQuery === '') ? <h1 style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}>Loading!!..</h1> :
                    (
                      myEvents.length > 0 && myEvents.map((item) => {
                      return <EventCard event={item} />
                    })
                  )
              }
            </div>
          </div>
        </section>       
      </main>
    </div>
  );
}
