/**
 * To Do SignUpPage
 * - 아이디 중복확인 클릭 시 아이디를 post해 중복 여부 반환, 중복되지 않을 경우 idValid=true
 * - 회원가입 버튼 클릭 시 작성한 회원 정보 post
 */

import React, { useEffect, useState } from 'react'
import HeaderUnlogin from '../layout/HeaderUnlogin';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

function SignUp(){
  const [showPw, setShowPw] = useState(false);
  const [signId, setSignId] = useState('');
  const [signPw, setSignPw] = useState('');
  const [signNum, setSignNum] = useState('');
  const [signName, setSignName] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notBtnAllow, setNotBtnAllow] = useState(true);

  const navigate = useNavigate();

  const handlePw = (e) => {
    setSignPw(e.target.value);
    const regex = /^[A-Za-z0-9]{7,20}$/
    if(regex.test(signPw)){
      setPwValid(true)
    } else {
      setPwValid(false)
    }
  }

  const checkId = () => {
    alert(signName)
    axios({
      url: `${process.env.REACT_APP_API_URL}/auth/${signId}`,
      method:'get'
    }).then(function(response){
      if(response.data.name===signName){
        alert(`이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.`)
        setIdValid(false);
      } 
    }).catch(function(error){
      console.log(error);
      if(error.response.data.statusCode===500) {
        alert(`서버 오류입니다. 잠시 후 다시 시도해주세요.`)
        setIdValid(false);
      } else if(error.response.data.statusCode===404){
        setIdValid(true);
      }
    });
  }

  const showPwFunc = () => {
    setShowPw(!showPw);
  };

  useEffect(() => {
    if(signId.length>0 && signPw.length>0 && signNum.length>0 && signName.length>0 && pwValid && idValid){
      setNotBtnAllow(false)
      return;
    }
    setNotBtnAllow(true);
  },[signId, signName, signNum, signPw, idValid, pwValid]);
  
  const onClickSign =async(event) => {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/users`, {
      username: signId,
      password: signPw,
      name: signName,
      student_id: signNum
    }).then(function(response){
      if(response.data.name===signName){
      alert(`회원가입이 완료되었습니다!`)
      navigate('/')
      } else if(response.data.statusCode===500) {
        alert(`회원가입에 실패했습니다. 다시 시도해주세요.`)
      }
    }).catch(function(error){
      console.log(error);
    });
  }
  return (
    <div className='page'>
      <HeaderUnlogin />
      <div className='loginform'>
        <form onSubmit={onClickSign}>
        <div className='titleWrap'>
          <label className='inputTitle' htmlFor='sign_id' style={{marginTop:'10px'}} >U S E R I D</label>
          <div className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='sign_id'
              placeholder='아이디를 입력하세요'
              value={signId}
              onChange={(e)=>setSignId(e.target.value)} 
            />
          </div>
          <div >
            <button style={{marginTop: '2%'}}className='errBtn' type='button' onClick={checkId}>중복 확인</ button>
              {idValid ? <div className='errMsg'>아이디 사용이 가능합니다.</div> :
              <div className='errMsg'>새로운 아이디를 입력해주세요.</div>}
          </div>

          <div className='inputTitle' htmlFor='sign_pw' style={{marginTop:'20px', display:'inline-block'}}>P A S S W O R D</div>
          <div className='inputWrap' >
            <input
              
              className='input'
              type={ showPw ? 'text' : 'password' }
              name='sign_pw'
              placeholder='비밀번호를 입력하세요'
              value={signPw}
              onChange={handlePw}  
            />
          </div>
          <div >
            <button style={{marginTop: '2%'}}className='errBtn' type='button' onClick={showPwFunc}>S H O W</ button>
              {!pwValid && signPw.length>0 && (
                <div className='errMsg'>영문, 숫자 포함 8자 이상 입력해주세요</div>
              )}
          </div>
          
          <div className='inputTitle' style={{marginTop:'20px'}} htmlFor='sign_num' >S T U D E N T I D</div>
          <div className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='sign_num'
              placeholder='학번을 입력하세요'
              value={signNum}
              onChange={(e)=>setSignNum(e.target.value)} 
            />
          </div>
          
          <div className='inputTitle' htmlFor='sign_name' style={{marginTop:'20px'}}>N A M E</div>
          <div className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='sign_name'
              placeholder='이름을 입력하세요'
              value={signName}
              onChange={(e)=>setSignName(e.target.value)} 
            />
          </div>
        
          <div className='buttonWrap' style={{marginTop:'15px'}}>
            < button className='blue-box' type="submit" disabled={notBtnAllow} onClick={onClickSign} >회원가입</ button>
          </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;