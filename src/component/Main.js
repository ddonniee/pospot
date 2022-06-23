import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import Carousel from 'react-bootstrap/Carousel'
import CarouselItem from "react-bootstrap/esm/CarouselItem";

import '../public/css/style.css'

// components
import Top from "./Top";
// svg files
import Small from '../public/svg/logo_small.svg'
import Logo_in from '../public/svg/logo_large.svg'
import Logo from '../public/svg/logo_large.svg'
import BBanner from '../public/svg/banner_blue.svg';
import RBanner from '../public/svg/banner_red.svg';
import Arrow from '../public/svg/arrow.svg';
import Send from '../public/svg/send_active.svg'
import BSend from '../public/svg/send_blue.svg';
import RSend from '../public/svg/send_red.svg'
import Bookmark from '../public/svg/bookmark.svg'

// test img
import One from '../images/1.jpg'
import Two from '../images/2.jpg'
import Three from '../images/3.jpg'

export default function Main() {

    // 비회원=0, red=1, blue=2
    const [color, setColor] = useState(2);
    const [BgColor, setBgColor] = useState('#E9F3FD');
    const [store, setStore] = useState([One,Two,Three])
    useEffect(()=>{
        if(color===0) {
            setBgColor('#000000')
        }
        if(color===1) {
            setBgColor('#F8F8F8')
        }
        if(color===2) {
            setBgColor('#E9F3FD')
        }
    },[color])

    return (
        <Fade clear>
        <div className="main">
            <Top />
            <div className="main-content" style={{"backgroundColor":BgColor}}>
            {color===0?
            <div className="guest"></div>
            :color===1?
            <div className="red">
               <img src={One} />
            </div>
            :color===2?
            <div className="blue">
                {/* 체험판에서만 보이기 */}
                <div className="user-type">
                    <img src={BBanner} />
                    <div className="desc">
                        <p>애드팟콜백, 쉽고 간편하게!</p>
                        <p>이용기간 <p>10</p>일</p>
                    </div>
                    <img src={Arrow} />
                </div>

                <div className="list">
                    <div className="list-top">
                        <div className="send"><img src={Send} /><p>자동발송</p></div>
                        <div className="fav"><img src={Bookmark} /><p>즐겨찾기</p></div>
                        <div className="edit"><p>편집하기</p></div>
                    </div>

                    <div className="list-img">
                        <Carousel
                        //showThumbs={true}
                        showStatus={false}        
                        slide={true}
                        interval={null}
                        onSlide={(key, direction)=>console.log(key, direction)}
                        onDrag={(e)=>console.log(e)}
                        indicators={true}
                        prevLabel={false}
                        nextLabel={false}
                        controls={true}
                        >
                            {/* <div>
                            <img src={One} className="my-img"/>
                            </div> */}
                        {store.map((i,index)=>{
                            console.log(i)
                            return (
                                
                                    <CarouselItem>
                                        <img src={i} className="my-img" alt={`image`+index} key={index}/>
                                    </CarouselItem>
                               
                            )
                        })}
                        </Carousel>
                    </div>

                    <div className="list-info">
                        <p>전전전류들이 기를 타고 흘러넘쳐 기기기절할듯 아슬아슬 찌릿찌릿 충충충분해 네 사랑이 과분해 격격격하게 날 아끼는 거 다 알아 블랙홀처럼 빠져들어가 앞이 안보여 떨어져 슝</p>
                        <p>내 프로필 : <a target="/blank" href="https://www.pospot.kr">www.pospot.kr</a></p>
                    </div>
                    <div className="btn-wrapper">
                    <input type="button" name="send-btn" style={{"display":"none"}}></input>
                    
                    <label htmlFor="send-btn"><Link to="/create" className="msg-btn">문자전송</Link></label>
                    </div>
                </div> 
            </div>
            :
            null}
            </div>
        </div>
        </Fade>
    )
}
