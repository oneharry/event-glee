import React from "react";
import './footer.css';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <hr></hr>
      <div className=" text-light fs-5 d-flex flex-column flex-md-row justify-content-center justify-content-md-around align-items-center">
        <div> &copy; Ezugwu Harrison 2023</div>
        <div className="d-flex ">
          <Link className="footer-link" to="/discover">Find Events</Link>
        </div>
      </div>
    </div>
  );
}
