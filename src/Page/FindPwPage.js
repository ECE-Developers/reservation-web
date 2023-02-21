import React, { useState, useEffect } from 'react';
import HeaderUnlogin from '../layout/HeaderUnlogin';
import axios from 'axios';
import { useNavigate } from "react-router-dom"


function FindPwPage(){
  const [inputId, setId] = useState('');
  const [inputNum, setNum] = useState('');
  const [inputName, setName] = useState('');
  const [inputNewPw, setNewPw] = useState('');
  const [notBtnAllow, setNotBtnAllow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if(inputId.length > 0 && inputName.length > 0 && inputNum > 0 && inputNewPw){
      setNotBtnAllow(false)
      return;
    }
    setNotBtnAllow(true);
  },[inputId,inputName,inputNum, inputNewPw]);

  const onClickSetPw = async(event) => {
    event.preventDefault();
  
    axios.patch(`${process.env.REACT_APP_API_URL}/users`, {
      username: inputId,
      name: inputName,
      student_id: inputNum,
      new_password: inputNewPw
    }).then(function(response){
      if(response.data.name===inputName){
      alert(`비밀번호가 성공적으로 변경되었습니다!`)
      navigate('/')
      }
    }).catch(function(error){
      console.log(error);
      if(error.response.data.statusCode===400) {
        alert(`잘못된 요청입니다. 다시 시도해주세요.`)
      } else if(error.response.data.statusCode===401) {
        alert(`인증 후 다시 시도해주세요.`)
      } else if(error.response.data.statusCode===404) {
        alert(`존재하지 않는 회원정보입니다. 다시 시도해주세요.`)
      } else if(error.response.data.statusCode===500) {
        alert(`서버 오류입니다. 잠시 후 다시 시도해주세요.`)
      }
    });  
  }


  return (
    <div className='page'>
      <HeaderUnlogin />
      <div className='loginform'>
        <div className='titleWrap'>
          <label className='inputTitle' htmlFor='input_num'>S T U D E N T N U M B E R</label>
          <div className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='input_num'
              placeholder='학번을 입력하세요'
              value={inputNum}
              onChange={(e)=>setNum(e.target.value)} 
            />
          </div>
          <label className='inputTitle' htmlFor='input_name'>U S E R N A M E</label>
          <div style={{marginTop : '12px'}} className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='input_name'
              placeholder='이름을 입력하세요'
              value={inputName}
              onChange={(e)=>setName(e.target.value)} 
            />
          </div>
          <label className='inputTitle' htmlFor='input_id'>U S E R I D</label>
          <div className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='input_id'
              placeholder='아이디를 입력하세요'
              value={inputId}
              onChange={(e)=>setId(e.target.value)} 
            />
          </div>

          <label className='inputTitle' htmlFor='input_id'>N E W P A S S W O R D</label>
          <div className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='input_newPw'
              placeholder='새로운 비밀번호를 입력하세요'
              value={inputNewPw}
              onChange={(e)=>setNewPw(e.target.value)} 
            />
          </div>
        </div>
        <div className='buttonWrap'>
          <button
            className='blue-box2' 
            type='button' 
            onClick={onClickSetPw} 
            disabled={notBtnAllow} >
          확인</button>
        </div>
      </div>
    </div>
  )
}

export default FindPwPage;