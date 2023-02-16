/**
 * To Do List LoginPage
 * - jwt 토큰을 통한 로그인 방식 구현
 * - api 파싱
 */
import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import HeaderUnlogin from '../layout/HeaderUnlogin'
import { useNavigate, Link } from "react-router-dom"
import '../css/login.css'
import axios from 'axios';

export default function Login() {
  const [loginId, setId] = useState('');
  const [loginPw, setPw] = useState('');
  const [notBtnAllow, setNotBtnAllow] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();
  const navigateToAgree = () => {
    navigate("/agreeInform");
  }

  /*이용안내 모달 함수*/
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  /*아이디와 비밀번호가 모두 입력된 경우 로그인 버튼 활성화*/
  useEffect(() => {
    if(loginId.length > 0 && loginPw.length > 0){
      setNotBtnAllow(false)
      return;
    }
    setNotBtnAllow(true);
  },[loginId,loginPw]);
  
  const showPwFunc = () => {
    setShowPw(!showPw);
  };
  
  const activeEnter = (e) => {
    if(e.key === "Enter") {
      onClickLogin();
    }
  }

  const onClickLogin = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      username: loginId,
      password: loginPw
    }).then(function(response){
      if(response.data.access_token){
        localStorage.clear()
        localStorage.setItem('id', response.data.user_id)
        localStorage.setItem('token', response.data.access_token)
        alert("로그인에 성공했습니다!")
        navigate(`/main`)
      }
    }).catch(function(error){
      console.log(error);
      if(error.response.data.statusCode===400) {
        alert(`비밀번호가 일치하지 않습니다.`)
      } else if(error.response.data.statusCode===404) {
        alert(`아이디가 존재하지 않습니다.`)
      } else if(error.response.data.statusCode===500) {
        alert(`서버 오류입니다. 잠시 후 다시 시도해주세요.`)
      }
    });
  }

  return(
    <div className='page'>
    <div className='loginform'>
      <HeaderUnlogin />

      <div className='titleWrap'>
        <label className='inputTitle' htmlFor='login_id'>U S E R I D</label>
        <div className='inputWrap'>
        <input 
          className='input'
          type='text'
          name='login_id'
          placeholder='아이디를 입력하세요'
          value={loginId}
          onChange={(e)=>setId(e.target.value)} 
        />
        </div>
      
        <div className='inputTitle' htmlFor='login_pw' style={{marginTop:'5%'}}>P A S S W O R D</div>
        <div className='inputWrap'>
          <input
            className='input'
            type={ showPw ? 'text' : 'password' }
            name='login_pw'
            placeholder='비밀번호를 입력하세요'
            value={loginPw}
            onChange={(e)=>setPw(e.target.value)}
            onKeyDown ={(e) => activeEnter(e)}
            />
        </div>
        <button  style={{marginTop: '2%'}} className='errBtn' type='button' onClick={showPwFunc}>S H O W</ button>
      </div>

      <Link to ="/findPw" className="forgotPw">
        비밀번호를 잊으셨나요?
      </Link>
    
      <div className='buttonWrap'>
      <div >
        <button className='blue-box' type='button' onClick={onClickLogin} disabled={notBtnAllow} >L O G I N</button>
      </div>
      <div >
        <button className='blue-box' type='button' onClick={navigateToAgree}>S I G N U P</button>
      </div>
      <div >
        <React.Fragment>
          <button className='blue-box'onClick={openModal}>N O T I C E</button>
          <Modal open={modalOpen} close={closeModal} header="N O T I C E">
            <h1>학생회실 예약 시스템 <br/>이용 안내</h1>
            <h5 style={{color:"rgb(300, 100, 100)"}}><b>본 예약 시스템은 서울시립대학교 전자전기컴퓨터공학부 학부생’에 한하여 이용 가능합니다.</b></h5>
            <p>1. 회원가입을 진행한 후 로그인을 해주세요.</p>
            <p>2. 본인의 예약내역을 확인하고 ‘학실 예약하기’를 클릭하여 예약을 진행합니다.</p>
            <p style={{marginBottom:"2px"}}>3. 테이블1과 테이블2 중 본인이 예약하고자 하는 테이블을 선택한 후 비어있는 시간 중 예약하고자 하는 시간대를 선택하거나 기존 예약을 취소해 주세요.</p>
            <h5 style={{color:"rgb(300, 100, 100)", marginTop:'0px'}}>예약은 최대 6시간까지 가능합니다.</h5>
            <p>4. 학생회실 이용시 지켜야 할 주의사항을 읽으신 후 ‘확인’을 클릭하시면 예약이 완료됩니다.</p>
          </Modal>
        </React.Fragment> 
      </div>
    </div></div>
    </div>
  )
}