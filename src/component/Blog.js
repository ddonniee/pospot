import React, { useEffect, useState } from "react";

import Social from './Social'
import NavTitle from './NavTitle'
import Ex from '../images/box2.png'
import Sticker from '../images/sticker.jpg'
import Jeju from '../images/jeju.jpg'
import Left from "./Left";
import Right from "./Right";

// 데이터 붙여야되는 페이지
// NavTtile 에 url 값 넘기기

const Blog =()=>{

    const [data, setData] = useState([]);
    console.log(data);

    useEffect(()=> {
        fetch('http://localhost:3001/lists')
        .then (res => {
            return res.json();
        })
        .then (data => {
            setData(data)
        });
    },[])

    const Posting=({data})=> {

        const [schedules] = data;
        let odd =[];
        let even =[];

        return (
            <div className="post">

                <div className="pageInfo">
                    <div className="pageInfoTitle">포스팟 로그</div>
                    <div className="pageInfoDetail">포스팟의 다양한<br />스토리를 담은 공간</div>
                    <div className="pageInfoDeco">POSPOT LOG</div>
                </div>

                <div className="pageContent">
                    <div >
                    {schedules.map((schedule,index)=> ( 
                        (index%2==0) ?
                        odd = [schedule[index]]
                        :
                        even = schedule[index]
                    ))}
                    </div>

                    <div>
                        <Left prop={[odd]} />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="blogWrapper">
                <Posting data={[data]}/>
        </div>
    )
}

export default Blog;