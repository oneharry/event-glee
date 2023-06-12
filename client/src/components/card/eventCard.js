import { useRef, useState } from 'react';
import './card.css';
import { useAuth } from '../../context/context';
import axios from 'axios';
import LoadingButton from '../loadingspin/spinner';
import { Modal } from 'bootstrap'

export default function EventCard({event}) {

  const [loading, setLoading] = useState(false);
  const {name, organizer, start, description, venue, amount, eventId, imageUrl} = event;
  const {currentUser, getUserJWT, setDisplayMsg, loadingTicket, setLoadingTicket} = useAuth()
  const modalRef = useRef()


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


  const showModal = () => {
    const modalEle = modalRef.current
    const bsModal = new Modal(modalEle, {
        backdrop: 'static',
        keyboard: false
    })
    bsModal.show()
  }

  const hideModal = () => {
    const modalEle = modalRef.current
    const bsModal= Modal.getInstance(modalEle)
    bsModal.hide()
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
      const res = await axios.post('/api/ticket', data, { headers} );
      setLoading(false)
      setLoadingTicket(false)
      setDisplayMsg("Success, ckeck your email for your ticket", "success")
    } catch (error) {
      console.log("issues loading")
      setDisplayMsg("error getting ticket, try again!", "failure")
      setLoading(false)
      setLoadingTicket(false)
    }

  }
    
    return (

      <div className=" home-box mx-1 card mb-5 border-0" key={eventId}>
          <img
            className="img-img-top"
            src={imageUrl}
            alt={name}
          />
          <div className="card-body">
            <div className="card-text fs-3 text-success text-wrap">{name}</div>
            {/* <div className="card-text fs-5">{description}</div> */}
            
            <div className="card-text date text-muted text-center fs-5 my-1">{date(start)}</div>
            <div className="card-text venue fs-5 text-success my-1 text-wrap"><strong>{venue}</strong></div>
            <div className="card-text fs-5 my-1">
               { (amount > 0) ? `N${amount}` : "Free"}
            </div>
            <div className="card-text fs-5 my-1 text-wrap">{organizer}</div>
            <a href='#f' className="text-end" onClick={showModal}>show more</a>
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

          <div className="modal top fade" ref={modalRef} tabindex="-1">
            <div className="modal-dialog modal-dialogue-scrollable modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fs-1 text-success text-center text-wrap">{name}</h5>
                  <button type="button" className="btn-close" onClick={hideModal} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex">
                  
                      <img
                        className="img-img-top w-50"
                        src={imageUrl}
                        alt={name}
                      />
                    <div className='d-flex flex-column align-items-center w-100'>
                      <div className="card-text fs-5 text-dark text-wrap">{description}</div>
                      <div className="card-text date text-muted text-center fs-5">{date(start)}</div>
                      <div className="card-text venue fs-5 text-success text-wrap"><strong>{venue}</strong></div>
                      <div className="card-text fs-5 text-dark">
                        { (amount > 0) ? `N${amount}` : "Free"}
                      </div>
                      <div className="card-text fs-5 text-dark text-wrap">{organizer}</div>
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
                <div className="modal-footer">
                
                 <button type="button" className="btn btn-danger" onClick={hideModal}>Close</button>
                </div>
              </div>
            </div>
          </div>


        </div>


        // <div className="home-box" key={eventId}>
        //   <img
        //     className="img"
        //     src={imageUrl}
        //     alt={name}
        //   />
        //   <div className="inner-box">
        //     <div className="home-text3">{name}</div>
        //     <div className="home-text4">{description}</div>
            
        //     <div className="home-text5 date">{date(start)}</div>
        //     <div className="home-text5 venue"><strong>{venue}</strong></div>
        //     <div className="home-text5">
        //        { (amount > 0) ? `N${amount}` : "Free"}
        //     </div>
        //     <div className="home-text6">{organizer}</div>
        //     {
        //       isSoldOut(event) ? <h3 style={{textAlign: "end", color: "gray", fontWeight: "bolder", paddingRight: "5px"}}>Sold Out</h3> : null
        //     }
        //     {
        //       (!currentUser || isSoldOut(event)) ? null : (
        //         <button className="create-but" //"create-but"
        //         type='submit'
        //           disabled={loadingTicket}
        //           style={loadingTicket ? {cursor: 'progress', backgroundColor: '#7a9b91'} : null}
        //           onClick={handleTicket}
        //           > { loading ? (<LoadingButton />) : "Get Ticket"}
        //         </button>
        //       )
        //     }
        //   </div>
        // </div>
      );
}