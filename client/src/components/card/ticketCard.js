import { useState } from 'react';
import './card.css'

export default function TicketCard({ticket}) {
    const {name, organizer, start, venue, price, imageUrl} = ticket;

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
    return (
        <div className="home-box">
          <img
            className="img"
            src={imageUrl}
            alt={name}
          />

          <div className="inner-box ticket-box">
            <div className="home-text3">{name}</div>

            <div className="home-text5">{date(start)}</div>
            <div className="home-text5">{venue}</div>
            <div className="home-text5">{organizer}</div>
            <div className="home-text5">
               { (price > 0) ? `N${price}` : "Free"}
            </div>
            
          </div>
        </div>
      );
}