import React from "react";
import './footer.css';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <hr></hr>
      <div className="footer-inner d-flex flex-column flex-md-row justify-content-center justify-content-md-center align-items-center">
        <div> &copy; Harrison 2023</div>
        <div className="footer-inner2 mt-3">
          <Link className="footer-link" to="/discover">Find Events</Link>
        </div>
      </div>
    </div>
  );
}
