import React from 'react';
import {NavLink} from "react-router-dom";
import {ApiPage} from "../../types";

interface Props {
  pages: ApiPage[];
}

const Navbar: React.FC<Props> = ({pages}) => {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">HW-65</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            {pages.map(page => (
              <li key={Math.random()} className="nav-item">
                <NavLink to={"/pages/" + page.pageName} className="nav-link">
                  {page.title}
                </NavLink>
              </li>
              ))}
            <li className="nav-item">
              <NavLink to="/pages/admin" className="nav-link">
                Admin
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;