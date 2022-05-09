/* eslint-disable */

import './App.css';
import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* CSS */
import './resources/css/common.css';
import './resources/css/contents.css';

/* Component */
import Header from './component/Header';
import Footer from './component/Footer';
import Main from './component/Main';
import Log from './component/Log';
import Log2 from './component/Log2';
import RecruitList from './component/RecruitList';
import RecruitView from './component/RecruitView';
import Contact from './component/Contact';
import ScrollToTop from './component/ScrollToTop';


function App() {

  
  return (
    <BrowserRouter>
    <div className="App">
      <ScrollToTop />
      <Header/>
      <div className="Content">
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/log' element={<Log/>}></Route>
          <Route path='/recruit/list' element={<RecruitList/>}></Route>
          <Route path='/recruit/detail/:id' element={<RecruitView/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
