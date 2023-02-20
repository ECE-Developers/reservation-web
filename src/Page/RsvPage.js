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

function RsvPage() {
  const [selectedTable, setSelectedTable] = useState('Table1');
  const [noButton, setNoButton] = useState(true);
  const [selectedTime, setSelectedTime] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const today = moment().format('MM-DD');
  const tomorrow = moment().add(1, 'days').format('MM-DD');
  const dayAfterTomorrow = moment().add(2, 'days').format('MM-DD');
  const days = [today, tomorrow, dayAfterTomorrow];
  const times = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const [temp, setTemp] = useState('');
  const [allRsv, setAllRsv] = useState('');
  const [myRsv, setMyRsv] = useState('');
  const notMyRsv = []
  const [loading, setLoading] = useState(true);
  const output = {"reservations": []};

  function findNotMyRsv(my, all) {
    for (let i = 0; i < all.length; i++) {
      let match = false;
      for (let j = 0; j < my.length; j++) {
        if (all[i].date === my[j].date &&
            all[i].table_name === my[j].table_name &&
            all[i].times.every(time => my[j].times.includes(time))) {
          match = true;
          break;
        }
      }
      if (!match) {
        notMyRsv.push(all[i]);
      }
    }
  }

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

  const handleTableSelection = (table) => {
    setSelectedTable(table);
    console.log(selectedTime)
  };

  const navigate = useNavigate();

  const initialselectedTime = (table, mine) => {
    const updatedST = {};
    days.forEach((day) => {
      updatedST[day] = {};
      times.forEach((time) => {
        if (isBooked(table, day, time, mine)) {
          updatedST[day][time] = true;
        } else {
          updatedST[day][time] = false;
        }
      });
    });
    setSelectedTime(updatedST);
    
    const selected = [];
      Object.entries(selectedTime).forEach(([day, times]) => {
        Object.entries(times).forEach(([time, isSelected]) => {
          if (isSelected) {
            selected.push({ day, time });
          }
        });
      });
    setSelectedCount(selected.length)
  };

  const getRsvedTableData = (table, mine, notMine) => {
    return times.map((time) => {
      return (
        <tr key={time}>
          <td>
            {time} - {time + 1}
          </td>
          {days.map((day) => {
            return(
              <td
                key={`${day}-${time}`}
                style={{
                  background: isBooked(table, day, time, notMine)
                    ? 'red'
                    : selectedTime[day]?.[time]
                      ? 'green'
                      : 'white',
                  cursor: isBooked(table, day, time, notMine) ? 'not-allowed' : 'pointer'
                }}
                onClick={
                  isBooked(table, day, time, notMine)
                  ? null 
                  : () => handleClick(day, time)
                }
              >
              </td>
            )
          })}
        </tr>
      );
    });
  };
  
  const isBooked = (table, day, time, reservations) => {
    try{
      const reservation = reservations.find(
        (rsv) => rsv.table_name === table && rsv.date === `${moment().format(`YYYY`)}-${day}`
      );
      return reservation && reservation.times.includes(time);
    }catch(e){
      console.log(e);
      navigate('/rsv')
    }
  };

  const onClickConfirmRsv = async() => {
    const selected = [];
    Object.entries(selectedTime).forEach(([date, times]) => {
      Object.entries(times).forEach(([times, isSelected]) => {
        if (isSelected) {
          selected.push({ date, times, table_name:selectedTable});
        }
      });
    });
    console.log(selected);
    navigate("/caution", { state: { newRsv: selected } });
  }

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/reservations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function(response){
      setTemp(response.data)
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
    
    axios.get(`${process.env.REACT_APP_API_URL}/reservations/${localStorage.getItem('id')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function(response){
      setMyRsv(response.data.reservations)
    }).catch(function(error){
      console.log(error);
    });
  },[]);

  useEffect(()=>{
    if(temp){
      for (let day in temp) {
        const reservations = temp[day];
        for (let i = 0; i < reservations.length; i++) {
          const reservation = reservations[i];
          for (let j = 0; j < reservation.times.length; j += 2) {
            output.reservations.push({
              "id": reservation.id,
              "date": reservation.date,
              "table_name": reservation.table_name,
              "times": reservation.times
            });
          }
        }
      }
      setLoading(false);
      setAllRsv(output.reservations);
      initialselectedTime(selectedTable, myRsv)
    }
  },[temp])

  return (
    <div className='page'>
      {findNotMyRsv(myRsv, allRsv)}
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
            {loading ? null : getRsvedTableData(selectedTable, myRsv, notMyRsv)}
          </tbody>
        </table>
        
        <div>
          <button className='blue-box2' type='button' onClick={onClickConfirmRsv}>선택 완료</button>  
        </div >
      </div>
    </div>
    
  )
}

export default RsvPage;