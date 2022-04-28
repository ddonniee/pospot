import React from "react";
import { Fade } from "react-reveal";
import {Clap,InfoIcon,RocketIcon,BagIncon,ComputerIcon,AiIcon,ShareLinkIcon} from "../svg/with.icon";
import map from '../svg/map_img.svg'

const Coalition =()=>{


    return (
        <Fade bottom>
        <div className="withWrapper">

            <div className="pageInfo">
                <div className="pageInfoTitle">제휴 및 문의</div>
                <div className="pageInfoDetail">포스팟과 함께할 파트너를<br />모십니다.</div>
                <div className="pageInfoDeco">CONTACT</div>
            </div>
            <div className="withInfo">
                <div className="withImg">
                    <Clap />
                </div>
                <div className="withDetail">
                    <h2 className="withDetailTitle">투자/제휴 대상을 찾고 계신가요?</h2>
                    <ul className="withDetailList">
                        <li className="ourService">
                            <div className="ourServiceIcon">{<RocketIcon />}</div>
                            <div className="ourServiceTitle">투자문의</div>
                            <div className="ourServiceDescription">블록체인 기술을 활용한 위치기반 SNS 플랫폼과 AI 수어 번역 시스템을 개발중인 포스팟에 투자하세요.</div>
                            <a href="mailto:solbysem@pospot.kr"><div className="linkIcon">{<ShareLinkIcon />}</div></a>
                        </li>

                        <li className="ourService">
                            <div className="ourServiceIcon">{<BagIncon />}</div>
                            <div className="ourServiceTitle">비즈니스 제휴</div>
                            <div className="ourServiceDescription">LBS 플랫폼 서비스/컨텐츠 사업을 제휴하실 파트너사, 솔루션 개발이 필요하신 고객사를 기다리고 있습니다.</div>
                            <a href="mailto:shark78@pospot.kr"><div className="linkIcon">{<ShareLinkIcon />}</div></a>
                        </li>

                        <li className="ourService">
                            <div className="ourServiceIcon">{<ComputerIcon />}</div>
                            <div className="ourServiceTitle">기술문의</div>
                            <div className="ourServiceDescription">지도 서비스, 블록체인, 사용자 인증 솔루션  NFT 마켓 플레이스 관련 문의를 원하시면 언제든지 연락주세요.</div>
                            <a href="mailto:ckbird@pospot.kr"><div className="linkIcon">{<ShareLinkIcon />}</div></a>
                        </li>

                        <li className="ourService">
                            <div className="ourServiceIcon">{<AiIcon />}</div>
                            <div className="ourServiceTitle">기업부설 연구소</div>
                            <div className="ourServiceDescription">포스팟의 인공지능 수어 번역 시스템은 적은 데이터로도 높은 인식률을 자랑합니다. 지금 확인해보세요.</div>
                            <a href="mailto:shcbae@pospot.kr"><div className="linkIcon">{<ShareLinkIcon />}</div></a>
                        </li>

                    </ul>
                </div>
            </div>

            <div className="coming_wrapper">
            <div className="coming_inner">
                <h3 className="coming_title">포스팟 오시는 길</h3>
                <div className="coming_info">
                    <div className="coming_border">
                        <div className="coming_map">
                            <img src={map} alt="map" />
                        </div>
                        <div className="coming_txt">
                            <div className="coming_detail">
                                <h5 className="coming_txt_title">주소</h5>
                                <div className="coming_txt_description">경기도 안양시 동안구 엘에스로 116번길 118 508호 (안양2차 SKV1 센터, 호계동)</div>
                            </div>
    
                            <div className="coming_detail">
                                <h5 className="coming_txt_title">연락처</h5>
                                <div className="coming_txt_description">Tel: 031-5175-1108 | Fax: 070-4015-3985</div>
                            </div>
    
                            <div className="find_way">
                                <a href="https://map.kakao.com/?q=%ED%8F%AC%EC%8A%A4%ED%8C%9F" target="_blank">길찾기</a>
                            </div>
                        </div>
                    </div>
                </div>
                
        </div>

    </div>
   
        </div>
        </Fade>
    )
}

export default Coalition;