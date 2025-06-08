import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon, path, color }) => {
  return (
    <Link to={path} className="navbar" style={{ backgroundColor: color }}>
      <div className="nav-icon">{icon}</div>
      <h3>{title}</h3>
    </Link>
  );
};

export default Navbar;