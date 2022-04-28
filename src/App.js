// eslint-disable-next-line

import logo from './logo.svg';
import './App.css';

import { Fade } from "react-reveal";

import Main from './component/Main'
import IR from './component/IR'
import Blog from './component/Blog'
import Hire from './component/Hire'
import Coalition from './component/Coalition'
// components
import Header from './component/Header';
import Footer from './component/Footer';
import HireDetail from './component/HireDetail';
import NotFound from './component/NotFound';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useState } from 'react';

function App() {


  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <div className="content">
        <Fade bottom>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/ir" element={<IR />}></Route>
        <Route path="/pospot_log" element={<Blog />}></Route>  
        {/* <Route path="/pospot_log/post" element={<Post />}></Route>*/}
        <Route path="/hire" element={<Hire />}></Route>
        <Route path="/hire/detail" element={<HireDetail />}></Route>
        <Route path="/with" element={<Coalition />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Fade>
      </div>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
