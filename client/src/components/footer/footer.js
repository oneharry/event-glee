import React from "react";
import './footer.css';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <hr></hr>
      <div className="footer-inner">
        <div> &copy; Harrison 2023</div>
        <div className="footer-inner2">
          <Link className="footer-link">About</Link>
          <Link className="footer-link">Terms and Condition</Link>
          <Link className="footer-link" to="/discover">Find Events</Link>
        </div>
      </div>
    </div>
  );
}
