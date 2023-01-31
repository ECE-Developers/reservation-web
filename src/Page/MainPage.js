import React from 'react';
import Header from '../layout/Header';
import {useLocation} from "react-router-dom"

function MainPage(){
  const location = useLocation();
  const user_id = location.state.user_id;

  return (
    <div>
      <Header />
      
      <div>
        <label>메인페이지</label>
      </div >

      <div>
          <button type='button'>예약 하러가기 {user_id}</button>
      </div >
    </div>
    
  )
}

export default MainPage;