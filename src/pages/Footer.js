import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-5">
      <div className="text-center p-3 bg-secondary text-white">
        &copy; {new Date().getFullYear()} Subsidy Portal. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
