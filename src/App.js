import LoginPage from "./Page/LoginPage";
import SignUpPage from './Page/SignUpPage';
import AgreePage from './Page/AgreePage';
import MainPage from './Page/MainPage'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (

      <Router>
        <Routes>
        <Route path='/main' element={<MainPage />}></Route>
          <Route path='/signUp' element={<SignUpPage />}></Route>
          <Route path='/agreeInform' element={<AgreePage />}></Route>
          <Route path='/' element={<LoginPage />}></Route>
        </Routes>
      </Router>

  );
}

export default App;

