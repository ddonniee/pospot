import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import preview1 from '../images/1.jpg'
import preview2 from '../images/2.jpg'
import img from '../images/3.jpg'
import mp4 from '../images/test.mp4'
function GamDetail() {

    const [media, setMedia] = useState([preview1,preview2,img]);
    const [video, setVedio] = useState(mp4)
    const [likes, setLikes] = useState(0)
    useEffect(()=>{
        //fetch()
    })
    console.log(media)
    return (
        <div className="background">
            <div className="detail-content">

                <div className="previews">
                <div className="preview-img">
                    {/* <img src={preview2} /> */}
                    <video muted autoPlay loop duration>
                        <source src={video} type="video/mp4"/>
                    </video>
                </div>
                <div className="detail-info">
                    <div className="detail-profile"><img src={preview1}></img></div>
                    <h3 className="detail-writer">김지연</h3>
                    <p className="detail-time">2022.05.25</p>
                </div>
                </div>
                <div className="detail-desc">
                    <p>당신, 내가 그곳에서 잃어버린 당신.<br />내 곁에 있어줘서 고마워<br />영원히 용서할 수 없으리라고 생각했었는데, 유나에 대한 나의 마음은 그게 어떤 모습이든 늘 과하고 넘친다고 생각했었는데, 나는 이제 애쓰지 않아도 유나를 별다른 감정 없이 기억할 수 있다. 아마 영원히 그 애를 이해할 수는 없겠지만. 그런ㄴ데도 나는 여전히 알고 싶다. 유나는 나를 어떻게 기억하고 있을까. 그 애는 지금의 나를 어떻게 생각할까</p>
                    <a href="https://www.pospot.kr">https://www.pospot.kr</a>
                </div>
                <div className="detail-receiver">
                    <div className="img-wrapper">
                        <img src={preview1} style={{"z-index":1}}/> 
                    </div>
                    <div className="img-wrapper">
                        <img src={preview2} style={{"z-index":2}}/>
                    </div>
                    
                    <p>김동현 외 4명에게</p>
                </div>
                <div className="detail-tracker">
                    <div className="detail-location"><div>🔻</div><p>경기도 수원시 인계동 수목원로 300</p></div>
                    <div className="detail-hashtag">
                        <div>특별한</div><div>경험</div><div>럼펌펌펌</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamDetail;