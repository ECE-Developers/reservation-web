import React from 'react';
import { useNavigate } from "react-router-dom"
import '../css/header.css';

const HeaderUnlogin =() => {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/");
  }

  return(
    <header className='header'>
      <div>
        <img className="logoImage"
          src='img/mainLogo.png'
          alt='페이지 로고'
          onClick={navigateToSignUp} 
        ></img>
      </div>
    </header>
  )
}

export default HeaderUnlogin;
