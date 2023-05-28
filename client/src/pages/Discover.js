import React, { useRef } from "react";
import './css/Discover.css';

import { Footer, Sideba } from "../components";


export default function Discover() {


  const loading1 = '';
  const discoverEvent = ["a", "b", "c", "d"]

  return (
    <div className="main">
      <div className="disc">
        <div className="disc-inner">
          <input
            className="disc-but"
            placeholder="Search event names,category"
          />
        </div>
      </div>
      <main id="main-home">
        <section className="home-section1">
          <div className="home-section1-inner">
            <div className="home-text2">Upcoming events</div>
            <div className="home-flow">
              {loading1 ? (
                <div
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}
                >
                  Loading.......
                </div>
              ) : null}
              {discoverEvent.map((item) => {
                return (
                  <div className="home-box">
                    <img
                      alt="event"
                      className="evimg"
                      src={item.image || "./images/image.png"}
                    />
                    <div className="inner-box">
                      <div className="home-text3">{item}</div>
                      <div className="home-text4">
                        {new Date(
                          Number(
                            String()
                          ) * 1000
                        ).toDateString()}{" "}
                        ||{" "}
                        {new Date(
                          Number(
                            String()
                          ) * 1000
                        ).toLocaleTimeString()}
                      </div>
                      <div className="home-text5">{item}</div>
                      <div className="home-text5">
                        Organized by{" "}
                        
                      </div>
                      <div className="home-text6">
                         BUSD
                      </div>
                      {/* {allowance > item ? ( */}
                        <button
                          className="flip"
                          // onClick={() =>
                          //   buy(Number(BigNumber.from(item.eventId)))
                          // }
                        >
                          Buy Ticket
                        </button>
                      {/* ) : (
                        <button className="flip" >
                          Approve
                        </button>
                      )} */}

                      <div className="home-text7">
                        <img src="./images/users.svg" />{" "}
                        <span style={{ paddingLeft: "10px" }}>
                          {/* {Number(
                            String(Number(BigNumber.from(item.ticketCount)))
                          ) -
                            Number(
                              String(
                                Number(BigNumber.from(item.ticketRemaining))
                              )
                            )}{" "} */}
                          people are attending this event
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="home-section1">
          <div className="home-section1-inner">
            <div className="home-text2">Popular events</div>
            <div className="home-flow">
              {loading1 ? (
                <div
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: "24px",
                  }}
                >
                  Loading.......
                </div>
              ) : null}
              {discoverEvent.map((item) => {
                return (
                  <div className="home-box">
                    <img
                      className="evimg"
                      alt="event"
                      src={item || "./images/image.png"}
                    />
                    <div className="inner-box">
                      <div className="home-text3">{item}</div>
                      <div className="home-text4">
                        {new Date(
                          Number(
                            String()
                          ) * 1000
                        ).toDateString()}{" "}
                        ||{" "}
                        {new Date(
                          Number(
                            String()
                          ) * 1000
                        ).toLocaleTimeString()}
                      </div>
                      <div className="home-text5">{item}</div>
                      <div className="home-text5">
                        Organized by{" "}
                        {/* {item.admin.slice(0, 5) +
                          "....." +
                          item.admin.slice(-5)} */}
                      </div>
                      <div className="home-text6">
                        BUSD
                      </div>
                      {/* {allowance > item.price ? ( */}
                        <button
                          className="flip"
                          // onClick={() =>
                          //   buy(Number(BigNumber.from(item.eventId)))
                          // }
                        >
                          Buy Ticket
                        </button>
                      {/* ) : (
                        <button className="flip" onClick={approveAmount}>
                          Approve
                        </button>
                      )} */}

                      <div className="home-text7">
                        <img src="./images/users.svg" />{" "}
                        <span style={{ paddingLeft: "10px" }}>
                          {/* {Number(
                            String(Number(BigNumber.from(item.ticketCount)))
                          ) -
                            Number(
                              String(
                                Number(BigNumber.from(item.ticketRemaining))
                              )
                            )}{" "} */}
                          people are attending this event
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
