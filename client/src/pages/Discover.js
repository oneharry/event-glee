import './css/Discover.css';
import { useAuth } from '../context/context';
import { EventCard } from "../components";


export default function Discover() {

  const { filteredEvents, searchQuery } = useAuth()

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
                  (filteredEvents.length === 0 ) ? <h1 style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}>Nothing found!!..</h1> :
                    (
                      filteredEvents.length > 0 && filteredEvents.map((item) => {
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
