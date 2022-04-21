import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

const Header=()=>{
    return (
        <div className='headerWrapper'>
            <header className='header'>
                <div className='logo'>
                    <Link to="/"><img className='logoImg' src={Logo} alt="logo"/></Link>
                </div>
                <ul className='navBar'>
                    <li className='navList'><Link to="/pospot">회사소개</Link></li>
                    <li className='navList'><Link to="/ir">IR</Link></li>
                    <li className='navList'><Link to="/pospot_log">포스팟로그</Link></li>
                    <li className='navList'><Link to="/carear">채용공고</Link></li>
                    <li className='navList'><Link to="/with">제휴 및 문의</Link></li>
                </ul>
            </header>
        </div>
    )
}

export default Header;