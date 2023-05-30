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
            className="evimg"
            src={image || "./images/image.png"}
          />
          <div className="inner-box">
            <div className="home-text3">{name}</div>
            <div className="home-text4">
              {description}
            </div>
            <div className="home-text5">{category}</div>
            <div className="home-text5">
              Date - {start}
            </div>
            <div className="home-text5">
              Venue - <b>{venue}</b>
            </div>
            <div className="home-text5">
              Organized by{" "}
            </div>
            <div className="home-text6">
               { (amount > 0) ? `N${amount}` : "Free"}
            </div>
            <div
              style={{ paddingTop: "10px" }}
              className="home-text3"
            >
              Ticket Sold:
              <span style={{ paddingLeft: "10px" }}>
                {Number(
                  String()
                ) -
                  Number(
                    String(
                      Number()
                    )
                  )}{" "}
              </span>
              <button className="create-but" type="submit" onClick={handleTicket}>
                Get Ticket
              </button>
            </div>
          </div>
        </div>
      );
}