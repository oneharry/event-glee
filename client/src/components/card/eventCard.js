import './card.css'
import { useAuth } from '../../context/context';
import axios from 'axios';

export default function EventCard({event}) {

  const {name, category, start, description, venue, amount, image, eventId} = event;
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
            src={image || "./images/image.png"}
          />
          <div className="inner-box">
            <div className="home-text3">{name} of thr most high and club</div>
            <div className="home-text4">
              {description}
            </div>
            
            <div className="home-text5">
              Date - {start}
            </div>
            <div className="home-text5">
              Venue - <b>{venue}</b>
            </div>
            <div className="home-text5">
               { (amount > 0) ? `N${amount}` : "Free"}
            </div>
            <div className="home-text6">
              Organized by{" "}
            </div>
            
            <button className="ticket-button" type="submit" onClick={handleTicket}>
                Get Ticket
              </button>
          </div>
        </div>
      );
}