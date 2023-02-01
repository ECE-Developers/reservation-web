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
import React from 'react';
import Header from '../layout/Header';
import CheckRsvTable from '../components/CheckRsvTable';
import {/*useLocation,*/useNavigate} from "react-router-dom"

function RsvPage(){
  //const location = useLocation();
  //const user_id = location.state.user_id;

  const navigate = useNavigate();
  const onClickConfirmRsv = () => {
    navigate("/caution");
  }

  return (
    <div>
      <Header />
      
      <div>
        <label>예약페이지</label>
      </div >
        <CheckRsvTable />
      <div>
          <button type='button' onClick={onClickConfirmRsv}>선택 완료</button>
      </div >
    </div>
    
  )
}

export default RsvPage;