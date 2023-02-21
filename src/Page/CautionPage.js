/**
 * To Do List CautionPage
 * - 주의사항 세부 내용 추가
 * - api 파싱 후 예약정보를 post 하여 예약 완료 여부 반환
 * - 작업 완료 후 MainPage로 이동 => 흰 화면 뜨는 오류 해결하기
 */
import React, { useState, useEffect } from 'react';
import HeaderLogin from '../layout/HeaderLogin';
import { useNavigate, useLocation } from "react-router-dom"
import moment from 'moment';
import axios from 'axios';


function CautionPage(){
  const [Check, setCheck] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [noButton, setNoButton] =useState(true);
  const [delComplete, setDelComplete] = useState(false);
  const location = useLocation();
  const newRsv1 = location.state.newRsv1;
  const newRsv2 = location.state.newRsv2;

  const result1 = newRsv1.reduce((acc, curr) => {
    const foundIndex = acc.findIndex(item => item.date === curr.date && item.table_name === curr.table_name);
    if (foundIndex === -1) {
      acc.push({ date: curr.date, times: [parseInt(curr.times)], table_name: curr.table_name });
    } else {
      acc[foundIndex].times.push(parseInt(curr.times));
    }
    return acc;
  }, [newRsv1]);
  
  const result2 = newRsv2.reduce((acc, curr) => {
    const foundIndex = acc.findIndex(item => item.date === curr.date && item.table_name === curr.table_name);
    if (foundIndex === -1) {
      acc.push({ date: curr.date, times: [parseInt(curr.times)], table_name: curr.table_name });
    } else {
      acc[foundIndex].times.push(parseInt(curr.times));
    }
    return acc;
  }, [newRsv2]);
  
  const navigate = useNavigate();
  const navigateToMain = async(event) => {
    event.preventDefault();
    axios.delete(`${process.env.REACT_APP_API_URL}/reservations/${localStorage.getItem('id')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function(response){
      if(response.data.statusCode===200){
        console.log(`예약내역 삭제`)
        setDelComplete(true)
      }
    }).catch(function(error){
      console.log(error);
      if(error.response.data.statusCode===401) {
        alert(`로그인이 만료되었습니다.`)
        navigate(`/`);
      } else if(error.response.data.statusCode===404) {
        alert(`리소스를 찾을 수 없습니다.`)
      } else if(error.response.data.statusCode===500) {
        alert(`서버 오류입니다. 잠시 후 다시 시도해주세요.`)
      }
    });
  }

  const CheckEvent =()=>{
    if(Check === false) {
      setCheck(true)
    }else {
      setCheck(false)
    }
    console.log(result1)
    console.log(result2)
  };

  useEffect(() => {
    if(Check === true){
      setNoButton(false)
      return;
    }
    setNoButton(true);
  },[Check]);

  useEffect(()=>{
    if(delComplete){
      postRsv(result1)
      setCheck1(true);
      postRsv(result2)
      setCheck2(true);
    }
    if(check1 && check2){navigate('/main')}
  },[delComplete, check1, check2])

  const postRsv = (result) => {
    for(let i=1; i<result.length; i++){
      axios.post(`${process.env.REACT_APP_API_URL}/reservations/${localStorage.getItem('id')}`,
      {
        table_name:result[i].table_name,
        date:moment().format('YYYY')+'-'+result[i].date,
        times:result[i].times
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }).then(function(response){
          console.log(result[i]);
      }).catch(function(error){
        console.log(error);
        alert('오류입니다. 다시 시도해주세요')
      });
    }
  }

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