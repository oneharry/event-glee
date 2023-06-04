import { useState } from 'react';
import './card.css';
import { useAuth } from '../../context/context';
import axios from 'axios';
import LoadingButton from '../loadingspin/spinner';

export default function EventCard({event}) {

  const [loading, setLoading] = useState(false);
  const {name, organizer, start, description, venue, amount, eventId, imageUrl} = event;
  const {currentUser, getUserJWT, setDisplayMsg, loadingTicket, setLoadingTicket} = useAuth()



  const date = (dateString) => {
    const dayArr = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = monthArr[dateObj.getMonth()];
    const day = dayArr[dateObj.getDay()]
    const dayOfMonth = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    const fmtDate = `${day}, ${month} ${dayOfMonth} ${year}  ${hours}:${minutes}`
    return fmtDate;
  }


  const isSoldOut = (item) => {
    
    const totalTickets = item.totalTickets;
    const soldTickets = item.numSold;

    return (soldTickets >= totalTickets)
  }


  
  const handleTicket = async() => {
    try {
      setLoading(true)
      setLoadingTicket(true)
      const token = await getUserJWT()
      const data = {
        "eventId": eventId,
        "amount": amount
      }
      const headers = {
        authorization: `Bearer ${token}`
      }
      const res = await axios.post('http://localhost:5000/ticket', data, { headers} );
      setLoading(false)
      setLoadingTicket(false)
      setDisplayMsg("See you soon at the event", "success")
    } catch (error) {
      console.log("issues loading")
      setDisplayMsg("error getting ticket, try again!", "failure")
      setLoading(false)
      setLoadingTicket(false)
    }

  }
    
    return (
        <div className="home-box" key={eventId}>
          <img
            className="img"
            src={imageUrl}
            alt={name}
          />
          <div className="inner-box">
            <div className="home-text3">{name}</div>
            <div className="home-text4">{description}</div>
            
            <div className="home-text5 date">{date(start)}</div>
            <div className="home-text5 venue"><strong>{venue}</strong></div>
            <div className="home-text5">
               { (amount > 0) ? `N${amount}` : "Free"}
            </div>
            <div className="home-text6">{organizer}</div>
            {
              isSoldOut(event) ? <h3 style={{textAlign: "end", color: "gray", fontWeight: "bolder", paddingRight: "5px"}}>Sold Out</h3> : null
            }
            {
              (!currentUser || isSoldOut(event)) ? null : (
                <button className="create-but" //"create-but"
                type='submit'
                  disabled={loadingTicket}
                  style={loadingTicket ? {cursor: 'progress', backgroundColor: '#7a9b91'} : null}
                  onClick={handleTicket}
                  > { loading ? (<LoadingButton />) : "Get Ticket"}
                </button>
              )
            }
          </div>
        </div>
      );
}