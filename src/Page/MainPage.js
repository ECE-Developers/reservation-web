import React, { useState, useEffect } from 'react';
import HeaderLogin from '../layout/HeaderLogin';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import '../css/Table.css';
import axios from 'axios';

const reservations = [  
  { day: '02-16',
    table: 'Table1',  
    times: [11, 12],
  },
  {
    day: '02-16',
    table: 'Table2',
    times: [14],
  },
  {
    day: '02-17',
    table: 'Table2',
    times: [10],
  },
];

function MainPage() {
  const [selectedTable, setSelectedTable] = useState('Table1');
  const today = moment().format('MM-DD');
  const tomorrow = moment().add(1, 'days').format('MM-DD');
  const dayAfterTomorrow = moment().add(2, 'days').format('MM-DD');
  const days = [today, tomorrow, dayAfterTomorrow];
  const times = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  const handleTableSelection = (table) => {
    setSelectedTable(table);
  };

  const navigate = useNavigate();
  const onClickRsv = () => {
    navigate('/rsv');
  };

  const isBooked = (table, day, time) => {
    const reservation = reservations.find(
      (rsv) => rsv.table === table && rsv.day === day
    );
    return reservation && reservation.times.includes(time);
  };

  const getTableData = (table) => {
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
                background: isBooked(table, day, time)
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

    axios.get(`${process.env.REACT_APP_API_URL}/reservations/${localStorage.getItem('id')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function(response){
      if(response.data.user_id===localStorage.getItem('id')){
        alert(`예약내역을 확인합니다.`)
      }
    }).catch(function(error){
      console.log(error);
      if(error.response.data.statusCode===401) {
        alert(`인증 후 다시 시도해주세요.`)
      } else if(error.response.data.statusCode===404) {
        alert(`리소스를 찾을 수 없습니다.`)
      } else if(error.response.data.statusCode===500) {
        alert(`서버 오류입니다. 잠시 후 다시 시도해주세요.`)
      }
    });
  },[]);

  return (
    <div className='page'>
      <HeaderLogin />
      <div className='loginform'>
        <div>
          <button
            style={{
              background:
                selectedTable === 'Table1' ? '#4285F4' : '#adccff', marginTop : '30px' 
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
                selectedTable === 'Table2' ? '#4285F4' : '#adccff'
            }}
            className='errBtn2'
            onClick={() => handleTableSelection('Table2')}
          >
            Table2
          </button>
        </div>
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
            {getTableData(selectedTable)}
          </tbody>
        </table>
        <div>
          <button className='blue-box2' type='button' onClick={onClickRsv}>예약/변경 하기</button>  
        </div >
      </div>
    </div>
    
  )
}

export default MainPage;
