import React, { useState, useContext, useRef } from "react";
import './css/Event.css';
import { Header, Navbar, Sidebar } from "../components";



export default function Event() {

  const loading = '';

  return (
    <div>
      <Navbar />
      <main>
        <form>
          <section className="event-section1">
            <div className="event-text1">Create Event</div>
            <div className="line-flex">
              
              <div className="line1"></div>
              <div className="line2"></div>
            </div>

            <div className="event-form">
              <div className="input-box">
                <div className="event-title">Event Title</div>
                <div>
                  <input
              
                    className="event-input"
                    placeholder="Enter event title"
                    required
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Event Location</div>
                <div>
                  <input
                  
                    required
                    className="event-input"
                    placeholder="Enter event location"
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
                    placeholder="Enter event location"
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Category</div>
                <div>
                  <select className="event-input" required >
                    <option value="">Select</option>
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
                <div className="event-title">Set Ticket Price</div>
                <div>
                  <input
                    required
                    
                    className="event-input"
                    placeholder="e.g 0.67 USDT"
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Set Ticket Count</div>
                <div>
                  <input
                    required
                    
                    className="event-input"
                    placeholder="Enter the number of tickets available"
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Set Event Start Date</div>
                <div>
                  <input
                    required
                    
                    type="datetime-local"
                    className="event-input"
                    placeholder="Which day is the event ?"
                  />
                </div>
              </div>

              <div className="input-box">
                <div className="event-title">Set Event End Date</div>
                <div>
                  <input
                    required
                    
                    type="datetime-local"
                    className="event-input"
                    placeholder="Which day  is the event ?"
                  />
                </div>
              </div>

              <button className="create-but">
                Create Event
              </button>
            </div>
          </section>
        </form>
      </main>
      {loading === true ? (
        <div className="loading-card">
          <div>
            <div className="spinner">
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          </div>
          <div className="loading-text">Trasaction in Progress</div>
        </div>
      ) : null}
    </div>
  );
}
