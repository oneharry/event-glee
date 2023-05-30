import React, {useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import './css/Profile.css'
import { Navbar, TicketCard, EventCard } from "../components";
import axios from 'axios';
import { useAuth } from "../context/context";

export default function Profile() {

  const [profileState, setProfile] = useState("event");
  // const [priceState, setPriceState] = useState(false);
  const loading = '';
  const loading1 = '';
  const [myEvents, setMyEvents] = useState([])
  const [myTickets, setMyTickets] = useState([])
  
  const navigate = useNavigate()
  const {currentUser, token} = useAuth();


  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
    getMyEvents()
    getMyTickets()
  }, [currentUser]);


  const getMyEvents = async() => {
    try {
      const res = await axios.get(`http://localhost:5000/${currentUser.uid}/events`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setMyEvents(res.data);
    } catch (error) {
      console.log("Error loading events")
    }
  }

  const getMyTickets = async() => {
    try {
      const res = await axios.get(`http://localhost:5000/${currentUser.uid}/ticket`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setMyTickets(res.data);
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <div>
      <Navbar />
      <main>
        {/* <div className="profile-box">
          <div className="balance-box">
            <div className="balance">Total Wallet Balance</div>
            <div className="busd"> BUSD</div>
          </div>

          <div className="balance-box">
            <div className="balance">Tickets Sold Balance (Available)</div>
            <div className="busd"> BUSD</div>
          </div>
          <div className="balance-box">
            <div className="balance">Withdraw</div>
            <input
              className="flip-input1"
              
              placeholder="Enter amount"
            />
            <button className="flip-button1" >
              Withdraw
            </button>
          </div>
        </div> */}
        <div className="profile-list">
          <div
            className={
              profileState === "event" ? "active profile-item" : "profile-item"
            }
            onClick={() => setProfile("event")}
          >
            My Events
          </div>
          <div
            onClick={() => setProfile("active")}
            className={
              profileState === "active" ? "active profile-item" : "profile-item"
            }
          >
            Active Tickets
          </div>
          <div
            onClick={() => setProfile("bought")}
            className={
              profileState === "bought" ? "active profile-item" : "profile-item"
            }
          >
            Bought Tickets
          </div>
        </div>

        {profileState === "event" ? (
          <section className="profile-event">
            <div className="home-flow">
              {loading1 && myEvents.length === 0 ? (
                <div
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}
                >
                  Loading.......
                </div>
              ) : null}
              {myEvents.map((item) => {
                return <EventCard event={item} />
              })}

              {myEvents.length === 0 ? (
                <div className="no-event">No events</div>
              ) : null}
            </div>
          </section>
        ) : profileState === "active" ? (
          <section className="profile-active">
            <div className="home-flow1">
              {loading1 && myTickets.length === 0 ? (
                <div
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}
                >
                  Loading.......
                </div>
              ) : null}
              {myTickets.map((item, index) => {
                return <TicketCard ticket={item}/>
              })}

              {myTickets.length === 0 ? (
                <div className="no-event">
                  You do not have any active events
                </div>
              ) : null}
            </div>
          </section>
          // <TicketCard />
        ) : profileState === "bought" ? (
          <section className="profile-bought">
            <div className="home-flow1">
              {loading1 && myTickets.length === 0 ? (
                <div
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}
                >
                  Loading.......
                </div>
              ) : null}
              {myTickets.map((item) => {
                return <TicketCard ticket={item}/>
              })}

              {myTickets.length === 0 ? (
                <div className="no-event">You have not bought any ticket</div>
              ) : null}
            </div>
          </section>
          
        ) : null}
      </main>
      {loading === true ? (
        <div className="loading-card">
          <div>
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
          <div className="loading-text">Trasaction in Progress</div>
        </div>
      ) : null}
    </div>
  );
}
