import React, { useState, useEffect } from 'react';
import HeaderUnlogin from '../layout/HeaderUnlogin';


function FindPwPage(){
  const [inputId, setId] = useState('');
  const [inputNum, setNum] = useState('');
  const [inputName, setName] = useState('');
  const [notBtnAllow, setNotBtnAllow] = useState(true);

  useEffect(() => {
    if(inputId.length > 0 && inputName.length > 0 && inputNum > 0){
      setNotBtnAllow(false)
      return;
    }
    setNotBtnAllow(true);
  },[inputId,inputName,inputNum]);

  const onClickSetPw = () => {
    alert(`${inputId}, ${inputName}, ${inputNum}`);
  } 

  return (
    <div className='page'>
      <div className='loginform'>
        <HeaderUnlogin />
        <div className='titleWrap'>
          <label className='inputTitle' htmlFor='input_num'>S T U D E N T N U M B E R</label>
          <div className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='input_num'
              placeholder='학번을 입력하세요'
              value={inputNum}
              onChange={(e)=>setNum(e.target.value)} 
            />
          </div>

          <label className='inputTitle' htmlFor='input_name'>U S E R N A M E</label>
          <div className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='input_name'
              placeholder='이름을 입력하세요'
              value={inputName}
              onChange={(e)=>setName(e.target.value)} 
            />
          </div>

          <label className='inputTitle' htmlFor='input_id'>U S E R I D</label>
          <div className='inputWrap'>
            <input 
              className='input'
              type='text'
              name='input_id'
              placeholder='아이디를 입력하세요'
              value={inputId}
              onChange={(e)=>setId(e.target.value)} 
            />
          </div>
        </div>
        <div className='buttonWrap'>
          <button
            className='blue-box' 
            type='button' 
            onClick={onClickSetPw} 
            disabled={notBtnAllow} >
          확인</button>
        </div>
      </div>
    </div>
  )
}

export default FindPwPage;