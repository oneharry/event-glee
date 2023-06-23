import { useEffect, useRef, useState } from 'react';
import './card.css';
import { useAuth } from '../../context/context';
import axios from 'axios';
import LoadingButton from '../loadingspin/spinner';
import { Modal } from 'bootstrap'

export default function EventCard({event}) {

  const [loading, setLoading] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const {name, category, organizer, start, description, venue, amount, eventId, imageUrl} = event;
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
    setIsSold(soldTickets >= totalTickets)
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
        "amount": amount,
        "userId": currentUser.uid
      }
      const headers = {
        authorization: `Bearer ${token}`
      }
      await axios.post('/api/ticket', data, { headers} );
      isSoldOut(event);
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

  useEffect(() => {
    isSoldOut(event)
  }, [isSold, isSoldOut, event]);
    
    return (

      <div className="home-box mx-1 my-1 border-0" key={eventId}>
          <img
            className="img"
            src={imageUrl}
            alt={name}
          />
          <div className="card-body mx-2">
            <div className="card-text fs-3 text-success text-wrap text-dark">{name}</div>
            
            <div className="card-text date text-muted fs-5 my-1">{date(start)}</div>
            <div className="card-text venue fs-5 text-success my-1 text-wrap"><strong>{venue}</strong></div>
            <div className="card-text fs-5 my-1 text-dark">
               { (amount > 0) ? `N${amount}` : "Free"}
            </div>
            <div className="card-text fs-5 my-1 text-wrap text-dark">{organizer}</div>
            <div><a href='#f' onClick={showModal}>show more</a></div>
            <div className='d-flex justify-content-end'>
            {
              isSold ? <h3 style={{textAlign: "end", color: "gray", fontWeight: "bolder", paddingRight: "5px"}}>Sold Out</h3> : null
            }
            {
              (!currentUser || isSold) ? null : (
                <button className=" button btn btn-success btn-md btn-block text-wrap" //"create-but"
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

          <div className="modal top fade" ref={modalRef} tabindex="-1">
            <div className="modal-dialog modal-dialogue-scrollable modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fs-1 text-success text-center text-wrap">{name}</h5>
                  <button type="button" className="btn-close" onClick={hideModal} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex flex-column w-100 align-items-center flex-md-row flex-wrap"> 
                      <img
                        className="img"
                        style={{width: "18rem"}}
                        src={imageUrl}
                        alt={name}
                      />
                    <div className='d-flex flex-column align-items-center  w-100 flex-wrap'>
                      <div className="card-text fs-5 text-dark text-wrap">{description}</div>
                      <div className="card-text date text-muted text-center fs-5">{date(start)}</div>
                      <div className="card-text venue fs-5 text-success text-wrap"><strong>{venue}</strong></div>
                      <div className="card-text fs-5 text-dark">
                        { (amount > 0) ? `N${amount}` : "Free"}
                      </div>
                      <div className="card-text fs-5 text-dark text-wrap">{organizer} | <span className='text-end'>{category} </span></div>
                      <div className='d-flex justify-content-end'>
                        {
                          isSold ? <h3 style={{textAlign: "end", color: "gray", fontWeight: "bolder", paddingRight: "5px"}}>Sold Out</h3> : null
                        }
                        {
                          (!currentUser || isSold) ? null : (
                            <button className="btn btn-success p-2 text-wrap"
                            type='submit'
                              disabled={loadingTicket}
                              style={loadingTicket ? {cursor: 'progress', backgroundColor: '#7a9b91', width: '100px'} : null}
                              onClick={handleTicket}
                              > { loading ? (<LoadingButton />) : "Get Ticket"}
                            </button>
                          )
                        }
                      </div>
                    </div>
                </div>
                <div className="modal-footer">
                 <button type="button" className="btn btn-danger" onClick={hideModal}>Close</button>
                </div>
              </div>
            </div>
          </div>


        </div>
      );
}