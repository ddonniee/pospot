
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import IR from './IR';

const Header=()=>{

    const [ir, setIR] = useState(false);
    const onClickIR =()=> setIR(!ir);


    return (
        <div className='headerWrapper'>
            <header className='header'>
                <div className='logo'>
                    <Link to="/"><img className='logoImg' src={Logo} alt="logo"/></Link>
                </div>
                <ul className='navBar'>
                    <li className='navList'><Link to="/">회사소개</Link></li>
                    {/* <li className='navList'><Link to="/ir">IR</Link></li> */}
                    <li className='navList' onClick={onClickIR} id="irClick">IR</li>
                    <li className='navList'><Link to="/pospot_log">포스팟로그</Link></li>
                    <li className='navList'><Link to="/hire">채용공고</Link></li>
                    <li className='navList'><Link to="/with">제휴 및 문의</Link></li>
                </ul>
                {ir ? <IR /> : null }
            </header>
        </div>
    )
}

export default Header;