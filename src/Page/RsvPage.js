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
  const [noButton, setNoButton] = useState(true)
  const today = moment().format('MM-DD');
  const tomorrow = moment().add(1, 'days').format('MM-DD');
  const dayAfterTomorrow = moment().add(2, 'days').format('MM-DD');
  const days = [today, tomorrow, dayAfterTomorrow];
  const today_day =moment().format('e');
  const tomorrow_day=moment().add(1,'days').format('e');
  const dayAfterTomorrow_day=moment().add(2,'days').format('e');
  const times = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const [temp, setTemp] = useState('');
  const [allRsv, setAllRsv] = useState('');
  const [myRsv, setMyRsv] = useState('');
  const [loading, setLoading] = useState(true);

  const onClickLogOut = () => {
    localStorage.removeItem(`id`);
    localStorage.removeItem(`token`);
    navigate('/')
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
      } else {
        setSelectedTime1({
          ...selectedTime1,
          [day]: {
            ...selectedTime1[day],
            [time]: !selectedTime1[day]?.[time]
          }
        });
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
      } else{
        setSelectedTime2({
          ...selectedTime2,
          [day]: {
            ...selectedTime2[day],
            [time]: !selectedTime2[day]?.[time]
          }
        });
      }
    }
  };

  const handleTableSelection = (table) => {
    setSelectedTable(table);
  };

  const navigate = useNavigate();

  const initialselectedTime = () => {
    let updatedST1 = {};
    let updatedST2 = {};
    days.forEach((day) => {
      updatedST1[day] = {};
      updatedST2[day] = {};
      times.forEach((time) => {
        if (isBooked('Table1', day, time, myRsv)) {
          updatedST1[day][time] = true;
        } else if(!isBooked('Table1', day, time, myRsv)){
          updatedST1[day][time] = false;
        }
        
        if (isBooked('Table2', day, time, myRsv)) {
          updatedST2[day][time] = true;
        } else if(!isBooked('Table2', day, time, myRsv)){
          updatedST2[day][time] = false;
        }
      });
    });
    setSelectedTime1(updatedST1);
    setSelectedTime2(updatedST2);
    setLoading(false)
  };

  const getRsvedTableData = (table) => {
    const notMyRsv = [];
    for (let i = 0; i < allRsv.length; i++) {
      let match = false;
      for (let j = 0; j < myRsv.length; j++) {
        if (allRsv[i].date === myRsv[j].date &&
            allRsv[i].table_name === myRsv[j].table_name &&
            allRsv[i].times.every(time => myRsv[j].times.includes(time))) {
          match = true;
          break;
        }
      }
      if (!match) {
        notMyRsv.push(allRsv[i]);
      }
    }
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
                  background:isBooked(table, day, time, notMyRsv)
                  ? '#e65e5e'
                  : ((table==='Table1')
                    ? selectedTime1[day]?.[time]
                    : selectedTime2[day]?.[time])
                      ? '#cef2db'
                      : 'white',
                  cursor: isBooked(table, day, time, allRsv) 
                    ? (isBooked(table, day, time, myRsv)
                      ? 'pointer' : 'not-allowed')
                    :'pointer'
                }}
                onClick={
                  isBooked(table, day, time, allRsv) 
                    ? (isBooked(table, day, time, myRsv)
                      ? () => handleClick(day, time) : null)
                    :() => handleClick(day, time)
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
    let rsvArr = Object.keys(reservations).map((key) => reservations[key]);
    const rsvs = rsvArr.filter(
      (rsv) => (rsv.table_name === table) && (rsv.date === `${moment().format(`YYYY`)}-${day}`)
    );
    let isAvailable = false;
    rsvs.forEach((rsv) => {
      if (rsv.times.includes(time)) {
        isAvailable = true;
      }
    });
    return isAvailable;
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
          selected1.push({ date, times, table_name:'Table1'});
        }
      });
    });
    Object.entries(selectedTime2).forEach(([date, times]) => {
      Object.entries(times).forEach(([times, isSelected]) => {
        if (isSelected) {
          selected2.push({ date, times, table_name:'Table2'});
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
    axios.get(`${process.env.REACT_APP_API_URL}/reservations/${localStorage.getItem('id')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function(response){
      setMyRsv(response.data.reservations)
    }).catch(function(error){
      console.log(error);
    });

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
  },[navigate]);

  useEffect(()=>{
    if(temp){
      setAllRsv([...temp.today, ...temp.tomorrow, ...temp.dayAfterTomorrow]);
    }
    initialselectedTime(myRsv)
    // eslint-disable-next-line
  },[temp])

  return (
    <div className='page'>
      <HeaderLogin />
      <div className='loginform'>
      <button onClick={onClickLogOut} className='errBtn3'>Log out</button>
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
            {loading ? null : getRsvedTableData(selectedTable)}
          </tbody>
        </table>
        <div>
          {noButton ? <div className='errMsg'>예약은 최대 6시간까지 가능합니다.</div> :
              null}
        </div>
        
        
        <div>
          <button className='blue-box2' type='button' onClick={onClickConfirmRsv} disabled={noButton}>선택 완료</button>  
        </div >
      </div>
    </div>
    
  )
}

export default RsvPage;