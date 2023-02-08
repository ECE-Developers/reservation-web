/**
 * To Do List CautionPage
 * - 주의사항 세부 내용 추가
 * - api 파싱 후 예약정보를 post 하여 예약 완료 여부 반환
 * - 작업 완료 후 MainPage로 이동 => 흰 화면 뜨는 오류 해결하기
 */
import React, { useState, useEffect } from 'react';
import HeaderLogin from '../layout/HeaderLogin';
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
    <div className='page'>
    <div className='loginform'>
      <HeaderLogin />
      <h2>주의사항</h2>
      
      <div className='buttonWrap2'>
        <label>주의사항 내역 세부 사항을 여기에 작성합니다.</label>
        <input type='checkbox' onChange={CheckEvent} />주의사항을 확인했습니다.
      </div>
      
      <div className='buttonWrap3'>
          <button className='errBtn' type='button' disabled={noButton} onClick={navigateToMain}>확인</button>
      </div >
    </div></div>
    
  )
}

export default CautionPage;