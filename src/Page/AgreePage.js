/**
 * To Do List AgreePage
 * - 개인정보사용동의 세부 내용 추가
 */
import React, { useState, useEffect } from 'react';
import HeaderUnlogin from '../layout/HeaderUnlogin';
import { useNavigate } from "react-router-dom"

function AgreePage(){
	const [Check, setCheck] = useState(false);
  const [noButton, setNoButton] =useState(true);
  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate("/signUp");
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
      <HeaderUnlogin />
    <div className='loginform'>
      <h2 style={{ textAlign: 'center', color : '#4285F4', marginTop : '15%' }}>개인정보활용 동의</h2>
      
      <div style={{marginTop: '0px', marginLeft : '10%', marginRight : '10%', fontSize : '80%'}} className='buttonWrap2'>
        <label>
        <p>서울시립대학교 전자전기컴퓨터공학부 학생회실 예약과 관련해 이용자들을 대상으로 개인정보활용에 대한 동의를 받습니다.</p>
        <p>개인정보활용 동의서에 대한 내용은 다음과 같습니다.</p>
          <div>
          <p>- 제공정보 : 회원가입 시에 기입한 학번, 이름 </p>
          <p>- 제공목적 : 전전컴 학생회실 예약을 위해 개발한 웹 사용을 위함. </p>
          <p>- 활용부서 : 전전컴 학생회 </p>
          <p>- 개인정보의 보유 및 이용기간 : 웹 종료 기간인 2023.12.31. 까지 </p>
          </div>
          <p></p>
          <div>개인정보보호법 제15조 및 제21조에 따라 이용목적이 달성되거나 이용기간 종료 후 즉시 파기됩니다. 
            수집, 제공된 개인정보는 위 목적 이외의 용도로는 이용되지 않으며 제3자에게 제공하지 않습니다.개인정보 활용 동의는 거부할 수 있으나 거부할 경우 학생회실 예약 서비스를 이용하실 수 없습니다.
          </div>
        </label>
        <p style={{textAlign : 'center', marginTop : '20px'}} >
        <input type='checkbox' onChange={CheckEvent} />주의사항을 확인했습니다.</p>
      </div>
      
      <div>
          <button className='blue-box2' type='button' onClick={navigateToSignUp}disabled={noButton} >회원가입</button>
      </div >
    </div></div>
    
  )
}

export default AgreePage;