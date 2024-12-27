import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Manga Seeking</div>
      <div className={`navbar-links ${isOpen ? "open-fullscreen" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>
          Trang chủ
        </Link>
        <Link to="/mylist" onClick={() => setIsOpen(false)}>
          Danh sách
        </Link>
        <Link to="/search" onClick={() => setIsOpen(false)}>
          Tìm kiếm
        </Link>
        <Link to="/user" onClick={() => setIsOpen(false)}>
          Tài khoản
        </Link>
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav>
  );
};

export default Navbar;
