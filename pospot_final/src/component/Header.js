import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class Header extends Component
{

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         currentPage : '/'
    //     }
    //     selectPage =()=> this.setState(current => ({
    //         currentPage : current,
    //     }));
    // }

    componentDidMount() {
        // 포스팟로그 글 상세보기 팝업
        $(".content-pic, .log .main-title, .log .desc").on('click', function(){ 
            show();
        });
        
        $("#closeBtn").on('click',function(){ 
            close();
        });

        $(".header").attr('style', 'background-color : transparent;');

        // Top 메뉴 후버 기능 start 
        $('.intro').hover(function(){
            $(".intro").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
        }, function() {
            $(".intro").attr('style', '');
        });

        $('.pospotLog').hover(function(){
            $(".pospotLog").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
        }, function() {
            $(".pospotLog").attr('style', '');
        });

        $('.tmenurecruit').hover(function(){
            $(".tmenurecruit").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
        }, function() {
            $(".tmenurecruit").attr('style', '');
        });

        $('.tmenucontact').hover(function(){
            $(".tmenucontact").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
        }, function() {
            $(".tmenucontact").attr('style', '');
        });

        // 후버 처리 END
    

        
        

        // 헤더 클릭 시 메뉴 밑줄
        $(".header li a, .logo, .goLog").on('click', function(){
            if($(this).hasClass('intro') || $(this).hasClass('logo')) {
                $(".header").attr('style', 'background-color : transparent;');
                $(".top-div").attr('style', 'background-color : #EAECF9;');
            } else {
                $(".header").attr('style', 'background-color : #FFFFFF; background-color : transparent;');
                $(".top-div").attr('style', 'background-color : transparent;');
            }
            $(".header li a").removeAttr('style');
            $(window).scrollTop(0);
            
            if($(this).hasClass('logo')) {
                //$(".intro").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
            } else if($(this).hasClass('goLog')) {
               // $(".pospotLog").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
            } else {
                //$(this).attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
            }
        });

        // 헤더 IR 말풍선, 포스팟로그 링크버튼 말풍선
        $(".ir").on('click',function(){ 
            $(".ir").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
            $(".check").removeAttr('style');
            arrowShow(1);
        });

        $(".header, .container, .footer, .main").on('click',function(e){
            if(!$(e.target).hasClass('ir')){
                $(".ir").removeAttr('style');
                $(".check").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
                arrowClose(1);
            }
            if(!$(e.target).hasClass('aIcon')){
                arrowClose(2);
            }
            if(!$(e.target).hasClass('copy')){
                arrowClose(3);
            }
        });

        $(".content-logo .aIcon").on('click',function(){ 
            arrowShow(2);
        });

        $(".arrow2 .copy").on('click',function(){
            let a = $(".a").attr('href');
            copyToClipboard(a);
            arrowClose(2);
            arrowShow(3);
        });

        // 헤더 클릭시, 밑줄 22.05.02 by 은정

        
        $(".top-nav > .menu > ul > li").on("click", function() {
            //$(document).ready(function() {

           console.log()
                
                // if(url==="/") {
                   
                // $('.intro').hover(function(){
    
                //     $(".pospotLog").removeAttr('style');
                //     $(".tmenurecruit").removeAttr('style');
                //     $(".tmenucontact").removeAttr('style');
                    
                //     $(".intro").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
                // }, function() {
                //     $(".intro").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
                // });
                // }
                // else if(url==="/log") {
                   
                //     $(".intro").removeAttr('style');
                //     $(".tmenurecruit").removeAttr('style');
                //     $(".tmenucontact").removeAttr('style');
    
                //     $('.pospotLog').hover(function(){
                //         $(".pospotLog").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
                //     }, function() {
                //         $(".pospotLog").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
                //     });
                // }
    
                // else if(url==="/recruit/list") {
    
                //     $(".intro").removeAttr('style');
                //     $(".pospotLog").removeAttr('style');
                //     $(".tmenucontact").removeAttr('style');
    
                   
                //     $('.tmenurecruit').hover(function(){
                //         $(".tmenurecruit").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
                //     }, function() {
                //         $(".tmenurecruit").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
                //     });
                // }
                // else if(url==="/contact") {
                   
                //     $(".intro").removeAttr('style');
                //     $(".pospotLog").removeAttr('style');
                //     $(".tmenurecruit").removeAttr('style');
    
                //     $('.tmenucontact').hover(function(){
                //         $(".tmenucontact").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
                //     }, function() {
                //         $(".tmenucontact").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
                //     });
                // }
    
            })
           
    
            // 헤더 클릭시, 밑줄 22.05.02 by 은정


        // 채용공고 입사지원 팝업
        $("#show").on('click',function(){ 
            show(); 
        });

        $(".icon1").on('click',function(){
            $(".inp_f1").on('click');
        });

        $(".cancelBtn").on('click',function(e){
            console.log(e);
            $(".box2").removeClass("after");
            $(".box2").addClass("before");
            $(".box2").html(`<div className="icon icon2">
                                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M40 8.82501H20C17.0313 8.83148 14.1849 10.0085 12.0786 12.1007C9.97241 14.1929 8.77632 17.0314 8.75 20V40C8.77632 42.9686 9.97241 45.8071 12.0786 47.8993C14.1849 49.9915 17.0313 51.1685 20 51.175H40C42.9687 51.1685 45.8151 49.9915 47.9214 47.8993C50.0276 45.8071 51.2237 42.9686 51.25 40V20C51.2237 17.0314 50.0276 14.1929 47.9214 12.1007C45.8151 10.0085 42.9687 8.83148 40 8.82501ZM48.75 40C48.75 42.3207 47.8281 44.5463 46.1872 46.1872C44.5462 47.8281 42.3206 48.75 40 48.75H20C17.6794 48.75 15.4538 47.8281 13.8128 46.1872C12.1719 44.5463 11.25 42.3207 11.25 40V20C11.2698 17.6924 12.2004 15.486 13.8392 13.8613C15.478 12.2365 17.6923 11.3249 20 11.325H40C42.3077 11.3249 44.522 12.2365 46.1608 13.8613C47.7996 15.486 48.7302 17.6924 48.75 20V40Z" fill="#222222"/>
                                            <path d="M42.5 18.75H17.5V21.25H42.5V18.75Z" fill="#222222"/>
                                            <path d="M42.5 28.75H17.5V31.25H42.5V28.75Z" fill="#222222"/>
                                            <path d="M30 38.75H17.5V41.25H30V38.75Z" fill="#222222"/>
                                        </svg>
                                        <p className="fileName fileName2">파일 업로드</p>
                                    </div>
                                    <input className="inp_f2" type="file" accept=".pdf, .hwp, .Docx, .xls, .pptx" required>`);
            
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

        // 말풍선 오픈/닫기 함수
        function arrowShow(num) {
            $(".arrow"+num).addClass("show");
        }

        function arrowClose(num) {
            $(".arrow"+num).removeClass("show");
        }

        // 링크 복사 함수
        function copyToClipboard(val) {
            let t = document.createElement("textarea");
            document.body.appendChild(t);
            t.value = val;
            t.select();
            document.execCommand('copy');
            document.body.removeChild(t);
        }

        // 스크롤 값 확인
        // 스크롤 값 확인
        window.addEventListener('scroll', function(){
            //    // console.log(window.scrollY)
            //    console.log($(window).height())
            //    console.log($(".spacer").offset().top);
            //     console.log($(".spacer").height())
             //   let windowheight = $(window).height()
                let spaceroffset = $(".spacer").offset().top;
                let spacerheight = $("#txt1section").height()
                let scrollTop2 = $(window).scrollTop();
                
                            
                let txt2section = $("#txt2section").offset().top;
                let txt3section = $("#txt3section").offset().top;
                let txt4section = $("#txt4section").offset().top;
                let txt5section = $("#txt5section").offset().top;
                let txt6section = $("#txt6section").offset().top;

   
                // console.log(parseInt(spaceroffset))
                // console.log(parseInt(scrollTop2)) 
    
                if(scrollTop2 < spacerheight) {
                    $(".header").attr('style', 'background-color : #EAECF9;');
                   $("#txt1section .section2_desc p:last-child").attr('style','display : none; margin-top: 0px; opacity: 0;') 
                   $("#txt1section .section2_desc p:first-child").attr('style','display : block; margin-top: 300px; opacity:1;') 
                }

                // if(parseInt(spacerheight)-300 < parseInt(scrollTop2) ) {          
                //     console.log("1")         
                //     $("#parasec1").fadeOut(500, function() {
                //          $("#parasec2").show()                        
                //     });                    
                // } 

                // 수어 이미지 변형 추가 22.05.03 은정
                
                if(parseInt(spaceroffset) < parseInt(scrollTop2) ) {
                     $(".header").attr('style', 'background-color : #FFFFFF;');
                    //$(".header").animate({'background-color' : '#FFFFFF'});

                    $("#txt1section .section2_desc p:first-child").attr('style','display : none; margin-top: 0px opacity: 0;') 
                    $("#txt1section .section2_desc p:last-child").attr('style','display : block; margin-top: 300px; opacity:1;') 
                  

                }
    
                if(parseInt(txt2section-100) < parseInt(scrollTop2) ) {
                    $(".header").attr('style', 'background-color : #EAECF9;');
                    $("#txt3section .imgDiv3 svg").attr('style','transform : rotate(0deg);') 
                    $("#txt3section .section2_desc p:first-child").attr('style','display : none; margin-top: 0px; opacity: 0;') 
                    $("#txt3section .section2_desc p:last-child").attr('style','display : block; margin-top: 300px; opacity:1;') 
                }

                if(parseInt(txt3section-100) < parseInt(scrollTop2) ) {                
                    $(".header").attr('style', 'background-color : #FFFFFF;');
                    $("#txt3section .imgDiv3 svg").attr('style','transform : rotate(-45deg);') 
                    $("#txt3section .section2_desc p:last-child").attr('style','display : none; margin-top: 0px; opacity: 0;') 
                    $("#txt3section .section2_desc p:first-child").attr('style','display : block; margin-top: 300px; opacity:1;') 
                    
                }

                
                if(parseInt(txt3section-300) < parseInt(scrollTop2) ) {                
                
                    $("#fl1").fadeOut(500, function() {
                        $("#fl2").show()
                        
                   });
                  
                }

                if(parseInt(txt4section-100) < parseInt(scrollTop2) ) {                
                    $(".header").attr('style', 'background-color : #FFFFFF;');
                }

                if(parseInt(txt5section-100) < parseInt(scrollTop2) ) {                
                    $(".header").attr('style', 'background-color : #F9F9FD;');
                  
                }
                if(parseInt(txt6section-100) < parseInt(scrollTop2) ) {                
                    $(".header").attr('style', 'background-color : #FFFFFF;');
                }

               
            });

            // 외부 클릭시 팝업닫기 22.05.03 은정

            $(document).mouseup(function(e) {
                var OpendOne = e.target;

                if(OpendOne.hasChildNodes(e.target).length === 0) {
                    OpendOne.removeClass("show");
                }
            })
    }
    
    render(){
        return(
            <header className="header" /*style={{backgroundColor: #EAECF9;}}*/>
                <div className="top-nav">
                    <div className="logoClass">
                        <Link to='/'>
                            <svg width="145" id="logosvg" height="40" viewBox="0 0 145 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_582_4693)">
                                <path d="M17.0018 15.3158C16.3016 15.7666 15.7547 16.409 15.4302 17.1619C15.1058 17.9149 15.0183 18.7445 15.179 19.5457C15.3397 20.347 15.7412 21.0838 16.3329 21.6632C16.9245 22.2425 17.6796 22.6383 18.5027 22.8004C19.3258 22.9624 20.1798 22.8835 20.9568 22.5737C21.7337 22.2638 22.3987 21.737 22.8675 21.0597C23.3363 20.3824 23.5879 19.5851 23.5905 18.7688C23.5931 17.9525 23.3465 17.1538 22.8819 16.4737C22.2597 15.5628 21.2909 14.9292 20.1884 14.712C19.0858 14.4949 17.9397 14.7121 17.0018 15.3158Z" fill="#5E3C97"/>
                                <path d="M8.57621 3.09478C5.2616 5.22434 2.71164 8.3045 1.28059 11.9074C-0.150451 15.5103 -0.391521 19.4571 0.590878 23.1993C1.57328 26.9415 3.73037 30.2934 6.76245 32.7893C9.79453 35.2851 13.5511 36.801 17.5101 37.1263L19.4702 40L25.4261 36.1579C27.9834 35.2873 30.3212 33.8984 32.2845 32.0833C34.2479 30.2681 35.792 28.068 36.8146 25.629C37.8372 23.1899 38.3149 20.5674 38.2161 17.9353C38.1173 15.3032 37.4442 12.7216 36.2414 10.3614C35.0386 8.00129 33.3336 5.91655 31.2393 4.24532C29.1451 2.5741 26.7093 1.35451 24.0936 0.667442C21.4778 -0.0196285 18.7417 -0.15854 16.0665 0.25992C13.3913 0.678381 10.8382 1.64471 8.57621 3.09478ZM25.7943 28.0842C24.5407 28.8944 23.135 29.456 21.6576 29.7369L25.5777 35.4842L19.5568 39.3579L10.1139 25.5053C9.94066 25.2842 9.77822 25.0632 9.61578 24.821C8.36148 22.9485 7.70561 20.7568 7.73085 18.5224C7.7561 16.288 8.46134 14.1109 9.75765 12.2656C11.054 10.4203 12.8833 8.98929 15.0151 8.15312C17.1469 7.31694 19.4856 7.11293 21.7364 7.56692C23.9873 8.02091 26.0494 9.11254 27.663 10.7041C29.2765 12.2957 30.3691 14.316 30.8031 16.5104C31.2371 18.7047 30.993 20.9749 30.1016 23.0346C29.2103 25.0943 27.7115 26.8513 25.7943 28.0842Z" fill="#5E3C97"/>
                                <path d="M71.9156 9.94738C71.0566 9.92802 70.1992 10.0309 69.3708 10.2527L69.0243 10.3474C67.4842 10.85 66.1039 11.7311 65.0176 12.9053L62.6785 15.5264C62.0288 13.6195 60.7049 11.9981 58.9419 10.9502C57.1789 9.9022 55.0908 9.49544 53.0486 9.80212C51.0063 10.1088 49.1419 11.1091 47.7864 12.6253C46.4309 14.1416 45.672 16.0757 45.6445 18.0843V28.1369C45.6445 28.6952 45.8727 29.2307 46.2789 29.6255C46.685 30.0203 47.2359 30.2421 47.8103 30.2421H47.8428C48.4172 30.2421 48.9681 30.0203 49.3743 29.6255C49.7804 29.2307 50.0086 28.6952 50.0086 28.1369V25.6316C51.3414 26.404 52.8644 26.8113 54.416 26.8106C55.8205 26.8097 57.2042 26.4803 58.45 25.85C59.6959 25.2197 60.7674 24.3072 61.5739 23.1895L68.2446 15.7369C68.5678 15.4071 68.9315 15.1173 69.3275 14.8738C69.8363 14.4566 70.4411 14.165 71.0906 14.0236C71.7401 13.8822 72.4151 13.8952 73.0583 14.0616C73.7016 14.228 74.294 14.5428 74.7853 14.9792C75.2766 15.4157 75.6523 15.961 75.8805 16.5687C76.1087 17.1765 76.1827 17.8288 76.0961 18.4703C76.0096 19.1118 75.765 19.7236 75.3833 20.2536C75.0016 20.7836 74.4939 21.2162 73.9034 21.5148C73.3129 21.8133 72.657 21.969 71.9914 21.9685C71.316 21.9668 70.6513 21.8048 70.0549 21.4966C69.4585 21.1884 68.9486 20.7434 68.5695 20.2001C68.2053 19.8614 67.731 19.6567 67.2283 19.6214C66.7256 19.5862 66.226 19.7224 65.8155 20.0067C65.4051 20.291 65.1095 20.7055 64.9796 21.1789C64.8498 21.6523 64.8938 22.1548 65.1042 22.6C65.8673 23.6612 66.8836 24.5267 68.0661 25.1225C69.2486 25.7183 70.562 26.0267 71.894 26.0211C73.1684 26.0141 74.4268 25.7451 75.5866 25.2316C77.0101 24.5924 78.2114 23.5643 79.044 22.2727C79.8766 20.9811 80.3046 19.4819 80.2756 17.958C80.1132 13.2422 76.7995 10.0421 71.9156 9.94738ZM49.9328 19.0527V18.1895C49.9308 18.0442 49.9126 17.8995 49.8787 17.7579C50.0156 16.6553 50.5795 15.6446 51.4557 14.9317C52.3318 14.2188 53.4545 13.857 54.5953 13.9201C55.7361 13.9831 56.8094 14.4662 57.5968 15.271C58.3842 16.0758 58.8267 17.142 58.8342 18.2527C58.8352 19.0811 58.5908 19.8924 58.1303 20.5895L57.6105 21.179C57.5432 21.2528 57.485 21.334 57.4373 21.4211C56.5996 22.1896 55.492 22.6187 54.3402 22.6211C53.2923 22.6207 52.2777 22.2636 51.4726 21.6117C50.6674 20.9598 50.1226 20.0544 49.9328 19.0527Z" fill="#5E3C97"/>
                                <path d="M142.877 10.0842H131.723C131.228 10.1755 130.781 10.4321 130.459 10.8098C130.137 11.1874 129.961 11.6623 129.961 12.1527C129.961 12.643 130.137 13.1179 130.459 13.4955C130.781 13.8731 131.228 14.1297 131.723 14.221H135.178V24.1684C135.118 24.4727 135.129 24.786 135.208 25.0859C135.288 25.3858 135.434 25.6649 135.638 25.9034C135.841 26.1419 136.096 26.3339 136.384 26.4657C136.672 26.5975 136.987 26.6659 137.306 26.6659C137.624 26.6659 137.939 26.5975 138.227 26.4657C138.516 26.3339 138.77 26.1419 138.974 25.9034C139.177 25.6649 139.323 25.3858 139.403 25.0859C139.482 24.786 139.493 24.4727 139.434 24.1684V14.221H142.877C143.19 14.2787 143.512 14.2686 143.821 14.1913C144.13 14.114 144.417 13.9715 144.662 13.774C144.907 13.5765 145.105 13.3287 145.241 13.0485C145.376 12.7682 145.446 12.4624 145.446 12.1527C145.446 11.843 145.376 11.537 145.241 11.2568C145.105 10.9765 144.907 10.7288 144.662 10.5313C144.417 10.3338 144.13 10.1912 143.821 10.114C143.512 10.0367 143.19 10.0265 142.877 10.0842Z" fill="#5E3C97"/>
                                <path d="M123.646 21.2526C124.237 20.9163 124.7 20.403 124.967 19.7894C124.66 20.3775 124.206 20.8808 123.646 21.2526Z" fill="#5E3C97"/>
                                <path d="M90.5734 16.4526H85.4188C84.9423 16.4526 84.5525 15.9473 84.5525 15.3158C84.5259 15.066 84.592 14.8151 84.739 14.6086C84.8859 14.4021 85.104 14.2534 85.3538 14.1894H92.6526C93.1482 14.0981 93.5954 13.8415 93.9171 13.4639C94.2389 13.0863 94.415 12.6113 94.415 12.121C94.415 11.6307 94.2389 11.1558 93.9171 10.7782C93.5954 10.4005 93.1482 10.1439 92.6526 10.0526H85.1373C82.7224 10.0526 80.8057 12.3368 80.8057 15.2421C80.8057 18.1473 82.744 20.5999 85.2239 20.5999H90.281C90.4198 20.5858 90.5602 20.6002 90.6929 20.6422C90.8256 20.6842 90.9478 20.7528 91.0515 20.8436C91.1552 20.9344 91.2382 21.0453 91.2949 21.1693C91.3517 21.2933 91.381 21.4275 91.381 21.5631C91.381 21.6988 91.3517 21.833 91.2949 21.9569C91.2382 22.0809 91.1552 22.1918 91.0515 22.2826C90.9478 22.3735 90.8256 22.4421 90.6929 22.4841C90.5602 22.526 90.4198 22.5404 90.281 22.5263H82.9715C82.4759 22.6176 82.0286 22.8742 81.7069 23.2518C81.3851 23.6294 81.2091 24.1044 81.2091 24.5947C81.2091 25.085 81.3851 25.5599 81.7069 25.9376C82.0286 26.3152 82.4759 26.5718 82.9715 26.6631H90.5517C92.9558 26.6631 94.8833 24.4 94.8833 21.5052C94.8833 18.6105 92.9233 16.4526 90.5734 16.4526Z" fill="#5E3C97"/>
                                <path d="M124.88 10.8948C123.111 10.0703 121.098 9.88118 119.2 10.3609C117.301 10.8407 115.638 11.9583 114.506 13.5159C114.3 13.9628 114.261 14.4652 114.396 14.9369C114.53 15.4086 114.83 15.82 115.243 16.1004C115.655 16.3807 116.156 16.5125 116.658 16.4731C117.159 16.4336 117.631 16.2254 117.993 15.8843C118.319 15.4338 118.741 15.0568 119.231 14.7789C119.72 14.501 120.266 14.3288 120.83 14.2738C121.01 14.2634 121.191 14.2634 121.371 14.2738C121.893 14.2738 122.41 14.3737 122.892 14.5679C123.374 14.762 123.812 15.0465 124.181 15.4053C124.55 15.764 124.843 16.1898 125.043 16.6585C125.243 17.1272 125.345 17.6296 125.345 18.1369C125.347 18.7367 125.202 19.3283 124.923 19.8633C124.657 20.4768 124.193 20.9901 123.602 21.3264C122.944 21.7611 122.167 21.9923 121.371 21.9895C120.875 21.9887 120.383 21.8995 119.92 21.7264H119.833C119.001 21.4461 118.256 20.9643 117.668 20.3264L111.495 13.779C110.488 12.2518 109.004 11.0782 107.261 10.4299C105.518 9.78166 103.607 9.69282 101.809 10.1764C100.01 10.66 98.4177 11.6906 97.2651 13.1173C96.1125 14.5441 95.4601 16.2921 95.4033 18.1053C95.4033 18.179 95.4033 18.2422 95.4033 18.3159V28.3053C95.4033 28.8637 95.6315 29.3992 96.0377 29.794C96.4438 30.1888 96.9947 30.4106 97.5691 30.4106H97.6449C98.2193 30.4106 98.7702 30.1888 99.1763 29.794C99.5825 29.3992 99.8107 28.8637 99.8107 28.3053V25.6317C100.942 26.282 102.211 26.6753 103.521 26.7824C104.831 26.8895 106.149 26.7075 107.377 26.25C108.604 25.7925 109.71 25.0714 110.61 24.1405C111.511 23.2095 112.184 22.0928 112.578 20.8738L114.646 23.0738C115.723 24.2319 117.088 25.1017 118.61 25.6001L118.946 25.6948C119.716 25.8951 120.509 25.9976 121.306 26.0001H121.469C126.309 25.9053 129.59 22.7474 129.634 18.1159C129.652 16.5927 129.212 15.0977 128.367 13.8147C127.522 12.5317 126.31 11.5167 124.88 10.8948ZM104.153 22.6212C103.095 22.6194 102.071 22.2555 101.261 21.5934C100.451 20.9313 99.9072 20.0132 99.7241 19.0001V18.1896C99.7401 18.0532 99.7401 17.9154 99.7241 17.779C99.8182 16.9404 100.16 16.1462 100.708 15.4924C101.257 14.8385 101.988 14.353 102.814 14.0945C103.64 13.8359 104.526 13.8155 105.364 14.0355C106.201 14.2555 106.956 14.7066 107.536 15.3343C108.115 15.962 108.496 16.7395 108.631 17.5728C108.766 18.4061 108.65 19.2596 108.297 20.0302C107.944 20.8008 107.369 21.4556 106.641 21.9153C105.913 22.3751 105.064 22.6202 104.196 22.6212H104.153Z" fill="#5E3C97"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_582_4693">
                                <rect width="145" id="logosvg"  height="40" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </Link>
                    </div>
                    <div className="menu">
                        <ul>
                            <li><Link className='intro' to='/'>회사소개</Link></li>
                            <li><p className="ir">IR</p></li>
                            <li><Link className='pospotLog' to='/log'>포스팟 로그</Link></li>
                            <li><Link className='tmenurecruit' to='/recruit/list'>채용공고</Link></li>
                            <li><Link  className='tmenucontact' to='/contact'>제휴 및 문의</Link></li>
                        </ul>
                        <div className="arrow1">
                            <div className="window">
                                <div className="arrow-box1">
                                    <p> 곧 공개할 수 있도록 노력할게요.
                                        <span className="icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.56543 15.9899C8.56543 15.8587 8.65543 15.7612 8.83168 15.7012C10.4727 15.2791 11.9716 14.4274 13.1742 13.2337C14.3895 12.0351 15.251 10.5248 15.6642 8.8687C15.7204 8.69245 15.8179 8.6062 15.9492 8.6062C16.0804 8.6062 16.1779 8.69245 16.2379 8.8687C16.6496 10.5254 17.5114 12.0361 18.7279 13.2337C19.9418 14.436 21.4576 15.2884 23.1154 15.7012C23.1781 15.7191 23.2333 15.757 23.2726 15.8091C23.3118 15.8612 23.333 15.9247 23.3329 15.9899C23.3328 16.0547 23.3115 16.1176 23.2722 16.1691C23.2329 16.2206 23.1778 16.2577 23.1154 16.275C21.4598 16.7178 19.9478 17.5836 18.7279 18.7874C17.5129 19.9863 16.6515 21.4964 16.2379 23.1524C16.2201 23.2156 16.1824 23.2712 16.1303 23.3111C16.0783 23.351 16.0147 23.3729 15.9492 23.3737C15.8839 23.3733 15.8206 23.3515 15.7691 23.3115C15.7176 23.2715 15.6807 23.2156 15.6642 23.1524C15.2492 21.497 14.3879 19.9872 13.1742 18.7874C11.9654 17.5923 10.4702 16.7273 8.83168 16.275C8.65543 16.2187 8.56543 16.1249 8.56543 15.9899Z" fill="#FDE364"/>
                                                <path d="M0.982422 8.91373C0.982422 8.82373 1.04242 8.76747 1.15867 8.73747C2.25305 8.45757 3.25099 7.88603 4.04617 7.08372C4.85787 6.27064 5.44341 5.25985 5.74492 4.15123C5.77117 4.03498 5.83117 3.97498 5.92117 3.97498C6.01117 3.97498 6.08242 4.03498 6.13867 4.15123C6.41316 5.26086 6.9849 6.27469 7.79242 7.08372C8.60006 7.89308 9.61444 8.46513 10.7249 8.73747C10.7642 8.74634 10.7991 8.76898 10.8232 8.80131C10.8472 8.83364 10.8589 8.87351 10.8562 8.91373C10.8582 8.95378 10.8462 8.99329 10.8222 9.02545C10.7983 9.05762 10.7639 9.08044 10.7249 9.08997C9.61602 9.39084 8.60508 9.97647 7.79242 10.7887C6.99206 11.5854 6.42083 12.5828 6.13867 13.6762C6.08242 13.7925 6.00742 13.8525 5.92117 13.8525C5.83492 13.8525 5.77117 13.7925 5.74492 13.6762C5.43582 12.5839 4.85081 11.5895 4.04617 10.7887C3.2458 9.98355 2.25126 9.39845 1.15867 9.08997C1.04242 9.05998 0.982422 8.99998 0.982422 8.91373Z" fill="#FFC63A"/>
                                                <path d="M10.1515 3.4462C10.7831 3.31007 11.3592 2.98738 11.8052 2.51995C12.259 2.05313 12.5845 1.47702 12.7502 0.847446C12.8102 0.727446 12.8815 0.727446 12.9715 0.847446C13.1385 1.47651 13.4638 2.05231 13.9165 2.51995C14.3636 2.98592 14.9393 3.30834 15.5702 3.4462C15.6902 3.5362 15.6902 3.60745 15.5702 3.66745C14.9447 3.83084 14.3741 4.15816 13.9173 4.61564C13.4605 5.07312 13.134 5.64419 12.9715 6.26995C12.8815 6.3862 12.8102 6.3862 12.7502 6.26995C12.5864 5.64426 12.2589 5.07345 11.8016 4.6161C11.3442 4.15875 10.7734 3.83133 10.1477 3.66745C10.0315 3.60745 10.0315 3.5362 10.1477 3.4462H10.1515Z" fill="#FBB435"/>
                                            </svg>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;