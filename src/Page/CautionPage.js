/**
 * To Do List CautionPage
 * - 주의사항 세부 내용 추가
 * - api 파싱 후 예약정보를 post 하여 예약 완료 여부 반환
 * - 작업 완료 후 MainPage로 이동 => 흰 화면 뜨는 오류 해결하기
 */
import React, { useState, useEffect } from 'react';
import HeaderLogin from '../layout/HeaderLogin';
import { useNavigate, useLocation } from "react-router-dom"


function CautionPage(){
  const [Check, setCheck] = useState(false);
  const [noButton, setNoButton] =useState(true);
  const location = useLocation();
  const newRsv = location.state.newRsv;
  
  const navigate = useNavigate();
  const navigateToMain = () => {
    alert('예약이 완료되었습니다.')
    console.log(newRsv)
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
    <div className='page'>
    <div className='loginform'>
      <HeaderLogin />
      <h2 style={{ textAlign: 'center', color : '#4285F4' }}>주의사항</h2>
      
      <div style={{ textAlign : 'center', marginTop: '80%' }} className='buttonWrap2'>
        <label>주의사항 내역 세부 사항을 여기에 작성합니다.</label><p>
        <input type='checkbox' onChange={CheckEvent} />주의사항을 확인했습니다.</p>
      </div>
      
      <div className='buttonWrap3'>
          <button className='blue-box2' type='button' disabled={noButton} onClick={navigateToMain}>확인</button>
      </div >
    </div></div>
    
  )
}

export default CautionPage;