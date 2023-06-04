import './css/Discover.css';
import { useAuth } from '../context/context';
import { EventCard } from "../components";
import { useEffect } from 'react';


export default function Discover() {

  const { filteredEvents, searchQuery, allEvents } = useAuth();
  let myEvents;
  if(searchQuery === '') {
    myEvents = allEvents
  } else {
    myEvents = filteredEvents
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  })


  console.log("Discov", filteredEvents);
  return (
    <div className="main">
      <main className="main-home">
        <section className="disc-section1">
      
          <div className="disc-section1-inner">
            <div className='disc-text2'> Events</div>
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
