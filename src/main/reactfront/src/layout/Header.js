import React from 'react';
import {Link} from "react-router-dom";
import './Header.css'


const Header = () => {
    return (
        <div  className='header'>
            <Link to="/board_db" style={{textDecoration:"none"}}>
                <div className='white'>DB계정</div>
            </Link>
            {/* &nbsp;&nbsp; | &nbsp;&nbsp; */}
            <Link to="/board_os">
                <div className='white'>OS계정</div>
            </Link>
            {/* &nbsp;&nbsp; | &nbsp;&nbsp; */}
            <div className='white'>계정관리시스템</div>

        </div>

    );
};

export default Header;