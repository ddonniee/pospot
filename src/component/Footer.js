import React from "react";
import Logo from '../images/logo.png'
import Social from './Social'
const Footer=()=>{

    return (
        <div className="footerWrapper">
           <div className="footer">
           <div className="footerLogo">
                <img src={Logo} alt="logo" className="logoImg"></img>
            </div>
            <div className="information">
            <address className="pospotInfo">
                <div className="basicInfo">대표이사: 김교순, 사업자 등록번호 : 54586-0110, contact@pospot.kr</div>
                <div className="pospotAddress">경기도 안양시 동안구 엘에스로 116번길 118 508호 (안양2차 SKV1 센터, 호계동), Tel: 031-5175-1108, Fax:070-4015-3985</div>
                <br />
                <div className="rights">Copyright @ POSPOT Co.,Ltd. 2018 All Right Reserved.</div>
            </address>
            <Social />
            </div>
           </div>
        </div>
    )
}

export default Footer;