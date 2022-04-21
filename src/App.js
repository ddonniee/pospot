import logo from './logo.svg';
import './App.css';

import About from './component/About'
import Main from './component/Main'
import IR from './component/IR'
import Blog from './component/Blog'
import Carear from './component/Carear'
import Coalition from './component/Coalition'
// components
import Header from './component/Header';
import Footer from './component/Footer';

import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <div className="content">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/pospot" element={<About />}></Route>
        <Route path="/ir" element={<IR />}></Route>
        <Route path="/pospot_log" element={<Blog />}></Route>        
        <Route path="/carear" element={<Carear />}></Route>
        <Route path="/with" element={<Coalition />}></Route>
      </Routes>
      </div>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
