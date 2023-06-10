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
          <a href="/#about" className="footer-link">About</a>
          <a href="/#feature" className="footer-link">Features</a>
          <Link className="footer-link" to="/discover">Find Events</Link>
        </div>
      </div>
    </div>
  );
}
