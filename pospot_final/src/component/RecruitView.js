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
    }
 
    
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

        $(".cancelBtn").on('click',function(e){
            console.log(e);
            $(".box2").removeClass("after");
            $(".box2").addClass("before");
            $(".box2").html(`<div class="icon icon2">
                                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M40 8.82501H20C17.0313 8.83148 14.1849 10.0085 12.0786 12.1007C9.97241 14.1929 8.77632 17.0314 8.75 20V40C8.77632 42.9686 9.97241 45.8071 12.0786 47.8993C14.1849 49.9915 17.0313 51.1685 20 51.175H40C42.9687 51.1685 45.8151 49.9915 47.9214 47.8993C50.0276 45.8071 51.2237 42.9686 51.25 40V20C51.2237 17.0314 50.0276 14.1929 47.9214 12.1007C45.8151 10.0085 42.9687 8.83148 40 8.82501ZM48.75 40C48.75 42.3207 47.8281 44.5463 46.1872 46.1872C44.5462 47.8281 42.3206 48.75 40 48.75H20C17.6794 48.75 15.4538 47.8281 13.8128 46.1872C12.1719 44.5463 11.25 42.3207 11.25 40V20C11.2698 17.6924 12.2004 15.486 13.8392 13.8613C15.478 12.2365 17.6923 11.3249 20 11.325H40C42.3077 11.3249 44.522 12.2365 46.1608 13.8613C47.7996 15.486 48.7302 17.6924 48.75 20V40Z" fill="#222222"/>
                                            <path d="M42.5 18.75H17.5V21.25H42.5V18.75Z" fill="#222222"/>
                                            <path d="M42.5 28.75H17.5V31.25H42.5V28.75Z" fill="#222222"/>
                                            <path d="M30 38.75H17.5V41.25H30V38.75Z" fill="#222222"/>
                                        </svg>
                                        <p class="fileName fileName2">파일 업로드</p>
                                    </div>
                                    <input class="inp_f2" type="file" accept=".pdf, .hwp, .Docx, .xls, .pptx" required>`);
            
            $(".icon2").on('click',function(){
                $(".inp_f2").on('click');
            });
        });

      
        // 팝업 div 오픈/닫기 함수
        function show() {
            $(".background").addClass("show");
        }

        function close() {
            $(".background").removeClass("show");
        }

        // 파일 업로드시 첨부된 파일에 따라 아이콘 변경 22.05.04 은정

        
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
                                        {this.state.recruitLenght==='0' 
                                        ?
                                        <>
                                            <caption>공고 테이블(채용없음)</caption>
                                            <colgroup>
                                                <col width="*"/>
                                            </colgroup>
                                            
                                                        <p className="field2">
                                                            지금은 채용 계획이 없지만,<br/>이력서를 보내주시면 검토해볼게요.<br/>
                                                            <button id="show" className="purpleBtn mt50">입사지원</button>
                                                            {/* <button className="purpleBtn mt50" onClick={() => window.location.href=`https://www.jobkorea.co.kr/Recruit/GI_Read/38226031?Oem_Code=C1&logpath=1`}>입사지원</button> */}
                                            </p>
                                            </>
                                            :
                                            // 채용공고 디테일 페이지 하단도 데이터 붙이기 22.05.06 은정


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
                                                            <div className='onAnotherRecruit'onClick={()=>resetPage(data.recruit_id)} >
                                                                <p className="field">{data.recruit_title}</p><br/>
                                                            </div>

                                                            {/* <Link to={{
                                                                pathname:`/recruit/detail/${data.recruit_id}`,
                                                                state: {
                                                                    test:'aaa'
                                                                }}
                                                            }>
                                                                <p className="field">{data.recruit_title}</p><br/>
                                                            </Link> */}
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
                            <div className="recruitPop">
                                <form id="pospotForm" method="post">
                                    <p className="main-title">포스팟에 지원하세요</p>
                                    <p className="sub-title">제목</p>
                                    <input type="text" className="input-tit" placeholder="이름과 직군을 함께 적으면 좋아요"/>
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

                                            <input type="file" className="inp_f1" accept=".pdf, .hwp, .Docx, .xls, .pptx" id="resume-file" style={{visibility:"hidden", width:"0"}} required/>
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
                                                <input type="file" className="inp_f1" accept=".pdf, .hwp, .Docx, .xls, .pptx" id="portfolio-file" style={{visibility:"hidden", width:"0"}} required/>
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
                                        <button type="submit" className="purpleBtn mt75">지원하기</button>
                                    </div>
                                </form>
                            </div>
                            <button id="closeBtn" className="closeBtn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4L20.0708 20.0708" stroke="white" strokeWidth="2.5"/>
                                    <path d="M20 4L3.92921 20.0708" stroke="white" strokeWidth="2.5"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecruitView;