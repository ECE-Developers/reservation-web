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
    <HeaderLogin />
    <div className='loginform'>
      <h2 style={{ textAlign: 'center', color : '#4285F4', marginTop : '15%' }}>주의사항</h2>
      
      <div style={{marginTop: '0px', marginLeft : '10%', marginRight : '10%', fontSize : '80%'}} className='buttonWrap2'>
        <label>
        <p>1. 예약 시간에 맞춰 학생회실에 도착해주세요.</p>
        <p>2. 개인 물품은 이용 시간이 끝나면 나가실 때 들고 가주세요. 분실되거나 폐기된 짐은 전전컴 학생회에서 책임지지 않습니다.</p>
        <p>3. 다음 사용자를 위해서 퇴실 시에는 자리를 정돈 해주세요.</p>
        <p>4. 물, 음료등의 음식은 취식 가능하나, 배달음식과 같이 냄새가 심한 음식은 취식을 금합니다.</p>
        <p>5. 학생회실 내부에 비치된 모든 학생회 물품에 대해서 취급, 사용 등을 금합니다. 문제 발생 시 모든 책임은 관련 당사자에게 있습니다.</p>
        <p>6. 주위에 있는 강의실, 연구실 등에 피해가 가지 않도록 큰 소음은 자제해주세요.</p>
        </label>
        <p style={{textAlign : 'center', marginTop : '20px'}} >
        <input type='checkbox' onChange={CheckEvent} />주의사항을 확인했습니다.</p>
      </div>
      
      <div className='buttonWrap3'>
          <button className='blue-box2' type='button' disabled={noButton} onClick={navigateToMain}>확인</button>
      </div >
    </div></div>
    
  )
}

export default CautionPage;