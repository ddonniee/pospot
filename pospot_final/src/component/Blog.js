import React, { useEffect, useState, useRef } from "react";
import { Fade } from "react-reveal";
import moment from "moment";
import {Insight,Square ,People, News,UrlShare, BlogShare, FaceBook,Insta,Bubble} from '../svg/blog.icon'
import Social from './Social'
import Post from "./Post";
import $ from "jquery";
// 데이터 붙여야되는 페이지
// NavTtile 에 url 값 넘기기

const Blog =()=>{

    const refs = useRef();
    const [data, setData] = useState([]);
    const [fadeout, setfadeout] = useState(false);
    const [rightUrl, setRightUrl] = useState(false);
    const [address, setAddress]=useState('');

     $(document).mouseup(function(e) {
         if($(".onShare").has(e.target.length === 0)) {
             $(".onShare").css("display","none")
         }
     }) 
    useEffect(()=> {
        fetch('https://apipospot.anypot.co.kr/front/pospotLogList')
        .then (res => {
            return res.json();
        })
        .then (data => {
            data.data.map((key, index) => (
                key.id = index
                // data.put("id":index)
            ))
             console.log(data)
             setData(data.data)
        })
        .catch((err)=>
        console.log(err));
    },[])
  
    const share=(i,classtxtnum)=>{
        console.log(classtxtnum)
        $(".onShare").hide();
        $("div[id*=copytxt1]").show();
        $("div[id*=copytxt2]").hide();
        
        var i=i;
        var url = '';
        var textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        url = window.document.location.href;
        textarea.value = url;
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        
        if(i===1) {
            //setfadeout(!fadeout);
            //setRightUrl(false);
        }
        if(i===2) {
            //setfadeout(false);
            //setRightUrl(!rightUrl);
        }
        setAddress(url);
        $("#"+classtxtnum).show()
    }

    const CopyDone=()=>{
        return (
            <div>
                <span>콘텐츠 링크가 복사되었어요.<br>원하는 곳에 붙여넣으세요.</br></span>
            </div>
        )
    }

    const closeCopyPopup =() => {
        $(".onShare").hide();
        $("div[id*=copytxt1]").show();
        $("div[id*=copytxt2]").hide();
    }

    const PopShare=(prop)=>{
      
        const [copied, setCopied] = useState(false);
        
        const url = prop;
        const onClose = prop.onClose;
        const classtxt = prop.classtxt;

        const clickCopy=(classtxt)=>{
            console.log(1111111)
           // onClose(false)
           // setCopied(true);
            //$(".onShare > div:first-child > svg").css("width","300px")
           // $(".onShare > div:first-child > svg").css("height","146px")            
            //$("#copytxt").html("콘텐츠 링크가 복사되었어요.<br/>원하는 곳에 붙여넣으세요.</br>")
            $("#copytxt1"+classtxt).hide();
            $("#copytxt2"+classtxt).show();
            // 복사 완료 창 띄우기    
                 
        }


        return (
            <div className="onShare" id={classtxt} style={{position:"absolute",zIndex:"1",display:"none"}}>
                <div>
                    <div style={{position:"absolute",left:"0px"}}>
                        <div><Bubble /></div>
                        <div id={ "copytxt1"+classtxt} className="copytxt1" style={{width:"100%",position:"absolute",top:"40px",textAlign:"center",justifyContent:"center"}}>
                            <span>{url.url}</span>
                            <span className="copytxtspan" onClick={()=>clickCopy(classtxt)}>복사</span>
                        </div>

                        <div id={ "copytxt2"+classtxt} className="copytxt2" style={{display:"none",width:"100%",position:"absolute",top:"30px",textAlign:"center",justifyContent:"center"}}>                            
                        <span>콘텐츠 링크가 복사되었어요.<br/>원하는 곳에 붙여넣으세요</span>
                        </div>
                    </div>
                
               
                    {/* <div id="copytxt2" style={{display:"none",position:"absolute",border:"0px solid red"}}>
                        <div><Bubble /></div>
                        <div style={{width:"100%",position:"absolute",top:"30px",textAlign:"center",justifyContent:"center"}}><span id="copytxt">콘텐츠 링크가 복사되었어요.<br/>원하는 곳에 붙여넣으세요</span></div>
                    </div> */}
                </div> 
            </div>
        )
    }

    const Posting=({data})=> {
        
        const [schedules] = data;
        const [modalLoad, setModalLoad] = useState(false);
        const [postId, setPostId]=useState();
        
        
        return (
            <div className="post" >

                <div className="pageInfo">
                    <div className="pageInfoTitle">포스팟 로그</div>
                    <div className="pageInfoDetail">포스팟의 다양한<br />스토리를 담은 공간</div>
                    <div className="pageInfoDeco">POSPOT LOG</div>
                </div>

                <div className="pageContent">
                    <div className="pageContenSide">
                        <div className="postWrapperLeft">
                            {schedules
                            .filter((schedule)=> schedule.id%2 === 0)
                            .map((schedule, index)=> {
                                
                                return (
                                <div key={index}>
                                    <div className="postImg" name="이름">
                                        <img onClick={(e)=>{
                                            console.log(e.target.name)
                                            setPostId(e.target.name)
                                            setModalLoad(!modalLoad)
                                        }}src={`https://apipospot.anypot.co.kr/${schedule.img_path1}`} name={schedule.id}></img>
                                    </div>
                        
                                <div className="postContentInfo">
                                    <div className="postContent">
                                        <h2 className="postTitle">{schedule.title}</h2>
                                        <div className="postDetail">{schedule.content}</div>
                                    </div>
                                <div className="postInfo">
                                    <div className="postDate">{moment(schedule.modify_date).format("YYYY.M.DD")}</div>
                                    <div className="division" style={{
                                        padding:"0 7px"
                                    }}>{` | `}</div>
                                    <div className="postCategory">{schedule.category_name}</div>
                                </div>
                                <ul className="linkToSocial">
                                    <li className="LinksocialList" name="1" onClick={() =>share(1,schedule.id)}><UrlShare /></li>
                                    <a href="https://blog.naver.com/pospot0911"><li className="LinksocialList"><BlogShare /></li></a>
                                    <a href="https://www.facebook.com/pospot.kr"><li className="LinksocialList"><FaceBook /></li></a>
                                    <a href="https://www.instagram.com/pospot_official"><li className="LinksocialList"><Insta/></li></a>
                                    
                                    <PopShare url={address} classtxt={schedule.id}  />
                                    
                                </ul>
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
                            {
                            
                            schedules
                            .filter((schedule)=> schedule.id%2 ===1)
                            .map((schedule, index)=>{
                                
                                return (
                                <div key={index}>
                                    <div className="postImg" >
                                        <img onClick={(e)=>{
                                            console.log(e.target.name)
                                            setPostId(e.target.name)
                                            setModalLoad(!modalLoad)

                                        }}src={`https://apipospot.anypot.co.kr/${schedule.img_path1}`} name={schedule.id}></img>
                                    </div>
                        
                                <div className="postContentInfo">
                                    <div className="postContent">
                                        <h2 className="postTitle">{schedule.title}</h2>
                                        <div className="postDetail">{schedule.content}</div>
                                    </div>
                                <div className="postInfo">
                                    <div className="postDate">{moment(schedule.modify_date).format("YYYY.M.DD")}</div>
                                    <div className="division" style={{
                                        padding:"0 7px"
                                    }}>{` | `}</div>
                                    <div className="postCategory">{schedule.category_name}</div>
                                </div>
                                <ul className="linkToSocial">
                                    <li className="LinksocialList" value="1"  onClick={() =>share(2,schedule.id)}><UrlShare /></li>
                                    <a href="https://blog.naver.com/pospot0911"><li className="LinksocialList"><BlogShare /></li></a>
                                    <a href="https://www.facebook.com/pospot.kr"><li className="LinksocialList"><FaceBook /></li></a>
                                    <a href="https://www.instagram.com/pospot_official"><li className="LinksocialList"><Insta/></li></a>
                                    
                                    <PopShare url={address} classtxt={schedule.id}  />
                                    
                                </ul>
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

                        
                            )})}
                            </div>
                </div>
                </div>

                {modalLoad ? 
                <Post open={modalLoad} num={postId} onClose={setModalLoad} /> 
                : null} 
                
            </div>
        )
    }
    return (
        <Fade bottom>
        <div className="blogWrapper">
                <Posting data={[data]}/>
        </div>
        </Fade>
    )
}

export default Blog;