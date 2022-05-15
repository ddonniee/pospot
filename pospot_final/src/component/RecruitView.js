import React, { Component } from 'react';
import { Link,useParams } from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import { ReactComponent as Hangeul } from '../resources/svg/han.svg'
import { ReactComponent as PDF } from '../resources/svg/pdf.svg'
import { ReactComponent as WORD } from '../resources/svg/word.svg'
import { ReactComponent as XSLX } from '../resources/svg/xslx.svg'
import { ReactComponent as PPT } from '../resources/svg/ppt.svg'

import * as config from '../config'
import axios from 'axios';
axios.defaults.withCredentials = true;

class RecruitView extends Component
{
    state = {
        fileExe : "",
        fileName : "파일 업로드",
        portFolioExe : "",
        portFolioName : "포트폴리오",
        id : null,
        temp:"null",
        recruitDetail: [],
        recruitData: [],
        recruitLenght: 0,
        applied: 0,
    }
// recruitState:-1 에러 0:default, 입사 지원 1:success,지원 완료
    
    async componentWillMount() {

        // url로 선택된 id 값 구하기 22.05.04 은정
        
        console.log("first one!")
        const url = window.location.pathname;
        const id = url.split("/")
        const page = id.length-1;

        this.setState({
            id: id[page],
        })
        // 채용공고 디테일 가져오기
        // pathname을 url 값으로 넘겨줘야해 state로 안되나? 22.05.04 은정
        

        // 채용공고 리스트 가져오기
        fetch(config.RECRUIT_LIST)
        .then (res => {
            return res.json();
        })
        .then (data => {
           
             
             this.setState({
                 recruitData:data.data,
                 recruitLenght:data.data.length
             })
        })
        .catch((err)=>
        console.log(err));

    }
     // 여기서만 state 값으로 fetch 가능 22.05.09 은정
     componentDidUpdate() {
        
         fetch(config.RECRUIT_DETAIL+this.state.id)
        // await fetch(config.RECRUIT_DETAIL+id[this.state.id])
       
        .then (res => {
            return res.json();
        })
        .then (data => {
             this.setState({
                recruitDetail: data.data[0]
                             })
        })
        .catch((err)=>
        console.log(err));     

        $("#show").on('click',function(){ 
            show(); 
        });

        $("#closeBtn").on('click',function(){ 
            close();
        });

        $(".icon1").on('click',function(){
            $(".inp_f1").on('click');
        });

        // 팝업 div 오픈/닫기 함수
        function show() {
            $(".background").addClass("show");
        }

        function close() {
            $(".background").removeClass("show");
        }

        // 파일 업로드시 첨부된 파일에 따라 아이콘 변경 22.05.04 은정
        // applied가 0일 때만 존재하는 태그 읽어오기 22.05.15 은정
        if(this.state.applied === 0) {
        const fileInput = document.getElementById("resume-file");
        
        fileInput.onchange=()=>{
            const docType = [...fileInput.files];

            var _fileName = docType[0];
            var _fileLen =  _fileName.type.length;
            var _lastDot =  _fileName.type.lastIndexOf('.');

            var _fileExt =  _fileName.type.substring(_lastDot, _fileLen).toLowerCase();

            console.log(_fileExt);

            this.setState
                ({
                    fileExe:_fileExt,
                    fileName: _fileName.name
                })
            console.log(this.state.fileExe)
        }

        const portFolioInput = document.getElementById("portfolio-file");
        
        portFolioInput.onchange=()=>{

            const folioType = [...portFolioInput.files];

            console.log(folioType[0]);

            var _portFolioName = folioType[0];
            var _portFolioLen =  _portFolioName.type.length;
            var _finalDot =  _portFolioName.type.lastIndexOf('.');

            var _portFolioExt = _portFolioName.type.substring(_finalDot, _portFolioLen).toLowerCase();

            console.log(_portFolioExt);

            this.setState
                ({
                    portFolioExe:_portFolioExt,
                    portFolioName: _portFolioName.name
                })
            console.log(this.state.portFolioExe)
        }

    }
    }

   
    render(){
        
        const resetUpload=(num)=> {
            
            if(num===1) {
                this.setState({
                    fileExe:'',
                    fileName:'파일 업로드'
                })
                $("#resume-file").val('');
            }else if(num===2) {
                this.setState({
                    portFolioExe:'',
                    portFolioName:'포트폴리오'
                })
                $("#portfolio-file").val('');
            }
        
        }

      const resetPage=(data)=> {
         
        this.setState({
            id:data,
        })
        window.scrollTo(0,0);
      }

      const resetApplying=()=>{
        $(".background").removeClass("show");
          this.setState({
              applied:0,
          })
      }
   /* 입사지원 첨부파일 API로 전송 22.05.10 희정 */
   const onSubmitHandler = e => {
    e.preventDefault();
    
    const formData = new FormData();
    let mailTitle = $("#mail-title");
    let resumeFile = $("#resume-file");
    let portfoliFile = $("#portfolio-file");

    if(mailTitle.val() === "" ) {
        alert ("제목을 입력해주세요");
        return false;
    } else if (resumeFile.val()  === "") { //  || portfoliFile.val() ===""
        alert ("이력서를 첨부해주세요");
        return false;
    }

    // 메일로 보낼 내용을 formData에 추가
    formData.append( "pageURL", window.location.href);
    formData.append( "recruitTitle",'temp')
    formData.append( "mailTitle", mailTitle.val());
    formData.append( "resumeFile", resumeFile[0].files[0] );
    formData.append( "portfoliFile", portfoliFile[0].files[0]);
    
    if (window.confirm("지원하시겠습니까?") === true) { // https://apipospot.anypot.co.kr
        axios({
            method: 'POST',
            url: config.SUBMIT_RESUME,
            withCredentials: true,
            data: formData
        })
        .then(res => {
            if(res.data.code !== 200 ) { // 200 성공 코드
                alert (res.data.msg);
                // input file 내용 삭제
                if (/(MSIE|Trident)/.test(navigator.userAgent)) {
                    // ie 일때 input[type=file] init.
                    $("#resume-file").replaceWith( $("#resume-file").clone(true) );
                    $("#portfolio-file").replaceWith( $("#portfolio-file").clone(true) );
                } else {
                    // other browser 일때 input[type=file] init.
                    $("#resume-file").val("");
                    $("#portfolio-file").val("");
                }
                // input file 이미지 삭제
                resetUpload(1)
                resetUpload(2)
                this.setState({
                    applied:1,
                })
            } else {
                console.log(res.data.msg); 
                this.setState({
                    applied:1,
                })
                // alert (res.data.msg);
                // $(".background").removeClass("show");
            }
        })
        .catch(error => {
            console.log(error);
            return false;
        });
    } else {
        return false;
    }
    console.log(formData)
}
     
        return(
            <div className='RecruitView'>
                <div className="top-div"></div>
                
                <div className="container">
                    <div className="recruit-title">
                        <Link to='/recruit/list'>
                            <p className="back"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4L2 12L10 20" stroke="#222222" strokeWidth="2.5"/>
                                <path d="M2 12H24" stroke="#222222" strokeWidth="2.5"/>
                            </svg> &nbsp;채용공고</p>
                            <p className="main-title">{this.state.recruitDetail.recruit_title}</p>
                            {/* <p className="main-title">{this.state.recruitDetail}</p> */}
                        </Link>
                    </div>
                    <div className="recruit-view">
                        <div className="contents">
                            <div className="content-box">
                                <p className="box-title">담당업무</p>
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.task_1}</p>
                                {this.state.recruitDetail.task_2 !== "" 
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.task_2}</p>
                                : null }
                                {this.state.recruitDetail.task_3 !== "" 
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.task_3}</p>
                                : null }
                                {this.state.recruitDetail.task_4 !== "" 
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.task_4}</p>
                                : null }
                                {this.state.recruitDetail.task_5 !== "" 
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.task_5}</p>
                                : null }
                            </div>
                            <div className="content-box">
                                <p className="box-title">자격요건</p>
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.spec_1}</p>
                                {this.state.recruitDetail.spec_2 !== "" 
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.spec_2}</p>
                                : null}
                                {this.state.recruitDetail.spec_3 !== ""  
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.spec_3}</p>
                                : null}
                                {this.state.recruitDetail.spec_4 !== ""  
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.spec_4}</p>
                                : null}
                                {this.state.recruitDetail.spec_5 !== ""  
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.spec_5}</p>
                                : null }
                            </div>
                            <div className="content-box">
                                <p className="box-title">우대사항</p>
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.prefer_1}</p>
                               
                                {this.state.recruitDetail.prefer_2 !== ""  
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.prefer_2}</p>
                                : null}
                                {this.state.recruitDetail.prefer_3 !== ""  
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.prefer_3}</p>
                                : null}
                                {this.state.recruitDetail.prefer_4 !== "" 
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.prefer_4}</p>
                                : null}
                                {this.state.recruitDetail.prefer_5 !== ""  
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.prefer_5}</p>
                                : null}
                            </div>
                            <div className="content-box">
                                <p className="box-title">전형절차</p>
                                <div className="circle-box">
                                    <div className="circle">
                                        <div className="icon">
                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M40 8.825H20C17.0313 8.83146 14.1849 10.0085 12.0786 12.1007C9.97241 14.1929 8.77632 17.0314 8.75 20V40C8.77632 42.9686 9.97241 45.8071 12.0786 47.8993C14.1849 49.9915 17.0313 51.1685 20 51.175H40C42.9687 51.1685 45.8151 49.9915 47.9214 47.8993C50.0276 45.8071 51.2237 42.9686 51.25 40V20C51.2237 17.0314 50.0276 14.1929 47.9214 12.1007C45.8151 10.0085 42.9687 8.83146 40 8.825ZM48.75 40C48.75 42.3206 47.8281 44.5462 46.1872 46.1872C44.5462 47.8281 42.3206 48.75 40 48.75H20C17.6794 48.75 15.4538 47.8281 13.8128 46.1872C12.1719 44.5462 11.25 42.3206 11.25 40V20C11.2698 17.6924 12.2004 15.486 13.8392 13.8612C15.478 12.2365 17.6923 11.3249 20 11.325H40C42.3077 11.3249 44.522 12.2365 46.1608 13.8612C47.7996 15.486 48.7302 17.6924 48.75 20V40Z" fill="#222222"/>
                                                <path d="M42.5 18.75H17.5V21.25H42.5V18.75Z" fill="#222222"/>
                                                <path d="M42.5 28.75H17.5V31.25H42.5V28.75Z" fill="#222222"/>
                                                <path d="M30 38.75H17.5V41.25H30V38.75Z" fill="#222222"/>
                                            </svg>
                                            <p className="desc">서류접수</p>
                                        </div>
                                    </div>
                                    <div className="circle">
                                        <div className="icon">
                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M47.15 5H32.15C29.8294 5 27.6038 5.92187 25.9628 7.56282C24.3219 9.20376 23.4 11.4294 23.4 13.75V23.75C23.4 26.0706 24.3219 28.2962 25.9628 29.9372C27.6038 31.5781 29.8294 32.5 32.15 32.5H40.375L46.875 39C47.1135 39.2393 47.4372 39.3742 47.775 39.375C47.9314 39.4104 48.0937 39.4104 48.25 39.375C48.4783 39.2812 48.6737 39.122 48.8116 38.9173C48.9495 38.7127 49.0238 38.4718 49.025 38.225V32.275C50.9657 31.84 52.7018 30.7604 53.9503 29.2123C55.1988 27.6642 55.886 25.7388 55.9 23.75V13.75C55.9 11.4294 54.9781 9.20376 53.3372 7.56282C51.6963 5.92187 49.4707 5 47.15 5ZM53.4 23.75C53.4169 25.3279 52.8315 26.8528 51.7632 28.0141C50.6948 29.1753 49.2238 29.8856 47.65 30C47.3361 30.0252 47.0433 30.1679 46.8301 30.3997C46.6169 30.6314 46.499 30.9351 46.5 31.25V35L41.75 30.275C41.6384 30.1549 41.5029 30.0595 41.3522 29.9949C41.2015 29.9303 41.039 29.898 40.875 29.9H32.125C30.4674 29.9 28.8777 29.2415 27.7056 28.0694C26.5335 26.8973 25.875 25.3076 25.875 23.65V13.65C25.9013 12.0055 26.5748 10.4376 27.7495 9.28629C28.9242 8.13503 30.5053 7.49321 32.15 7.5H47.15C48.8076 7.5 50.3973 8.15848 51.5694 9.33058C52.7415 10.5027 53.4 12.0924 53.4 13.75V23.75Z" fill="#222222"/>
                                                <path d="M33.4 41.25C33.4 42.9076 32.7415 44.4973 31.5694 45.6694C30.3973 46.8415 28.8076 47.5 27.15 47.5H18.4C18.2323 47.4976 18.0659 47.5296 17.9111 47.5941C17.7563 47.6586 17.6164 47.7542 17.5 47.875L12.775 52.5V48.7C12.776 48.3851 12.6582 48.0814 12.4449 47.8497C12.2317 47.6179 11.9389 47.4752 11.625 47.45C10.0686 47.3188 8.61776 46.6096 7.55815 45.4621C6.49854 44.3146 5.907 42.8119 5.90002 41.25V31.25C5.90002 29.5924 6.5585 28.0027 7.73061 26.8306C8.90271 25.6585 10.4924 25 12.15 25H19.65V22.5H12.15C9.82938 22.5 7.60378 23.4219 5.96284 25.0628C4.3219 26.7038 3.40002 28.9294 3.40002 31.25V41.25C3.40952 43.24 4.09512 45.1676 5.34435 46.7167C6.59358 48.2657 8.33223 49.3441 10.275 49.775V55.625C10.2763 55.8718 10.3505 56.1127 10.4884 56.3173C10.6263 56.522 10.8218 56.6812 11.05 56.775C11.2062 56.8122 11.3689 56.8122 11.525 56.775C11.6978 56.8013 11.8741 56.7904 12.0423 56.743C12.2104 56.6956 12.3665 56.6127 12.5 56.5L18.9 50H27.15C29.4707 50 31.6963 49.0781 33.3372 47.4372C34.9782 45.7962 35.9 43.5706 35.9 41.25V36.25H33.4V41.25Z" fill="#222222"/>
                                                <path d="M42.3 15.65L38.925 19.225L36.925 17.5C36.6871 17.2694 36.3688 17.1404 36.0375 17.1404C35.7062 17.1404 35.3879 17.2694 35.15 17.5C35.0329 17.6162 34.9399 17.7545 34.8764 17.9068C34.8129 18.0591 34.7803 18.2225 34.7803 18.3875C34.7803 18.5525 34.8129 18.7159 34.8764 18.8682C34.9399 19.0205 35.0329 19.1588 35.15 19.275L38.05 21.95C38.2825 22.1613 38.5859 22.2773 38.9 22.275C39.1043 22.3024 39.3122 22.2779 39.5045 22.2036C39.6968 22.1293 39.8672 22.0077 40 21.85L44.125 17.5C44.3538 17.258 44.477 16.935 44.4676 16.6021C44.4583 16.2693 44.317 15.9538 44.075 15.725C43.833 15.4963 43.51 15.373 43.1772 15.3824C42.8443 15.3918 42.5288 15.533 42.3 15.775V15.65Z" fill="#222222"/>
                                                <path d="M17.5 33.025C17.3851 32.9068 17.2481 32.8124 17.0967 32.7472C16.9453 32.682 16.7825 32.6472 16.6177 32.6449C16.4529 32.6426 16.2892 32.6727 16.1361 32.7337C15.9829 32.7946 15.8432 32.8851 15.725 33C15.4864 33.2321 15.3496 33.5494 15.3449 33.8823C15.3426 34.0472 15.3728 34.2108 15.4337 34.364C15.4946 34.5172 15.5851 34.6568 15.7 34.775L17.3 36.4L15.7 38.025C15.4694 38.2629 15.3405 38.5812 15.3405 38.9125C15.3405 39.2438 15.4694 39.5621 15.7 39.8C15.8156 39.9132 15.9524 40.0024 16.1025 40.0625C16.2527 40.1226 16.4133 40.1523 16.575 40.15C16.7465 40.1529 16.9168 40.1212 17.0758 40.0568C17.2347 39.9923 17.379 39.8965 17.5 39.775L19.025 38.2L20.55 39.775C20.7885 40.0143 21.1122 40.1492 21.45 40.15C21.6122 40.1552 21.7736 40.1268 21.9242 40.0666C22.0748 40.0063 22.2113 39.9156 22.325 39.8C22.4422 39.6838 22.5352 39.5455 22.5987 39.3932C22.6621 39.2409 22.6948 39.0775 22.6948 38.9125C22.6948 38.7475 22.6621 38.5841 22.5987 38.4318C22.5352 38.2795 22.4422 38.1412 22.325 38.025L20.75 36.4L22.325 34.775C22.4422 34.6588 22.5352 34.5205 22.5987 34.3682C22.6621 34.2159 22.6948 34.0525 22.6948 33.8875C22.6948 33.7225 22.6621 33.5591 22.5987 33.4068C22.5352 33.2545 22.4422 33.1162 22.325 33C22.0872 32.7694 21.7689 32.6404 21.4375 32.6404C21.1062 32.6404 20.7879 32.7694 20.55 33L19.025 34.575L17.5 33.025Z" fill="#222222"/>
                                            </svg>
                                            <p className="desc">실무면접</p>
                                        </div>
                                    </div>
                                    <div className="circle">
                                        <div className="icon">
                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M40 8.825H20C17.0313 8.83146 14.1849 10.0085 12.0786 12.1007C9.97241 14.1929 8.77632 17.0314 8.75 20V40C8.77632 42.9686 9.97241 45.8071 12.0786 47.8993C14.1849 49.9915 17.0313 51.1685 20 51.175H40C42.9687 51.1685 45.8151 49.9915 47.9214 47.8993C50.0276 45.8071 51.2237 42.9686 51.25 40V20C51.2237 17.0314 50.0276 14.1929 47.9214 12.1007C45.8151 10.0085 42.9687 8.83146 40 8.825ZM48.75 40C48.75 42.3206 47.8281 44.5462 46.1872 46.1872C44.5462 47.8281 42.3206 48.75 40 48.75H20C17.6794 48.75 15.4538 47.8281 13.8128 46.1872C12.1719 44.5462 11.25 42.3206 11.25 40V20C11.2698 17.6924 12.2004 15.486 13.8392 13.8612C15.478 12.2365 17.6923 11.3249 20 11.325H40C42.3077 11.3249 44.522 12.2365 46.1608 13.8612C47.7996 15.486 48.7302 17.6924 48.75 20V40Z" fill="#222222"/>
                                                <path d="M30 32.5C31.4834 32.5 32.9334 32.0601 34.1668 31.236C35.4001 30.4119 36.3614 29.2406 36.9291 27.8701C37.4968 26.4997 37.6453 24.9917 37.3559 23.5368C37.0665 22.082 36.3522 20.7456 35.3033 19.6967C34.2544 18.6478 32.918 17.9335 31.4632 17.6441C30.0083 17.3547 28.5003 17.5032 27.1299 18.0709C25.7594 18.6386 24.5881 19.5998 23.764 20.8332C22.9399 22.0666 22.5 23.5166 22.5 25C22.5 26.9891 23.2902 28.8968 24.6967 30.3033C26.1032 31.7098 28.0109 32.5 30 32.5ZM30 20C30.9889 20 31.9556 20.2932 32.7779 20.8426C33.6001 21.3921 34.241 22.1729 34.6194 23.0866C34.9978 24.0002 35.0969 25.0055 34.9039 25.9754C34.711 26.9454 34.2348 27.8363 33.5355 28.5355C32.8363 29.2348 31.9454 29.711 30.9755 29.9039C30.0055 30.0968 29.0002 29.9978 28.0866 29.6194C27.173 29.241 26.3921 28.6001 25.8427 27.7778C25.2932 26.9556 25 25.9889 25 25C25 23.6739 25.5268 22.4021 26.4645 21.4645C27.4021 20.5268 28.6739 20 30 20Z" fill="#222222"/>
                                                <path d="M34.425 35H25.575C24.334 35.0163 23.1083 35.2769 21.968 35.767C20.8277 36.257 19.7951 36.9668 18.9292 37.856C18.0633 38.7451 17.381 39.7961 16.9213 40.949C16.4616 42.1019 16.2335 43.334 16.25 44.575V45H18.75V44.6C18.7301 43.6852 18.891 42.7755 19.2236 41.923C19.5561 41.0706 20.0538 40.2922 20.6879 39.6325C21.322 38.9728 22.0801 38.4449 22.9188 38.0789C23.7574 37.713 24.6601 37.5162 25.575 37.5H28.75V45H31.25V37.5H34.425C35.3377 37.5163 36.2383 37.7122 37.0753 38.0766C37.9123 38.441 38.6693 38.9667 39.3031 39.6237C39.9369 40.2807 40.435 41.0561 40.7691 41.9057C41.1031 42.7552 41.2665 43.6623 41.25 44.575V45H43.75V44.6C43.7698 43.3569 43.5442 42.1221 43.086 40.9663C42.6277 39.8106 41.946 38.7566 41.0797 37.8648C40.2135 36.973 39.1798 36.2609 38.0378 35.7693C36.8959 35.2777 35.6681 35.0163 34.425 35Z" fill="#222222"/>
                                            </svg>
                                            <p className="desc">최종면접</p>
                                        </div>
                                    </div>
                                    <div className="circle">
                                        <div className="icon">
                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M30 7.5C25.5499 7.5 21.1998 8.8196 17.4997 11.2919C13.7996 13.7643 10.9157 17.2783 9.21272 21.3896C7.50975 25.501 7.06417 30.025 7.93234 34.3895C8.80051 38.7541 10.9434 42.7632 14.0901 45.9099C17.2368 49.0566 21.2459 51.1995 25.6105 52.0677C29.9751 52.9358 34.4991 52.4903 38.6104 50.7873C42.7217 49.0843 46.2357 46.2004 48.7081 42.5003C51.1804 38.8002 52.5 34.4501 52.5 30C52.5 24.0326 50.1295 18.3097 45.9099 14.0901C41.6903 9.87053 35.9674 7.5 30 7.5ZM30 50.175C26.0444 50.175 22.1776 49.002 18.8886 46.8044C15.5996 44.6068 13.0362 41.4832 11.5224 37.8287C10.0087 34.1741 9.6126 30.1528 10.3843 26.2732C11.156 22.3936 13.0608 18.8299 15.8579 16.0329C18.6549 13.2358 22.2186 11.331 26.0982 10.5593C29.9778 9.78759 33.9992 10.1837 37.6537 11.6974C41.3082 13.2112 44.4318 15.7746 46.6294 19.0636C48.827 22.3526 50 26.2194 50 30.175C50.0033 32.8035 49.4884 35.4069 48.4848 37.8363C47.4812 40.2657 46.0085 42.4735 44.151 44.3333C42.2935 46.1931 40.0876 47.6685 37.6595 48.6752C35.2313 49.6819 32.6286 50.2 30 50.2V50.175Z" fill="#222222"/>
                                                <path d="M35 25.8L29.025 31.775L25 27.9C24.7646 27.6646 24.4454 27.5324 24.1125 27.5324C23.7796 27.5324 23.4604 27.6646 23.225 27.9C22.9896 28.1354 22.8574 28.4546 22.8574 28.7875C22.8574 29.1204 22.9896 29.4396 23.225 29.675L27.975 34.425C28.2135 34.6643 28.5372 34.7992 28.875 34.8C29.0385 34.799 29.2001 34.7654 29.3504 34.701C29.5007 34.6366 29.6366 34.5427 29.75 34.425L36.7 27.5C36.8196 27.3878 36.9149 27.2522 36.98 27.1017C37.0452 26.9512 37.0788 26.789 37.0788 26.625C37.0788 26.461 37.0452 26.2988 36.98 26.1483C36.9149 25.9978 36.8196 25.8622 36.7 25.75C36.4626 25.5423 36.1555 25.432 35.8402 25.4413C35.5249 25.4506 35.2248 25.5787 35 25.8Z" fill="#222222"/>
                                            </svg>
                                            <p className="desc">입사</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-box">
                                <p className="box-title">근무조건</p>
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.working_conditions_1}</p>
                                {this.state.recruitDetail.working_conditions_2 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.working_conditions_2}</p>
                                : null }
                                 {this.state.recruitDetail.working_conditions_3 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.working_conditions_3}</p>
                                : null }
                                {this.state.recruitDetail.working_conditions_4 !== ""
                               ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.working_conditions_4}</p>
                                : null }
                                {this.state.recruitDetail.working_conditions_5 !== ""
                               ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.working_conditions_5}</p>
                                : null}
                            </div>
                            <div className="content-box">
                                <p className="box-title">유의사항</p>
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.notice_1}</p>
                                {this.state.recruitDetail.notice_2 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.notice_2}</p>
                                : null}
                                {this.state.recruitDetail.notice_3 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.notice_3}</p>
                                : null}
                                {this.state.recruitDetail.notice_4 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.notice_4}</p>
                                : null}
                                {this.state.recruitDetail.notice_5 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.notice_5}</p>
                                : null }
                            </div>
                            <div className="content-box">
                                <p className="box-title">접수기간/방법</p>
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.receiving_1}</p>
                                {this.state.recruitDetail.receiving_2 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.receiving_2}</p>
                                : null}
                                {this.state.recruitDetail.receiving_3 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.receiving_3}</p>
                                : null}
                                {this.state.recruitDetail.receiving_4 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.receiving_4}</p>
                                : null}
                                {this.state.recruitDetail.receiving_5 !== ""
                                ?
                                <p className="desc"><span className="dot">·&nbsp;</span>{this.state.recruitDetail.receiving_5}</p>
                                : null}
                            </div>
                            <div className="center-box">
                                <button id="show" className="purpleBtn mt50">입사지원</button>

                                <div className="section3">
                             <div className="wrapper">
                                 <p className="sec-title">이런 분을 뽑고 있어요 &nbsp;
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.0124 35.6824C19.4874 37.5974 19.1649 39.1399 18.0449 40.3099C17.9289 40.486 17.7784 40.6365 17.6024 40.7524L12.6674 45.6949H1.49988L1.37988 31.7599L4.73238 28.4074C4.90338 28.1201 5.11002 27.8555 5.34738 27.6199C6.52488 26.5024 8.07738 26.1799 10.0199 26.6449C12.1661 27.2374 14.1139 28.3952 15.6599 29.9974C17.2476 31.5726 18.4023 33.5307 19.0124 35.6824ZM46.7024 31.7599L46.6124 45.6949H35.4149L30.4799 40.7524L30.0374 40.3099C28.9199 39.1924 28.5974 37.6699 29.0624 35.7274C29.6672 33.5657 30.8587 31.6136 32.5049 30.0874C34.0206 28.4507 35.9556 27.2601 38.0999 26.6449C40.0149 26.1799 41.5599 26.5049 42.7349 27.6199C43.0146 27.8387 43.2533 28.1053 43.4399 28.4074L46.7024 31.7599Z" fill="#357BA7"/>
                                        <path d="M31.005 8.4799C31.2375 8.71091 31.42 8.98722 31.5413 9.2917C31.6626 9.59617 31.72 9.92232 31.71 10.2499V30.1699C31.72 30.4975 31.6626 30.8236 31.5413 31.1281C31.42 31.4326 31.2375 31.7089 31.005 31.9399C30.7741 32.1704 30.4989 32.3517 30.1959 32.4728C29.893 32.594 29.5687 32.6525 29.2425 32.6449C28.8144 32.6549 28.3901 32.5623 28.005 32.3749H21.66V32.2024C21.2624 32.2045 20.8697 32.1147 20.5125 31.9399C20.0197 32.3932 19.3746 32.6447 18.705 32.6447C18.0355 32.6447 17.3903 32.3932 16.8975 31.9399C16.665 31.7089 16.4825 31.4326 16.3612 31.1281C16.24 30.8236 16.1825 30.4975 16.1925 30.1699V10.2499C16.1825 9.92232 16.24 9.59617 16.3612 9.2917C16.4825 8.98722 16.665 8.71091 16.8975 8.4799C17.3711 8.0138 17.9969 7.73419 18.66 7.6924L19.1025 7.7749V4.4299C19.0927 4.10345 19.1502 3.77848 19.2715 3.47524C19.3928 3.172 19.5752 2.897 19.8075 2.6674C20.0515 2.4287 20.3416 2.24237 20.6602 2.11985C20.9787 1.99733 21.319 1.9412 21.66 1.9549C22.1487 1.94693 22.6285 2.08558 23.0375 2.35295C23.4466 2.62032 23.7662 3.00415 23.955 3.4549C24.1417 3.00414 24.4597 2.61999 24.8677 2.35246C25.2756 2.08493 25.7547 1.9464 26.2425 1.9549C26.5758 1.94897 26.9071 2.00886 27.2172 2.13112C27.5274 2.25338 27.8104 2.43562 28.05 2.6674C28.2942 2.89014 28.4876 3.16284 28.617 3.46696C28.7464 3.77108 28.8088 4.0995 28.8 4.4299V7.7749C28.9401 7.71663 29.0909 7.68852 29.2425 7.6924C29.9057 7.73419 30.5315 8.0138 31.005 8.4799Z" fill="#EBBFA1"/>
                                        <path d="M22.1026 3.45496C22.3389 3.7003 22.5232 3.99087 22.6443 4.30921C22.7655 4.62756 22.821 4.9671 22.8076 5.30745V25.7675C22.6276 29.7675 21.8626 32.8375 20.5126 34.9775C19.1626 37.1175 18.3401 38.25 18.0451 38.375C17.6486 38.7186 17.1567 38.9331 16.6351 38.99H16.1926C15.3274 38.9945 14.4711 38.8156 13.6801 38.465C12.2404 37.814 10.9393 36.8923 9.84763 35.75C8.34763 34.1075 7.52263 32.4875 7.46263 30.905C7.34083 29.6281 7.58538 28.3429 8.16763 27.2C8.2746 26.9192 8.4593 26.6746 8.70013 26.495C10.9306 24.5542 13.0091 22.4455 14.9176 20.1875C16.7626 17.9825 17.7526 16.325 17.8651 15.2075V5.30745C17.8518 4.9671 17.9073 4.62756 18.0285 4.30921C18.1496 3.99087 18.3339 3.7003 18.5701 3.45496C19.0468 3.00232 19.679 2.74995 20.3364 2.74995C20.9937 2.74995 21.626 3.00232 22.1026 3.45496ZM40.4401 30.8825C40.3801 32.465 39.5851 34.085 38.0626 35.7275C36.9536 36.8353 35.6525 37.7324 34.2226 38.375C33.4255 38.7192 32.5762 38.9271 31.7101 38.99H31.2676C30.7648 38.8273 30.2895 38.5896 29.8576 38.285C29.5651 38.165 28.7401 37.025 27.3901 34.85C26.0401 32.675 25.2751 29.6 25.0951 25.6775V5.30745C25.0818 4.9671 25.1373 4.62756 25.2585 4.30921C25.3796 3.99087 25.5639 3.7003 25.8001 3.45496C26.0325 3.22427 26.309 3.0429 26.6132 2.92175C26.9173 2.8006 27.2428 2.74217 27.5701 2.74996C28.2416 2.74004 28.8902 2.99306 29.3776 3.45496C29.6261 3.69349 29.8213 3.98183 29.9506 4.30107C30.0798 4.62032 30.1402 4.96327 30.1276 5.30745V15.185C30.2376 16.305 31.2201 17.965 33.0751 20.165C34.9661 22.4096 37.0137 24.5174 39.2026 26.4725C39.4547 26.664 39.6663 26.9036 39.8251 27.1775C40.3446 28.3392 40.5564 29.6151 40.4401 30.8825Z" fill="#FCD2B5"/>
                                        <path d="M13.0651 13.7299C13.0651 13.8799 13.0201 13.9474 12.8401 13.9474L7.90508 15.3574L7.81508 15.2749C7.69508 15.2149 7.64258 15.1549 7.64258 15.0949V12.3649C7.64258 12.3049 7.69508 12.2449 7.81508 12.1849C7.89575 12.1378 7.98498 12.1072 8.07758 12.0949L12.9301 13.5124C12.9901 13.5124 13.0351 13.5799 13.0651 13.7299ZM7.90508 6.36491C7.91187 6.29801 7.94409 6.23626 7.99508 6.19241L9.93008 4.24991C9.95269 4.22381 9.98022 4.20242 10.0111 4.18698C10.042 4.17153 10.0756 4.16234 10.1101 4.15991C10.1701 4.15991 10.2226 4.21991 10.2826 4.33991L12.7501 8.74991C12.8043 8.80923 12.8338 8.88704 12.8326 8.96741C12.8326 9.05741 12.7501 9.13241 12.5701 9.18491L12.3976 9.10241L7.98758 6.63491C7.94176 6.55156 7.91368 6.45964 7.90508 6.36491ZM40.5301 12.3649V15.1849C40.5304 15.2454 40.5149 15.3048 40.4851 15.3574C40.4551 15.4174 40.3801 15.4174 40.2601 15.3574L35.3251 14.0374C35.2683 14.01 35.2212 13.9658 35.1904 13.9108C35.1595 13.8558 35.1463 13.7927 35.1526 13.7299C35.1526 13.5799 35.2051 13.5124 35.3251 13.5124L40.2601 12.0949C40.2945 12.0973 40.3282 12.1065 40.359 12.122C40.3899 12.1374 40.4175 12.1588 40.4401 12.1849L40.5301 12.3649ZM35.4151 9.10241C35.3872 9.08225 35.3645 9.05576 35.3488 9.02512C35.3332 8.99448 35.325 8.96057 35.325 8.92616C35.325 8.89176 35.3332 8.85784 35.3488 8.8272C35.3645 8.79656 35.3872 8.77007 35.4151 8.74991L37.8826 4.33991C37.9444 4.2796 38.0186 4.23353 38.1001 4.20491C38.1723 4.17846 38.2482 4.16328 38.3251 4.15991L40.2601 6.19241C40.288 6.21257 40.3107 6.23906 40.3263 6.2697C40.342 6.30034 40.3501 6.33426 40.3501 6.36866C40.3501 6.40307 40.342 6.43699 40.3263 6.46762C40.3107 6.49826 40.288 6.52475 40.2601 6.54491L35.7601 9.01241L35.6701 9.10241H35.4151Z" fill="#0DBCE8"/>
                                        </svg>
                                    </p>
                                    
                                    {/* <br/><br/><br/> */}

                                    {/* 채용공고 리스트 확인하여 분기 22.05.04 은정 */}
                                    <div className="tblType">
                                    {this.state.recruitLenght===0
                                        ?
                                        <>
                                            <caption>공고 테이블(채용없음)</caption>
                                            <colgroup>
                                                <col width="*"/>
                                            </colgroup>
                                            
                                                        <p className="field2">
                                                            지금은 채용 계획이 없지만,<br/>이력서를 보내주시면 검토해볼게요.<br/>
                                                            <button id="show" className="purpleBtn mt50" >입사지원</button>
                                                            {/* <button className="purpleBtn mt50" onClick={() => window.location.href=`https://www.jobkorea.co.kr/Recruit/GI_Read/38226031?Oem_Code=C1&logpath=1`}>입사지원</button> */}
                                            </p>
                                            </>
                                            :
                                            
                                            <div className="section3">
                                    <div className="wrapper">
                                        
                                        <div className="tblType">
                                            <table>
                                                <caption>공고 테이블</caption>
                                                <colgroup>
                                                    <col width="*"/>
                                                    <col width="20%"/>
                                                </colgroup>
                                                {/* 제출 기한 확인하여 프론트에서 차단? 22.05.06 은정 */}
                                                {this.state.recruitData
                                                .filter((data)=>moment(data.deadline).add(30,"days")>=moment())
                                                .map((data, index) =>{
                                                    
                                                    return (
                                                        <tbody key={index}>
                                                    <tr>
                                                        <td>
                                                            {/* 상세페이지에서 다른 채용 페이지로 바로 연결 22.05.09 은정 */}
                                                        <div className='onAnotherRecruit'onClick={()=>resetPage(data.recruit_id)} >
                                                                <p className="field">{data.recruit_title}</p><br/>
                                                            </div>
                                                            {/* <Link to="/recruit/detail">
                                                                <p className="field">{data.recruit_title}</p><br/>
                                                            </Link> */}
                                                            <span className="tag">{data.workType}</span>
                                                            <span className="tag">{data.career}</span>
                                                            <span className="tag">{data.education}</span>
                                                        </td>
                                                        <td>
                                                            <p className="prog">{data.state}<br/><span className="purple">{moment(data.deadline).format("YYYY.M.DD")}</span></p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                    )
                                                    
                                                })}
                                                
                                            </table>
                                        </div>
                                    </div>
                                </div>
    }
                                    </div>
                                </div>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>

                 {/* 팝업_채용공고_지원하기 */}
                 <div className="background">
                    <div className="window">
                        <div className="popup recPop">
                            {/* 기본값 0 : 지원하기, 에러 : -1 실패, 지원 완료 : 1 성공 */}
                            {this.state.applied === 0 ? 
                            <>
                            <div className="recruitPop">
                                 {/* encType, onSubmit 추가 22.05.10 희정 */ }
                                 <form id="pospotForm" method="post" encType="multipart/form-data" onSubmit={onSubmitHandler}>
                                    <p className="main-title">포스팟에 지원하세요</p>
                                    <p className="sub-title">제목</p>
                                    {/* name, id 추가 required 삭제 22.05.10 희정 */ }
                                    <input type="text" name="mailTitle" id ="mail-title" className="input-tit" placeholder="이름과 직군을 함께 적으면 좋아요"/>
                                    <div className="uploadFile">
                                        <div className="file">
                                            <p className="sub-title">이력서 및 자기소개서</p>
                                            <div className="box box1">
                                            {/* 첨부 파일 있을때만 x 버튼 나오기 22.05.04 은정 */}
                                            {this.state.fileExe !== "" ?
                                                <div className="cancelBtn-div" style={{ 
                                                    position:"absolute", top:"41%", left:"45%"
                                                    }} onClick={()=>resetUpload(1)}>
                                                    <svg className="cancelBtn" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.66675 2.66669L13.3806 13.3805" stroke="#222222" strokeWidth="1.5"/>
                                                    <path d="M13.3333 2.66669L2.6194 13.3805" stroke="#222222" strokeWidth="1.5"/>
                                                    </svg>
                                                </div>
                                                : 
                                                null
                                            }
                                            {/* name 추가 required 삭제22.05.10 희정 */ }
                                            <input type="file" name="resumeFile" className="inp_f1" accept=".pdf, .hwp, .Docx, .xls, .pptx" id="resume-file" style={{visibility:"hidden", width:"0"}}/>
                                            {/* 업로드 파일 형식과 일치하는 아이콘 , 파일명 22.05.03 은정 */}
                                                <label htmlFor='resume-file'>

                                                <div className="icon icon1">
                                                    {
                                                        this.state.fileExe === '' ?
                                                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M40 8.8252H20C17.0313 8.83166 14.1849 10.0087 12.0786 12.1009C9.97241 14.1931 8.77632 17.0316 8.75 20.0002V40.0002C8.77632 42.9688 9.97241 45.8073 12.0786 47.8995C14.1849 49.9917 17.0313 51.1687 20 51.1752H40C42.9687 51.1687 45.8151 49.9917 47.9214 47.8995C50.0276 45.8073 51.2237 42.9688 51.25 40.0002V20.0002C51.2237 17.0316 50.0276 14.1931 47.9214 12.1009C45.8151 10.0087 42.9687 8.83166 40 8.8252ZM48.75 40.0002C48.75 42.3208 47.8281 44.5464 46.1872 46.1874C44.5462 47.8283 42.3206 48.7502 40 48.7502H20C17.6794 48.7502 15.4538 47.8283 13.8128 46.1874C12.1719 44.5464 11.25 42.3208 11.25 40.0002V20.0002C11.2698 17.6926 12.2004 15.4862 13.8392 13.8614C15.478 12.2367 17.6923 11.3251 20 11.3252H40C42.3077 11.3251 44.522 12.2367 46.1608 13.8614C47.7996 15.4862 48.7302 17.6926 48.75 20.0002V40.0002Z" fill="#222222"/>
                                                        <path d="M42.5 18.75H17.5V21.25H42.5V18.75Z" fill="#222222"/>
                                                        <path d="M42.5 28.75H17.5V31.25H42.5V28.75Z" fill="#222222"/>
                                                        <path d="M30 38.75H17.5V41.25H30V38.75Z" fill="#222222"/>
                                                        </svg>
                                                         :
                                                        this.state.fileExe === '.presentation' ? 
                                                        <PPT /> :
                                                        this.state.fileExe === '.document' ?
                                                        <WORD /> :
                                                        this.state.fileExe === '.sheet' ? 
                                                        <XSLX /> :
                                                        this.state.fileExe === 'application/pdf' ?
                                                        <PDF /> :
                                                        null
                                                    }
                                                   
                                                </div>
                                                <p className="fileName fileName1">{this.state.fileName}</p>
                                                </label>
                                               
                                            </div>
                                            <p className="desc">PDF, HWP, Docx, XLS, PPT 형식만 등록 가능, 최대 10MB까지</p>
                                        </div>
                                        <div className="file">
                                            <p className="sub-title">포트폴리오</p>
                                            <div className="box box2">

                                            {this.state.portFolioExe !== "" ?
                                                <div className="cancelBtn-div" onClick={()=>resetUpload(2)} style={{
                                                    position:"absolute", top:"41%", left:"91%"
                                                }}>
                                                    <svg className="cancelBtn" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2.66675 2.66669L13.3806 13.3805" stroke="#222222" strokeWidth="1.5"/>
                                                    <path d="M13.3333 2.66669L2.6194 13.3805" stroke="#222222" strokeWidth="1.5"/>
                                                    </svg>
                                                </div>
                                                : 
                                                null
                                            }
                                               {/* name 추가 required 삭제 22.05.10 희정 */ }
                                               <input type="file" name="portfoliFile" className="inp_f1" accept=".pdf, .hwp, .Docx, .xls, .pptx" id="portfolio-file" style={{visibility:"hidden", width:"0"}}/>
                                                {/* 업로드 파일 형식과 일치하는 아이콘 , 파일명 22.05.03 은정 */}
                                                <label htmlFor='portfolio-file'>
                                                    
                                                
                                                <div className="icon icon2">
                                                {
                                                        this.state.portFolioExe === '' ?
                                                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M40 8.8252H20C17.0313 8.83166 14.1849 10.0087 12.0786 12.1009C9.97241 14.1931 8.77632 17.0316 8.75 20.0002V40.0002C8.77632 42.9688 9.97241 45.8073 12.0786 47.8995C14.1849 49.9917 17.0313 51.1687 20 51.1752H40C42.9687 51.1687 45.8151 49.9917 47.9214 47.8995C50.0276 45.8073 51.2237 42.9688 51.25 40.0002V20.0002C51.2237 17.0316 50.0276 14.1931 47.9214 12.1009C45.8151 10.0087 42.9687 8.83166 40 8.8252ZM48.75 40.0002C48.75 42.3208 47.8281 44.5464 46.1872 46.1874C44.5462 47.8283 42.3206 48.7502 40 48.7502H20C17.6794 48.7502 15.4538 47.8283 13.8128 46.1874C12.1719 44.5464 11.25 42.3208 11.25 40.0002V20.0002C11.2698 17.6926 12.2004 15.4862 13.8392 13.8614C15.478 12.2367 17.6923 11.3251 20 11.3252H40C42.3077 11.3251 44.522 12.2367 46.1608 13.8614C47.7996 15.4862 48.7302 17.6926 48.75 20.0002V40.0002Z" fill="#222222"/>
                                                        <path d="M42.5 18.75H17.5V21.25H42.5V18.75Z" fill="#222222"/>
                                                        <path d="M42.5 28.75H17.5V31.25H42.5V28.75Z" fill="#222222"/>
                                                        <path d="M30 38.75H17.5V41.25H30V38.75Z" fill="#222222"/>
                                                        </svg>
                                                         :
                                                        this.state.portFolioExe === '.presentation' ? 
                                                        
                                                        <PPT /> :
                                                        this.state.portFolioExe === '.document' ?
                                                        <WORD /> :
                                                        this.state.portFolioExe === 'application/pdf' ?
                                                        <PDF /> :
                                                        null
                                                    }
                                                   
                                                </div>
                                                <p className="fileName fileName1">{this.state.portFolioName}</p>
                                                </label>
                                            </div>
                                            <p className="desc">PDF, HWP, Docx, XLS, PPT 형식만 등록 가능, 최대 10MB까지</p>
                                        </div>
                                    </div>
                                    <div className="center-box">
                                          {/* form 추가 22.05.10 희정 */ }
                                          <button type="submit" className="purpleBtn mt75" form="pospotForm">지원하기</button>
                                    </div>
                                </form>
                            </div>
                            <button id="closeBtn" className="closeBtn" >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4L20.0708 20.0708" stroke="white" strokeWidth="2.5"/>
                                    <path d="M20 4L3.92921 20.0708" stroke="white" strokeWidth="2.5"/>
                                </svg>
                            </button>
                            </>
                        : this.state.applied === 1 ?
                        <div className="smilePop">
                                <div className="smileImg">
                                    <svg width="280" height="332" viewBox="0 0 280 332" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M78.4918 60.6797H72.3043V81.9062H78.4918V60.6797ZM45.8785 71.6797C45.857 77.0938 50.5836 80.9824 56.7926 81.0039C62.9801 80.9824 67.7066 77.0938 67.7066 71.6797C67.7066 66.1152 62.9801 62.2266 56.7926 62.2266C50.5836 62.2266 45.857 66.1152 45.8785 71.6797ZM51.8941 99.6953H78.4918V83.5391H72.3043V86.8477H57.9527V83.5391H51.8941V99.6953ZM51.8941 71.6797C51.8941 68.9512 53.9352 67.3828 56.7926 67.3828C59.5641 67.3828 61.5836 68.9512 61.5621 71.6797C61.5836 74.4297 59.5641 75.9121 56.7926 75.9336C53.9352 75.9121 51.8941 74.4297 51.8941 71.6797ZM57.9527 94.7109V91.6172H72.3043V94.7109H57.9527ZM96.1004 69.0586V63.6016H89.9129V69.0586C89.8914 76.4492 87.2059 83.9688 80.2449 87.1055L84.0262 92.1328C88.452 89.9844 91.3523 86.0957 93.0281 81.2832C94.618 85.752 97.3035 89.3613 101.429 91.3594L105.124 86.4609C98.5711 83.3027 96.0789 76.1914 96.1004 69.0586ZM106.284 100.125H112.471V80.832H118.057V75.6328H112.471V60.6797H106.284V100.125ZM132.658 70.9922V69.4453H140.564V64.418H118.264V69.4453H126.342V70.9922C126.342 77.6309 123.463 84.8711 116.631 87.8789L120.154 92.7344C124.773 90.6719 127.867 86.5898 129.607 81.627C131.348 86.1387 134.377 89.834 138.975 91.7461L142.283 86.8906C135.43 84.0977 132.658 77.2656 132.658 70.9922ZM143.916 100.125H150.146V60.6797H143.916V100.125ZM186.532 60.7227H180.302V83.4531H172.954V87.6211H180.302V90.457H186.532V60.7227ZM152.716 77.9531L153.404 82.8086C156.304 82.8086 159.548 82.7871 162.943 82.6367V87.6211H157.529V99.4805H187.349V94.5391H163.716V89.6406H169.173V82.2715C172.202 82.0137 175.275 81.6484 178.239 81.1328L177.896 76.75C169.624 77.7812 159.913 77.8887 152.716 77.9531ZM155.552 69.1016C155.552 73.3555 159.655 76.1055 165.478 76.1055C171.214 76.1055 175.361 73.3555 175.361 69.1016C175.361 64.9121 171.214 61.9688 165.478 61.9688C159.634 61.9688 155.552 64.9121 155.552 69.1016ZM161.396 69.1016C161.396 67.3613 163.05 66.4805 165.478 66.4805C167.82 66.4805 169.474 67.3613 169.517 69.1016C169.474 70.8418 167.82 71.6797 165.478 71.6797C163.05 71.6797 161.396 70.8418 161.396 69.1016ZM221.801 60.6797H215.571V100.211H221.801V60.6797ZM189.704 77.4805C189.704 86.2461 194.194 91.7031 200.274 91.7031C206.268 91.7031 210.737 86.2461 210.758 77.4805C210.737 68.8438 206.268 63.3652 200.274 63.3867C194.194 63.3652 189.704 68.8438 189.704 77.4805ZM195.719 77.4805C195.676 71.8516 197.502 68.9512 200.274 68.9727C202.959 68.9512 204.764 71.8516 204.786 77.4805C204.764 83.2168 202.959 86.0742 200.274 86.0742C197.502 86.0742 195.676 83.2168 195.719 77.4805ZM39.2656 122.227C33.4648 122.248 29.2754 125.535 29.2969 130.348C29.2754 134.15 32.0469 137.094 36.2148 138.039V140.896C33.0137 140.982 29.9414 141.004 27.3203 141.004L27.9219 145.859C34.4531 145.859 43.3477 145.688 51.3828 144.227L50.9102 139.801C48.2246 140.166 45.3242 140.445 42.4453 140.617V138.018C46.5059 137.008 49.1914 134.107 49.2344 130.348C49.1914 125.535 45.0234 122.248 39.2656 122.227ZM32.3477 159.438H60.5352V154.496H38.5781V148.137H32.3477V159.438ZM35.0547 130.348C35.0117 128.027 36.7949 126.889 39.2656 126.867C41.7578 126.889 43.4121 128.027 43.4336 130.348C43.4121 132.518 41.7578 133.699 39.2656 133.699C36.7949 133.699 35.0117 132.518 35.0547 130.348ZM53.0156 150.801H59.2031V137.953H63.9727V132.84H59.2031V120.723H53.0156V150.801ZM99.3273 150.844H90.8625V145.258H96.1906V140.273H73.5031V136.578H95.2883V123.129H67.2727V128.07H89.1867V131.68H67.3156V145.258H72.2141V150.844H63.2766V155.871H99.3273V150.844ZM78.2297 150.844V145.258H84.7609V150.844H78.2297ZM122.522 136.363H107.87V128.973H122.35V124.117H101.725V141.348H109.03V147.578C105.635 147.643 102.305 147.643 99.2758 147.621L99.9633 152.605C107.332 152.605 116.098 152.584 124.67 151.23L124.198 146.762C121.297 147.062 118.268 147.256 115.217 147.385V141.348H122.522V136.363ZM126.303 160.211H132.448V120.68H126.303V160.211ZM150.185 145.473V144.141H144.17V145.473C144.148 149.404 142.214 153.336 136.951 155.055L139.959 159.566C143.461 158.299 145.802 156.021 147.199 153.186C148.531 156.15 150.808 158.621 154.353 159.91C157.898 158.535 160.197 155.979 161.529 152.992C162.861 155.979 165.224 158.299 168.92 159.566L172.056 155.055C166.599 153.422 164.709 149.598 164.709 145.473V144.141H158.607V145.473C158.564 148.33 157.404 151.66 154.375 154.002C151.324 151.768 150.164 148.609 150.185 145.473ZM135.361 132.152C135.339 137.695 139.937 141.713 145.974 141.691C150.916 141.713 154.976 138.834 156.136 134.602H162.173V142.637H168.318V120.68H162.173V129.617H156.093C154.912 125.471 150.873 122.635 145.974 122.656C139.937 122.635 135.339 126.674 135.361 132.152ZM141.291 132.152C141.269 129.316 143.246 127.77 145.974 127.77C148.617 127.77 150.572 129.316 150.572 132.152C150.572 134.924 148.617 136.578 145.974 136.578C143.246 136.578 141.269 134.924 141.291 132.152ZM181.716 123.387C175.679 123.365 171.339 128.844 171.36 137.48C171.339 146.246 175.679 151.703 181.716 151.703C187.194 151.703 191.298 147.105 191.942 139.586H198.087V160.211H204.188V120.68H198.087V134.688H191.878C191.04 127.684 187.022 123.365 181.716 123.387ZM177.29 137.48C177.268 131.852 179.073 128.951 181.716 128.973C184.401 128.951 186.141 131.852 186.141 137.48C186.141 143.217 184.401 146.074 181.716 146.074C179.073 146.074 177.268 143.217 177.29 137.48ZM242.637 150.629H234.945V141.133C237.803 139.285 239.521 136.535 239.543 133.141C239.521 126.717 233.119 122.441 224.547 122.441C215.953 122.441 209.615 126.717 209.637 133.141C209.615 136.6 211.398 139.393 214.363 141.262V150.629H206.586V155.656H242.637V150.629ZM215.781 133.141C215.76 129.359 219.176 127.275 224.547 127.297C229.875 127.275 233.398 129.359 233.398 133.141C233.398 136.879 229.875 139.07 224.547 139.07C219.176 139.07 215.76 136.879 215.781 133.141ZM220.465 150.629V143.496C221.754 143.711 223.107 143.84 224.547 143.84C225.986 143.84 227.383 143.711 228.672 143.496V150.629H220.465ZM69.391 182.355H41.8051V187.211H63.225C63.2035 189.66 63.0531 192.174 62.2152 195.461L68.3598 196.191C69.391 192.045 69.391 188.65 69.391 185.621V182.355ZM37.852 202.379H73.602V197.48H56.8871V191.164H50.7855V197.48H37.852V202.379ZM41.8051 219.695H69.7777V214.797H48.0785V210.027H69.2621V205.215H41.8051V219.695ZM102.202 192.453H96.0145V195.762H81.1473V200.66H117.198V195.762H102.202V192.453ZM82.6082 190.047L84.5418 194.602C92.3621 194.129 97.1531 191.766 99.1297 188.436C101.128 191.787 105.897 194.129 113.761 194.602L115.694 190.047C108.733 189.725 105.253 188.027 103.985 186.223H113.889V181.582H84.4559V186.223H94.2312C92.9207 188.006 89.4187 189.725 82.6082 190.047ZM84.3699 208.867H113.804V204.27H102.202V201.648H95.9715V204.27H84.3699V208.867ZM86.9051 214.969C86.9051 218.406 91.3094 220.232 99.0652 220.211C106.714 220.232 111.268 218.406 111.268 214.969C111.268 211.596 106.714 209.748 99.0652 209.77C91.3094 209.748 86.9051 211.596 86.9051 214.969ZM93.3074 214.969C93.2859 214.066 95.1766 213.83 99.0652 213.809C102.997 213.83 104.78 214.066 104.823 214.969C104.78 215.828 102.997 216.193 99.0652 216.172C95.1766 216.193 93.2859 215.828 93.3074 214.969ZM152.982 200.66H117.018V205.516H152.982V200.66ZM120.498 189.961C120.477 195.074 126.256 198.232 134.979 198.254C143.658 198.232 149.438 195.074 149.459 189.961C149.438 184.934 143.658 181.818 134.979 181.84C126.256 181.818 120.477 184.934 120.498 189.961ZM121.271 219.48H148.857V214.539H127.459V207.922H121.271V219.48ZM126.943 189.961C126.9 187.834 129.801 186.717 134.979 186.695C140.156 186.717 143.057 187.834 143.057 189.961C143.057 192.217 140.156 193.248 134.979 193.227C129.801 193.248 126.9 192.217 126.943 189.961ZM171.7 181.754C165.577 181.754 160.979 185.578 161 190.863C160.979 196.105 165.577 199.908 171.7 199.93C177.737 199.908 182.334 196.105 182.356 190.863C182.334 185.578 177.737 181.754 171.7 181.754ZM166.887 206.547H187.426V208.438H167.016V219.695H194.559V214.883H173.032V212.906H193.614V201.82H166.887V206.547ZM166.973 190.863C166.952 188.221 168.971 186.803 171.7 186.781C174.385 186.803 176.362 188.221 176.34 190.863C176.362 193.506 174.385 194.924 171.7 194.945C168.971 194.924 166.952 193.506 166.973 190.863ZM187.426 200.316H193.614V180.68H187.426V200.316ZM229.441 180.68H223.211V220.211H229.441V180.68ZM197.343 197.48C197.343 206.246 201.834 211.703 207.914 211.703C213.908 211.703 218.377 206.246 218.398 197.48C218.377 188.844 213.908 183.365 207.914 183.387C201.834 183.365 197.343 188.844 197.343 197.48ZM203.359 197.48C203.316 191.852 205.142 188.951 207.914 188.973C210.599 188.951 212.404 191.852 212.425 197.48C212.404 203.217 210.599 206.074 207.914 206.074C205.142 206.074 203.316 203.217 203.359 197.48ZM60.0152 265.602V264.527H53.9996V265.602C53.9781 269.469 52.0445 273.293 46.7809 275.055L49.8316 279.523C53.3766 278.299 55.7184 276.021 57.1148 273.186C58.4039 276.129 60.6813 278.578 64.3551 279.867C67.8355 278.535 70.0914 276.021 71.402 273.057C72.777 276 75.1617 278.32 78.8785 279.523L81.8434 275.055C76.5582 273.465 74.6246 269.748 74.6676 265.602V264.527H68.566V265.602C68.5445 268.502 67.277 271.725 64.2262 273.98C61.1969 271.811 60.0367 268.674 60.0152 265.602ZM45.8785 252.195C45.857 257.717 50.5836 261.713 56.7926 261.691C62.9801 261.713 67.7066 257.717 67.7066 252.195C67.7066 246.588 62.9801 242.635 56.7926 242.613C50.5836 242.635 45.857 246.588 45.8785 252.195ZM51.8941 252.195C51.8941 249.359 53.9352 247.812 56.7926 247.812C59.5641 247.812 61.5836 249.359 61.5621 252.195C61.5836 254.967 59.5641 256.578 56.7926 256.578C53.9352 256.578 51.8941 254.967 51.8941 252.195ZM72.3043 262.938H78.4918V240.723H72.3043V262.938ZM99.1512 241.195C89.9559 241.217 84.6492 243.58 84.6707 247.898C84.6492 252.281 89.9559 254.623 99.1512 254.645C108.325 254.623 113.61 252.281 113.632 247.898C113.61 243.58 108.325 241.217 99.1512 241.195ZM81.1902 261.133H117.155V256.234H81.1902V261.133ZM85.2723 279.91H113.804V275.27H91.3738V273.465H112.858V263.023H85.2723V267.492H106.714V269.168H85.2723V279.91ZM91.159 247.898C91.1375 246.438 93.6082 245.707 99.1512 245.707C104.759 245.707 107.229 246.438 107.229 247.898C107.229 249.574 104.759 250.09 99.1512 250.133C93.6082 250.09 91.1375 249.574 91.159 247.898ZM150.404 240.68H144.26V255.633H136.955V260.66H144.26V280.125H150.404V240.68ZM116.502 268.652L119.639 273.465C133.604 266.568 137.17 256.879 137.17 244.762H118.393V249.574H130.939C130.102 257.953 126.213 263.818 116.502 268.652ZM187.134 240.68H181.204V280.125H187.134V240.68ZM153.146 257.781C153.124 266.805 156.519 272.305 161.739 272.305C166.616 272.305 169.925 267.664 170.441 259.93H172.997V278.363H178.841V241.195H172.997V255.031H170.398C169.753 247.705 166.488 243.344 161.739 243.344C156.519 243.344 153.124 248.822 153.146 257.781ZM158.818 257.781C158.796 251.873 159.849 249.188 161.739 249.188C163.716 249.188 164.833 251.873 164.833 257.781C164.833 263.732 163.716 266.375 161.739 266.375C159.849 266.375 158.796 263.732 158.818 257.781ZM224.723 270.629H217.032V261.133C219.889 259.285 221.608 256.535 221.629 253.141C221.608 246.717 215.205 242.441 206.633 242.441C198.039 242.441 191.702 246.717 191.723 253.141C191.702 256.6 193.485 259.393 196.45 261.262V270.629H188.672V275.656H224.723V270.629ZM197.868 253.141C197.846 249.359 201.262 247.275 206.633 247.297C211.961 247.275 215.485 249.359 215.485 253.141C215.485 256.879 211.961 259.07 206.633 259.07C201.262 259.07 197.846 256.879 197.868 253.141ZM202.551 270.629V263.496C203.84 263.711 205.194 263.84 206.633 263.84C208.073 263.84 209.469 263.711 210.758 263.496V270.629H202.551Z" fill="#222222"/>
                                        <g filter="url(#filter0_d_2_1903)">
                                        <path d="M204.177 287.211C200.748 300.011 187.589 307.606 174.789 304.177C161.989 300.748 154.394 287.589 157.823 274.789C161.252 261.989 174.411 254.394 187.211 257.823C200.011 261.252 207.606 274.411 204.177 287.211Z" fill="#FFD62C"/>
                                        </g>
                                        <path d="M172.34 287.635C172.34 290.83 174.325 293.703 177.376 294.52C180.427 295.337 183.582 293.844 185.18 291.076L172.34 287.635Z" fill="#242328"/>
                                        <path d="M178.242 290.999C176.371 290.498 174.552 290.471 173.081 290.833C173.913 292.612 175.44 294.001 177.413 294.529C179.348 295.049 181.324 294.634 182.918 293.558C181.822 292.455 180.187 291.518 178.242 290.999Z" fill="#F2614E"/>
                                        <path d="M167.289 269.615C166.976 269.532 166.69 269.335 166.497 269.047C166.073 268.411 166.245 267.553 166.881 267.13C170.15 264.954 173.904 263.854 177.739 263.95C178.501 263.968 179.106 264.604 179.087 265.366C179.069 266.128 178.433 266.733 177.671 266.715C174.408 266.635 171.207 267.575 168.414 269.434C168.07 269.664 167.661 269.716 167.289 269.618V269.615Z" fill="#23130F"/>
                                        <path d="M196.416 279.988C196.106 279.905 195.826 279.714 195.633 279.428C193.798 276.731 191.168 274.675 188.028 273.49C187.316 273.219 186.953 272.42 187.223 271.708C187.494 270.995 188.302 270.638 189.005 270.903C192.68 272.294 195.762 274.703 197.915 277.874C198.346 278.504 198.18 279.364 197.55 279.794C197.203 280.031 196.788 280.086 196.413 279.988H196.416Z" fill="#23130F"/>
                                        <path d="M175.888 277.924C176.398 276.02 175.588 274.148 174.078 273.744C172.569 273.339 170.931 274.555 170.421 276.46C169.911 278.364 170.721 280.236 172.23 280.641C173.74 281.045 175.377 279.829 175.888 277.924Z" fill="#23130F"/>
                                        <path d="M192.536 284.138C192.164 284.037 191.832 283.782 191.651 283.41C191.125 282.335 190.145 281.911 189.608 281.757C188.753 281.521 187.872 281.585 187.282 281.951C186.634 282.353 185.779 282.151 185.38 281.502C184.981 280.854 185.18 280 185.829 279.601C187.079 278.826 188.781 278.636 190.376 279.103C192.041 279.585 193.411 280.713 194.136 282.2C194.471 282.885 194.186 283.714 193.5 284.049C193.19 284.2 192.849 284.224 192.536 284.142V284.138Z" fill="#23130F"/>
                                        <g filter="url(#filter1_d_2_1903)">
                                        <path d="M258 167C258 180.255 247.255 191 234 191C220.745 191 210 180.255 210 167C210 153.745 220.748 143 234 143C247.252 143 258 153.748 258 167Z" fill="#FFD62C"/>
                                        </g>
                                        <path d="M218.802 166.416C218.378 166.416 217.966 166.201 217.736 165.811C217.386 165.221 217.579 164.458 218.166 164.108L223.117 161.158L218.166 158.207C217.576 157.857 217.386 157.095 217.736 156.505C218.086 155.914 218.848 155.724 219.439 156.074L226.178 160.091C226.553 160.316 226.784 160.721 226.784 161.158C226.784 161.594 226.553 162 226.178 162.224L219.439 166.241C219.239 166.361 219.021 166.416 218.802 166.416Z" fill="#23130F"/>
                                        <path d="M248.654 166.416C248.439 166.416 248.217 166.361 248.018 166.241L241.278 162.224C240.903 162 240.672 161.594 240.672 161.158C240.672 160.721 240.903 160.316 241.278 160.091L248.018 156.074C248.608 155.724 249.37 155.914 249.72 156.505C250.071 157.095 249.877 157.857 249.29 158.207L244.339 161.158L249.29 164.108C249.88 164.458 250.071 165.221 249.72 165.811C249.487 166.201 249.075 166.416 248.654 166.416Z" fill="#23130F"/>
                                        <path d="M217.496 170.507C219.518 178.046 226.019 183.566 233.73 183.566C241.441 183.566 247.944 178.046 249.963 170.507H217.496Z" fill="#23130F"/>
                                        <path d="M233.548 174.708C228.815 174.708 224.506 175.796 221.261 177.585C224.349 181.254 228.83 183.565 233.819 183.565C238.807 183.565 243.112 181.343 246.198 177.794C242.916 175.885 238.459 174.708 233.548 174.708Z" fill="#F2614E"/>
                                        <g filter="url(#filter2_d_2_1903)">
                                        <path d="M166.97 91.0296C176.343 100.402 176.343 115.598 166.97 124.968C157.598 134.341 142.405 134.341 133.032 124.968C123.656 115.598 123.656 100.402 133.032 91.0296C142.405 81.6568 157.598 81.6568 166.97 91.0296Z" fill="#FFD62C"/>
                                        </g>
                                        <path d="M140.004 121.662C146.519 126.05 155.102 125.946 160.959 120.851C166.814 115.755 168.101 107.268 164.653 100.209L140.004 121.662Z" fill="#23130F"/>
                                        <path d="M154.967 114.244C151.375 117.369 148.821 121.047 147.54 124.544C152.312 125.288 157.238 124.083 161.027 120.789C164.742 117.556 166.614 112.959 166.611 108.227C162.859 108.946 158.698 110.998 154.97 114.244H154.967Z" fill="#F2614E"/>
                                        <path d="M143.314 109.935C142.795 110.39 142.005 110.334 141.55 109.812C140.207 108.266 137.856 108.106 136.311 109.449C134.765 110.792 134.602 113.143 135.948 114.689C136.403 115.208 136.347 115.998 135.825 116.453C135.303 116.908 134.516 116.852 134.061 116.33C131.812 113.745 132.085 109.815 134.67 107.566C137.254 105.316 141.188 105.59 143.434 108.174C143.889 108.693 143.833 109.483 143.311 109.938L143.314 109.935Z" fill="#23130F"/>
                                        <path d="M160.068 95.3504C159.549 95.8052 158.759 95.7499 158.305 95.2274C156.962 93.6817 154.611 93.5219 153.065 94.8648C151.519 96.2077 151.356 98.5586 152.702 100.104C153.157 100.624 153.102 101.413 152.579 101.868C152.057 102.323 151.27 102.268 150.816 101.745C148.566 99.1609 148.84 95.2305 151.424 92.9811C154.008 90.7316 157.942 91.0051 160.188 93.5895C160.643 94.1089 160.588 94.8986 160.065 95.3534L160.068 95.3504Z" fill="#23130F"/>
                                        <g filter="url(#filter3_d_2_1903)">
                                        <path d="M102 184C102 197.255 91.2555 208 78 208C64.7445 208 54 197.255 54 184C54 170.745 64.7415 160 77.9969 160C91.2524 160 101.997 170.745 101.997 184" fill="#FFD62C"/>
                                        </g>
                                        <path d="M77.671 197.246C73.0916 197.246 68.6875 194.625 65.5864 190.058C65.2023 189.492 65.3498 188.721 65.9153 188.336C66.4808 187.952 67.2522 188.1 67.6364 188.665C70.3071 192.599 73.8692 194.766 77.671 194.766C81.4727 194.766 85.0348 192.599 87.7055 188.665C88.0897 188.1 88.8611 187.952 89.4266 188.336C89.9921 188.721 90.1397 189.492 89.7555 190.058C86.6544 194.625 82.2503 197.246 77.671 197.246Z" fill="#23130F"/>
                                        <path d="M73.1009 175.44C73.1009 173.434 71.4751 171.808 69.4682 171.808C68.2511 171.808 67.1754 172.407 66.5177 173.326C65.86 172.407 64.7844 171.805 63.5673 171.805C61.5604 171.805 59.9346 173.431 59.9346 175.437C59.9346 175.723 59.9715 175.997 60.0329 176.264C60.537 179.399 64.0222 182.706 66.5208 183.613C69.0164 182.706 72.5016 179.399 73.0057 176.264C73.0671 176 73.104 175.723 73.104 175.44" fill="#EA3E32"/>
                                        <path d="M94.4579 175.44C94.4579 173.434 92.832 171.808 90.8251 171.808C89.6081 171.808 88.5324 172.407 87.8747 173.326C87.217 172.407 86.1413 171.805 84.9242 171.805C82.9173 171.805 81.2915 173.431 81.2915 175.437C81.2915 175.723 81.3284 175.997 81.3899 176.264C81.8939 179.399 85.3791 182.706 87.8777 183.613C90.3733 182.706 93.8585 179.399 94.3626 176.264C94.4241 176 94.4609 175.723 94.4609 175.44" fill="#EA3E32"/>
                                        <g filter="url(#filter4_d_2_1903)">
                                        <path d="M70 48C70 61.2555 59.2555 72 46 72C32.7445 72 22 61.2555 22 48C22 34.7445 32.7445 24 46 24C59.2555 24 70 34.7445 70 48Z" fill="#FFD62C"/>
                                        </g>
                                        <path d="M34.4502 46.4697C36.0135 46.4697 37.2808 44.8708 37.2808 42.8984C37.2808 40.9261 36.0135 39.3271 34.4502 39.3271C32.8869 39.3271 31.6196 40.9261 31.6196 42.8984C31.6196 44.8708 32.8869 46.4697 34.4502 46.4697Z" fill="#23130F"/>
                                        <path d="M56.8213 46.4697C58.3846 46.4697 59.6519 44.8708 59.6519 42.8984C59.6519 40.9261 58.3846 39.3271 56.8213 39.3271C55.258 39.3271 53.9907 40.9261 53.9907 42.8984C53.9907 44.8708 55.258 46.4697 56.8213 46.4697Z" fill="#23130F"/>
                                        <path d="M45.6744 61.2462C41.095 61.2462 36.6909 58.6246 33.5899 54.0575C33.2057 53.492 33.3532 52.7206 33.9187 52.3364C34.4842 51.9523 35.2556 52.0998 35.6398 52.6653C38.3106 56.5992 41.8726 58.7659 45.6744 58.7659C49.4761 58.7659 53.0382 56.5992 55.7089 52.6653C56.0931 52.0998 56.8645 51.9523 57.43 52.3364C57.9955 52.7206 58.1431 53.492 57.7589 54.0575C54.6578 58.6246 50.2537 61.2462 45.6744 61.2462Z" fill="#23130F"/>
                                        <defs>
                                        <filter id="filter0_d_2_1903" x="147" y="252" width="68" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="5"/>
                                        <feGaussianBlur stdDeviation="5"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.545098 0 0 0 0 0.317647 0 0 0 0 0.811765 0 0 0 0.15 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_1903"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_1903" result="shape"/>
                                        </filter>
                                        <filter id="filter1_d_2_1903" x="200" y="138" width="68" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="5"/>
                                        <feGaussianBlur stdDeviation="5"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.545098 0 0 0 0 0.317647 0 0 0 0 0.811765 0 0 0 0.15 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_1903"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_1903" result="shape"/>
                                        </filter>
                                        <filter id="filter2_d_2_1903" x="116" y="79" width="68" height="67.9976" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="5"/>
                                        <feGaussianBlur stdDeviation="5"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.545098 0 0 0 0 0.317647 0 0 0 0 0.811765 0 0 0 0.15 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_1903"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_1903" result="shape"/>
                                        </filter>
                                        <filter id="filter3_d_2_1903" x="44" y="155" width="68" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="5"/>
                                        <feGaussianBlur stdDeviation="5"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.545098 0 0 0 0 0.317647 0 0 0 0 0.811765 0 0 0 0.15 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_1903"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_1903" result="shape"/>
                                        </filter>
                                        <filter id="filter4_d_2_1903" x="12" y="19" width="68" height="68" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="5"/>
                                        <feGaussianBlur stdDeviation="5"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0.545098 0 0 0 0 0.317647 0 0 0 0 0.811765 0 0 0 0.15 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_1903"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_1903" result="shape"/>
                                        </filter>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="center-box">
                                    <button type="button" className="purpleBtn mt40" onClick={()=>resetApplying()}>확인</button>
                                </div>
                            </div>
                        : this.state.applied === -1 ?
                        <div className="failPop">
                        <div className="ufoImg">
                            <svg width="280" height="260" viewBox="0 0 280 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2_1936)">
                                <path d="M140.444 41.666C158.493 41.666 173.125 36.1443 173.125 29.333C173.125 22.5217 158.493 17 140.444 17C122.395 17 107.764 22.5217 107.764 29.333C107.764 36.1443 122.395 41.666 140.444 41.666Z" fill="#23130F"/>
                                <path d="M206 46.4213C206 34.4416 176.003 24.7295 139 24.7295C101.997 24.7295 72 34.4416 72 46.4213C72 51.9803 78.4612 57.049 89.0822 60.8885C89.0822 60.8524 89.0714 60.8164 89.0714 60.7803C89.0714 52.9681 111.426 46.6376 139 46.6376C166.574 46.6376 188.929 52.9681 188.929 60.7803C188.929 60.8164 188.921 60.8524 188.918 60.8885C199.539 57.049 206 51.9803 206 46.4213Z" fill="#8379DB"/>
                                <path d="M188.928 60.7799C188.928 52.9677 166.573 46.6372 139 46.6372C111.426 46.6372 89.0713 52.9713 89.0713 60.7799C89.0713 60.816 89.0785 60.852 89.0821 60.8881C92.4388 62.0994 96.224 63.1845 100.337 64.1291C102.228 57.5967 118.813 52.4883 139 52.4883C159.187 52.4883 175.772 57.5967 177.663 64.1291C181.776 63.1845 185.561 62.0994 188.918 60.8881C188.918 60.852 188.928 60.816 188.928 60.7799Z" fill="#23130F"/>
                                <path d="M139 52.4883C118.813 52.4883 102.228 57.5967 100.337 64.1291C111.26 66.6346 124.593 68.1127 139 68.1127C153.406 68.1127 166.739 66.6346 177.663 64.1291C175.772 57.5967 159.187 52.4883 139 52.4883Z" fill="#8379DB"/>
                                <path d="M93.4908 45.6748C96.1044 45.6748 98.2232 44.2238 98.2232 42.4338C98.2232 40.6439 96.1044 39.1929 93.4908 39.1929C90.8771 39.1929 88.7583 40.6439 88.7583 42.4338C88.7583 44.2238 90.8771 45.6748 93.4908 45.6748Z" fill="#FFD62C"/>
                                <path d="M123.254 39.8491C125.868 39.8491 127.986 38.3981 127.986 36.6082C127.986 34.8182 125.868 33.3672 123.254 33.3672C120.64 33.3672 118.521 34.8182 118.521 36.6082C118.521 38.3981 120.64 39.8491 123.254 39.8491Z" fill="#FFD62C"/>
                                <path d="M184.65 45.6748C187.264 45.6748 189.382 44.2238 189.382 42.4338C189.382 40.6439 187.264 39.1929 184.65 39.1929C182.036 39.1929 179.917 40.6439 179.917 42.4338C179.917 44.2238 182.036 45.6748 184.65 45.6748Z" fill="#FFD62C"/>
                                <path d="M155.225 39.8491C157.839 39.8491 159.958 38.3981 159.958 36.6082C159.958 34.8182 157.839 33.3672 155.225 33.3672C152.611 33.3672 150.493 34.8182 150.493 36.6082C150.493 38.3981 152.611 39.8491 155.225 39.8491Z" fill="#FFD62C"/>
                                <path d="M139.407 73.8306C156.39 73.8306 170.157 70.2587 170.157 65.8526C170.157 61.4464 156.39 57.8745 139.407 57.8745C122.424 57.8745 108.657 61.4464 108.657 65.8526C108.657 70.2587 122.424 73.8306 139.407 73.8306Z" fill="#523AB1"/>
                                <path d="M138.69 76.6892C138.69 76.6892 148.584 76.1737 152.438 75.6617C156.291 75.1498 159.119 72.9615 159.248 72.1901C159.378 71.4186 159.378 70.6471 156.291 69.2303C153.205 67.8135 145.497 66.2705 138.817 66.2705C132.136 66.2705 124.428 67.8135 121.342 69.2303C118.255 70.6471 118.259 71.415 118.385 72.1901C118.511 72.9651 121.342 75.1498 125.195 75.6617C129.049 76.1773 138.943 76.6892 138.943 76.6892H138.687H138.69Z" fill="#23130F"/>
                                <path d="M199.286 250C199.286 250 153.01 74.5011 152.754 73.4736C152.498 72.4462 151.854 71.5449 150.572 71.1592C149.289 70.7734 142.349 70.002 139.266 70.002H138.949C135.866 70.002 128.926 70.7734 127.644 71.1592C126.362 71.5449 125.717 72.4462 125.461 73.4736C125.206 74.5011 78.5654 244.282 78.5654 244.282L199.286 250.004V250Z" fill="#FFD62C"/>
                                <path d="M134.808 233.489C137.077 229.404 138.888 221.834 138.063 217.363L149.135 210.128C151.699 216.624 149.545 226.29 147.46 230.868C147.46 230.868 146.516 232.487 145.454 233.024C144.391 233.561 141.586 234.329 134.808 233.489Z" fill="#438E6F"/>
                                <path d="M116.231 192.394C118.939 193.631 131.703 201.097 133.741 209.194C136.043 205.942 137.527 200.888 137.653 197.463C137.779 194.038 134.692 186.897 130.767 184.283C126.841 181.673 125.425 181.641 124.698 182.333C123.97 183.025 116.321 192.64 116.227 192.391L116.231 192.394Z" fill="#438E6F"/>
                                <path d="M125.472 160.385C129.157 158.586 133.814 156.001 135.744 151.762C136.774 154.895 139.803 158.121 141.345 159.231C142.882 160.345 148.072 163.327 149.534 164.61C150.997 165.894 153.244 168.147 153.673 168.547L142.353 178.126C141.863 176.06 140.491 175.025 137.52 173.461C134.548 171.9 130.27 168.716 128.685 166.355C127.1 163.994 125.379 160.136 125.472 160.381V160.385Z" fill="#438E6F"/>
                                <path d="M147.049 194.503C148.609 191.529 152.174 186.399 152.884 185.289C153.593 184.178 155.445 182.361 157.476 183.288C159.507 184.214 165.543 187.585 169.051 192.463C172.559 197.34 172.851 198.498 172.851 198.498L163.901 209.158C162.183 203.047 151.886 194.662 147.049 194.5V194.503Z" fill="#438E6F"/>
                                <path d="M150.424 140.643C149.603 145.593 150.59 154.645 154.159 161.189C156.421 163.86 159.1 164.264 160.534 164.714C161.967 165.165 166.019 164.35 166.019 164.35C162.172 159.318 159.612 150.572 160.296 146.375C157.508 145.308 152.92 142.803 150.428 140.64L150.424 140.643Z" fill="#438E6F"/>
                                <path d="M121.658 116.442C125.217 118.065 131.527 122.178 130.655 128.126C129.783 134.078 128.472 136.959 126.913 139.937C125.353 142.915 124.655 146.689 125.577 149.159C121.604 147.551 120.517 142.752 120.412 139.836C120.308 136.919 121.608 131.371 123.063 127.734C124.514 124.096 123.477 118.295 121.658 116.442Z" fill="#438E6F"/>
                                <path d="M139.58 98.6152C141.982 100.53 149.452 102.098 151.67 101.269C148.706 106.878 142.385 121.197 143.995 126.645C140.531 125.268 138.564 121.504 137.858 118.108C137.152 114.716 136.299 107.156 139.576 98.6152H139.58Z" fill="#438E6F"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_2_1936">
                                <rect width="134" height="233" fill="white" transform="translate(72 17)"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p className="fail-title">이런~ 파일 업로드에 문제가 생겼네요.<br/>다시 업로드 해보세요.</p>
                        <div className="center-box">
                            <button type="button" className="purpleBtn mt50" onClick={()=>resetApplying()}>확인</button>
                        </div>
                    </div>
                            : null
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecruitView;