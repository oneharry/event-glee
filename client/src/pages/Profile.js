import React, {useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import './css/Profile.css'
import { Navbar, TicketCard, EventCard } from "../components";
import axios from 'axios';
import { useAuth } from "../context/context";

export default function Profile() {

  const [profileState, setProfile] = useState("event");
  // const [priceState, setPriceState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [myEvents, setMyEvents] = useState([])
  const [myTickets, setMyTickets] = useState([])
  
  const navigate = useNavigate()
  const {currentUser, token} = useAuth();

  const getMyEvents = async() => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/${currentUser.uid}/events`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setMyEvents(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error loading events")
    }
  }

  const getMyTickets = async() => {
    try {
      setLoading1(true);
      const res = await axios.get(`http://localhost:5000/${currentUser.uid}/ticket`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setMyTickets(res.data);
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
      <Navbar />
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
          <section className="profile-active">
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
      {/* {loading === true ? (
        <div className="loading-card">
          <div>
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
          <div className="loading-text">Trasaction in Progress</div>
        </div>
      ) : null} */}
    </div>
  );
}
