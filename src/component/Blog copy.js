import React, { useEffect, useState } from "react";
import {Insight,Square ,People, News} from '../svg/blog.icon'
import Social from './Social'
import Post from "./Post";
// 데이터 붙여야되는 페이지
// NavTtile 에 url 값 넘기기

const Blog =()=>{

    const [data, setData] = useState([]);
   
    useEffect(()=> {
        fetch('https://apipospot.anypot.co.kr/front/pospotLogList')
        .then (res => {
            return res.json();
        })
        .then (data => {
            setData(data.data)
        });
    },[])
  
    console.log(data)
    const Posting=({data})=> {

        const [schedules] = data;
        const [modalLoad, setModalLoad] = useState(false);
        const [postId, setPostId]=useState();
        

        return (
            <div className="post">

                <div className="pageInfo">
                    <div className="pageInfoTitle">포스팟 로그</div>
                    <div className="pageInfoDetail">포스팟의 다양한<br />스토리를 담은 공간</div>
                    <div className="pageInfoDeco">POSPOT LOG</div>
                </div>

                <div className="pageContent">
                    <div className="pageContenSide">
                        <div className="postWrapperLeft">
                            {schedules
                            .filter((schedule)=> schedule.posting_id%2 ===0)
                            .map((schedule, index)=> {
                                return (
                                <div key={index}>
                                    <div className="postImg" name="이름">
                                        <img onClick={(e)=>{
                                            console.log(e.target.name)
                                            setPostId(e.target.name)
                                            setModalLoad(!modalLoad)
                                        }}src={`https://apipospot.anypot.co.kr/${schedule.img_path1}`} name={index}></img>
                                    </div>
                        
                                <div className="postContentInfo">
                                    <div className="postContent">
                                        <h2 className="postTitle">{schedule.title}</h2>
                                        <div className="postDetail">{schedule.preview}</div>
                                    </div>
                                <div className="postInfo">
                                    <div className="postDate">{schedule.modify_date}</div>
                                    <div className="division">{` | `}</div>
                                    <div className="postCategory">{schedule.category_id}</div>
                                </div>
                                    <Social />
                                </div>
                        
                                <div className="category">
                                    {schedule.category_id==="insight" ? 
                                        <Insight /> : 
                                        schedule.category_id==="people" ?
                                        <People /> :
                                        schedule.category_id==="news" ?
                                        <News /> :
                                        <Square />
                                    }
                                 </div>
                                </div>
                            ) } )}
                            </div>
                        <div className="postWrapperRight">
                            {schedules
                            .filter((schedule)=> schedule.posting_id%2 ===1)
                            .map((schedule, index)=>(
                                <div key={index}>
                                    <div className="postImg" >
                                        <img onClick={(e)=>{
                                            console.log(e.target.name)
                                            setPostId(e.target.name)
                                            setModalLoad(!modalLoad)

                                        }}src={`https://apipospot.anypot.co.kr/${schedule.img_path1}`} name={index}></img>
                                    </div>
                        
                                <div className="postContentInfo">
                                    <div className="postContent">
                                        <h2 className="postTitle">{schedule.title}</h2>
                                        <div className="postDetail">{schedule.preview}</div>
                                    </div>
                                <div className="postInfo">
                                    <div className="postDate">{schedule.modify_date}</div>
                                    <div className="division">{` | `}</div>
                                    <div className="postCategory">{schedule.category_id}</div>
                                </div>
                                    <Social />
                                </div>
                        
                                <div className="category">
                                    {schedule.category_id==="insight" ? 
                                        <Insight /> : 
                                        schedule.category_id==="people" ?
                                        <People /> :
                                        schedule.category_id==="news" ?
                                        <News /> :
                                        <Square />
                                    }
                                 </div>
                                </div>

                        
                            ))}
                            </div>
                </div>
                </div>

                {modalLoad ? <Post open={modalLoad} num={postId} onClose={setModalLoad} /> : null} 

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