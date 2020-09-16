import React from "react";
import logo from "../assets/img/logo.png";

const logoStyle = {
  width: "150px",
  objectFit: "cover",
};

const Header = () => {
  return (
    <nav className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-2 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#i">
        <img alt="avangers logo" style={logoStyle} src={logo} />
      </a>
      <h2 className="col-lg-10 text-center">Infinity war campain</h2>
    </nav>
  );
};

export default Header;
