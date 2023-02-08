/**
 * To Do List MainPage
 * - api 파싱 후 사용자의 예약 내역을 '00월 00일 00시 테이블0 <예약취소>' 형식으로 구현
 * - 예약 취소 버튼 클릭 시 api로 예약 삭제 내역을 찌르고 새로고침
 */
import React, {useState, useEffect} from 'react';
import HeaderLogin from '../layout/HeaderLogin';
import {useNavigate} from "react-router-dom"
import moment from 'moment';
import '../css/Table.css'

function MainPage(){
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
  
  const navigate = useNavigate();
  const onClickRsv = () => {
    navigate("/rsv");
  }

  return (
    <div className='page'>
      <div className='loginform'>
        <HeaderLogin />
        <div>
          <button className='errBtn2' onClick={() => handleTableSelection('Table1')}>Table1</button>
          <button className='errBtn2' onClick={() => handleTableSelection('Table2')}>Table2</button>
          <h2 style={{ textAlign: 'center', color : '#4285F4' }}>{selectedTable}</h2>
        </div>
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
          <button className='blue-box2' type='button' onClick={onClickRsv}>예약/변경 하기</button>  
        </div >
      </div>
    </div>
    
  )
}

export default MainPage;