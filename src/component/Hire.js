import React from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-reveal";
import hire from '../svg/hire.svg'
import Want from "./Want";
import NoRoom from "./NoRoom";
import {FourDay,Lunch, Money,Smile, Snack, Edu, Desk, Drink } from '../svg/hire.icon.js';

const Hire =()=>{

    return (
        <Fade bottom>
        <div className="recruit_wrapper">
            
        <div className="pageInfo">
                <div className="pageInfoTitle">채용공고</div>
                <div className="pageInfoDetail">포스팟에서 소중한 분을<br />모십니다.</div>
                <div className="pageInfoDeco">RECRUIT</div>
            </div>
        <div className="recruit_detail">
            <img className="recruit_requisite" src={hire} alt="hire_main_img"/>
                
            <div className="recruit_welfare">
                <div className="recruit_welfare_inner">
                    <h2 className="recruit_welfare_title">이런 혜택이 있어요</h2>
                <ul className="recruit_welfare_list">
                    <li className="welfare_detail">
                        <div className="welfare_detail_icon">{<FourDay />}</div>
                        <div className="welfare_detail_title">주 4일 근무</div>
                        <div className="welfare_detail_sum">월요일부터 목요일까지~</div>
                        <div className="welfare_detail_description">주 4일 근무 전력 시행!<br />더 이상 설명은 생략합니다.</div>
                    </li>

                    <li className="welfare_detail">
                        <div className="welfare_detail_icon">{<Lunch />}</div>
                        <div className="welfare_detail_title">중식 무료 제공</div>
                        <div className="welfare_detail_sum">회사 근처가 다 우리 구내식당~</div>
                        <div className="welfare_detail_description">회사 인근 4개 식당에서<br />점심 식사 무료제공</div>
                    </li>
                    
                    <li className="welfare_detail">
                        <div className="welfare_detail_icon">{<Money />}</div>
                        <div className="welfare_detail_title">장기 근속 수당 제공</div>
                        <div className="welfare_detail_sum">같이 성장해요~</div>
                        <div className="welfare_detail_description">3년 근속 시 500만원 지급<br />5년 근속 시 700만원 지급</div>
                    </li>

                    <li className="welfare_detail">
                        <div className="welfare_detail_icon">{<Snack />}</div>
                        <div className="welfare_detail_title">편의점급 다과 지원</div>
                        <div className="welfare_detail_sum">각종 음료 밑 다과 행사 구비~</div>
                        <div className="welfare_detail_description">업무에 몰입할 수 있도록<br />편의점처럼 다양한 먹거리 제공</div>
                    </li>
                </ul>
                  

                <ul className="recruit_welfare_list">

                <li className="welfare_detail">
                <div className="welfare_detail_icon">{<Edu />}</div>
                        <div className="welfare_detail_title">자기계발 비용 지원</div>
                        <div className="welfare_detail_sum">하고 싶은 공부 마음대로~</div>
                        <div className="welfare_detail_description">직원들의 자기계발을 위해!<br />도서 및 강의 수강 비용 지원</div>
</li>
                        <li className="welfare_detail">
                        <div className="welfare_detail_icon">{<Smile />}</div>
                        <div className="welfare_detail_title">경조 휴가 제도</div>
                        <div className="welfare_detail_sum">회사와 함께하는 인생설계~</div>
                        <div className="welfare_detail_description">결혼휴가 7일<br />출산휴가 90일, 육아휴직 1년</div>
                    </li>
                    
                    <li className="welfare_detail">
                        <div className="welfare_detail_icon">{<Desk />}</div>
                        <div className="welfare_detail_title">유연한 출퇴근제</div>
                        <div className="welfare_detail_sum">직원의 상황에 맞춰 유연하게~</div>
                        <div className="welfare_detail_description">비대면 시대, 출근, 재택근무<br />선택의 폭을 넓혀 드립니다. </div>
                    </li>

                    <li className="welfare_detail">
                        <div className="welfare_detail_icon">{<Drink />}</div>
                        <div className="welfare_detail_title">강요없는 회식문화</div>
                        <div className="welfare_detail_sum">원할때는 다 사줌~</div>
                        <div className="welfare_detail_description">공식적인 회식이 없습니다.<br />단 원하면 언제든, 사줍니다.</div>
                    </li>
                </ul>

             
                </div>
            </div>        
            
            {/* <Want /> */}
            <NoRoom />
        </div>
        
    </div>
    </Fade>
    )
}

export default Hire;