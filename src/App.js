import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GamDetail from './component/GamDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GamDetail />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
