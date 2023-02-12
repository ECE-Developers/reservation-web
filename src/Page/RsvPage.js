/**
 * To Do List RsvPage
 * - table1, table2 중 선택할 수 있도록 하는 토글창 생성
 * - 선택된 table에 해당하는 예약 현황 테이블 파싱
 * - 이미 예약된 시간은 빨간색으로 표현
 * - 예약된 시간은 선택하지 못하도록 구현
 * - 1개 이상 6개 이하 시간 선택 시 예약하기 버튼 활성화
 * - 선택 완료 클릭 시 선택한 칸의 날짜, 시간, 테이블, user 정보를 api로 post 하여 예약 추가
 * - 선택한 칸의 날짜, 시간, 테이블을 가져와 변수에 저장해야 함
 */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../css/Table.css'
import HeaderLogin from '../layout/HeaderLogin';
import {useNavigate} from "react-router-dom"

function RsvPage(){

  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState('Table1');
  const [noButton, setNoButton] = useState(true);
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const today = moment().format('MM-DD');
  const tomorrow = moment().add(1, 'days').format('MM-DD');
  const dayAfterTomorrow = moment().add(2, 'days').format('MM-DD');
  const days = [today, tomorrow, dayAfterTomorrow];
  const times = [9, 10, 11, 12, 13, 14, 15, 16, 17];

  useEffect(() => {
    if(selectedCount>0){
      setNoButton(false)
      return;
    }
    setNoButton(true);
  },[selectedCount]);

  const handleTableSelection = table => {
    setSelectedTable(table);
  };

  const handleClick = (day, time) => {
    if (selectedTime[day]?.[time]) {
      setSelectedTime({
        ...selectedTime,
        [day]: {
          ...selectedTime[day],
          [time]: !selectedTime[day]?.[time]
        }
      });
      setSelectedCount(selectedCount - 1);
    } else if (selectedCount < 6) {
      setSelectedTime({
        ...selectedTime,
        [day]: {
          ...selectedTime[day],
          [time]: !selectedTime[day]?.[time]
        }
      });
      setSelectedCount(selectedCount + 1);
    }
  };

  const onClickConfirmRsv = async() => {
    //try {
      const selected = [];
      Object.entries(selectedTime).forEach(([day, times]) => {
        Object.entries(times).forEach(([time, isSelected]) => {
          if (isSelected) {
            selected.push({ day, time });
          }
        });
      });
      alert(JSON.stringify(selected));
      navigate('/caution');
    
      /*
      const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selected })
      });
      const data = await response.json();
      if (data.success) {
        navigate('/caution');
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.error(e);
      alert('예약 실패');
    }
    */
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
                  <td
                    key={day}
                    onClick={() => handleClick(day, time)}
                    className={selectedTime[day]?.[time] ? 'booked' : ''}
                  >
                    {selectedTime[day]?.[time] ? '' : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
            <button className='blue-box2' type='button' disabled={noButton} onClick={onClickConfirmRsv}>선택 완료</button>
        </div >
      </div>
    </div>
    
  )
}

export default RsvPage;