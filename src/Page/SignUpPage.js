/**
 * To Do SignUpPage
 * - 아이디 중복확인 클릭 시 아이디를 post해 중복 여부 반환, 중복되지 않을 경우 idValid=true
 * - 회원가입 버튼 클릭 시 작성한 회원 정보 post
 */

import React, { useEffect, useState } from 'react'
import Header from '../layout/Header';
import {useNavigate} from "react-router-dom"

/*import axios from 'axios';*/

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
    const regex = /^[A-Za-z0-9]{8,20}$/
    if(regex.test(signPw)){
      setPwValid(true)
    } else {
      setPwValid(false)
    }
  }

  const checkId = () => {
    setIdValid(true);
    /*
    sign_id를 db로 post하고 중복 여부 확인 코드 작성해야 함
    if(아이디가 중복되지 않은 경우)
      setIdValid(true)
    else(아이디가 중복된 경우)
      setIdValid(false)
    */
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
  
  const onClickSign =() => {
    navigate('/')
    /* 회원가입 정보 보내기
    axios.post('여기에 api 작성', null, {
      params: {
      'user_id': signId
      'user_pw': signPw
      'user_num':signNum
      'user_name':signName
      }
    }) 
    */
  }
  return (
    <div>
      <Header />
      
      <h2>회원가입</h2>
      <div>
        <label htmlFor='sign_id' >아이디</label>
        <input 
          type='text'
          name='sign_id'
          placeholder='아이디를 입력하세요'
          value={signId}
          onChange={(e)=>setSignId(e.target.value)} 
        />
        <div className='errMsg'>
          <button type='button' onClick={checkId}>중복 확인</ button>
          { idValid ? <label>아이디 사용이 가능합니다.</label> :
                      <label>새로운 아이디를 입력해주세요.</label> }
        </div>
      </div>
          
      <div>
        <label htmlFor='sign_pw'>비밀번호</label>
        <input
          type={ showPw ? 'text' : 'password' }
          name='sign_pw'
          placeholder='비밀번호를 입력하세요'
          value={signPw}
          onChange={handlePw} 
        />
        <div className='errMsg'>
          <button type='button' onClick={showPwFunc}>비밀번호 보기</ button>
          {!pwValid && signPw.length>0 && (
            <div>영문, 숫자 포함 8자 이상 입력해주세요</div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor='sign_num' >학번</label>
        <input 
          type='text'
          name='sign_num'
          placeholder='학번을 입력하세요'
          value={signNum}
          onChange={(e)=>setSignNum(e.target.value)} 
        />
      </div>

      <div>
        <label htmlFor='sign_name' >이름</label>
        <input 
          type='text'
          name='sign_name'
          placeholder='이름을 입력하세요'
          value={signName}
          onChange={(e)=>setSignName(e.target.value)} 
        />
      </div>

      <div>
        < button disabled={notBtnAllow} onClick={onClickSign} >회원가입</ button>
      </div>
    
    </div>
  )
}

export default SignUp;