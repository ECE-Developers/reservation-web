import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import {useLocation} from "react-router-dom"

function MainPage(){
  const location = useLocation();
  const user_id = location.state.user_id;

  return (
    <div>
      <Header />
      <div>
        메인페이지
      </div >
    </div>
    
  )
}

export default MainPage;