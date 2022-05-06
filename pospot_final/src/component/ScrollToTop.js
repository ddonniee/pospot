import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 컴포넌트 전환시  top으로 이동 22.05.06 은정
const ScrollToTop=()=>{
    const {pathname} = useLocation();
    
    useEffect(()=>{
        window.scrollTo(0,0);
    },[pathname])

    return null;
}
export default ScrollToTop;