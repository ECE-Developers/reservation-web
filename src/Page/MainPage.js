/**
 * To Do List MainPage
 * - 임의 데이터 만들기
 * - 사용자 예약 내역 받아서 초록색으로 표시할 수 있어야 함!!
 */
import React, {useState} from 'react';
import HeaderLogin from '../layout/HeaderLogin';
import {useNavigate} from "react-router-dom"
import moment from 'moment';
import '../css/Table.css'

function MainPage(){
  const [selectedTable, setSelectedTable] = useState('Table1');
  const today = moment().format('MM-DD');
  const tomorrow = moment().add(1, 'days').format('MM-DD');
  const dayAfterTomorrow = moment().add(2, 'days').format('MM-DD');
  const days = [today, tomorrow, dayAfterTomorrow];
  const times = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  const handleTableSelection = table => {
    setSelectedTable(table);
  };
  
  const navigate = useNavigate();
  const onClickRsv = () => {
    navigate("/rsv");
  }

  return (
    <div className='page'>
      <div className='loginform'>
        <HeaderLogin />
        <div>
          <button style={{ background: selectedTable === "Table1" ? "#4285F4" : "#adccff" }} className='errBtn2' onClick={() => handleTableSelection('Table1')}>Table1</button>
          <button style={{ marginLeft: "8px", background: selectedTable === "Table2" ? "#4285F4" : "#adccff" }} className='errBtn2' onClick={() => handleTableSelection('Table2')}>Table2</button>
          </div>
          <h2 style={{textAlign: 'center', color : '#4285F4' }}>{selectedTable}</h2>
        <table className="time-reservation-table">
          <thead>
            <tr>
              <th>Time</th>
              {days.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map(time => (
              <tr key={time}>
                <td>{time} - {time+1}</td>
                {days.map(day => (
                  <td></td>
                ))}
              </tr>
            ))}
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