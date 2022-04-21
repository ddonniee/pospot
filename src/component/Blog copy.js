import React, { useEffect, useState } from "react";

import Social from './Social'
import NavTitle from './NavTitle'
import Ex from '../images/box2.png'
import Sticker from '../images/sticker.jpg'
import Jeju from '../images/jeju.jpg'
// 데이터 붙여야되는 페이지
// NavTtile 에 url 값 넘기기

const Blog =()=>{

    const [data, setData] = useState([]);
    console.log(data);

    useEffect(()=> {
        fetch('http://localhost:3003/lists')
        .then (res => {
            return res.json();
        })
        .then (data => {
            setData(data)
        });
    },[])

    const Posting=({data})=> {

        const [temps] = data;
        const [even, setEven] = useState(true);

        return (
            
            <div className="post">
                
                {temps.map((temp,index)=> ( 
                    
                    <>
                    
                    {index % 2===0 ? setEven(true):setEven(false)}
                    <div className={even ? "postWrapper" : "postWrapper even"}key={index}>
                        
                        <div className="postImg">
                            <img src={Jeju}></img>
                        </div>
                        <div className="postContent">
                            <h2 className="postTitle">{temp.title}</h2>
                            <div className="postDetail">{temp.detail}</div>
                        </div>
                        <div className="postInfo">
                            <div className="postDate">{temp.date}</div>
                            <div className="division">| </div>
                            <div className="postCategory">{temp.category}</div>
                    </div>
                    <Social />
                    <div className="category">
                    <img src={Sticker} alt="category"></img>
                    <div className="categoryName">카테고리</div>
                    </div>
                    
                    </div>
                    </>
                ))}
                
                
            </div>
        )
    }
    return (
        <div className="blogWrapper">
                <NavTitle />
                <Posting data={[data]}/>
                
            
        </div>
    )
}

export default Blog;