import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';  

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('jwtoken');
    alert('로그아웃 되었습니다.')
    // return window.location.replace("/login");
    navigate("/login");
  },[navigate]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      
    </div>
  )
}

export default Logout
