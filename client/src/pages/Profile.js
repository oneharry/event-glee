import React, {useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import './css/Profile.css'
import { TicketCard, EventCard, Display } from "../components";
import axios from 'axios';
import { useAuth } from "../context/context";

export default function Profile() {

  const [profileState, setProfile] = useState("event");
  // const [priceState, setPriceState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [myEvents, setMyEvents] = useState([])
  const [myTickets, setMyTickets] = useState([])
  
  const navigate = useNavigate()
  const {currentUser, token, errmsg} = useAuth();


  const eventDate = (dateString) => new Date(dateString);
  const today = new Date()
  const getMyEvents = async() => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/${currentUser.uid}/events`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      const result = res.data.data;
      const upcomingEvents = result.filter((event) => eventDate(event.start) >= today)
      setMyEvents(upcomingEvents);
      setLoading(false);
    } catch (error) {
      console.log("Error loading events")
    }
  }

  const getMyTickets = async() => {
    try {
      setLoading1(true);
      const res = await axios.get(`/api/${currentUser.uid}/ticket`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const result = res.data.data;
      const upcomingEventTickets = result.filter((event) => eventDate(event.start) >= today)
      setMyTickets(upcomingEventTickets);
      setLoading1(false);
    } catch (error) {
      console.log("Error", error)
    }
  }


  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
    getMyEvents()
    getMyTickets()
    console.log("Events", myEvents);
    console.log("Tickets", myTickets)
  }, [currentUser]);

  return (
    <div>
      {errmsg !== '' && <Display /> }
      <main>
        <div className="profile-list">
          <div
            className={
              profileState === "event" ? "active profile-item" : "profile-item"
            }
            onClick={() => setProfile("event")}
          >
            <span className="prof">My Events</span>
          </div>
          <div
            onClick={() => setProfile("active")}
            className={
              profileState === "active" ? "active profile-item" : "profile-item"
            }
          >
            <span className="prof">My Tickets</span>
          </div>
        </div>

        {profileState === "event" ? (
          <section className="profile-event">
            <div className="home-flow">
            {
                  (myEvents.length === 0 && loading) ? <h1 style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}>Loading...</h1> : (myEvents.length === 0 && !loading) ? <h1 style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}>You don't have any event(s)</h1> :
                    (
                      myEvents.length > 0 && myEvents.map((item) => {
                      return <EventCard event={item} />
                    })
                  )
            }
            </div>
          </section>
        ) : profileState === "active" ? (
          <section className="profile-ticket">
            <div className="home-flow1">
                {
                  (myTickets.length ===  0 && loading1) ? <h1 style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}>Loading...</h1> : (myTickets.length ===  0 && !loading1) ? <h1 style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}>You don't have any ticket</h1> :
                    (
                      myTickets.length > 0 && myTickets.map((item) => {
                        return <TicketCard ticket={item}/>
                      })
                    )
                }
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
