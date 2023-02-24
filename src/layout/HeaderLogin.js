import React from 'react';
import { useNavigate } from "react-router-dom"
import '../css/header.css';

const HeaderLogin =() => {
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/main");
  }

  const onClickLogOut = () => {
    localStorage.removeItem(`id`);
    localStorage.removeItem(`token`);
    navigate('/')
  }

  return(
    <header className='header'>
      <div>
        <img className="logoImage"
          src='img/logoWhite.png'
          alt='페이지 로고'
          onClick={navigateToSignUp} 
        ></img>
      </div>
    </header>
  )
}

export default HeaderLogin;