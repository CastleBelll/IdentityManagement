import React from 'react';
import {Link} from "react-router-dom";
//import {Link} from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
  <div className='navbar'>
     <Link to="/board_db" style={{textDecorationLine:'none'}}>
        <div className='dark'>DB계정</div>
      </Link>
      <Link to="/board_os" style={{textDecoration:"none"}}>
      <div className='dark'>OS계정</div>
      </Link>
  </div>
  );
};

export default Navbar;