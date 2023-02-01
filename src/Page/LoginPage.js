/**
 * To Do List LoginPage
 * - jwt 토큰을 통한 로그인 방식 구현
 * - api 파싱
 */
import React, { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import Header from '../layout/Header'
import { useNavigate } from "react-router-dom"
/*import axios from 'axios';*/

/*임시 유저 아이디*/
const User={
  id: 'ece',
  pw: '440'
}

export default function Login() {
  const [inputId, setId] = useState('');
  const [inputPw, setPw] = useState('');
  const [notBtnAllow, setNotBtnAllow] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  
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
    if(inputId.length > 0 && inputPw.length > 0){
      setNotBtnAllow(false)
      return;
    }
    setNotBtnAllow(true);
  },[inputId,inputPw]);

  const onClickLogin = () => {
    if(inputId === User.id && inputPw === User.pw){
      navigate("/main", {state:{user_id:inputId}});
    }
    else{
      alert('잘못된 아이디 또는 비밀번호입니다.')
      document.location.href='/'
    }
    /* 
    axios.post('여기에 api 작성', null, {
      params: {
      'user_id': inputId, //api 형식에 따라 user_id, user_pw 변경
      'user_pw': inputPw
      }
    })
    .then(res => {
      console.log(res)
      if(id가 일치하지 않는 경우){
        alert('입력하신 아이디가 일치하지 않습니다.')
        document.location.href='/'
      } else if(pw가 일치하지 않는 경우){
        alert('입력하신 비밀번호가 일치하지 않습니다.')
        document.location.href='/'
      } else if(id와 pw가 모두 일치한 경우)
        navigate("/main", {state:{user_id:inputId}});
      }).catch()
    */
  }

  return(
    <div>
      <Header />

      <h2>ECE-Reservation</h2>

      <div>
        <label htmlFor='input_id'>아이디</label>
        <input 
          type='text'
          name='input_id'
          placeholder='아이디를 입력하세요'
          value={inputId}
          onChange={(e)=>setId(e.target.value)} 
        />
      </div>

      <div>
        <label htmlFor='input_pw'>비밀번호</label>
        <input
          type='password'
          name='input_pw'
          placeholder='비밀번호를 입력하세요'
          value={inputPw}
          onChange={(e)=>setPw(e.target.value)} />
      </div>
    
      <div >
        <button type='button' onClick={onClickLogin} disabled={notBtnAllow} >로그인</button>
      </div>
      <div >
        <button type='button' onClick={navigateToAgree}>회원가입</button>
      </div>
      <div >
        <React.Fragment>
          <button onClick={openModal}>이용안내</button>
          <Modal open={modalOpen} close={closeModal} header="이용안내">
            이용안내 사항입니다.
          </Modal>
        </React.Fragment> 
      </div>
    </div>
  )
}