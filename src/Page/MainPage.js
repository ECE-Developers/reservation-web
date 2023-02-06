/**
 * To Do List MainPage
 * - api 파싱 후 사용자의 예약 내역을 '00월 00일 00시 테이블0 <예약취소>' 형식으로 구현
 * - 예약 취소 버튼 클릭 시 api로 예약 삭제 내역을 찌르고 새로고침
 */
import React from 'react';
import Header_login from '../layout/Header_login';
import { useNavigate} from "react-router-dom"

function MainPage(){
  const navigate = useNavigate();
  const onClickRsv = () => {
    navigate("/rsv");
  }

  const onClickDeleteRsv = () => {
    alert('예약이 취소되었습니다.')
    document.location.href='/main'
    /**
     * 1. api에 user, date, time, table 정보 등을 넣어 예약 취소
     * 2. 예약 취소 완료 후 MainPage를 다시 호출해 예약이 취소된 내용을 반영한다.
     */
  }

  return (
    <div>
      <Header_login />
      <div>
        <label>메인페이지</label>
      </div >
      <div>
        <div>
          MM-DD  00-00  <button type='button' onClick={onClickDeleteRsv}>예약 취소</button>
        </div>
      </div>
      <div>
          <button type='button' onClick={onClickRsv}>예약 하러가기</button>
      </div >
    </div>
    
  )
}

export default MainPage;