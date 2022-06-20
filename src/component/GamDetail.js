
import React, { useEffect, useState } from "react";
import ReactPlayer from 'react-player/lazy'
import Carousel from 'react-bootstrap/Carousel'
import CarouselItem from "react-bootstrap/esm/CarouselItem";

import preview1 from '../images/1.jpg'
import preview2 from '../images/2.jpg'
import img from '../images/3.jpg'
import mp4 from '../images/test.mp4'
import PNG from '../images/다운로드.png'
// svg files
import { ReactComponent as ArrowBelow } from "../images/arrow_below.svg";
import { ReactComponent as Location } from "../images/Location.svg";
import { ReactComponent as Back } from "../images/BackBtn.svg";

function GamDetail() {

    const [media, setMedia] = useState([preview1,preview2,img,mp4]);
    //const [media, setMedia] = useState([mp4]);
    const [test, setTest] = useState('기본값')
    const [video, setVedio] = useState(mp4)
    const [likes, setLikes] = useState(0)
    useEffect(()=>{
        //fetch()
    })

    window.addEventListener('slide', function() {
        console.log("==============")
    })
    const onSlide=(e)=> {
        setTest('onSlide',e)
        console.log(e,"이미지 슬라이드");
    }
    const onSlid=(e)=> {
        console.log(e,"onSlid");
    }
    const onChecking=e=>{
        console.log(e,"클릭이벤트")
    }
    const onDrag=e=>{
        console.log(e,"drag")
    }
    return (
        <div className="background">
            <div className="detail-content">
                <Back />
                <div className="previews">
                <div className="preview-img">
                    

                 <Carousel 
                        showThumbs={false}
                        showStatus={false}        
                        slide={true}
                        // onSlid={(key, direction)=>onSlid(key, direction)}
                        // onSlide={(key, direction)=>onSlide(key, direction)}
                        onSlide={function(e) {
                            console.log(e)
                        }}
                        onDrag={(e)=>onSlide(e)}
                        indicators={false}
                        onMouseOver={(e)=>{onDrag(e)}}
                        onClick={e=>onChecking(e)}
                     >         
                        
                    {media.length !== 0 
                    ?
                    media
                    .map((m,index)=> {
                        
                        const type = m.split('.').pop().toLowerCase();
                        console.log(type)
                        return (
                            
                            type==='jpg' || 'png' || 'jpeg'
                            ?
                            <CarouselItem>
                            <img src={m} key={index} alt={`slide`+index}/>
                            </CarouselItem>
                            :
                            // <video muted autoPlay loop duration key={index}>
                            //     <source src={m} type="video/mp4"/>
                            // </video>
                            <CarouselItem>
                            <ReactPlayer className='react-player'
                            alt={`slide`+index}
                            url={m}
                            playing={true}
                            muted={true}
                            light={false}>
                            </ReactPlayer>
                            </CarouselItem>
                        )
                        
                    }
                       
                    )
                   
                    :
                    null}
                    
                </Carousel>  
                </div>
                <div className="info">
                    <div className="profile"><img src={preview1}></img></div>
                    <h3 className="writer">{test}</h3>
                    <p className="date">2022.05.25</p>
                </div>
                </div>
                <div className="desc">
                    <p>당신, 내가 그곳에서 잃어버린 당신.<br />내 곁에 있어줘서 고마워<br />영원히 용서할 수 없으리라고 생각했었는데, 유나에 대한 나의 마음은 그게 어떤 모습이든 늘 과하고 넘친다고 생각했었는데, 나는 이제 애쓰지 않아도 유나를 별다른 감정 없이 기억할 수 있다. 아마 영원히 그 애를 이해할 수는 없겠지만. 그런ㄴ데도 나는 여전히 알고 싶다. 유나는 나를 어떻게 기억하고 있을까. 그 애는 지금의 나를 어떻게 생각할까</p>
                    <a href="https://www.pospot.kr" target="_blank">https://www.pospot.kr</a>
                </div>
                <div className="receiver">
                    <div className="img-wrapper">
                        <img src={preview1} style={{"zIndex":1}}/> 
                    </div>
                    <div className="img-wrapper">
                        <img src={preview2} style={{"zIndex":2}}/>
                    </div>
                    <div className="img-wrapper">
                        <img src={preview2} style={{"zIndex":2}}/>
                    </div>
                    <p>김동현 외 4명에게 <ArrowBelow /></p>
                </div>
                <div className="divide"></div>
                <div className="tracker">
                    <div className="location"><div><Location /></div><p>경기도 수원시 인계동 수목원로 300 근처에 있는 맥도날드 1층 창가자리</p></div>
                    <div className="hashtag">
                        <div>특별한</div><div>경험</div><div>럼펌펌펌</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamDetail;