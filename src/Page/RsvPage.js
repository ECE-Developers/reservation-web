/**
 * To Do List RsvPage
 * - 선택된 table에 해당하는 예약 현황 테이블 파싱
 * - 이미 예약된 시간은 빨간색으로 표현
 * - 예약된 시간은 선택하지 못하도록 구현
 * - 선택 완료 클릭 시 선택한 칸의 날짜, 시간, 테이블, user 정보를 api로 post 하여 예약 추가
 * - 선택한 칸의 날짜, 시간, 테이블을 가져와 변수에 저장해야 함
 */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../css/Table.css'
import HeaderLogin from '../layout/HeaderLogin';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const sample = [  
  { date: '02-16',
    table_name: 'Table1',  
    times: [11, 12],
  }
];

function RsvPage() {
  const [selectedTable, setSelectedTable] = useState('Table1');
  const today = moment().format('MM-DD');
  const tomorrow = moment().add(1, 'days').format('MM-DD');
  const dayAfterTomorrow = moment().add(2, 'days').format('MM-DD');
  const days = [today, tomorrow, dayAfterTomorrow];
  const times = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const [usersRsv, setUsersRsv] = useState('');
  const [loading, setLoading] = useState(true);

  const handleTableSelection = (table) => {
    setSelectedTable(table);
    console.log(usersRsv)
  };

  const navigate = useNavigate();
  const onClickRsv = () => {
    navigate('/rsv');
  };

  const isBooked = (table, day, time, reservations) => {
    const reservation = reservations.find(
      (rsv) => rsv.table_name === table && rsv.date === `${moment().format(`YYYY`)}-${day}`
    );
    return reservation && reservation.times.includes(time);
  };

  const getTableData = (table, reservations) => {
    return times.map((time) => {
      return (
        <tr key={time}>
          <td>
            {time} - {time + 1}
          </td>
          {days.map((day) => (
            <td
              key={`${day}-${time}`}
              style={{
                background: isBooked(table, day, time, reservations)
                  ? '#cef2db'
                  : 'white',
              }}
            ></td>
          ))}
        </tr>
      );
    });
  };

  useEffect(()=>{

    axios.get(`${process.env.REACT_APP_API_URL}/reservations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function(response){
      console.log(response.data)
      setUsersRsv(response.data.tomorrow)
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
  },[]);

  useEffect(()=>{
    if(usersRsv){
      setLoading(false);
    }
  })

  return (
    <div className='page'>
      <div className='loginform'>
        <HeaderLogin />
        <div>
          <button
            style={{
              background:
                selectedTable === 'Table1' ? '#4285F4' : '#adccff',
            }}
            className='errBtn2'
            onClick={() => handleTableSelection('Table1')}
          >
            Table1
          </button>
          <button
            style={{
              marginLeft: '8px',
              background:
                selectedTable === 'Table2' ? '#4285F4' : '#adccff',
            }}
            className='errBtn2'
            onClick={() => handleTableSelection('Table2')}
          >
            Table2
          </button>
        </div>

        <h2 style={{ textAlign: 'center', color: '#4285F4' }}>
          {selectedTable}
        </h2>
        
        <table className='time-reservation-table'>
          <thead>
            <tr>
              <th>Time</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? getTableData(selectedTable, sample) : getTableData(selectedTable, usersRsv)}
          </tbody>
        </table>
        
        <div>
          <button className='blue-box2' type='button' onClick={onClickRsv}>선택 완료</button>  
        </div >
      </div>
    </div>
    
  )
}

export default RsvPage;