
import './App.css';
import './public/css/common.css'
import './public/css/style.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// components
import Main from './component/Main';
import Top from './component/Top';
import CreateMSG from './component/CreateMSG';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        
      </header>
      <div className='content'>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/Create" element={<CreateMSG />}></Route>
        <Route path="/detail" element={<></>}></Route>
        <Route path="/setting" element={<></>}></Route>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
