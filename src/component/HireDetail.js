import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import paper from '../svg/paper.svg'
import first from '../svg/first.svg'
import second from '../svg/second.svg'
import welcome from '../svg/welcome.svg'
import Want from "./Want";
import ppt from '../svg/ppt.svg'
import upload from '../svg/upload.svg'
import { Fade } from "react-reveal";
const HireDetail=()=>{

    
    const [onApply, setOnApply] = useState(false);
    const openApply=()=>{
        setOnApply(true);
    }
    const [wantDetail, setWantDetail]=useState([]);

    useEffect(()=>{
        fetch('https://apipospot.anypot.co.kr/front/recruitDetail/recruit_id')
        .then (res=> {
            return res.json();
        })
        .then (data => {
            setWantDetail(data.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    },[])

    console.log(wantDetail)

    return (
<Fade bottom>
        <div className="job_detail_wrapper">
        
        <div className="job_detail_top">
                <label className="back_btn_wrapper" htmlFor="btn_back_detail">
                <input type="button" className="job_detail_before"/>
                {/* <input type="button" className="job_detail_before" onClick="location.href='hire.html'" /> */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="btn_back_detail">
                    <path d="M10 4L2 12L10 20" stroke="#222222" strokeWidth="2.5"/>
                    <path d="M2 12H24" stroke="#222222" strokeWidth="2.5"/>
                </svg>
                </label>                
                
            
            <div className="job_detail_page">채용공고</div>
        </div>

        <div>
        <div className="job_detail_content">

            
            <h2 className="job_detail_title">Web, APP 기획자</h2>

            <div className="detail_list_wrapper">

            <div className="job_detail_role">
                <div className="role_title">담당업무</div>
                <ul className="role_list">
                    <li className="role">인공 지능을 기반으로 언어장애자들을 위한 수어 번역 시스템을 기획하고 필요한 데이터를 수집, 분류하여 추가적인 서비스를 기획합니다. </li>
                    <li className="role">포스팟의 모든 서비스를 기획하고 운영하기 위해 리서치, 기능정의, 스토리보드 작성, 사용자 테스트를 진행합니다. </li>
                </ul>
            </div>


            <div className="job_detail_need">
                <div className="need_title">자격요건</div>
                <ul className="need_list">
                    <li className="need">학력 제한 없음 </li>
                    <li className="need">IT,/모바일 제품의 서비스 기획 최소 5년 이상의 경력 (혹은 이에 준하는 실력이 있으신 분)</li>
                    <li className="need">데이터 기반의 인사이트 도출과 고객 이해가 가능하고 커뮤니케이션이 능통한 분</li>
                    <li className="need">신규 서비스를 출시하고 운영한 경험이 있거나 서비스를 성장시킨 경험이 있는 분</li>
                    <li className="need">기본적인 UI/UX에 대한 이해가 있으며, 고객 중심의 유저플로우 및 화면 설계를 작성하실 수 있는 분</li>
                </ul>
            </div>

            <div className="job_detail_advantage">
                <div className="advantage_title">우대사항</div>
                <ul className="advantage_list">
                    <li className="advantage">위치기반 플랫폼과 모바일 서비스에 대한 이해도가 높은 분</li>
                    <li className="advantage">서비스 기획/제작 및 출시까지 프로젝트를 주도적으로 진행한 경험이 있는 분</li>
                    <li className="advantage">평소 새로운 정보에 민감하거나 관찰력이 뛰어나신 분</li>
                    <li className="advantage">스스로 목표와 전략을 설정하고 실행할 수 있는 분</li>
                    </ul>
            </div>
         

            <div className="job_detail_step">
                <div className="step_title">전형절차</div>
                <ul className="step_list">
                    <li className="step">
                        <div className="step_icon">
                            <img src={paper}/>
                            <p>서류접수</p>
                        </div>
                    </li>
                    <li className="step">
                        <div className="step_icon">
                        <img src={first}/>
                            <p>실무면접</p>
                            </div>
                    </li>
                    <li className="step">
                        <div className="step_icon">
                        <img src={second}/>
                            <p>최종면접</p>
                        </div>
                    </li>
                    <li className="step">
                        <div className="step_icon">
                        <img src={welcome}/>
                            <p>입사</p>                  
                        </div>
                    </li>
                </ul>
            </div>

            <div className="job_detail_working">
                <div className="working_title">근무조건</div>
                <ul className="working_list">
                    <li className="working">정규직 (수습 3개월)</li>
                    <li className="working">주 4일제 (월~목요일), 근무시간 9:30~18:30 (점심시간 1시간)</li>
                    <li className="working">점심식사 제공 (한식 및 중식 지정 식당 4곳)</li>
                    <li className="working">근무지역 : 경기도 안양시 동안구</li>
                </ul>
            </div>

            <div className="job_detail_care">
                <div className="care_title">유의사항</div>
                <ul className="care_list">
                    <li className="care">허위사실이 발견될 경우 채용이 취소될 수 있습니다.</li>
                    <li className="care">국가유공자 및 장애인 등 취업 보호 대상자는 관계 법령에 따라 우대합니다.</li>
                    <li className="care">해외 국적자인 경우, 한국어 의사소통이 원활하고 정규직 입사의 체류 자격을 갖추어야 합니다.</li>
                </ul>
            </div>

            <div className="job_detail_apply">
                <div className="apply_title">접수기간/방법</div>
                <ul className="apply_list">
                    <li className="apply">서류 제출 : 12월 30일까지</li>
                    <li className="apply">이메일 지원 : 이력서 및 자기소개서, 포트폴리오 필수 제출</li>
                </ul>
            </div>

        </div>

        </div>

        <div className="btn_apply_wrapper" onClick={openApply}>
            <input type="button" value="입사지원" className="btn_apply" id="apply" />
            
        </div>
        </div>
        
        <Want />

            {onApply ? 
            <div className="modal_wrapper" style="background-color: white; width: 1004px; height: 692px; padding: 2em;">
            <div className="modal_header">
                <h2 className="modal_title" style="color:black; font-size:30px; font-weight:700; line-height:36px">포스팟에 지원하세요</h2>
            </div>
            <form className="modal_body">
                <div className="apply_form" style="border-bottom: 1px solid; padding-bottom: 1em;">
                    <h3 
                    style="font-weight: 700;
                    font-size: 19px;
                    line-height: 23px;
                    color:black; ">
                    제목
                    </h3>
                    <input tyoe="text" placeholder="이름과 직군을 함께 적으면 좋아요" 
                    style="font-weight: 400;
                    font-size: 19px;
                    line-height: 23px;
                    color: #B5B5B5; 
                    border: none;">
                    </input>
                </div>
                <div className="uploade_file_wrapper" style="display: flex;">
                    <div className="uploade_file_box" style="width:422px; height:238px; ">
                        <h3 className="uploade_file_name">이력서 및 자기소개서</h3>
                        <div className="uploade_file_body" style="border: 1px solid; display: block; margin-top: auto; margin-bottom: auto;">
                            <input type="text" id="upload_file_input" accept="" style="visibility:hidden;" />
                            <label id="upload_file_label" htmlFor="upload_file_input" style="font-size: 2em; cursor: pointer;">
                                <div className="uploade_file">
                                    <img src={upload} alt="upload_resume"/>                       
                                    <div className="upload_file_description">파일 업로드</div>
                                </div>
                            </label>
                        </div>
                        <div className="upload_file_type" style="padding-top: 1em;">PDF, HWP, Docx, XLS, PPT 형식만 등록 가능, 최대 10MB까지</div>
                    </div>
    
                    <div className="uploade_file_box" style="width:422px; height:238px; ">
                        <h3 className="uploade_file_name">포트폴리오</h3>
                        <div className="uploade_file_body" style="border: 1px solid; display: block; margin-top: auto; margin-bottom: auto;">
                            <input type="text" id="upload_file_input" accept="" style="visibility:hidden;" />
                            <label id="upload_file_label" htmlFor="upload_file_input" style="font-size: 2em; cursor: pointer;">
                                <div className="uploade_file">
                                    <img src={ppt} alt="uploda_portfolio" />                    
                                    <div className="upload_file_description">기획자 배기홍 포트폴리오.ppt</div>
                                </div>
                            </label>
                        </div>
                        <div className="upload_file_type" style="padding-top: 1em;">PDF, HWP, Docx, XLS, PPT 형식만 등록 가능, 최대 10MB까지</div>
                    </div>
    
                </div>
    
                <div className="btn_apply_wrapper">
                    <input type="button" value="지원하기" className="btn_apply"/>
                    
                </div>
    
            </form>
        </div>
        :
        null }

    </div>
    </Fade>
    )
}
export default HireDetail;