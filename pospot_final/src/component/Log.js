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
        screenSize: {
            width:window.innerWidth,
            height:window.innerHeight
        }
        
    };

  
    async logList() {
        try {
            
            //응답 성공
            const {data} = await axios.get(config.POSPOT_LOG);
            console.log(data.data,"data")
            data.data.map((key,index)=>{
                key.width = data.width[0].imgWidth
            })
            this.setState({logData : data.data, popupShow : false});
            console.log(this.state,"state"); // state에 포스팟로그 data 객체배열 담김
            
          } catch (error) {
            //응답 실패
            console.error(error);
          }
        
    }
 

    openPop(data) {
        //console.table(data)
        this.setState({
            screenSize:{
                width:window.innerWidth,
                height:window.innerHeight,
            }
        })
        const list = [];
        if( data.img_path1 && data.img_path1.length > 0 ) {
            var img_info1 = {path : data.img_path1, width:data.width};
            list.push(img_info1);
        } 
            // list.push(data.img_path1);
        if( data.img_path2 && data.img_path2.length > 0 ) {
            var img_info2 = {path : data.img_path2, width:data.width};
            list.push(img_info2);
        } else {
                var img_info2 = {path : "", width:""};
        }
        if( data.img_path3 && data.img_path3.length > 0 ) {
            var img_info3 = {path : data.img_path3, width:data.width};
            list.push(img_info3);
        }else {
            var img_info3 = {path : "", width:""};
        }
        if( data.img_path4 && data.img_path4.length > 0 ) {
            var img_info4 = {path : data.img_path4, width:data.width};
            list.push(img_info4);
        }else {
            var img_info4 = {path : "", width:""};
        }
        if( data.img_path5 && data.img_path5.length > 0 ) {
            var img_info5 = {path : data.img_path5, width:data.width};
            list.push(img_info5);
        }else {
            var img_info5 = {path : "", width:""};
        }
        if( data.img_path6 && data.img_path6.length > 0 ) {
            var img_info6 = {path : data.img_path6, width:data.width};
            list.push(img_info6);
        }else {
            var img_info6 = {path : "", width:""};
        }
       
           
        this.setState(preState => ({
            popupShow : true,
            popData : data,
            popImages: list
        }));
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

        //페이지 이동시 자동 메뉴바 꺼짐 대웅

        $(document).ready(function() {
            if($(".menu").hasClass("active")) {
                $(".menu").removeClass("active");
                $("#close").css("display","none");
                $("#hamburger").css("display","block");
            }
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

          // 말풍선 오픈/닫기 함수
        function arrowShow(num) {
            $(".arrow"+num+":first-of-type").addClass("show");
        }

        function arrowClose(num) {
            $(".arrow"+num).removeClass("show");
        }

  // 해상도에 구하여 썸네일 사이즈 조정 22.05.10 2은정
  window.addEventListener("resize", function() {
    let curWidth = window.innerWidth;
    let curHeight = window.innerHeight;

    if(curWidth !== this.state.screenSize.width || curHeight !== this.state.screenSize.height) {
        this.setState({
            screenSize:{
                width: curWidth,
                height: curHeight,
            }
        })
    }
})
    }
    
    render(){


        const getLogList = Object.entries(this.state.logData).map((entrie) => {
            return entrie[1];
        });

        function viewlink(numid, link) {
            $("#copytxt"+numid).attr("class","arrow2 show");
            $("#link-copytxt2"+numid).text(checkMaxString(link));
        }

      // 포스팟로그 링크 말풍선 글자수 제한 1은정
      function checkMaxString(obj) {
        var str_len = obj.length;
        var byte = 0;
        var len = 0;
        var one_char = "";
        var str2 = "";
        for( var j=0; j<str_len; j++) { 
            one_char = obj.charAt(j); 
            if(escape(one_char).length > 4) { 
                byte += 2; 
            } else { 
                byte++; 
            }
            if(byte <= 30) { 
                len = j+1; 
            } 
        } 
        if(byte > 30) { 
            str2 = obj.substr(0, len)+"..."; 
        } else { 
            str2 = obj; 
        } 

        return str2;
    }

    // 링크 복사 1은정
    function viewlink2(numid, link) {
        $("#"+numid).attr("class","arrow3 show");
        copyToClipboard("#link-"+numid, link);
    }
      

        function copyToClipboard(node, val) {
            let t = document.createElement("textarea");
            $(node).append(t);
            t.value = val;
            t.focus(); // 사파리 브라우저 서포팅
            t.select();
            document.execCommand("copy");
            t.remove();
        }
           // 블로그 상세보기 url 복사 22.05.02 by은정
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
            },2000)
        }
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
                                                            {/* <p className="link" id={"link-copytxt2"+index}>{this.state.logData[index].link}</p>
                                                                <p className="purple copy" onClick={()=>viewlink2("copytxt2"+index)}>복사</p> */}

                                                                <p className="link" id={"link-copytxt2"+index}></p>
                                                                {/* {this.state.logData[index].link} {this.state.cutLink}*/}
                                                                <p className="purple copy" onClick={()=>viewlink2("copytxt2"+index, this.state.logData[index].link)}>복사</p>
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
                        <div className="background show" onClick={()=>this.setState({popupShow : false, popData : null})}>
                        <div className="window">
                        <div className="popup lPop" onClick={(e)=>e.stopPropagation()}>

                                {/* 모바일 */}
                                <div className="moHeader">
                                    <p className='mTitle'>포스팟 로그</p>
                                    <svg onClick={()=>this.setState({popupShow : false, popData : null})}
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 4L20.0708 20.0708" stroke="#222222" stroke-width="2.5"/>
                                        <path d="M20 4L3.92921 20.0708" stroke="#222222" stroke-width="2.5"/>
                                    </svg>
                                </div>

                                <div className="logPop">
                                    <div className="pic">
                                        <div className="img">
                                        <Carousel 
                                            showThumbs={false}
                                            showStatus={false}                                            
                                            autoPlay={true} 
                                            
                                            // pixel에 따라서 여백주기
                                        >
                                            { this.state.popImages && this.state.popImages.map((img,index) => 
                                            img.path !== ''
                                            ?
                                            <div>
                                                {img.width < 1920 
                                                ?
                                                <img key={`img_path`+index} src={config.IMG_PATH+img.path} style={{
                                                    padding:`this.state.screenSize.width-16px`
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
                                        <p className="main-title">{this.state.popData.title}</p>
                                        <p className="desc">{this.state.popData.content}</p>
                                        <p className="info">{moment(this.state.popData.create_date).format('YYYY.M.DD')}<span>|</span>{this.state.popData.category_name}</p>
                                      

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