import React from 'react';
import { useNavigate } from "react-router-dom"
import '../css/header.css';

const Header =() => {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/");
  }

  return(
    <header className='header'>
      <div>
        <img className="logoImage"
          src='img/logoWhite.png'
          onClick={navigateToSignUp} 
        ></img>
      </div>
    </header>
  )
}

export default Header;