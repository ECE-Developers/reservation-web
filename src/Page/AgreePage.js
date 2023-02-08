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
    <div className='loginform'>
      <HeaderUnlogin />
      <h2>개인정보동의</h2>
      
      <div>
        <label>개인정보 동의 내역 세부 사항을 여기에 작성합니다.</label>
        <input type='checkbox' onChange={CheckEvent} />개인정보 사용에 동의합니다.
      </div>
      
      <div>
          <button type='button' disabled={noButton} onClick={navigateToSignUp}>회원가입</button>
      </div >
    </div></div>
    
  )
}

export default AgreePage;