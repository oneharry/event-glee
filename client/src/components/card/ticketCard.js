import { useState } from 'react';
import './card.css'

export default function TicketCard({ticket}) {
    const {name, category, start, description, venue, price, image} = ticket;
    return (
        <div className="home-box1">
          <img
            className="evimg"
            src={image || "./images/image.png"}
          />

          <div className="inner-box1">
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
               { (price > 0) ? `N${price}` : "Free"}
            </div>
            
          </div>
        </div>
      );
}