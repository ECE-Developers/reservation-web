/**
 * To Do List RsvPage
 * - table에 맞는 각 데이터를 화면에 출력
 * - selectedTime 의 속성으로 table 추가
 * => 테이블끼리 예약 항목을 분리할 수 있어야 함
 * => 예약 불가 항목은 정상적으로 작동하지만 예약 가능 항목은 테이블이 바뀌어도 바뀌지 않는 문제 있음
 */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../css/Table.css'
import HeaderLogin from '../layout/HeaderLogin';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

function RsvPage() {
  const [selectedTable, setSelectedTable] = useState('Table1');
  const [selectedTime1, setSelectedTime1] = useState({});
  const [selectedTime2, setSelectedTime2] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const [noButton, setNoButton] = useState(true)
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
    if(selectedTable==='Table1'){
      if (selectedTime1[day]?.[time]) {
        setSelectedTime1({
          ...selectedTime1,
          [day]: {
            ...selectedTime1[day],
            [time]: !selectedTime1[day]?.[time]
          }
        });
        setSelectedCount(selectedCount - 1);
      } else if (selectedCount < 6) {
        setSelectedTime1({
          ...selectedTime1,
          [day]: {
            ...selectedTime1[day],
            [time]: !selectedTime1[day]?.[time]
          }
        });
        setSelectedCount(selectedCount + 1);
      }
    }
    else {
      if (selectedTime2[day]?.[time]) {
        setSelectedTime2({
          ...selectedTime2,
          [day]: {
            ...selectedTime2[day],
            [time]: !selectedTime2[day]?.[time]
          }
        });
        setSelectedCount(selectedCount - 1);
      } else if (selectedCount < 6) {
        setSelectedTime2({
          ...selectedTime2,
          [day]: {
            ...selectedTime2[day],
            [time]: !selectedTime2[day]?.[time]
          }
        });
        setSelectedCount(selectedCount + 1);
      }
    }
    
  };

  const handleTableSelection = (table) => {
    setSelectedTable(table);
    console.log(myRsv)
    console.log(selectedTime1)
    console.log(selectedTime2)
  };

  const navigate = useNavigate();

  const initialselectedTime = (mine) => {
    let updatedST1 = {};
    let updatedST2 = {};
    days.forEach((day) => {
      updatedST1[day] = {};
      updatedST2[day] = {};
      times.forEach((time) => {
        if (isBooked('Table1', day, time, mine)) {
          updatedST1[day][time] = true;
        } else if(!isBooked('Table1', day, time, mine)){
          updatedST1[day][time] = false;
        }
        
        if (isBooked('Table2', day, time, mine)) {
          updatedST2[day][time] = true;
        } else if(!isBooked('Table2', day, time, mine)){
          updatedST2[day][time] = false;
        }
      });
    });
    setSelectedTime1(updatedST1);
    setSelectedTime2(updatedST2);
    
    const select1 = [];
      Object.entries(selectedTime1).forEach(([day, times]) => {
        Object.entries(times).forEach(([time, isSelected]) => {
          if (isSelected) {
            select1.push({ day, time });
          }
        });
      });
    const select2 = [];
      Object.entries(selectedTime2).forEach(([day, times]) => {
        Object.entries(times).forEach(([time, isSelected]) => {
          if (isSelected) {
            select2.push({ day, time });
          }
        });
      });
    setSelectedCount(select1.length+select2.length)
  };

  const getRsvedTableData = (table, notMine) => {
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
                    ? '#e65e5e'
                    : ((table==='Table1')
                      ? selectedTime1[day]?.[time]
                      : selectedTime2[day]?.[time])
                        ? '#cef2db'
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
    const rsvArr = Object.keys(reservations).map((key) => reservations[key]);
    try{
      const reservation = rsvArr.find(
        (rsv) => rsv.table_name === table && rsv.date === `${moment().format(`YYYY`)}-${day}`
      );
      return reservation && reservation.times.includes(time);
    }catch(e){
      console.log(e);
      navigate('/rsv')
    }
  };

  const onClickConfirmRsv = async() => {
    const selected1 = [];
    const selected2 = [];
    Object.entries(selectedTime1).forEach(([date, times]) => {
      Object.entries(times).forEach(([times, isSelected]) => {
        if (isSelected) {
          selected1.push({ date, times, table_name:'Table1'});
        }
      });
    });
    console.log(selected1);
    Object.entries(selectedTime2).forEach(([date, times]) => {
      Object.entries(times).forEach(([times, isSelected]) => {
        if (isSelected) {
          selected2.push({ date, times, table_name:'Table2'});
        }
      });
    });;
    navigate("/caution", { state: { newRsv1: selected1, newRsv2: selected2 } });
  }

  useEffect(()=>{
    const selected1 = [];
    const selected2 = [];
    Object.entries(selectedTime1).forEach(([date, times]) => {
      Object.entries(times).forEach(([times, isSelected]) => {
        if (isSelected) {
          selected1.push({ date, times});
        }
      });
    });
    console.log(selected1);
    Object.entries(selectedTime2).forEach(([date, times]) => {
      Object.entries(times).forEach(([times, isSelected]) => {
        if (isSelected) {
          selected2.push({ date, times});
        }
      });
    });;
    if((selected1.length+selected2.length)>6){
      setNoButton(true)
    } else {
      setNoButton(false)
    }
  },[selectedTime1, selectedTime2])

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
      initialselectedTime(myRsv)
    }
  },[temp])

  return (
    <div className='page'>
      <HeaderLogin />
      {findNotMyRsv(myRsv, allRsv)}
      <div className='loginform'>
        <div>
          <button style={{ background: selectedTable === "Table1" ? "#4285F4" : "#adccff", marginTop : '30px'  }} className='errBtn2' onClick={() => handleTableSelection('Table1')}>Table1</button>
          <button style={{ marginLeft: "8px", background: selectedTable === "Table2" ? "#4285F4" : "#adccff" }} className='errBtn2' onClick={() => handleTableSelection('Table2')}>Table2</button>
          </div>
        <table className="time-reservation-table">
          <thead>
            <tr>
              <th>Time</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? null : getRsvedTableData(selectedTable, notMyRsv)}
          </tbody>
        </table>
        
        <div>
          <button className='blue-box2' type='button' onClick={onClickConfirmRsv} disabled={noButton}>선택 완료</button>  
        </div >
      </div>
    </div>
    
  )
}

export default RsvPage;