import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {Insight,Square ,People, News,UrlShare, BlogShare, FaceBook,Insta,Bubble} from '../resources/svg/blog.icon'
// import Social from "./Social";
import {preBtn,nextBtn,paging,close} from "../resources/svg/post.icon";
import moment from "moment";

import * as config from '../config'

const Post=(prop)=>{
    
    const [data, setData] = useState([]);
    //const {open, idx, onClose} = prop;
    const idx =prop.num;
    const open = prop.open; 
    const onClose = prop.onClose;
    const styleClasses = ["Modal",open ? "ModalOpen":"ModalClose"]

    const popupWidth = 1920;
    const popupHeight = 1140;

    let horizon = (window.screen.width/2)-(popupWidth/2.5);
    let vertical = (window.screen.height/2)-(popupHeight/2);

    useEffect(()=> {
        fetch('https://apipospot.anypot.co.kr/front/pospotLogList')
        .then (res => {
            return res.json();
        })
        .then (data => {
            setData(data.data)
        });
    },[])
  
    

    
    if(data.length===0 ) {
        return
    }else {

        console.log(data);
    return (
        <Fade bottom>
        <div className={styleClasses.join(' ')} style={{
            top:horizon,
            left:vertical
        }}>

                        { open ?  
                      
                        <div className="window">
                            <div className="popup lPop">


                                <div className="logPop">
                                    <div className="pic">
                                        <div className="img">
                                        <Carousel 
                                            showThumbs={false}
                                            showStatus={false}                                            
                                            autoPlay={true} 
                                            
                                            // pixel에 따라서 여백주기
                                        >
                                            { data[idx].popImages && data[idx].popImages.map((img,index) => 
                                            img.path !== ''
                                            ?
                                            <div>
                                                {img.width < 1920 
                                                ?
                                                <img key={`img_path`+index} src={config.IMG_PATH+img.path} style={{
                                                    padding:`data.screenSize.width-16px`
                                                }}/> 
                                                :
                                                <img key={`img_path`+index} src={config.IMG_PATH+img.path} style={{
                                                    padding: "none",
                                                }}/>
                                                }                                            
                                            </div>
                                            :
                                            null
                                            ) }                                          
                                        </Carousel>
                                        </div>
                                       
                                        <div className="paging">
                                            <div className="active">
                                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="3" cy="3" r="3" fill="white"/>
                                                </svg>
                                            </div>
                                            <div className="etc">
                                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                                </svg>
                                            </div>
                                            <div className="etc">
                                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                                </svg>
                                            </div>
                                            <div className="etc">
                                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                                </svg>
                                            </div>
                                            <div className="etc">
                                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                                </svg>
                                            </div>
                                            <div className="etc">
                                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <p className="main-title">{data[idx].title}</p>
                                        <p className="desc">{data[idx].content}</p>
                                        <p className="info">{moment(data[idx].create_date).format('YYYY.M.DD')}<span>|</span>{data[idx].category_name}</p>
                                      

                                    {/* 블로그 상세보기 링크 복사 22.05.03 은정 */}

                                    <ul className="linkToSocial">
                                        {data[idx].link !== null ?
                                        <li className="LinksocialList" value="1"><UrlShare/></li>
                                        :
                                        null }
                                        {data[idx].blog_link === 0 ?
                                        null :
                                        <a href={data[idx].blog_link} target="_blank"><li className="LinksocialList"><BlogShare/></li></a>
                                        }
                                        {data[idx].popData.facebook_link === 0 ?
                                        null :
                                        <a href={data[idx].facebook_link} target="_blank"><li className="LinksocialList"><FaceBook/></li></a>
                                        }
                                        {data[idx].instagram_link === 0 ?
                                        null :
                                        <a href={data[idx].instagram_link} target="_blank"><li className="LinksocialList"><Insta/></li></a>
                                        }
                                    
                                    </ul>
                                   
                                        <div className="arrow4">
                                            <div className="window">
                                                <div className="arrow-box4">
                                                    <p>콘텐츠 링크가 복사되었어요.<br/>원하는 곳에 붙여넣으세요.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                    <button id="closeBtn" className="closeBtn" >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 4L20.0708 20.0708" stroke="white" strokeWidth="2.5"/>
                                            <path d="M20 4L3.92921 20.0708" stroke="white" strokeWidth="2.5"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                       : null
                    }

            {/* <div className="logPop">
            <div className="pic">
                <div className="img">
                    <Carousel 
                        showThumbs={false}
                         showStatus={false}                                            
                         autoPlay={true} 
                     // pixel에 따라서 여백주기
                    >
                    { data.popImages && data.popImages.map((img,index) => 
                        img.path !== ''
                        ?
                            <div>
                                {data.width < 1920 
                                ?
                                <img key={`img_path`+index} src={config.IMG_PATH+data.path} /> 
                                :
                                <img key={`img_path`+index} src={config.IMG_PATH+data.path}/>
                                }                                            
                            </div>
                            :
                            null
                            ) }                                          
                        </Carousel>
                        </div>
                        <div className="paging">
                            <div className="active">
                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3" cy="3" r="3" fill="white"/>
                                </svg>
                            </div>
                            <div className="etc">
                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                </svg>
                            </div>
                            <div className="etc">
                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                </svg>
                            </div>
                            <div className="etc">
                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                </svg>
                            </div>
                            <div className="etc">
                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                </svg>
                            </div>
                            <div className="etc">
                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3" cy="3" r="3" fill="white" fillOpacity="0.4"/>
                                </svg>
                            </div>
                        </div>
                                        
                <div className="content">
                <p className="main-title">{data.title}</p>
                                        <p className="desc">{data.content}</p>
                                        <p className="info">{moment(data.create_date).format('YYYY.M.DD')}<span>|</span>{data.category_name}</p>
                                      
           
                         <Social /> 

         
                      
                </div>
                
            </div>

            <div className="btn_close" onClick={()=>{onClose(false)}}>
                {close}
            </div>
            
            </div> */}
    </div>
    </Fade> 
    )
}
}

export default Post;