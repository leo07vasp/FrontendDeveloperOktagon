import React from "react";
import { NavLink } from "react-router-dom";
import profilePic from "../assets/img/thanos.jpg";

const profileStyle = {
  maxWidth: "94%",
  objectFit: "contain",
  border: "3px solid #FFF",
  borderRadius: "4px",
  margin: "10px 5px 10px 5px",
};

const SideBar = ({ name }) => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 p-0  pt-3 col-lg-2 d-md-block sidebar collapse"
    >
      <div className="sidebar-sticky pt-3">
        <img alt="Thanos profile " style={profileStyle} src={profilePic} />
        <ul className="nav flex-column">
          <li className="nav-item ">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink to="/campaigns">Campaigns</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
