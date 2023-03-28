import React, { useState, useEffect} from 'react';
import HeaderLogin from '../layout/HeaderLogin';
import { useNavigate, useLocation } from "react-router-dom"
import moment from 'moment';
import axios from 'axios';


function CautionPage(){
  const [Check, setCheck] = useState(false);
  const [noButton, setNoButton] =useState(true);
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
  const DeleteRsv = async(event) => {
    event.preventDefault();
    axios.delete(`${process.env.REACT_APP_API_URL}/reservations/${localStorage.getItem('id')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function(response){
      if(response.data.statusCode===200){
        console.log(`예약내역 삭제`)
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

  const onClickFunction=async(e)=>{
    await DeleteRsv(e)
    await postRsv(result1, 'Table1')
    await postRsv(result2, 'Table2')
    alert('예약이 완료되었습니다')
    navigate('/main')
  }

  const postRsv = async(result, table) => {
    for(let i=1; i<result.length; i++){
      axios.post(`${process.env.REACT_APP_API_URL}/reservations/${localStorage.getItem('id')}`,
      {
        table_name: table,
        date: moment().format('YYYY')+'-'+result[i].date,
        times: result[i].times
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }).then(function(response){
        console.log(result[i])
      }).catch(function(error){
        console.log(error);
        alert('오류입니다. 다시 시도해주세요')
      });
    }
  }

  return (
    <div className='page'>
    <HeaderLogin />
    <div className='loginform'>
      <h2 style={{ textAlign: 'center', color : '#4285F4', marginTop : '15%' }}>주의사항</h2>
      
      <div style={{marginTop: '0px', marginLeft : '10%', marginRight : '10%', fontSize : '80%'}} className='buttonWrap2'>
        <label>
        <p>1. 사용 시간에 맞춰 학생회실을 사용해주세요.</p>
        <p>2. 개인 물품은 이용 시간이 끝나면 나가실 때 들고 가주세요. 분실되거나 폐기된 짐은 전전컴 학생회에서 책임지지 않습니다.</p>
        <p>3. 다음 사용자를 위해서 퇴실 시에 자리를 정돈해주세요.</p>
        <p>4. 음식은 취식 가능하나 냄새가 심한 음식의 경우 반드시 환기해주시고, 먹고 남은 음식들과 쓰레기들 잘 치워주시길 부탁드립니다.</p>
        <p>5. 학생회실 내부에 비치된 모든 학생회 물품에 대해서 취급, 사용 등을 금합니다. 문제 발생 시 모든 책임은 관련 당사자에게 있습니다.</p>
        <p>6. 주위에 있는 강의실, 연구실 등에 피해가 가지 않도록 큰 소음은 자제해주세요.</p>
        <p>7. 주의사항을 지키지 않고 사용함이 적발되면 제재가 가해질 예정입니다.</p>
        </label>
        <p style={{textAlign : 'center', marginTop : '20px'}} >
        <input type='checkbox' onChange={CheckEvent} />주의사항을 확인했습니다.</p>
      </div>
      
      <div className='buttonWrap3'>
          <button className='blue-box2' type='button' disabled={noButton} onClick={onClickFunction}>확인</button>
      </div >
    </div></div>
    
  )
}

export default CautionPage;