import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import user1 from "../assets/images/users/user4.jpg";
import icon from "../assets/images/logos/im_icon1.png";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const ClickedLogout = () =>{
      localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    alert("로그아웃되었습니다.");
    navigate('/About');

  }

  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
        
        <Link to="/starter" style={{textDecorationLine:'none',color:'black'}}><img
              src={icon}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img><span> IdentityManagement</span></Link>
        </div>
      
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

{/*  우측상단 고정시키기 위해 남김 */}
      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>

        </Nav>
        
        {/* 우측 상단 계정 관리 */}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>내 계정</DropdownItem>
            <DropdownItem>관리 계정</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={ClickedLogout}>로그아웃</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
