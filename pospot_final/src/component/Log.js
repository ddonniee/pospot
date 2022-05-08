/* eslint-disable */

import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import moment from 'moment';

// category
import { ReactComponent as News } from '../resources/svg/News.svg';
import { ReactComponent as People } from '../resources/svg/People.svg';
import { ReactComponent as Square } from '../resources/svg/Square.svg';
import { ReactComponent as Insight } from '../resources/svg/Insight.svg';

// link
import { ReactComponent as Share } from '../resources/svg/Btn_share.svg';
import { ReactComponent as Blog } from '../resources/svg/Btn_blog.svg';
import { ReactComponent as Facebook } from '../resources/svg/Btn_facebook.svg';
import { ReactComponent as Insta } from '../resources/svg/Btn_insta.svg';


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import {UrlShare, BlogShare, FaceBook,InstaLink} from '../resources/svg/blog.icon'

import * as config from '../config'

class Log extends Component
{
    state = {
        logData : [],
        popupShow : false,
        popData : {},
        popImages : [],
        cutUrl: '',
    };

    constructor(props) {
        super(props);
    }

    async logList() {
        try {
            //응답 성공
            const {data} = await axios.get(config.POSPOT_LOG);
            this.setState({logData : data.data, popupShow : false});

            console.log(this.state); // state에 포스팟로그 data 객체배열 담김
            
          } catch (error) {
            //응답 실패
            console.error(error);
          }
        
    }
    
    openPop(data) {
        const list = [];
        if( data.img_path1 && data.img_path1.length > 0 )
            list.push(data.img_path1);
        if( data.img_path2 && data.img_path2.length > 0 )
            list.push(data.img_path2);
        if( data.img_path3 && data.img_path3.length > 0 )
            list.push(data.img_path3);
        if( data.img_path4 && data.img_path4.length > 0 )
            list.push(data.img_path4);
        if( data.img_path5 && data.img_path5.length > 0 )
            list.push(data.img_path5);
        if( data.img_path6 && data.img_path6.length > 0 )
            list.push(data.img_path6);

        this.setState(preState => ({
            popupShow : true,
            popData : data,
            popImages: list
        }));


        // return(
            
        // )
            
    }

    

    componentDidMount() {
        this.logList();
        $(".pospotlog").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
        $(document).ready(function() {
            $(".pospotlog").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');


            // Top 메뉴 후버 기능 start 
            $('.pospotlog').hover(function(){
                $(".pospotlog").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
            }, function() {
                $(".pospotlog").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
            });
        })

  
        // 포스팟로그 글 상세보기 팝업
        $(".content-pic, .log .main-title, .log .desc").on('click', function(){ 
            show();
        });

        $(".header").attr('style', 'background-color : #FFFFFF;');
        
        $("#closeBtn").on('click',function(){ 
            close();
        });

        // 포스팟로그 링크버튼 말풍선
        $(".header, .container, .footer").on('click',function(e){
            if(!$(e.target).hasClass('linkIcon')){
                arrowClose(2);
            }
            if(!$(e.target).hasClass('copy')){
                arrowClose(3);
            }
        });

        $(".content-logo .linkIcon *").on('click',function(){ 
            arrowShow(2);
        });

        $(".arrow2:first-of-type .copy").on('click',function(){
            let link = $(".link").attr('href');
            copyToClipboard(link);
            arrowClose(2);
            arrowShow(3);
        });

        // 팝업 div 오픈/닫기 함수

        

        function show() {
            $(".background").addClass("show");
        }

        function close() {
            $(".background").removeClass("show");
        }

        // 말풍선 오픈/닫기 함수
        function arrowShow(num) {
            $(".arrow"+num+":first-of-type").addClass("show");
        }

        function arrowClose(num) {
            $(".arrow"+num).removeClass("show");
        }

        
        // 링크 복사 함수
        // function copyToClipboard(val) {
        //     console.log("")
        //     let t = document.createElement("textarea");
        //     t.value = val;
        //     t.select();
        //     document.execCommand('copy');
        //     document.body.removeChild(t);
        // }

        

    }
    
    render(){



        const getLogList = Object.entries(this.state.logData).map((entrie) => {
            return entrie[1];
        });

        function viewlink(numid, url) {
            //console.log(numid)
            $("#"+numid).attr("class","arrow2 show");
            // shortenUrl(url);
        }

        function viewlink2(numid) {
            //console.log(numid)
            $("#copytxt2"+numid).attr("class","arrow3 show");
        }

        // 블로그 상세보기 url 복사 22.05.02 by은정 //
        function viewlink3(url) {

            console.log(url)

            // url 값이 없을 경우? 
            if(url===null) {
                alert("url이 유효하지 않습니다.")
                return;
            }
            
            var i=i;
            var url = url;
            var textarea = document.createElement("textarea");
            document.body.appendChild(textarea);
            textarea.value = url;
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);

            $(".arrow4").addClass("show");
            
            // url 복사 완료시 해당 창 자동 종료 22.05.03 은정
            setTimeout(function() {
                $(".arrow4").removeClass("show");
            },1000)
        }
        // url 글자 46자 이상이면 ... 붙이기 22.05.08 은정

        // function shortenUrl(url){
        //     console.log(url,"checking params")
        //         let spell = '';
        //         for(let i=0; i<46; i++) {
        //             spell += url.charAt(i);
        //         }
        //         spell += '...'
        //         this.setState({
        //             cutUrl:spell,
        //         })
        // }

        console.log(this.state.popData, "popdata")

        return(
            <div className='Log'>
                <div className="top-div"></div>
                <div className="container">
                    <div className="title">
                        <p className="main-title">포스팟 로그</p>
                        <p className="desc">포스팟의 다양한<br/>스토리를 담은 공간</p>
                        <p className="side-title">POSPOT LOG</p>
                    </div>
                    <div className="log"> 
                        <div className="contents">
                            <ul className="content-list">
                            {
                                getLogList.map((data, index) =>{
                                    
                                    return ( 
                                        <li className="content-box" key={index}>
                                            <div className="content-pic" onClick={()=>this.openPop(data)}>{/* openPop(data.posting_id) */}
                                                <div className="pic"><img key={index} src={config.IMG_PATH+data.img_path1}/></div>
                                                {
                                                    {
                                                        news : <div className={index%2 ? `icon-ld`: `icon-rt`}><News/></div>,
                                                        insight : <div className={index%2 ? `icon-ld`: `icon-rt`}><Insight/></div>,
                                                        square : <div className={index%2 ? `icon-ld`: `icon-rt`}><Square/></div>,
                                                        people : <div className={index%2 ? `icon-ld`: `icon-rt`}><People/></div>
                                                    }[data.category_id]
                                                }
                                            </div>
                                            <div className="content-title">
                                                <p className="main-title">{data.title}</p>
                                                <p className="desc">{data.content}</p>
                                                <p className="info">{moment(data.create_date).format('YYYY.M.DD')}<span>|</span>{data.category_name}</p>
                                                <div className="content-logo">
                                                    {data.link !== null ?
                                                    
                                                    <div className='linkIcon' onClick={()=>viewlink("copytxt"+index,this.state.logData[index].link )} ><Share/></div>
                                                    : 
                                                    null }
                                                    {
                                                        data.blog_link === 1 && <a href={data.link} target={"_blank"}><Blog/></a>
                                                    }
                                                    {
                                                        data.facebook_link === 1 && <a href={data.facebook_link} target={"_blank"}><Facebook/></a>
                                                    }
                                                    {
                                                        data.instagram_link === 1 && <a href={data.instagram_link} target={"_blank"}><Insta/></a>
                                                    }
                                                    
                                                    <div className="arrow2" id={"copytxt"+index} style={{position:"absolute",zIndex:"1"}}>
                                                        <div className="window">
                                                            <div className="arrow-box2">
                                                                <p className="link">{this.state.logData[index].link}</p>
                                                                <p className="purple copy" onClick={()=>viewlink3(this.state.logData[index].link)}>복사</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="arrow3" id={"copytxt2"+index}>
                                                        <div className="window">
                                                            <div className="arrow-box3">
                                                                <p>콘텐츠 링크가 복사되었어요.<br/>원하는 곳에 붙여넣으세요.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        )
                                } )
                            }
                            </ul>
                        </div>
                    </div>
                    {/* <Popup flag={this.state.popupShow} data={this.state.popData} /> */}
                    {/* 팝업 */}
                    {
                        this.state.popupShow && this.state.popData != null &&  
                        <div className="background show">
                        <div className="window">
                            <div className="popup lPop">
                                <div className="logPop">
                                    <div className="pic">
                                        <div className="img">
                                        {/* <div>
                                                <img key='img_path1' src={`https://apipospot.anypot.co.kr/${this.state.popData.img_path1}`}/>
                                                <p className="legend">1</p>
                                            </div> */}
                                        <Carousel 
                                            showThumbs={false}
                                            showStatus={false}                                            
                                            autoPlay={true} 
                                            
                                            // renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
                                            //     hasPrev && (
                                            //         <div className="prevBtn" onClick={clickHandler}>
                                            //             <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            //             <g filter="url(#filter0_d_209_2185)">
                                            //             <path fillRule="evenodd" clipRule="evenodd" d="M18 30C25.732 30 32 23.732 32 16C32 8.26801 25.732 2 18 2C10.268 2 4 8.26801 4 16C4 23.732 10.268 30 18 30ZM15.9399 11.2824L16.6575 10.5859L18.0504 12.0211L17.3328 12.7176L14.4661 15.5H24H25V17.5H24H14.4661L17.3328 20.2824L18.0504 20.9789L16.6575 22.4141L15.9399 21.7176L11.3035 17.2176L10.5642 16.5L11.3035 15.7824L15.9399 11.2824Z" fill="white" fillOpacity="0.5" shapeRendering="crispEdges"/>
                                            //             </g>
                                            //             <defs>
                                            //             <filter id="filter0_d_209_2185" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            //             <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            //             <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            //             <feOffset dy="2"/>
                                            //             <feGaussianBlur stdDeviation="2"/> 
                                            //             <feComposite in2="hardAlpha" operator="out"/>
                                            //             <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                                            //             <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_209_2185"/>
                                            //             <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_209_2185" result="shape"/>
                                            //             </filter>
                                            //             </defs>
                                            //             </svg>
                                            //         </div>
                                            //         // <button onClick={clickHandler}>
                                            //         //     <img 
                                            //         //         style={{ height: "30px", width: "30px" }}
                                            //         //         src={`../resources/svg/btn_prev.svg`} />
                                            //         // </button>
                                            //     )
                                            // }
                                            // renderArrowNext={(clickHandler, hasNext, labelNext) =>
                                            //     hasNext && (
                                            //         <div className="nextBtn" onClick={clickHandler}>
                                            //         <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            //             <g filter="url(#filter0_d_209_2189)">
                                            //             <path fillRule="evenodd" clipRule="evenodd" d="M18 30C10.268 30 4 23.732 4 16C4 8.26801 10.268 2 18 2C25.732 2 32 8.26801 32 16C32 23.732 25.732 30 18 30ZM20.0601 11.2824L19.3425 10.5859L17.9496 12.0211L18.6672 12.7176L21.5339 15.5H12H11V17.5H12H21.5339L18.6672 20.2824L17.9496 20.9789L19.3425 22.4141L20.0601 21.7176L24.6965 17.2176L25.4358 16.5L24.6965 15.7824L20.0601 11.2824Z" fill="white" fillOpacity="0.5" shapeRendering="crispEdges"/>
                                            //             </g>
                                            //             <defs>
                                            //             <filter id="filter0_d_209_2189" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                            //             <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                            //             <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                            //             <feOffset dy="2"/>
                                            //             <feGaussianBlur stdDeviation="2"/>
                                            //             <feComposite in2="hardAlpha" operator="out"/>
                                            //             <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                                            //             <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_209_2189"/>
                                            //             <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_209_2189" result="shape"/>
                                            //             </filter>
                                            //             </defs>
                                            //             </svg>
                                            //         </div>
                                            //         // <button onClick={clickHandler}>
                                            //         //     <img
                                            //         //         style={{ height: "30px", width: "30px"}}
                                            //         //         src={`../resources/svg/btn_prev.svg`} />
                                            //         // </button>
                                            //     )
                                            // }
                                            
                                            
                                        >
                                            { this.state.popImages && this.state.popImages.map( img => 
                                            <div>
                                                <img key='img_path1' src={config.IMG_PATH+img}/>                                                
                                            </div>) }                                          
                                            
                                        </Carousel>
                                            
                                        </div>
                                        {/* <div className="slideBtn">
                                            <div className="prevBtn">
                                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g filter="url(#filter0_d_209_2185)">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M18 30C25.732 30 32 23.732 32 16C32 8.26801 25.732 2 18 2C10.268 2 4 8.26801 4 16C4 23.732 10.268 30 18 30ZM15.9399 11.2824L16.6575 10.5859L18.0504 12.0211L17.3328 12.7176L14.4661 15.5H24H25V17.5H24H14.4661L17.3328 20.2824L18.0504 20.9789L16.6575 22.4141L15.9399 21.7176L11.3035 17.2176L10.5642 16.5L11.3035 15.7824L15.9399 11.2824Z" fill="white" fillOpacity="0.5" shapeRendering="crispEdges"/>
                                                    </g>
                                                    <defs>
                                                    <filter id="filter0_d_209_2185" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset dy="2"/>
                                                    <feGaussianBlur stdDeviation="2"/> 
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_209_2185"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_209_2185" result="shape"/>
                                                    </filter>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <div className="nextBtn">
                                                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g filter="url(#filter0_d_209_2189)">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M18 30C10.268 30 4 23.732 4 16C4 8.26801 10.268 2 18 2C25.732 2 32 8.26801 32 16C32 23.732 25.732 30 18 30ZM20.0601 11.2824L19.3425 10.5859L17.9496 12.0211L18.6672 12.7176L21.5339 15.5H12H11V17.5H12H21.5339L18.6672 20.2824L17.9496 20.9789L19.3425 22.4141L20.0601 21.7176L24.6965 17.2176L25.4358 16.5L24.6965 15.7824L20.0601 11.2824Z" fill="white" fillOpacity="0.5" shapeRendering="crispEdges"/>
                                                    </g>
                                                    <defs>
                                                    <filter id="filter0_d_209_2189" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset dy="2"/>
                                                    <feGaussianBlur stdDeviation="2"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_209_2189"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_209_2189" result="shape"/>
                                                    </filter>
                                                    </defs>
                                                </svg>
                                            </div>
                                        </div> */}
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
                                        <p className="main-title">{this.state.popData.title}</p>
                                        <p className="desc">{this.state.popData.content}</p>
                                        <p className="info">{moment(this.state.popData.create_date).format('YYYY.M.DD')}<span>|</span>{this.state.popData.category_name}</p>
                                        {/* <div className="content-logo">
                                            <a href="#">
                                                <svg className="linkIcon" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="20" cy="20" r="19.5" stroke="#444444"/>
                                                    <path d="M22.0356 16.4923V15.0668C22.0356 14.2689 23.0332 13.8654 23.6151 14.4303L27.8548 18.5453C28.2151 18.895 28.2151 19.4598 27.8548 19.8095L23.6151 23.9246C23.0332 24.4894 22.0356 24.0949 22.0356 23.297V21.7818C17.4171 21.7818 14.1842 23.2163 11.875 26.3542C12.7987 21.8715 15.5698 17.3888 22.0356 16.4923Z" fill="#444444"/>
                                                </svg>
                                            </a>
                                            <a href="#">
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="20" cy="20" r="19.5" stroke="#444444"/>
                                                    <path d="M21.1026 17.0518C20.1155 17.1253 19.1884 17.5613 18.4949 18.2783V13.3333H15.417V26.3256H18.5058V25.3211C18.7854 25.7518 19.1699 26.1018 19.622 26.3372C20.0742 26.5725 20.5786 26.6852 21.0862 26.6642C21.0862 26.6642 25.4161 26.4977 25.4161 21.8136C25.4325 21.8136 25.2739 17.0518 21.1026 17.0518ZM20.4302 23.9059C20.0399 23.9059 19.6583 23.7884 19.3337 23.5682C19.0092 23.3481 18.7562 23.0352 18.6069 22.6691C18.4575 22.303 18.4184 21.9001 18.4945 21.5115C18.5707 21.1229 18.7587 20.7659 19.0347 20.4857C19.3107 20.2055 19.6623 20.0147 20.0452 19.9373C20.428 19.86 20.8248 19.8997 21.1855 20.0514C21.5461 20.203 21.8543 20.4598 22.0712 20.7893C22.288 21.1187 22.4038 21.5061 22.4038 21.9024C22.4052 22.1664 22.3552 22.4281 22.2567 22.6725C22.1582 22.9168 22.013 23.139 21.8296 23.3262C21.6462 23.5135 21.4282 23.662 21.188 23.7634C20.9478 23.8648 20.6903 23.917 20.4302 23.917V23.9059Z" fill="#444444"/>
                                                </svg>
                                            </a>
                                            <a href="#">
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="20" cy="20" r="19.5" stroke="#444444"/>
                                                    <g clipPath="url(#clip0_353_491)">
                                                    <path d="M19.9997 13.85C22.1108 13.85 22.3615 13.85 23.1993 13.8937C23.7015 13.8998 24.1989 13.9865 24.6705 14.15C25.0142 14.2712 25.3252 14.4634 25.5809 14.7125C25.844 14.9535 26.0449 15.2486 26.1681 15.575C26.3438 16.0212 26.4375 16.4926 26.4452 16.9688C26.4847 17.7625 26.4913 18 26.4913 20C26.4913 22 26.4913 22.2375 26.4452 23.0312C26.4375 23.5074 26.3438 23.9788 26.1681 24.425C26.0394 24.7488 25.8392 25.0429 25.581 25.2876C25.3227 25.5322 25.0123 25.7218 24.6705 25.8438C24.1995 26.0102 23.7019 26.099 23.1993 26.1063C22.3615 26.1438 22.1108 26.15 19.9997 26.15C17.8886 26.15 17.6379 26.15 16.8 26.1063C16.2974 26.099 15.7998 26.0102 15.3288 25.8438C14.9843 25.7271 14.6728 25.5367 14.4184 25.2875C14.1555 25.0453 13.9527 24.7506 13.8247 24.425C13.6521 23.9782 13.5606 23.507 13.5542 23.0312C13.5146 22.2375 13.508 22 13.508 20C13.508 18 13.508 17.7625 13.5542 16.9688C13.5606 16.493 13.6521 16.0218 13.8247 15.575C13.9573 15.2516 14.1595 14.9579 14.4185 14.7126C14.6774 14.4672 14.9875 14.2756 15.3288 14.15C15.8004 13.9865 16.2979 13.8998 16.8 13.8937C17.6379 13.8563 17.8886 13.85 19.9997 13.85ZM19.9997 12.5C17.849 12.5 17.5785 12.5 16.734 12.5438C16.0777 12.5557 15.4284 12.6741 14.8143 12.8938C14.2869 13.0842 13.808 13.3781 13.4089 13.7561C13.0099 14.1342 12.6996 14.5879 12.4986 15.0875C12.2667 15.6693 12.1418 16.2845 12.1292 16.9062C12.0896 17.7063 12.083 17.9625 12.083 20C12.083 22.0375 12.083 22.2937 12.1292 23.125C12.1424 23.7467 12.2674 24.3618 12.4986 24.9438C12.6996 25.4434 13.0099 25.8971 13.4089 26.2751C13.808 26.6532 14.2869 26.9471 14.8143 27.1375C15.4284 27.3572 16.0777 27.4756 16.734 27.4875C17.5785 27.525 17.849 27.5312 19.9997 27.5312C22.1504 27.5312 22.4209 27.5312 23.2983 27.4875C23.9546 27.475 24.6038 27.3566 25.2181 27.1375C25.7454 26.9471 26.2243 26.6532 26.6234 26.2751C27.0225 25.8971 27.3327 25.4434 27.5337 24.9438C27.7575 24.3437 27.8691 23.7113 27.8636 23.075C27.9031 22.275 27.9097 22.0188 27.9097 19.95C27.9097 17.8812 27.9097 17.6562 27.8636 16.8563C27.851 16.2345 27.726 15.6193 27.4941 15.0375C27.2931 14.5379 26.9829 14.0842 26.5838 13.7061C26.1848 13.3281 25.7059 13.0342 25.1785 12.8438C24.5569 12.6403 23.9032 12.5388 23.2455 12.5438C22.4011 12.5063 22.1306 12.5 19.9469 12.5H19.9997Z" fill="#444444"/>
                                                    <path d="M19.9994 16.15C19.1957 16.15 18.41 16.3758 17.7417 16.7989C17.0734 17.2219 16.5525 17.8232 16.2449 18.5267C15.9373 19.2302 15.8568 20.0043 16.0136 20.7511C16.1704 21.4979 16.5575 22.184 17.1258 22.7224C17.6942 23.2608 18.4183 23.6275 19.2066 23.776C19.9949 23.9246 20.812 23.8484 21.5546 23.557C22.2972 23.2656 22.9319 22.7721 23.3784 22.139C23.825 21.5058 24.0633 20.7615 24.0633 20C24.0633 18.9789 23.6352 17.9997 22.873 17.2777C22.1109 16.5556 21.0772 16.15 19.9994 16.15ZM19.9994 22.5C19.4775 22.5 18.9673 22.3534 18.5334 22.0787C18.0994 21.804 17.7612 21.4135 17.5614 20.9567C17.3617 20.4999 17.3094 19.9973 17.4113 19.5123C17.5131 19.0273 17.7644 18.5819 18.1335 18.2323C18.5025 17.8826 18.9727 17.6445 19.4846 17.5481C19.9965 17.4516 20.5271 17.5011 21.0093 17.6903C21.4915 17.8795 21.9036 18.2 22.1936 18.6111C22.4836 19.0222 22.6383 19.5056 22.6383 20C22.6383 20.6631 22.3603 21.2989 21.8654 21.7678C21.3705 22.2366 20.6993 22.5 19.9994 22.5Z" fill="#444444"/>
                                                    <path d="M24.2283 16.8938C24.753 16.8938 25.1783 16.4908 25.1783 15.9938C25.1783 15.4967 24.753 15.0938 24.2283 15.0938C23.7036 15.0938 23.2783 15.4967 23.2783 15.9938C23.2783 16.4908 23.7036 16.8938 24.2283 16.8938Z" fill="#444444"/>
                                                    </g>
                                                    <defs>
                                                    <clipPath id="clip0_353_491">
                                                    <rect width="15.8333" height="15" fill="white" transform="translate(12.083 12.5)"/>
                                                    </clipPath>
                                                    </defs>
                                                </svg>
                                            </a>
                                        </div> */}

                                    {/* 블로그 상세보기 링크 복사 22.05.03 은정 */}
                                    <ul className="linkToSocial">
                                        {this.state.popData.link !== null ?
                                        <li className="LinksocialList" value="1"   onClick={()=>viewlink3(this.state.popData.link)}><UrlShare /></li>
                                        :
                                        null }
                                        {this.state.popData.blog_link === 0 ?
                                        null :
                                        <a href={this.state.popData.blog_link} target="_blank"><li className="LinksocialList"><BlogShare /></li></a>
                                        }
                                        {this.state.popData.facebook_link === 0 ?
                                        null :
                                        <a href={this.state.popData.facebook_link} target="_blank"><li className="LinksocialList"><FaceBook /></li></a>
                                        }
                                        {this.state.popData.instagram_link === 0 ?
                                        null :
                                        <a href={this.state.popData.instagram_link} target="_blank"><li className="LinksocialList"><InstaLink/></li></a>
                                        }
                                    
                                    {/* <PopShare url={address} classtxt={schedule.id}  /> */}
                                    
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
                                    <button id="closeBtn" className="closeBtn" onClick={()=>this.setState({popupShow : false, popData : null})}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 4L20.0708 20.0708" stroke="white" strokeWidth="2.5"/>
                                            <path d="M20 4L3.92921 20.0708" stroke="white" strokeWidth="2.5"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    
                </div>               
            </div>
        )
    }
}

export default Log;