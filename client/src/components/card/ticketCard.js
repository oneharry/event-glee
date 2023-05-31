import { useState } from 'react';
import './card.css'

export default function TicketCard({ticket}) {
    const {name, organizer, start, description, venue, price, image} = ticket;
    return (
        <div className="home-box">
          <img
            className="img"
            src={image || "./images/image.png"}
          />

          <div className="inner-box ticket-box">
          <div className="home-text3">{name}</div>

            <div className="home-text5">{start}</div>
            <div className="home-text5">{venue}</div>
            <div className="home-text5">{organizer}</div>
            <div className="home-text6">
               { (price > 0) ? `N${price}` : "Free"}
            </div>
            
          </div>
        </div>
      );
}