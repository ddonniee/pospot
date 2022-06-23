import React from "react";

// svg files
import SetRed from '../public/svg/setting_red.svg';
import SetBlue from '../public/svg/setting_blue.svg';
import Logo from '../public/svg/main_logo.svg'
import Mypage from '../public/svg/person_a.svg'
export default function Top() {

    return (
        <div className="top-bar">
            <div className="top-nav">
                <div className="logo"><img src={Logo} /></div>
                <div className="setting"><img src={SetBlue} /></div>
                <div className="mypage"><img src={Mypage}/></div>
            </div>
        </div>
    )
}