import React from 'react';
import Header from '../layout/Header';
import CheckRsvTable from '../components/CheckRsvTable';
import {/*useLocation,*/useNavigate} from "react-router-dom"

function RsvPage(){
  //const location = useLocation();
  //const user_id = location.state.user_id;

  const navigate = useNavigate();
  const onClickConfirmRsv = () => {
    navigate("/caution");
  }

  return (
    <div>
      <Header />
      
      <div>
        <label>예약페이지</label>
      </div >
        <CheckRsvTable />
      <div>
          <button type='button' onClick={onClickConfirmRsv}>선택 완료</button>
      </div >
    </div>
    
  )
}

export default RsvPage;