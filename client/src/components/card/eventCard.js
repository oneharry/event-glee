import './card.css'
import { useAuth } from '../../context/context';
import axios from 'axios';

export default function EventCard({event}) {

  const {name, organizer, start, description, venue, amount, eventId, imageUrl} = event;
  const {currentUser, getUserJWT} = useAuth()


  

  const handleTicket = async() => {
    const token = await getUserJWT()

    const data = {
      "eventId": eventId,
      "amount": amount
    }
    const headers = {
      authorization: `Bearer ${token}`
    }
    const res = await axios.post('http://localhost:5000/ticket', data, { headers} );
    

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
            
            <div className="home-text5 date">{start}</div>
            <div className="home-text5 venue"><strong>{venue}</strong></div>
            <div className="home-text5">
               { (amount > 0) ? `N${amount}` : "Free"}
            </div>
            <div className="home-text6">{organizer}</div>
            {
              !currentUser ? null : (
                <button className="ticket-button" type="submit" onClick={handleTicket}>
                 Get Ticket
                </button>
              )
            }
          </div>
        </div>
      );
}