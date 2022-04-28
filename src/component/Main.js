import React, { useState, useEffect, useRef } from "react";
import leader from '../svg/leader.svg'
import man from '../svg/man.svg'
import glass from '../svg/glass.svg'
import calendar from '../svg/calendar.svg'
import gotgam from '../svg/imgimg.svg'
import link from '../svg/link.svg'
import {Insight,Square ,People, News} from '../svg/blog.icon'
import { Fade } from "react-reveal";
import moment from "moment";
import {IconGrid1, IconGrid2, IconGrid3,SignImg1,SignImg2,SignDescImg} from '../svg/main.icon'
import history from '../svg/history.svg';
import { Link } from "react-router-dom";
import $ from "jquery";
const Main =()=>{

    const [senseTitle, setSenseTitle] = useState(true);
    const [signTxt, setSignText] = useState(true);
    const [txtFade, setTxtFade] = useState(""); 
    const [txtFade2, setTxtFade2] = useState(""); 
    const [data, setData] = useState([]); 
    const prevScrollY = useRef(0);
    const [goingUp, setGoingUp] = useState(false);


    const changeTxt=(currentScrollY)=>{

        var screenValue = currentScrollY;

        if(screenValue >= 886 && goingUp === false) {       
            setTxtFade("fade-out-box")            
            let timeset =  setTimeout(fadeIn(1),1000);   
            clearTimeout(timeset)  
        }

        if(screenValue < 1200 && senseTitle === false ) {      
            
            if (screenValue < 1150) {
            } else {
                $("#anitxt1").fadeOut(500, function() {
                    setTxtFade("fade-out-box")
                    
                    setSenseTitle(true)
                    $("#anitxt1").fadeIn(500)
                })
            }
        }


        if(screenValue >= 3200 && goingUp === false) {       
            setTxtFade2("fade-out-box")            
            let timeset =  setTimeout(fadeIn(2),1000);   
            clearTimeout(timeset)  
        }

        if(screenValue < 3500 && signTxt === false ) {      
            
            if (screenValue < 3400) {
            } else {
                $("#anitxt2").fadeOut(500, function() {
                    setTxtFade2("fade-out-box")                    
                    setSignText(true)
                    $("#anitxt2").fadeIn(500)
                })
            }
        }
        console.log(goingUp, screenValue);
    }

    console.log(txtFade)
    
    const fadeIn=(num) => {
        if (num ===1) {
            setSenseTitle(false)
            setTxtFade("fade-in-box")            
        }

        if (num ===2) {
            setSignText(false)
            setTxtFade2("fade-in-box")            
        }
        
    }


    useEffect(()=> {
        fetch('https://apipospot.anypot.co.kr/front/pospotLogList')
        .then (res => {
            return res.json();
        })
        .then (data => {
            setData(data.data)
        })
        .catch((err)=>{
            console.log(err)
        });
    },[])

    useEffect(()=>{
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (prevScrollY.current < currentScrollY && goingUp) {
              setGoingUp(false);
            }
            if (prevScrollY.current > currentScrollY && !goingUp) {
              setGoingUp(true);
            }
      
            prevScrollY.current = currentScrollY;

            changeTxt(currentScrollY);
          };
      
          window.addEventListener("scroll", handleScroll, { passive: true });
      
          return () => window.removeEventListener("scroll", handleScroll);      
    },[goingUp])

    

    const Previews=({data})=>{

        const [preview]=data;
        if (preview.length === 0) {
            return
        } else {
        
        return (
            <div className="previewPost">
                 <div>
                                    <div className="previewPostImg" name="이름">
                                        <img onClick={(e)=>{
                                            console.log(e.target.name)
                                        }} src={`https://apipospot.anypot.co.kr/${preview[0].img_path1}`}></img>
                                    </div>
                        
                                <div className="previewPostInfo">
                                    <div className="previewPostContent">
                                        <h2 className="previewPostTitle">{preview[0].title}</h2>
                                    </div>
                                <div className="postInfo">
                                    <div className="previewPostDate">{moment(preview[0].modify_date).format("YYYY.M.DD")}</div>
                                    <div className="division">{` | `}</div>
                                    <div className="previewPostCategoryName">{preview[0].category_id}</div>
                                </div>
                                </div>
                        
                                <div className="previewPostCategory">
                                    {preview[0].category_id==="insight" ? 
                                        <Insight /> : 
                                        preview[0].category_id==="people" ?
                                        <People /> :
                                        preview[0].category_id==="news" ?
                                        <News /> :
                                        <Square />
                                    }
                                 </div>
                                </div>

                                <div>
                                    <div className="previewPostImg" name="이름">
                                        <img onClick={(e)=>{
                                            console.log(e.target.name)
                                        }} src={`https://apipospot.anypot.co.kr/${preview[1].img_path1}`}></img>
                                    </div>
                        
                                <div className="previewPostInfo">
                                    <div className="previewPostContent">
                                        <h2 className="previewPostTitle">{preview[1].title}</h2>
                                    </div>
                                <div className="postInfo">
                                    <div className="previewPostDate">{moment(preview[1].modify_date).format("YYYY.M.DD")}</div>
                                    <div className="division">{` | `}</div>
                                    <div className="previewPostCategoryName">{preview[1].category_id}</div>
                                </div>
                                </div>
                        
                                <div className="previewPostCategory">
                                    {preview[1].category_id==="insight" ? 
                                        <Insight /> : 
                                        preview[1].category_id==="people" ?
                                        <People /> :
                                        preview[1].category_id==="news" ?
                                        <News /> :
                                        <Square />
                                    }
                                 </div>
                                </div>

                                <div>
                                    <div className="previewPostImg" name="이름">
                                        <img onClick={(e)=>{
                                            console.log(e.target.name)
                                        }} src={`https://apipospot.anypot.co.kr/${preview[2].img_path1}`}></img>
                                    </div>
                        
                                <div className="previewPostInfo">
                                    <div className="previewPostContent">
                                        <h2 className="previewPostTitle">{preview[2].title}</h2>
                                    </div>
                                <div className="postInfo">
                                    <div className="previewPostDate">{moment(preview[2].modify_date).format("YYYY.M.DD")}</div>
                                    <div className="division">{` | `}</div>
                                    <div className="previewPostCategoryName">{preview[2].category_id}</div>
                                </div>
                                </div>
                        
                                <div className="previewPostCategory">
                                    {preview[2].category_id==="insight" ? 
                                        <Insight /> : 
                                        preview[2].category_id==="people" ?
                                        <People /> :
                                        preview[2].category_id==="news" ?
                                        <News /> :
                                        <Square />
                                    }
                                 </div>
                                </div>   
                            </div>
        )
                                }
    }
    
    return (
        <Fade bottom>
        <div className="mainWrapper">
            
            <div className="services">
            
                <div className="serviceInfo">
                    <div className="serviceThumbnail">
                        <div className="thumbnailImage"><IconGrid1 /></div>
                        <div className="thumbnailImage"><IconGrid2 /></div>
                        <div className="thumbnailImage"><IconGrid3 /></div>
                    </div>
                    
                    <h2 className="serviceTitle">그 때 그곳의 감성을 전하세요</h2>
                    <div className="serviceAbout">위치기반 SNS 플랫폼, 곳;감</div>
                    
                </div>
                {/* 스크롤시 텍스트 변경 */}
                <div className="serviceDescription">
                    <div className="serviceDescriptionWrapper">
                    
                        <p className={txtFade} id="anitxt1">
                            {senseTitle ? 
                            `추억의 장소를 어떻게 기억하시나요?
                            감성적인 경험은 그때 그곳을 특별하게 만듭니다.
                            그리고 추억은 우리를 앞으로 나아가게 만들죠.`
                            :
                            `포스팟은 장소의 추억을 저장하는 서비스를 만들기로 했습니다. 
                            곳;감은 블록체인 기술로 감성까지 전달하는
                            위치기반 감성 SNS 플랫폼입니다.`
                            }
                        </p>
                        
                        <img className="serviceDescriptionImg" src={gotgam}></img>
                    </div>
                </div>
            </div>
            <div className="services">
            <div className="serviceInfo">
                <div className="serviceThumbnail">
                    <div>
                    <SignImg1 />
                    </div>
                    <div>
                    <SignImg2 />
                    </div>
                </div>
                    <h2 className="serviceTitle">AI 기술로 언어의 장벽을 넘겠습니다.</h2>
                    <div className="serviceAbout">수어 실시간 통역 서비스</div>
                </div>

                <div className="serviceDescription" >
                    <div className="serviceDescriptionWrapper">
                        <p className={txtFade2} id="anitxt2">
                            {signTxt ?
                            `수어를 알고 계신가요?\n
                            \n수어는 30만명이 넘는 한국인이 사용하는 제2의 국어입니다.
                            하지만 수어를 인식하는 서비스는 찾아보기 힘들죠.`
                            :
                            `우리는 장애가 더이상 차별이 아닌 세상을 꿈꿉니다.
                            포스팟은 정확도 높은 인공지능 수어 인식 기술로 
                            수어 사용자에게 더 많은 세상을 경험하게 할 것 입니다.`
                            }
                        </p>
                        <div className="serviceDescriptionImg">
                            <SignDescImg />
                        </div>
                    </div>
                </div>

            </div>

            
            <div className="pospotHistory">
                <div className="pospotHistoryWrapper">
                    
                    <div className="pospotHistoryLeft">
                        <h2>포스팟의 기술로<br /> 넓은 세상을 꿈꿉니다.</h2>
                        <p>포스팟의 기술과 콘텐츠로<br />새로운 생태계를 개발하는 스타트업입니다.</p>
                    </div>
                    <div className="pospotHistoryRight">
                    <img src={history} />
                        {/* <div>
                        <h2>2018.09</h2>
                        <div></div>
                            <ul>
                                <li>포스팟 설립, 장애인기업 등록</li>
                            </ul>
                        </div>
                    
                        <div>
                        <h2>2018.11</h2>
                        <div></div>
                            <ul>
                                <li>포스팟 기업부설 연구소 인정</li>
                            </ul>
                        </div>

                        <div>
                        <h2>2019.04</h2>
                        <div></div>
                            <ul>
                                <li>국내외 지식재산권 출원지원사업선정<br />
                                장애인기업종합지원센터
                                </li>
                            </ul>
                        </div>
                        <div>
                        <h2>2019.09</h2>
                        <div></div>
                            <ul>
                                <li>중소벤처기업부 초기창업패키지 신사업분야<br />
                                '간편인증 솔루션'과제 선정
                                </li>
                            </ul>
                        </div>
                        <div>
                        <h2>2020.10</h2>
                        <div></div>
                            <ul>
                                <li>자체 통합인증 솔루션 OAuthumb GS인증 계약</li>
                            </ul>
                        </div>
                        <div>
                        <h2>2021.04</h2>
                        <div></div>
                            <ul>
                                <li>강소형 기술기업 프로젝트 융성지원 사업자 선정</li>
                            </ul>
                        </div>

                        <div>
                        <h2>2021.06</h2>
                        <div></div>
                            <ul>
                                <li>자본금 증자 5억원</li>
                            </ul>
                        </div>

                        <div>
                        <h2>2021.11</h2>
                        <div></div>
                            <ul>
                                <li>(주)포스팟 주관 경기청년투자경진대회 개최</li>
                            </ul>
                        </div>

                        <div>
                        <h2>2021.12</h2>
                            <ul>
                                <li>안양시 유망창업기업 선정</li>
                            </ul>
                        </div> */}

                    </div>
                </div>
            </div>
            <div className="pospotMotto">
                <div className="pospotMottoWrapper">
                    <h3 className="pospotMottoTitle">포스팟은 자유롭고 창의적인 문화를 위해<br />지속적인 혁신을 추구합니다.</h3>
                    <div>
                    <ul>
                        <li>
                            <p>포스팟에서는 누구나<br />리더가 될 수 있습니다.</p>
                            <div><img src={leader}></img></div>
                        </li>
                        <li>
                            <p>출근과 재택 <br />근무 방식이 유연합니다.</p>
                            <div><img src={man}></img></div>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <p>창의적 인재 육성을 위해<br />주 4일제를 시행합니다.</p>
                            <div><img src={calendar}></img></div>
                        </li>
                        <li>
                            <p>강요와 위계를 거부하며<br />공식적인 회식이 없습니다.</p>
                            <div><img src={glass}></img></div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className="pospotBlogPreview">
                <div className="pospotBlogPreviewWrapper">
                    <div>
                        <h3>포스팟 로그</h3>
                        <Link to="/pospot_log"><img src={link} /></Link>
                    </div>
                    <div>
                        <Previews data={[data]} /> 
                    </div>
                </div>
            </div>
            
        </div>
        </Fade>
    )
}

export default Main;