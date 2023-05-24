import React, { useRef, useContext, useState, useEffect } from "react";
import './css/Profile.css'
import { Sidebar, Header, Navbar } from "../components";

export default function Profile() {

  const [profileState, setProfile] = useState("event");
  const [priceState, setPriceState] = useState(false);
  const [eventId, setEventId] = useState("");
  const [st, setSt] = useState([]);
  const priceRef = useRef();
  const amountRef = useRef();

  useEffect(() => {
  
  }, []);

  const myEventList = ["1", "2", "3", "4"]
  const loading = '';
  const loading1 = '';

  return (
    <div>
      <Navbar />
      <main>
        <div className="profile-box">
          <div className="balance-box">
            <div className="balance">Total Wallet Balance</div>
            <div className="busd"> BUSD</div>
          </div>

          <div className="balance-box">
            <div className="balance">Tickets Sold Balance (Available)</div>
            <div className="busd"> BUSD</div>
          </div>
          <div className="balance-box">
            <div className="balance">Withdraw</div>
            <input
              className="flip-input1"
              ref={amountRef}
              placeholder="Enter amount"
            />
            <button className="flip-button1" >
              Withdraw
            </button>
          </div>
        </div>
        <div className="profile-list">
          <div
            className={
              profileState === "event" ? "active profile-item" : "profile-item"
            }
            onClick={() => setProfile("event")}
          >
            My Events
          </div>
          <div
            onClick={() => setProfile("active")}
            className={
              profileState === "active" ? "active profile-item" : "profile-item"
            }
          >
            Active Tickets
          </div>
          <div
            onClick={() => setProfile("bought")}
            className={
              profileState === "bought" ? "active profile-item" : "profile-item"
            }
          >
            Bought Tickets
          </div>
        </div>

        {profileState === "event" ? (
          <section className="profile-event">
            <div className="home-flow">
              {loading1 && myEventList.length === 0 ? (
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
              {myEventList.map((item) => {
                return (
                  <div className="home-box">
                    <img
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
                        EventId - {}
                      </div>
                      <div className="home-text5">
                        Organized by{" "}
                      
                      </div>
                      <div className="home-text6">
                         BUSD
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
                      </div>
                    </div>
                  </div>
                );
              })}

              {myEventList.length === 0 ? (
                <div className="no-event">You have not created any events</div>
              ) : null}
            </div>
          </section>
        ) : profileState === "active" ? (
          <section className="profile-active">
            <div className="home-flow1">
              {loading1 && myEventList.length === 0 ? (
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
              {myEventList.map((item, index) => {
                return (
                  <div className="home-box1">
                    <img
                      className="evimg"
                      src={item || "./images/image.png"}
                    />

                    <div className="inner-box1">
                      <div className="home-text3">{item}</div>
                      <div className="home-text4">
                        {" "}
                        {new Date(
                          Number(
                            String()
                          ) * 1000
                        ).toDateString()}
                        at{" "}
                        {new Date(
                          Number(
                            String()
                          ) * 1000
                        ).toLocaleTimeString()}
                      </div>
                      <div className="home-text5">{item}</div>
                      <div className="home-text5">
                        {" "}
                        Organized by{" "}
                       
                      </div>
                      <div className="home-text6">
                        {" "}
                         BUSD
                      </div>
                      {st[index] === true ? (
                        <button className="flip">Listed</button>
                      ) : (
                        <button
                          className="flip"
                          onClick={() => {
                            setPriceState(true);
                            setEventId(1);
                          }}
                        >
                          List
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {myEventList.length === 0 ? (
                <div className="no-event">
                  You do not have any active events
                </div>
              ) : null}
            </div>
          </section>
        ) : profileState === "bought" ? (
          <section className="profile-bought">
            <div className="home-flow1">
              {loading1 && myEventList.length === 0 ? (
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
              {myEventList.map((item) => {
                return (
                  <div className="home-box1">
                    <img
                      className="evimg"
                      src={item || "./images/image.png"}
                    />
                    <div className="inner-box1">
                      <div className="home-text3">{item}</div>
                      <div className="home-text4">
                        {" "}
                        {new Date(
                          Number(
                            String(Number)
                          ) * 1000
                        ).toDateString()}{" "}
                        at{" "}
                        {new Date(
                          Number(
                            String()
                          ) * 1000
                        ).toLocaleTimeString()}
                      </div>
                      <div className="home-text5">{item}</div>
                      <div className="home-text5">
                        {" "}
                        Organized by{" "}
                        
                      </div>
                    </div>
                  </div>
                );
              })}

              {myEventList.length === 0 ? (
                <div className="no-event">You have not bought any ticket</div>
              ) : null}
            </div>
          </section>
        ) : null}
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
      {priceState === true && profileState === "active" ? (
        <div className="loading-card2">
          <input
            className="flip-input"
            ref={priceRef}
            placeholder="Enter your selling price"
          />
          <button className="flip-button" >
            Flip
          </button>
        </div>
      ) : null}
    </div>
  );
}
