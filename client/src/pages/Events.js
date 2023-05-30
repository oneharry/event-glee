import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import './css/Event.css';
import { Header, Navbar, Sidebar } from "../components";
import { useAuth } from "../context/context";
import axios from 'axios';


export default function Event() {
  const [eventName, setEventName] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('')
  const [eventImage, setEventImage] = useState('');
  const [category, setCategory] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [loading, setLoading] = useState(false);

  const {token, getUserJWT, currentUser} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!currentUser) {
      navigate('/login')
    }
  }, [currentUser])


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Perform form submission or other actions here
    const data = {
      "name": eventName,
      "category": category,
      "description": description,
      "venue": category,
      "price": ticketPrice,
      "totalTickets": numberOfTickets,
      "start": startDate,
      "end": endDate,
      "organizer": organizer,
      "image": eventImage
    }

    try {
      setLoading(true);
    
      console.log(data)
      const res = await axios.post(`http://localhost:5000/${currentUser.uid}/events`, data, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Failed to register", error)
    }

  };

  return (
    <div>
      <Navbar />
        <form>
          <section className="event-section1">
            <div className="event-text1">Create Event</div>
            <div className="line-flex">
              <div className="line1"></div>
              <div className="line2"></div>
            </div>
            <div className="event-form">
              <div className="input-box">
                <div className="event-title">Event name</div>
                <div>
                  <input
                    className="event-input"
                    type="text"
                    placeholder="event name..."
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-box">
                <div className="event-title">Description</div>
                <div>
                  <input
                    className="event-input"
                    type="text"
                    placeholder="describe your event"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="input-box">
                <div className="event-title">Venue</div>
                <div>
                  <input

                    required
                    className="event-input"
                    placeholder="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Orgaizer</div>
                <div>
                  <input

                    required
                    className="event-input"
                    placeholder="organizer"
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Select Event Image</div>
                <div>
                  <input
                    required
                    className="event-input"
                    type="file"
                    accept="image/*"
                    placeholder="choose face of your event"
                    value={eventImage}
                    onChange={(e) => setEventImage(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Category</div>
                <div>
                  <select className="event-input"
                   required
                   placeholder="category"
                   value={category}
                   onChange={(e) => setCategory(e.target.value)}
                   >
                    <option value="">Select category</option>
                    <option value="art">Art</option>
                    <option value="design">Design</option>
                    <option value="fashion">Fashion</option>
                    <option value="tech">Tech</option>
                    <option value="music">Music</option>
                    <option value="business">Business</option>
                    <option value="sport">Sport</option>
                    <option value="comedy">Comedy</option>
                    <option value="health">Health</option>
                    <option value="education">Education</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Ticket price(Leave blank if ticket is free)</div>
                <div>
                  <input
                    
                    className="event-input"
                    placeholder="enter 0 if free"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(e.target.value)}
                  />
                  
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Number of tickets</div>
                <div>
                  <input
                    required
                    
                    className="event-input"
                    placeholder="specify number of tickets available"
                    value={numberOfTickets}
                    onChange={(e) => setNumberOfTickets(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Start date</div>
                <div>
                  <input
                    required
                    
                    type="datetime-local"
                    className="event-input"
                    placeholder="Which day is the event ?"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">End date</div>
                <div>
                  <input
                    required
    
                    type="datetime-local"
                    className="event-input"
                    placeholder="Which day  is the event ?"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
          
              <button className="create-but" type="submit" onClick={handleSubmit}>
                Create Event
              </button>
            </div>
          </section>
        </form>
      {/* Loading state */}
      {loading && (
        <div className="loading-card">
          <div>
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
          <div className="loading-text">Transaction in Progress</div>
        </div>
      )}
    </div>
  );
}
