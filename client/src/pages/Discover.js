import './css/Discover.css';
import { useAuth } from '../context/context';
import { Display, EventCard } from "../components";
import { useEffect } from 'react';


export default function Discover() {

  const { filteredEvents, searchQuery, allEvents, errmsg, getAllEvents, handleSearch } = useAuth();
  let myEvents;
  if(searchQuery === '') {
    myEvents = allEvents
  } else {
    myEvents = filteredEvents
  }

  useEffect(() => {
    getAllEvents();
  }, [allEvents])




  return (
    <div className="main d-flex flex-column align-items-center">
      {errmsg !== '' && <Display /> }
      <input class="form-control me-2 w-75 col" 
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
            
            <div className="d-flex flex-wrap justify-content-around">
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
