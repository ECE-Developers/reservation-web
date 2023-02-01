import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import { useNavigate } from "react-router-dom"


function CautionPage(){
  const [Check, setCheck] = useState(false);
  const [noButton, setNoButton] =useState(true);
  
  const navigate = useNavigate();
  const navigateToMain = () => {
    alert('예약이 완료되었습니다.')
    navigate("/main");

    /*api에 예약정보 찔러서
    if(예약정보가 정상적으로 추가된 경우)
      alert('예약이 완료되었습니다')
    else
      alert('예약이 완료되지 않았습니다. 다시 시도해주세요.')
    navigate('/main')
    */
  }

  const CheckEvent =()=>{
    if(Check === false) {
      setCheck(true)
    }else {
      setCheck(false)
    }
  };

  useEffect(() => {
    if(Check === true){
      setNoButton(false)
      return;
    }
    setNoButton(true);
  },[Check]);

  return (
    <div>
      <Header />
      <h2>주의사항</h2>
      
      <div>
        <label>주의사항 내역 세부 사항을 여기에 작성합니다.</label>
        <input type='checkbox' onChange={CheckEvent} />주의사항을 확인했습니다.
      </div>
      
      <div>
          <button type='button' disabled={noButton} onClick={navigateToMain}>확인</button>
      </div >
    </div>
    
  )
}

export default CautionPage;