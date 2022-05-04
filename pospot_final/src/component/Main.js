import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { ReactComponent as History } from '../resources/svg/History_img.svg';

// category
import { ReactComponent as News } from '../resources/svg/News2.svg';
import { ReactComponent as People } from '../resources/svg/People2.svg';
import { ReactComponent as Square } from '../resources/svg/Square2.svg';
import { ReactComponent as Insight } from '../resources/svg/Insight2.svg';

import { ReactComponent as ParaImg1 } from '../resources/svg/paraimg1.svg';
import { ReactComponent as ParaImg2 } from '../resources/svg/paraimg2.svg';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import $ from 'jquery';

// import $ from 'jquery';
// import ScrollMagic, { Controller, Scene } from 'scrollmagic';

class Main extends Component
{
    state = {
        logData : [],
        popupShow : false,
        popData : {},
        popImages : []
    };

    async logList() {
        try {
            //응답 성공
            const {data} = await axios.get('https://apipospot.anypot.co.kr/front/pospotLogList');
            this.setState({logData : data.data, popupShow : false});

            //console.log(this.state);

          } catch (error) {
            //응답 실패
           // console.error(error);
          }
        
    }

    openPop(data) {
        console.log(data)

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

        // Scroll Animation (sa, 스크롤 애니메이션)
        const saTriggerMargin = 500;
        const saTriggerMargin2 = 3200;
        const saElementList = document.querySelectorAll('.sa');
        // 헤더에서 헤더바 색상, 이미지 애니메이션과 같이 처리 22.05.03 은정
        // const hidden = document.querySelector('.section2 .copyDiv.hid1');
        // const hidden2 = document.querySelector('.section2 .copyDiv.hid2');

        

        const saFunc = function() {
            for (const element of saElementList) {
                if (!element.classList.contains('show')) {
                    if (window.innerHeight > element.getBoundingClientRect().top + saTriggerMargin) {
                        // element.classList.add('show');
                        // hidden.classList.add('sa');
                        
                        console.log(111)
                    } else if(window.scrollY > saTriggerMargin2) {
                        // hidden2.classList.add('sa');
                        // console.log(222)
                    }
                }
            }
        }

        // window.addEventListener('load', saFunc);
        // window.addEventListener('scroll', saFunc);
    }

    render(){
        // $(document).ready(function() {
        //     $(".intro").attr('style', 'border-bottom: 10px dot #222222; padding-bottom: 8px;');

        //     // Top 메뉴 후버 기능 start 
        //     $('.intro').hover(function(){
        //         $(".intro").attr('style', 'border-bottom: 2px solid #222222; padding-bottom: 8px;');
        //     }, function() {
        //         $(".intro").attr('style', 'border-bottom: 2px solid red; padding-bottom: 8px;');
        //     });
        // })
        const getLogList = Object.entries(this.state.logData).map((entrie) => {
            return entrie[1];
        });

        return(
            <div className='Main'>
                <div className="container" >
                    <div className="main">
                        <div className="contents wide"> 
                            <div className="section1">
                                <div className="imgDiv">
                                <div >
                                    <div className="box">
                                        <svg width="440" height="440"  viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_487_1796" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="440" height="440">
                                            <path d="M440 0H0V440H440V0Z" fill="url(#paint0_linear_487_1796)"/>
                                            </mask>
                                            <g mask="url(#mask0_487_1796)">
                                            <path d="M440 0H0.000366211V440H440V0Z" fill="url(#paint1_linear_487_1796)"/>
                                            <path d="M88.4104 72.24C99.7212 72.24 108.89 63.0708 108.89 51.76C108.89 40.4492 99.7212 31.28 88.4104 31.28C77.0996 31.28 67.9304 40.4492 67.9304 51.76C67.9304 63.0708 77.0996 72.24 88.4104 72.24Z" fill="#E4E42C"/>
                                            <path d="M396.82 196.84C344.69 189.71 238.79 163.74 179.85 143.76C120.9 123.78 86.9404 113.79 78.9404 111.79C70.9504 109.79 61.9604 104.8 36.9804 111.79C12.0004 118.78 -28.9596 138.77 -61.9296 156.75C-94.8996 174.73 -147.85 205.7 -185.82 227.68C-223.78 249.66 -258.75 268.64 -294.72 280.63C-330.69 292.62 -377.64 306.61 -402.62 310.6L-412.61 452.47L42.9704 445.48L372.67 303.61L396.82 196.84Z" fill="url(#paint2_linear_487_1796)"/>
                                            <path d="M88.9305 159.74C84.9305 156.74 70.9504 152.75 64.9504 150.75C58.9604 148.75 43.9705 142.76 43.9705 137.76C43.9705 132.76 49.9604 131.77 61.4504 126.77C72.9404 121.77 69.9404 118.78 69.9404 115.78C69.9404 113.9 68.3705 111.55 63.9905 108.38C57.6605 107.8 49.2505 108.34 36.9705 111.78C11.9904 118.77 -28.9696 138.76 -61.9396 156.74C-94.9096 174.72 -147.86 205.69 -185.83 227.67C-223.8 249.65 -258.76 268.63 -294.73 280.62C-330.7 292.61 -377.65 306.6 -402.63 310.59L-406.02 358.69C-393.52 357.2 -376.41 354.83 -361.67 351.55C-334.69 345.56 -315.71 332.57 -287.74 314.58C-259.77 296.6 -208.81 270.62 -180.84 257.63C-152.87 244.64 -69.9395 215.67 -38.9695 206.18C-7.99954 196.69 54.9405 182.7 73.9305 176.71C92.9105 170.72 92.9105 162.72 88.9205 159.73L88.9305 159.74Z" fill="url(#paint3_linear_487_1796)"/>
                                            <path d="M-38.9496 206.19C-7.97958 196.7 54.9604 182.71 73.9504 176.72C92.9304 170.73 92.9304 162.73 88.9404 159.74C84.9404 156.74 70.9604 152.75 64.9604 150.75C58.9704 148.75 43.9804 142.76 43.9804 137.76L-74.8796 217.99C-60.3896 213.05 -47.6196 208.86 -38.9396 206.2L-38.9496 206.19Z" fill="url(#paint4_linear_487_1796)"/>
                                            <path d="M330.89 89.7399C322.04 86.5799 318.24 88.4799 314.45 89.7399C310.66 90.9999 281.56 100.49 229.07 127.06C215.19 134.08 200.79 141.77 186.41 149.69L180.5 214.75L296.43 240.9L652.83 499.73V294.02C652.83 294.02 410.59 140.96 399.84 134.01C389.09 127.05 339.76 92.8999 330.9 89.7399H330.89Z" fill="url(#paint5_linear_487_1796)"/>
                                            <path d="M330.89 89.7399C322.04 86.5799 318.24 88.4799 314.45 89.7399C310.66 90.9999 281.56 100.49 229.07 127.06C215.19 134.08 200.79 141.77 186.41 149.69L180.5 214.75L296.43 240.9L652.83 499.73V294.02C652.83 294.02 410.59 140.96 399.84 134.01C389.09 127.05 339.76 92.8999 330.9 89.7399H330.89Z" fill="url(#paint6_linear_487_1796)"/>
                                            <path d="M409.771 140.34C410.601 140.86 411.47 141.42 412.38 142C411.47 141.42 410.591 140.87 409.771 140.34Z" fill="url(#paint7_linear_487_1796)"/>
                                            <path d="M424.59 149.74C425.43 150.27 426.29 150.81 427.16 151.37C426.28 150.81 425.43 150.27 424.59 149.74Z" fill="url(#paint8_linear_487_1796)"/>
                                            <path d="M416.18 144.41C416.89 144.86 417.61 145.32 418.36 145.79C417.61 145.32 416.89 144.86 416.18 144.41Z" fill="url(#paint9_linear_487_1796)"/>
                                            <path d="M405.97 137.93C406.23 138.1 406.5 138.26 406.77 138.44C406.5 138.27 406.23 138.1 405.97 137.93Z" fill="url(#paint10_linear_487_1796)"/>
                                            <path d="M409.77 140.34C409.2 139.98 408.65 139.63 408.12 139.29C408.65 139.63 409.19 139.97 409.77 140.34Z" fill="url(#paint11_linear_487_1796)"/>
                                            <path d="M366.86 111.93C367.35 112.26 367.84 112.58 368.34 112.91C367.85 112.58 367.36 112.26 366.86 111.93Z" fill="url(#paint12_linear_487_1796)"/>
                                            <path d="M274.82 105.36C277.08 104.37 279.25 103.43 281.32 102.55C279.25 103.43 277.08 104.37 274.82 105.36Z" fill="url(#paint13_linear_487_1796)"/>
                                            <path d="M197.33 143.72C198.91 142.86 200.49 142.01 202.06 141.17C200.48 142.02 198.91 142.87 197.33 143.72Z" fill="url(#paint14_linear_487_1796)"/>
                                            <path d="M218.78 132.33C220.01 131.69 221.24 131.06 222.47 130.43C221.24 131.06 220.02 131.69 218.78 132.33Z" fill="url(#paint15_linear_487_1796)"/>
                                            <path d="M202.78 140.78C204.24 140 205.69 139.22 207.14 138.45C205.69 139.22 204.23 140 202.78 140.78Z" fill="url(#paint16_linear_487_1796)"/>
                                            <path d="M213.51 135.08C214.77 134.42 216.03 133.76 217.29 133.1C216.03 133.76 214.77 134.41 213.51 135.08Z" fill="url(#paint17_linear_487_1796)"/>
                                            <path d="M208.19 137.89C209.54 137.17 210.89 136.46 212.23 135.75C210.88 136.46 209.54 137.17 208.19 137.89Z" fill="url(#paint18_linear_487_1796)"/>
                                            <path d="M652.81 294.03V499.74L296.42 240.9L180.49 214.75L186.4 149.69C146.39 171.75 106.61 195.69 79.1604 212.44C41.8404 235.21 4.5304 252.92 -18.2396 265.57C-41.0096 278.22 -67.5696 286.44 -122.6 308.58C-177.62 330.72 -307.28 378.15 -366.1 390.17C-403.42 398.39 -540.03 419.26 -592.52 427.49L-631.1 500.22H652.81V294.04V294.03Z" fill="url(#paint19_linear_487_1796)"/>
                                            <path d="M191.87 146.69C193.55 145.77 195.24 144.85 196.92 143.94C195.24 144.85 193.55 145.77 191.87 146.69Z" fill="url(#paint20_linear_487_1796)"/>
                                            <path d="M186.42 149.68C188.18 148.71 189.93 147.75 191.69 146.79C189.93 147.75 188.18 148.71 186.42 149.68Z" fill="url(#paint21_linear_487_1796)"/>
                                            <path d="M281.32 102.54C288.58 99.4401 294.67 96.9901 299.6 95.1001C294.68 97.0001 288.58 99.4501 281.32 102.54Z" fill="url(#paint22_linear_487_1796)"/>
                                            <path d="M267.76 108.5C270.21 107.4 272.56 106.35 274.83 105.36C272.57 106.35 270.21 107.4 267.76 108.5Z" fill="url(#paint23_linear_487_1796)"/>
                                            <path d="M357.23 105.57C357.59 105.8 357.94 106.04 358.3 106.27C357.94 106.03 357.58 105.8 357.23 105.57Z" fill="url(#paint24_linear_487_1796)"/>
                                            <path d="M256.11 113.86C260.2 111.94 264.09 110.16 267.76 108.5C264.09 110.16 260.2 111.94 256.11 113.86Z" fill="url(#paint25_linear_487_1796)"/>
                                            <path d="M303.53 93.6099C304.74 93.1599 305.86 92.7399 306.88 92.3699C305.86 92.7399 304.74 93.1499 303.53 93.6099Z" fill="url(#paint26_linear_487_1796)"/>
                                            <path d="M306.88 92.37C308.41 91.81 309.72 91.35 310.82 90.97C309.73 91.35 308.42 91.81 306.88 92.37Z" fill="url(#paint27_linear_487_1796)"/>
                                            <path d="M223.96 129.66C225.57 128.84 227.17 128.02 228.76 127.21C227.17 128.02 225.57 128.83 223.96 129.66Z" fill="url(#paint28_linear_487_1796)"/>
                                            <path d="M299.6 95.0999C301.01 94.5599 302.32 94.0599 303.53 93.6099C302.32 94.0599 301.01 94.5599 299.6 95.0999Z" fill="url(#paint29_linear_487_1796)"/>
                                            <path d="M399.82 134.02C410.57 140.98 652.81 294.03 652.81 294.03L399.82 134.02Z" fill="url(#paint30_linear_487_1796)"/>
                                            <path d="M322.57 88.01C318.77 87.96 316.77 88.96 314.44 89.74C310.65 91 281.55 100.49 229.06 127.06C176.57 153.62 116.48 189.67 79.1604 212.44C41.8404 235.21 4.5304 252.92 -18.2396 265.57C-41.0096 278.22 -67.5696 286.44 -122.6 308.58C-177.62 330.72 -307.28 378.15 -366.1 390.17C-403.42 398.39 -540.03 419.26 -592.52 427.49L-631.1 500.22H-168.77C-123.23 500.22 -32.7896 478.72 -9.38959 469.86C14.0104 461.01 56.3904 431.28 71.5704 419.26C86.7504 407.24 122.8 374.99 137.35 361.07C151.9 347.16 196.91 313 215.78 302.25C234.65 291.5 271.87 271.65 283.41 265.58C295.72 259.1 302.51 255.09 302.82 249.93C302.97 247.4 302.12 243.81 296.42 240.9C291.63 238.46 277.03 233.35 265.11 226.35C254.35 220.03 246.18 206.99 247.4 194.09C248.23 185.33 254.29 175.06 264.16 166.27C282.4 149.63 343.34 92.35 322.57 88V88.01Z" fill="url(#paint31_linear_487_1796)"/>
                                            <g clipPath="url(#clip0_487_1796)">
                                            <path d="M112.974 256.362C112.93 255.355 114.031 255.3 115.059 254.914L114.979 254.869L115.184 254.768L115.262 254.827C115.313 254.802 115.357 254.775 115.396 254.748L115.282 254.682L115.404 254.547L115.516 254.616C115.578 254.495 116.016 253.021 116.033 252.97C116.056 252.984 116.151 252.964 116.282 252.982C115.25 249.856 112.486 242.558 112.486 241.566C112.486 239.311 117.974 241.053 121.534 241.988C123.892 242.606 124.833 242.298 124.833 242.298L128.541 244.989L118.107 245.27C118.148 245.901 117.938 251.336 118.697 254.169C118.794 254.02 118.935 253.882 119.14 253.865L119.438 254.213L118.856 254.5C119.052 254.781 119.173 255.929 119.099 256.641H119.101C119.089 256.753 119.053 256.994 118.976 257.124V257.129H118.971C118.775 257.446 117.415 257.163 117.382 257.163L115.827 257.615C115.793 257.608 113.103 257.004 113.137 257.012L112.993 256.979C112.993 256.979 112.891 256.73 112.972 256.361H112.974L112.974 256.362Z" fill="#080F33"/>
                                            <path d="M127.523 230.222L126.659 228.641C126.659 228.641 125.275 230.123 123.843 232.888C122.41 235.655 122.262 237.936 121.372 237.936C120.483 237.936 115.632 239.904 115.632 239.904C115.632 239.904 117.472 240.462 117.222 241.31C116.973 242.158 122.226 240.462 123.758 240.462C125.289 240.462 127.523 230.222 127.523 230.222V230.222Z" fill="#951E07"/>
                                            <path d="M130.084 243.902H136.842C136.868 243.902 141.422 245.768 141.62 246.459C141.817 247.15 143.687 248.776 143.455 250.883C143.225 252.989 143.44 255.591 138.095 256.282C132.752 256.973 120.071 256.809 119.215 256.612C118.359 256.415 117.272 253.22 117.502 251.162C117.733 249.104 118.359 249.302 119.083 248.083C119.808 246.866 120.401 245.712 121.125 245.318C121.85 244.922 130.084 243.902 130.084 243.902Z" fill="#C2CEBC"/>
                                            <path d="M135.782 247.722C135.782 247.722 140.22 252.758 138.986 256.14C138.986 256.14 141.074 256.719 142.714 254.533C144.354 252.348 146.021 245.992 136.842 243.902L135.781 247.722H135.782Z" fill="#C2CEBC"/>
                                            <path d="M112.981 246.773L125.75 243.145C125.75 243.145 127.395 243.878 128.007 244.441C128.619 245.003 131.215 247.91 130.353 248.283C129.491 248.657 116.46 249.253 116.46 249.253C116.46 249.253 111.08 254.918 108.343 256.664C105.608 258.41 104.402 258.708 104.402 258.708L103.475 257.601L112.98 246.773L112.981 246.773Z" fill="#080F33"/>
                                            <path d="M126.659 228.641C126.659 228.641 123.905 238.185 123.905 239.408C123.905 240.631 120.933 241.581 120.933 241.581C120.933 241.581 128.672 247.789 130.352 248.283C130.352 248.283 133.655 244.59 132.34 239.606C130.934 234.276 133.228 230.913 132.809 229.579C132.389 228.246 128.907 226.394 126.658 228.641H126.659Z" fill="#C44127"/>
                                            <path d="M125.347 240.44C125.685 237.831 127.097 230.776 127.676 227.921C127.796 227.865 127.918 227.815 128.041 227.773C127.492 230.474 126.017 237.817 125.673 240.482C125.483 241.95 124.439 242.866 123.295 243.435C123.193 243.356 123.093 243.278 122.995 243.202C124.121 242.674 125.169 241.818 125.347 240.44L125.347 240.44Z" fill="#4A1004"/>
                                            <path d="M131.105 253.78L137.008 252.595C137.008 252.595 138.095 253.583 138.095 255.385C138.095 257.187 137.997 257.756 137.33 258.028C136.663 258.3 127.523 257.756 127.523 257.756L131.105 253.78V253.78Z" fill="#080F33"/>
                                            <path d="M135.255 255.114L137.503 254.891C137.503 254.891 138.034 255.916 137.503 256.448H134.736L135.255 255.114V255.114Z" fill="#C44127"/>
                                            <path d="M137.008 252.595C137.008 252.595 136.292 255.46 137.503 256.447H132.957V252.966L137.008 252.595Z" fill="#951E07"/>
                                            <path d="M136.366 251.162C136.366 251.162 135.329 256.644 137.33 258.028C137.33 258.028 135.723 258.348 134.464 258.348C133.205 258.348 131.796 258.62 130.858 258.62C129.92 258.62 128.857 258.104 128.857 258.104C128.857 258.104 126.213 258.694 125.324 258.348C124.435 258.002 121.001 258.496 121.001 258.496C121.001 258.496 119.371 254.916 120.285 252.595C120.285 252.595 128.976 251.342 131.895 251.162C133.011 251.093 136.366 251.162 136.366 251.162H136.366Z" fill="#C44127"/>
                                            <path d="M131.41 258.475L133.784 251.046L133.279 251.018L130.659 258.529L131.41 258.475Z" fill="#080F33"/>
                                            <path d="M132.623 258.475L133.321 258.397C131.945 257.02 131.238 251.194 131.232 251.132L130.47 251.214C130.5 251.472 131.165 257.019 132.623 258.475Z" fill="#080F33"/>
                                            <path d="M127.442 258.412L128.22 258.282C127.74 257.802 127.633 253.888 127.767 251.514L127.185 251.631C127.149 252.274 126.7 257.67 127.442 258.412Z" fill="#080F33"/>
                                            <path d="M122.23 258.368L122.823 258.293C122.625 257.605 124.289 254.127 125.415 251.821L124.703 251.918C124.411 252.517 121.935 257.339 122.23 258.368V258.368Z" fill="#080F33"/>
                                            <path d="M125.465 258.412L125.984 258.475C125.984 257.602 123.907 252.314 123.812 252.072L123.052 252.164C123.703 253.805 125.466 257.737 125.466 258.412H125.465Z" fill="#080F33"/>
                                            <path d="M132.399 222.213C132.399 222.213 131.098 223.081 130.472 224.387C129.847 225.693 125.144 228.242 125.144 228.242C125.144 228.242 127.883 228.937 127.957 229.011C128.031 229.086 133.27 226.75 133.27 226.75L132.399 222.213L132.399 222.213Z" fill="#951E07"/>
                                            <path d="M128.454 228.964C128.401 228.579 128.281 228.226 128.201 227.651C128.087 226.83 127.959 226.219 127.959 226.219L129.883 225.331C129.883 225.331 130.189 226.658 130.415 227.713C130.563 228.406 128.49 229.217 128.454 228.964H128.454Z" fill="#FAB4AD"/>
                                            <path d="M125.209 222.437C125.209 222.437 126.9 224.207 127.544 224.385C128.187 224.563 129.611 224.799 129.611 224.799C129.611 224.799 130.376 227.464 130.464 228.054C130.464 228.054 132.928 227.477 131.492 223.293C130.944 221.699 130.677 220.679 128.967 220.131C127.257 219.585 125.601 220.815 125.208 222.437L125.209 222.437Z" fill="#080F33"/>
                                            <path d="M126.392 221.79C126.392 221.79 125.355 222.257 125.331 223.099C125.308 223.941 125.546 224.338 125.535 224.744C125.523 225.151 125.641 225.895 126.228 227.003C126.815 228.111 128.377 227.304 129.229 226.389C130.188 225.36 130.258 225.066 130.113 223.566C129.968 222.064 128.045 220.995 126.392 221.79V221.79Z" fill="#FAB4AD"/>
                                            <path d="M125.297 221.11C125.297 221.11 124.46 221.329 124.642 222.147C124.824 222.963 126.957 223.771 128.339 223.473C128.857 223.36 128.876 223.675 129.096 223.86C129.461 224.171 129.785 224.562 129.53 225.238C129.122 226.319 128.628 225.812 128.628 225.812C128.628 225.812 129.081 226.406 130.28 225.959C131.478 225.512 131.511 223.673 130.531 222.686C129.551 221.699 128.579 221.279 127.802 221.085C126.116 220.662 125.297 221.109 125.297 221.109V221.11Z" fill="#080F33"/>
                                            <path d="M129.537 223.582C129.395 223.595 128.807 224.073 129.004 224.506C129.2 224.941 129.363 224.961 129.746 224.721C130.128 224.482 129.897 223.547 129.537 223.582Z" fill="#FAB4AD"/>
                                            <path d="M125.144 228.242C125.144 228.242 129.809 227.301 130.984 226.126C132.364 224.747 132.4 222.213 132.4 222.213C132.4 222.213 133.294 222.261 133.807 222.776C134.322 223.29 136.502 225.964 131.728 228.445C130.063 229.309 127.216 230.716 127.216 230.716L125.144 228.242V228.242Z" fill="#C44127"/>
                                            <path d="M103.526 255.699C103.526 255.699 103.11 257.094 102.955 257.547C102.8 258.001 101.239 258.129 100.455 258.66C99.672 259.19 100.223 260.311 100.223 260.311L103.255 260.951L105.066 260.483C105.066 260.483 106.358 260.748 106.801 260.53C107.245 260.311 107.037 257.499 106.671 257.374C106.305 257.249 104.846 256.85 104.548 256.243C104.249 255.635 103.526 255.699 103.526 255.699H103.526Z" fill="#C44127"/>
                                            <path d="M102.917 258.153C103.892 257.674 104.106 256.948 104.492 256.649C104.783 256.425 105.35 257.266 106.672 257.373C106.172 257.17 105.503 256.781 105.14 256.529C104.989 256.454 104.826 256.216 104.486 256.311C104.155 256.406 103.866 256.952 103.668 257.267C103.457 257.583 103.204 257.879 102.917 258.154V258.153Z" fill="#080F33"/>
                                            <path d="M102.811 257.498L103.734 258.072L103.645 258.217L102.671 257.652L102.811 257.498Z" fill="#ECF7E7"/>
                                            <path d="M102.559 257.75L103.364 258.355L103.258 258.407L102.325 257.865L102.559 257.75Z" fill="#ECF7E7"/>
                                            <path d="M104.866 259.927C104.647 259.852 103.592 260.404 103.16 260.529C102.849 260.619 100.987 259.861 100.036 259.569C99.942 259.989 100.06 260.275 100.06 260.275L103.293 261L105.066 260.483C105.066 260.483 106.358 260.748 106.801 260.529C106.921 260.47 106.993 260.221 107.028 259.888C106.173 259.824 105.009 259.975 104.865 259.927L104.866 259.927Z" fill="#080F33"/>
                                            <path d="M133.843 245.3C133.843 245.3 133.165 245.577 132.538 245.832C131.897 246.093 131.379 246.589 131.095 247.222C130.878 247.702 130.645 248.233 130.544 248.508C130.329 249.086 130.662 250.106 130.756 250.03C130.85 249.953 130.882 248.971 130.9 248.793C130.918 248.615 131.097 248.461 131.097 248.461C131.097 248.461 130.931 250.742 131.118 250.762C131.305 250.781 131.572 248.271 131.767 248.291C131.961 248.311 131.29 250.762 131.647 250.799C132.002 250.836 132.303 248.32 132.383 248.418C132.463 248.517 132.288 249.973 132.433 249.989C132.577 250.004 133.387 248.047 133.504 247.608C133.622 247.169 134.156 246.091 134.156 246.091L133.843 245.301V245.3Z" fill="#FAB4AD"/>
                                            <path d="M131.868 228.37C131.868 228.37 130.802 230.553 130.802 232.677C130.802 234.801 133.047 236.173 133.163 238.041C133.279 239.908 131.877 245.947 131.877 245.947C131.877 245.947 133.576 246.937 134.096 247.381C134.096 247.381 136.548 240.593 136.548 237.135C136.548 233.678 135.135 229.222 131.868 228.369V228.37Z" fill="#C44127"/>
                                            <path d="M117.5 240.132C117.5 240.132 118.146 241.117 117.956 242.031C117.766 242.945 117.182 240.69 117.067 241.029C116.953 241.369 116.907 242.787 116.599 242.579C116.29 242.371 116.429 240.832 116.262 240.915C116.096 240.997 116.138 242.538 115.792 242.313C115.447 242.087 115.532 241.021 115.352 241.013C115.173 241.004 115.35 242.222 115.063 241.873C114.777 241.523 114.404 240.953 114.494 240.684C114.584 240.414 114.901 240.105 115.261 240.044C115.62 239.983 115.656 239.721 116.437 239.879C117.218 240.038 117.499 240.131 117.499 240.131L117.5 240.132Z" fill="#FAB4AD"/>
                                            </g>
                                            </g>
                                            <defs>
                                            <linearGradient id="paint0_linear_487_1796" x1="2.62001" y1="14.12" x2="428.33" y2="417.31" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#416BD1"/>
                                            <stop offset="1" stopColor="#416BD0"/>
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_487_1796" x1="2.62037" y1="14.12" x2="428.33" y2="417.31" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#3A79BE"/>
                                            <stop offset="1" stopColor="#3273BA"/>
                                            </linearGradient>
                                            <linearGradient id="paint2_linear_487_1796" x1="146.92" y1="193.66" x2="-166.54" y2="413.3" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#7EAE7E"/>
                                            <stop offset="1" stopColor="#6EA46E"/>
                                            </linearGradient>
                                            <linearGradient id="paint3_linear_487_1796" x1="11.0305" y1="143.86" x2="-293.91" y2="318.72" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#3D6D3D"/>
                                            <stop offset="0.36" stopColor="#538852"/>
                                            <stop offset="1" stopColor="#3D6D3D"/>
                                            </linearGradient>
                                            <linearGradient id="paint4_linear_487_1796" x1="177.18" y1="92.35" x2="-57.3896" y2="222.43" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#325431"/>
                                            <stop offset="1" stopColor="#3F6140"/>
                                            </linearGradient>
                                            <linearGradient id="paint5_linear_487_1796" x1="415.18" y1="401.99" x2="422.34" y2="183.74" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#462517"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint6_linear_487_1796" x1="415.18" y1="401.99" x2="422.34" y2="183.74" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.05" stopColor="#2D402D"/>
                                            <stop offset="0.78" stopColor="#385738"/>
                                            <stop offset="1" stopColor="#3E653E"/>
                                            </linearGradient>
                                            <linearGradient id="paint7_linear_487_1796" x1="411.061" y1="141.16" x2="411.56" y2="141.67" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint8_linear_487_1796" x1="425.87" y1="150.54" x2="426.36" y2="151.04" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint9_linear_487_1796" x1="417.27" y1="145.09" x2="417.68" y2="145.52" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint10_linear_487_1796" x1="406.37" y1="138.18" x2="406.52" y2="138.34" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint11_linear_487_1796" x1="408.94" y1="139.81" x2="409.25" y2="140.13" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint12_linear_487_1796" x1="367.59" y1="112.42" x2="367.88" y2="112.71" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint13_linear_487_1796" x1="278.06" y1="103.94" x2="278.48" y2="104.37" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint14_linear_487_1796" x1="199.69" y1="142.44" x2="199.93" y2="142.69" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint15_linear_487_1796" x1="220.62" y1="131.38" x2="220.82" y2="131.58" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint16_linear_487_1796" x1="204.96" y1="139.61" x2="205.18" y2="139.84" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint17_linear_487_1796" x1="215.39" y1="134.09" x2="215.6" y2="134.3" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint18_linear_487_1796" x1="210.2" y1="136.82" x2="210.42" y2="137.04" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint19_linear_487_1796" x1="62.3404" y1="453.69" x2="199.17" y2="604.04" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#497149"/>
                                            <stop offset="0.52" stopColor="#385738"/>
                                            <stop offset="1" stopColor="#315131"/>
                                            </linearGradient>
                                            <linearGradient id="paint20_linear_487_1796" x1="194.39" y1="145.31" x2="194.64" y2="145.58" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint21_linear_487_1796" x1="189.05" y1="148.23" x2="189.31" y2="148.5" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint22_linear_487_1796" x1="290.44" y1="98.8001" x2="291.67" y2="100.06" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint23_linear_487_1796" x1="271.28" y1="106.92" x2="271.72" y2="107.37" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint24_linear_487_1796" x1="357.77" y1="105.92" x2="357.97" y2="106.13" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint25_linear_487_1796" x1="261.92" y1="111.17" x2="262.63" y2="111.89" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint26_linear_487_1796" x1="305.2" y1="92.9799" x2="305.44" y2="93.2299" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint27_linear_487_1796" x1="308.84" y1="91.67" x2="309.13" y2="91.96" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint28_linear_487_1796" x1="226.36" y1="128.43" x2="226.62" y2="128.7" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint29_linear_487_1796" x1="301.56" y1="94.3499" x2="301.84" y2="94.6299" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#7D4028"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint30_linear_487_1796" x1="524.95" y1="255.79" x2="527.66" y2="173.2" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.18" stopColor="#462517"/>
                                            <stop offset="1" stopColor="#763C27"/>
                                            </linearGradient>
                                            <linearGradient id="paint31_linear_487_1796" x1="206.95" y1="198.4" x2="-316.24" y2="456.46" gradientUnits="userSpaceOnUse">
                                            <stop offset="0.06" stopColor="#ECF8E7"/>
                                            <stop offset="1" stopColor="#ECF4E8"/>
                                            </linearGradient>
                                            <clipPath id="clip0_487_1796">
                                            <rect width="44" height="41" fill="white" transform="matrix(-1 0 0 1 144 220)"/>
                                            </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    </div>
                                    <div >
                                    <div className="box rev">
                                        <svg width="440" height="440" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_487_1716" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="440" height="440">
                                            <path d="M440 0H0V440H440V0Z" fill="#4F7CD7"/>
                                            </mask>
                                            <g mask="url(#mask0_487_1716)">
                                            <path d="M440 0H0V440H440V0Z" fill="#7661CC"/>
                                            <path d="M443.33 167.93L167.18 440H439.92L443.33 167.93Z" fill="#9EBE51"/>
                                            <path d="M478.74 141L413.61 203.25L174.87 440H159.5L370.91 228.59L142.32 0H157.68L378.59 220.91L413.61 187.88L456.29 145.98L478.74 141Z" fill="white"/>
                                            <g style={{mixBlendMode:"multiply"}}>
                                            <path d="M360.572 93.2731C365.856 87.7498 367.088 80.3538 363.325 76.7537C359.561 73.1536 352.227 74.7126 346.944 80.236C341.66 85.7593 340.427 93.1553 344.191 96.7554C347.954 100.356 355.288 98.7965 360.572 93.2731Z" fill="#371B0B"/>
                                            </g>
                                            <g style={{mixBlendMode:"multiply"}}>
                                            <path d="M298.099 285.028C303.382 279.504 304.615 272.108 300.852 268.508C297.088 264.908 289.754 266.467 284.47 271.991C279.187 277.514 277.954 284.91 281.717 288.51C285.481 292.11 292.815 290.551 298.099 285.028Z" fill="#371B0B"/>
                                            </g>
                                            <g style={{mixBlendMode:"multiply"}}>
                                            <path d="M259.63 249.766C264.913 244.242 266.146 236.846 262.383 233.246C258.619 229.646 251.285 231.205 246.001 236.728C240.718 242.252 239.485 249.648 243.248 253.248C247.012 256.848 254.346 255.289 259.63 249.766Z" fill="#371B0B"/>
                                            </g>
                                            <g style={{mixBlendMode:"multiply"}}>
                                            <path d="M307.374 348.142C312.657 342.618 313.89 335.222 310.127 331.622C306.363 328.022 299.029 329.581 293.745 335.105C288.462 340.628 287.229 348.024 290.992 351.624C294.756 355.224 302.09 353.665 307.374 348.142Z" fill="#371B0B"/>
                                            </g>
                                            <g style={{mixBlendMode:"multiply"}}>
                                            <path d="M188.017 383.563C193.3 378.04 194.533 370.644 190.77 367.044C187.006 363.444 179.672 365.003 174.388 370.526C169.105 376.05 167.872 383.446 171.635 387.046C175.399 390.646 182.733 389.087 188.017 383.563Z" fill="#371B0B"/>
                                            </g>
                                            <path d="M306.416 270.543C307.958 264.205 304.07 257.818 297.732 256.277C291.394 254.735 285.007 258.623 283.465 264.961C281.924 271.299 285.812 277.686 292.15 279.228C298.487 280.769 304.875 276.881 306.416 270.543Z" fill="#E4E42C"/>
                                            <path d="M256.95 246.72C263.473 246.72 268.76 241.433 268.76 234.91C268.76 228.388 263.473 223.1 256.95 223.1C250.428 223.1 245.14 228.388 245.14 234.91C245.14 241.433 250.428 246.72 256.95 246.72Z" fill="#E4E42C"/>
                                            <path d="M316.666 334.619C318.694 328.419 315.312 321.75 309.112 319.723C302.913 317.695 296.244 321.077 294.216 327.277C292.189 333.476 295.571 340.145 301.77 342.173C307.97 344.2 314.639 340.818 316.666 334.619Z" fill="#E4E42C"/>
                                            <path d="M369.261 77.5686C370.802 71.2308 366.914 64.8435 360.577 63.302C354.239 61.7606 347.852 65.6487 346.31 71.9865C344.769 78.3242 348.657 84.7115 354.994 86.253C361.332 87.7944 367.72 83.9063 369.261 77.5686Z" fill="#E4E42C"/>
                                            <g style={{mixBlendMode:"multiply"}}>
                                            <path d="M276.926 120.998C282.21 115.474 283.442 108.078 279.679 104.478C275.915 100.878 268.581 102.437 263.298 107.961C258.014 113.484 256.781 120.88 260.545 124.48C264.308 128.08 271.642 126.521 276.926 120.998Z" fill="#371B0B"/>
                                            </g>
                                            <path d="M274.13 114.32C280.653 114.32 285.94 109.032 285.94 102.51C285.94 95.9875 280.653 90.7 274.13 90.7C267.608 90.7 262.32 95.9875 262.32 102.51C262.32 109.032 267.608 114.32 274.13 114.32Z" fill="#E4E42C"/>
                                            <path d="M185.16 378.75C191.683 378.75 196.97 373.462 196.97 366.94C196.97 360.417 191.683 355.13 185.16 355.13C178.638 355.13 173.35 360.417 173.35 366.94C173.35 373.462 178.638 378.75 185.16 378.75Z" fill="#E4E42C"/>
                                            <g style={{mixBlendMode:"multiply"}}>
                                            <path d="M340.67 420.69L335.24 417.42L296.44 378.62L291.47 374.37L290.74 375.1C289.98 374.38 288.52 372.9 286.7 370.6C284.23 367.46 280.57 362.1 277.22 354.39C273.78 346.48 270.34 335.06 267.28 321.36C264.96 310.97 263.65 302.85 263.64 302.77C261.44 289.15 253.52 274.69 241.92 263.09C229.56 250.73 214.21 242.82 198.69 240.8C191.08 239.81 183.84 240.3 177.16 242.24C170.2 244.27 164.17 247.8 159.23 252.73C154.29 257.66 150.77 263.69 148.74 270.66C146.8 277.34 146.31 284.58 147.3 292.19C149.31 307.71 157.23 323.06 169.59 335.42C181.19 347.02 195.65 354.94 209.26 357.14C209.34 357.15 217.46 358.46 227.85 360.78C241.55 363.84 252.97 367.28 260.88 370.72C273.28 376.11 279.8 382.35 281.59 384.24L280.86 384.97L285.11 389.94L323.91 428.74L327.18 434.17C327.94 435.43 329.55 435.89 330.86 435.22L337.23 431.94C337.75 431.67 338.17 431.25 338.44 430.73L341.72 424.36C342.4 423.05 341.94 421.44 340.67 420.68V420.69ZM260.95 316.72L259.34 315.11L261.02 313.43C261.03 314.54 261.02 315.64 260.96 316.72H260.95ZM229.82 302.09L226.34 298.61L229.82 295.13L233.3 298.61L229.82 302.09ZM233.95 299.25L237.43 302.73L233.95 306.21L230.47 302.73L233.95 299.25ZM187.93 294.48L184.45 297.96L180.97 294.48L184.45 291L187.93 294.48ZM185.09 290.35L188.57 286.87L192.05 290.35L188.57 293.83L185.09 290.35ZM188.57 295.12L192.05 298.6L188.57 302.08L185.09 298.6L188.57 295.12ZM189.21 294.48L192.69 291L196.17 294.48L192.69 297.96L189.21 294.48ZM209.2 297.96L205.72 294.48L209.2 291L212.68 294.48L209.2 297.96ZM213.33 295.12L216.81 298.6L213.33 302.08L209.85 298.6L213.33 295.12ZM208.56 298.6L205.08 302.08L201.6 298.6L205.08 295.12L208.56 298.6ZM200.95 297.96L197.47 294.48L200.95 291L204.43 294.48L200.95 297.96ZM196.82 293.83L193.34 290.35L196.82 286.87L200.3 290.35L196.82 293.83ZM196.82 295.11L200.3 298.59L196.82 302.07L193.34 298.59L196.82 295.11ZM200.95 299.24L204.43 302.72L200.95 306.2L197.47 302.72L200.95 299.24ZM205.08 303.37L208.56 306.85L205.08 310.33L201.6 306.85L205.08 303.37ZM205.72 302.73L209.2 299.25L212.68 302.73L209.2 306.21L205.72 302.73ZM213.33 303.37L216.81 306.85L213.33 310.33L209.85 306.85L213.33 303.37ZM213.97 302.73L217.45 299.25L220.93 302.73L217.45 306.21L213.97 302.73ZM218.1 298.6L221.58 295.12L225.06 298.6L221.58 302.08L218.1 298.6ZM221.58 303.37L225.06 306.85L221.58 310.33L218.1 306.85L221.58 303.37ZM222.22 302.73L225.7 299.25L229.18 302.73L225.7 306.21L222.22 302.73ZM225.7 297.96L222.22 294.48L225.7 291L229.18 294.48L225.7 297.96ZM221.57 293.83L218.09 290.35L221.57 286.87L225.05 290.35L221.57 293.83ZM220.93 294.47L217.45 297.95L213.97 294.47L217.45 290.99L220.93 294.47ZM213.32 293.83L209.84 290.35L213.32 286.87L216.8 290.35L213.32 293.83ZM209.19 289.7L205.71 286.22L209.19 282.74L212.67 286.22L209.19 289.7ZM208.55 290.34L205.07 293.82L201.59 290.34L205.07 286.86L208.55 290.34ZM200.94 289.7L197.46 286.22L200.94 282.74L204.42 286.22L200.94 289.7ZM196.81 285.57L193.33 282.09L196.81 278.61L200.29 282.09L196.81 285.57ZM196.17 286.21L192.69 289.69L189.21 286.21L192.69 282.73L196.17 286.21ZM188.56 285.57L185.08 282.09L188.56 278.61L192.04 282.09L188.56 285.57ZM187.92 286.21L184.44 289.69L180.96 286.21L184.44 282.73L187.92 286.21ZM183.79 290.34L180.31 293.82L176.83 290.34L180.31 286.86L183.79 290.34ZM183.79 298.59L180.31 302.07L176.83 298.59L180.31 295.11L183.79 298.59ZM184.43 299.23L187.91 302.71L184.43 306.19L180.95 302.71L184.43 299.23ZM188.56 303.36L192.04 306.84L188.56 310.32L185.08 306.84L188.56 303.36ZM189.2 302.72L192.68 299.24L196.16 302.72L192.68 306.2L189.2 302.72ZM196.81 303.36L200.29 306.84L196.81 310.32L193.33 306.84L196.81 303.36ZM200.94 307.49L204.42 310.97L200.94 314.45L197.46 310.97L200.94 307.49ZM205.07 311.62L208.55 315.1L205.07 318.58L201.59 315.1L205.07 311.62ZM205.71 310.98L209.19 307.5L212.67 310.98L209.19 314.46L205.71 310.98ZM213.32 311.62L216.8 315.1L213.32 318.58L209.84 315.1L213.32 311.62ZM213.96 310.98L217.44 307.5L220.92 310.98L217.44 314.46L213.96 310.98ZM221.57 311.62L225.05 315.1L221.57 318.58L218.09 315.1L221.57 311.62ZM222.21 310.98L225.69 307.5L229.17 310.98L225.69 314.46L222.21 310.98ZM226.34 306.85L229.82 303.37L233.3 306.85L229.82 310.33L226.34 306.85ZM233.95 307.49L237.43 310.97L233.95 314.45L230.47 310.97L233.95 307.49ZM234.59 306.85L238.07 303.37L241.55 306.85L238.07 310.33L234.59 306.85ZM234.59 298.6L238.07 295.12L241.55 298.6L238.07 302.08L234.59 298.6ZM233.95 297.96L230.47 294.48L233.95 291L237.43 294.48L233.95 297.96ZM229.82 293.83L226.34 290.35L229.82 286.87L233.3 290.35L229.82 293.83ZM225.69 289.7L222.21 286.22L225.69 282.74L229.17 286.22L225.69 289.7ZM221.56 285.57L218.08 282.09L221.56 278.61L225.04 282.09L221.56 285.57ZM220.92 286.21L217.44 289.69L213.96 286.21L217.44 282.73L220.92 286.21ZM213.31 285.57L209.83 282.09L213.31 278.61L216.79 282.09L213.31 285.57ZM209.18 281.44L205.7 277.96L209.18 274.48L212.66 277.96L209.18 281.44ZM208.54 282.08L205.06 285.56L201.58 282.08L205.06 278.6L208.54 282.08ZM200.93 281.44L197.45 277.96L200.93 274.48L204.41 277.96L200.93 281.44ZM196.8 277.31L193.32 273.83L196.8 270.35L200.28 273.83L196.8 277.31ZM196.16 277.95L192.68 281.43L189.2 277.95L192.68 274.47L196.16 277.95ZM188.55 277.31L185.07 273.83L188.55 270.35L192.03 273.83L188.55 277.31ZM187.91 277.95L184.43 281.43L180.95 277.95L184.43 274.47L187.91 277.95ZM183.78 282.08L180.3 285.56L176.82 282.08L180.3 278.6L183.78 282.08ZM179.65 286.21L176.17 289.69L172.69 286.21L176.17 282.73L179.65 286.21ZM175.52 290.34L172.04 293.82L168.56 290.34L172.04 286.86L175.52 290.34ZM176.16 290.98L179.64 294.46L176.16 297.94L172.68 294.46L176.16 290.98ZM179.64 302.71L176.16 306.19L172.68 302.71L176.16 299.23L179.64 302.71ZM180.28 303.35L183.76 306.83L180.28 310.31L176.8 306.83L180.28 303.35ZM184.41 307.48L187.89 310.96L184.41 314.44L180.93 310.96L184.41 307.48ZM188.54 311.61L192.02 315.09L188.54 318.57L185.06 315.09L188.54 311.61ZM189.18 310.97L192.66 307.49L196.14 310.97L192.66 314.45L189.18 310.97ZM196.79 311.61L200.27 315.09L196.79 318.57L193.31 315.09L196.79 311.61ZM200.92 315.74L204.4 319.22L200.92 322.7L197.44 319.22L200.92 315.74ZM205.05 319.87L208.53 323.35L205.05 326.83L201.57 323.35L205.05 319.87ZM205.69 319.23L209.17 315.75L212.65 319.23L209.17 322.71L205.69 319.23ZM213.3 319.87L216.78 323.35L213.3 326.83L209.82 323.35L213.3 319.87ZM213.94 319.23L217.42 315.75L220.9 319.23L217.42 322.71L213.94 319.23ZM221.55 319.87L225.03 323.35L221.55 326.83L218.07 323.35L221.55 319.87ZM222.19 319.23L225.67 315.75L229.15 319.23L225.67 322.71L222.19 319.23ZM226.32 315.1L229.8 311.62L233.28 315.1L229.8 318.58L226.32 315.1ZM233.93 315.74L237.41 319.22L233.93 322.7L230.45 319.22L233.93 315.74ZM234.57 315.1L238.05 311.62L241.53 315.1L238.05 318.58L234.57 315.1ZM238.7 310.97L242.18 307.49L245.66 310.97L242.18 314.45L238.7 310.97ZM242.83 306.84L246.31 303.36L249.79 306.84L246.31 310.32L242.83 306.84ZM242.19 306.2L238.71 302.72L242.19 299.24L245.67 302.72L242.19 306.2ZM238.71 294.47L242.19 290.99L245.67 294.47L242.19 297.95L238.71 294.47ZM238.07 293.83L234.59 290.35L238.07 286.87L241.55 290.35L238.07 293.83ZM233.94 289.7L230.46 286.22L233.94 282.74L237.42 286.22L233.94 289.7ZM229.81 285.57L226.33 282.09L229.81 278.61L233.29 282.09L229.81 285.57ZM225.68 281.44L222.2 277.96L225.68 274.48L229.16 277.96L225.68 281.44ZM221.55 277.31L218.07 273.83L221.55 270.35L225.03 273.83L221.55 277.31ZM220.91 277.95L217.43 281.43L213.95 277.95L217.43 274.47L220.91 277.95ZM213.3 277.31L209.82 273.83L213.3 270.35L216.78 273.83L213.3 277.31ZM209.17 273.18L205.69 269.7L209.17 266.22L212.65 269.7L209.17 273.18ZM208.53 273.82L205.05 277.3L201.57 273.82L205.05 270.34L208.53 273.82ZM200.92 273.18L197.44 269.7L200.92 266.22L204.4 269.7L200.92 273.18ZM196.79 269.05L193.31 265.57L196.79 262.09L200.27 265.57L196.79 269.05ZM196.15 269.69L192.67 273.17L189.19 269.69L192.67 266.21L196.15 269.69ZM188.54 269.05L185.06 265.57L188.54 262.09L192.02 265.57L188.54 269.05ZM187.9 269.69L184.42 273.17L180.94 269.69L184.42 266.21L187.9 269.69ZM183.77 273.82L180.29 277.3L176.81 273.82L180.29 270.34L183.77 273.82ZM179.64 277.95L176.16 281.43L172.68 277.95L176.16 274.47L179.64 277.95ZM175.51 282.08L172.03 285.56L168.55 282.08L172.03 278.6L175.51 282.08ZM171.38 286.21L167.9 289.69L164.42 286.21L167.9 282.73L171.38 286.21ZM171.38 294.46L167.9 297.94L164.42 294.46L167.9 290.98L171.38 294.46ZM172.02 295.1L175.5 298.58L172.02 302.06L168.54 298.58L172.02 295.1ZM175.5 306.83L172.02 310.31L168.54 306.83L172.02 303.35L175.5 306.83ZM176.14 307.47L179.62 310.95L176.14 314.43L172.66 310.95L176.14 307.47ZM180.27 311.6L183.75 315.08L180.27 318.56L176.79 315.08L180.27 311.6ZM184.4 315.73L187.88 319.21L184.4 322.69L180.92 319.21L184.4 315.73ZM188.53 319.86L192.01 323.34L188.53 326.82L185.05 323.34L188.53 319.86ZM189.17 319.22L192.65 315.74L196.13 319.22L192.65 322.7L189.17 319.22ZM196.78 319.86L200.26 323.34L196.78 326.82L193.3 323.34L196.78 319.86ZM200.91 323.99L204.39 327.47L200.91 330.95L197.43 327.47L200.91 323.99ZM205.04 328.12L208.52 331.6L205.04 335.08L201.56 331.6L205.04 328.12ZM205.68 327.48L209.16 324L212.64 327.48L209.16 330.96L205.68 327.48ZM213.29 328.12L216.77 331.6L213.29 335.08L209.81 331.6L213.29 328.12ZM213.93 327.48L217.41 324L220.89 327.48L217.41 330.96L213.93 327.48ZM221.54 328.12L225.02 331.6L221.54 335.08L218.06 331.6L221.54 328.12ZM222.18 327.48L225.66 324L229.14 327.48L225.66 330.96L222.18 327.48ZM226.31 323.35L229.79 319.87L233.27 323.35L229.79 326.83L226.31 323.35ZM233.92 323.99L237.4 327.47L233.92 330.95L230.44 327.47L233.92 323.99ZM234.56 323.35L238.04 319.87L241.52 323.35L238.04 326.83L234.56 323.35ZM238.69 319.22L242.17 315.74L245.65 319.22L242.17 322.7L238.69 319.22ZM242.82 315.09L246.3 311.61L249.78 315.09L246.3 318.57L242.82 315.09ZM246.95 310.96L250.43 307.48L253.91 310.96L250.43 314.44L246.95 310.96ZM246.95 302.71L250.43 299.23L253.91 302.71L250.43 306.19L246.95 302.71ZM246.31 302.07L242.83 298.59L246.31 295.11L249.79 298.59L246.31 302.07ZM242.83 290.34L246.31 286.86L249.79 290.34L246.31 293.82L242.83 290.34ZM242.19 289.7L238.71 286.22L242.19 282.74L245.67 286.22L242.19 289.7ZM238.06 285.57L234.58 282.09L238.06 278.61L241.54 282.09L238.06 285.57ZM233.93 281.44L230.45 277.96L233.93 274.48L237.41 277.96L233.93 281.44ZM229.8 277.31L226.32 273.83L229.8 270.35L233.28 273.83L229.8 277.31ZM225.67 273.18L222.19 269.7L225.67 266.22L229.15 269.7L225.67 273.18ZM221.54 269.05L218.06 265.57L221.54 262.09L225.02 265.57L221.54 269.05ZM220.9 269.69L217.42 273.17L213.94 269.69L217.42 266.21L220.9 269.69ZM213.29 269.05L209.81 265.57L213.29 262.09L216.77 265.57L213.29 269.05ZM209.16 264.92L205.68 261.44L209.16 257.96L212.64 261.44L209.16 264.92ZM208.52 265.56L205.04 269.04L201.56 265.56L205.04 262.08L208.52 265.56ZM200.91 264.92L197.43 261.44L200.91 257.96L204.39 261.44L200.91 264.92ZM196.78 260.79L193.3 257.31L196.78 253.83L200.26 257.31L196.78 260.79ZM196.14 261.43L192.66 264.91L189.18 261.43L192.66 257.95L196.14 261.43ZM188.53 260.79L185.05 257.31L188.53 253.83L192.01 257.31L188.53 260.79ZM187.89 261.43L184.41 264.91L180.93 261.43L184.41 257.95L187.89 261.43ZM183.76 265.56L180.28 269.04L176.8 265.56L180.28 262.08L183.76 265.56ZM179.63 269.69L176.15 273.17L172.67 269.69L176.15 266.21L179.63 269.69ZM175.5 273.82L172.02 277.3L168.54 273.82L172.02 270.34L175.5 273.82ZM171.37 277.95L167.89 281.43L164.41 277.95L167.89 274.47L171.37 277.95ZM167.24 282.08L163.76 285.56L160.28 282.08L163.76 278.6L167.24 282.08ZM163.11 286.21L159.63 289.69L156.15 286.21L159.63 282.73L163.11 286.21ZM163.75 286.85L167.23 290.33L163.75 293.81L160.27 290.33L163.75 286.85ZM167.23 298.58L163.75 302.06L160.27 298.58L163.75 295.1L167.23 298.58ZM167.87 299.22L171.35 302.7L167.87 306.18L164.39 302.7L167.87 299.22ZM171.35 310.95L167.87 314.43L164.39 310.95L167.87 307.47L171.35 310.95ZM171.99 311.59L175.47 315.07L171.99 318.55L168.51 315.07L171.99 311.59ZM176.12 315.72L179.6 319.2L176.12 322.68L172.64 319.2L176.12 315.72ZM180.25 319.85L183.73 323.33L180.25 326.81L176.77 323.33L180.25 319.85ZM184.38 323.98L187.86 327.46L184.38 330.94L180.9 327.46L184.38 323.98ZM188.51 328.11L191.99 331.59L188.51 335.07L185.03 331.59L188.51 328.11ZM189.15 327.47L192.63 323.99L196.11 327.47L192.63 330.95L189.15 327.47ZM196.76 328.11L200.24 331.59L196.76 335.07L193.28 331.59L196.76 328.11ZM200.89 332.24L204.37 335.72L200.89 339.2L197.41 335.72L200.89 332.24ZM205.02 336.37L208.5 339.85L205.02 343.33L201.54 339.85L205.02 336.37ZM205.66 335.73L209.14 332.25L212.62 335.73L209.14 339.21L205.66 335.73ZM213.27 336.37L216.75 339.85L213.27 343.33L209.79 339.85L213.27 336.37ZM213.91 335.73L217.39 332.25L220.87 335.73L217.39 339.21L213.91 335.73ZM221.52 336.37L225 339.85L221.52 343.33L218.04 339.85L221.52 336.37ZM222.16 335.73L225.64 332.25L229.12 335.73L225.64 339.21L222.16 335.73ZM226.29 331.6L229.77 328.12L233.25 331.6L229.77 335.08L226.29 331.6ZM233.9 332.24L237.38 335.72L233.9 339.2L230.42 335.72L233.9 332.24ZM234.54 331.6L238.02 328.12L241.5 331.6L238.02 335.08L234.54 331.6ZM238.67 327.47L242.15 323.99L245.63 327.47L242.15 330.95L238.67 327.47ZM242.8 323.34L246.28 319.86L249.76 323.34L246.28 326.82L242.8 323.34ZM246.93 319.21L250.41 315.73L253.89 319.21L250.41 322.69L246.93 319.21ZM251.06 315.08L254.54 311.6L258.02 315.08L254.54 318.56L251.06 315.08ZM251.06 306.83L254.54 303.35L258.02 306.83L254.54 310.31L251.06 306.83ZM251.06 298.58L254.54 295.1L258.02 298.58L254.54 302.06L251.06 298.58ZM250.42 297.94L246.94 294.46L250.42 290.98L253.9 294.46L250.42 297.94ZM246.94 286.21L250.42 282.73L253.9 286.21L250.42 289.69L246.94 286.21ZM246.3 285.57L242.82 282.09L246.3 278.61L249.78 282.09L246.3 285.57ZM242.17 281.44L238.69 277.96L242.17 274.48L245.65 277.96L242.17 281.44ZM238.04 277.31L234.56 273.83L238.04 270.35L241.52 273.83L238.04 277.31ZM233.91 273.18L230.43 269.7L233.91 266.22L237.39 269.7L233.91 273.18ZM229.78 269.05L226.3 265.57L229.78 262.09L233.26 265.57L229.78 269.05ZM225.65 264.92L222.17 261.44L225.65 257.96L229.13 261.44L225.65 264.92ZM221.52 260.79L218.04 257.31L221.52 253.83L225 257.31L221.52 260.79ZM220.88 261.43L217.4 264.91L213.92 261.43L217.4 257.95L220.88 261.43ZM213.27 260.79L209.79 257.31L213.27 253.83L216.75 257.31L213.27 260.79ZM209.14 256.66L205.66 253.18L209.14 249.7L212.62 253.18L209.14 256.66ZM208.5 257.3L205.02 260.78L201.54 257.3L205.02 253.82L208.5 257.3ZM200.89 256.66L197.41 253.18L200.89 249.7L204.37 253.18L200.89 256.66ZM196.76 252.53L193.28 249.05L196.76 245.57L200.24 249.05L196.76 252.53ZM196.12 253.17L192.64 256.65L189.16 253.17L192.64 249.69L196.12 253.17ZM188.51 252.53L185.03 249.05L188.51 245.57L191.99 249.05L188.51 252.53ZM187.87 253.17L184.39 256.65L180.91 253.17L184.39 249.69L187.87 253.17ZM183.74 257.3L180.26 260.78L176.78 257.3L180.26 253.82L183.74 257.3ZM179.61 261.43L176.13 264.91L172.65 261.43L176.13 257.95L179.61 261.43ZM175.48 265.56L172 269.04L168.52 265.56L172 262.08L175.48 265.56ZM171.35 269.69L167.87 273.17L164.39 269.69L167.87 266.21L171.35 269.69ZM167.22 273.82L163.74 277.3L160.26 273.82L163.74 270.34L167.22 273.82ZM163.09 277.95L159.61 281.43L156.13 277.95L159.61 274.47L163.09 277.95ZM158.96 282.08L155.48 285.56L152 282.08L155.48 278.6L158.96 282.08ZM158.96 290.33L155.48 293.81L152 290.33L155.48 286.85L158.96 290.33ZM159.6 290.97L163.08 294.45L159.6 297.93L156.12 294.45L159.6 290.97ZM163.08 302.71L159.6 306.19L156.12 302.71L159.6 299.23L163.08 302.71ZM163.72 303.35L167.2 306.83L163.72 310.31L160.24 306.83L163.72 303.35ZM167.2 315.08L163.72 318.56L160.24 315.08L163.72 311.6L167.2 315.08ZM167.84 315.72L171.32 319.2L167.84 322.68L164.36 319.2L167.84 315.72ZM171.97 319.85L175.45 323.33L171.97 326.81L168.49 323.33L171.97 319.85ZM176.1 323.98L179.58 327.46L176.1 330.94L172.62 327.46L176.1 323.98ZM180.23 328.11L183.71 331.59L180.23 335.07L176.75 331.59L180.23 328.11ZM184.36 332.24L187.84 335.72L184.36 339.2L180.88 335.72L184.36 332.24ZM188.49 336.37L191.97 339.85L188.49 343.33L185.01 339.85L188.49 336.37ZM189.13 335.73L192.61 332.25L196.09 335.73L192.61 339.21L189.13 335.73ZM196.74 336.37L200.22 339.85L196.74 343.33L193.26 339.85L196.74 336.37ZM200.87 340.5L204.35 343.98L200.87 347.46L197.39 343.98L200.87 340.5ZM205 344.63L208.48 348.11L205 351.59L201.52 348.11L205 344.63ZM205.64 343.99L209.12 340.51L212.6 343.99L209.12 347.47L205.64 343.99ZM213.25 344.63L216.73 348.11L213.25 351.59L209.77 348.11L213.25 344.63ZM213.89 343.99L217.37 340.51L220.85 343.99L217.37 347.47L213.89 343.99ZM221.5 344.63L224.98 348.11L221.5 351.59L218.02 348.11L221.5 344.63ZM222.14 343.99L225.62 340.51L229.1 343.99L225.62 347.47L222.14 343.99ZM226.27 339.86L229.75 336.38L233.23 339.86L229.75 343.34L226.27 339.86ZM233.88 340.5L242.32 348.94C240.83 349.81 239.28 350.59 237.67 351.26L230.39 343.98L233.87 340.5H233.88ZM234.52 339.86L238 336.38L247.17 345.55C245.89 346.61 244.53 347.58 243.12 348.46L234.52 339.86ZM238.65 335.73L242.13 332.25L251.35 341.47C250.81 342.09 250.26 342.68 249.68 343.26C249.1 343.84 248.49 344.41 247.87 344.95L238.65 335.73ZM242.78 331.6L246.26 328.12L254.86 336.72C253.98 338.14 253.01 339.49 251.94 340.77L242.77 331.6H242.78ZM246.91 327.47L250.39 323.99L257.67 331.27C257 332.88 256.22 334.43 255.35 335.91L246.91 327.47ZM251.04 323.34L254.52 319.86L259.7 325.04C259.26 326.87 258.71 328.64 258.04 330.35L251.03 323.34H251.04ZM255.17 319.21L258.65 315.73L260.83 317.91C260.67 320 260.37 322.03 259.95 324L255.17 319.22V319.21ZM260.82 309.94C260.88 310.68 260.92 311.42 260.94 312.16L258.65 314.45L255.17 310.97L258.65 307.49L260.75 309.59C260.77 309.71 260.8 309.83 260.82 309.96V309.94ZM260.46 308L259.29 306.83L260.1 306.02C260.2 306.6 260.32 307.26 260.45 308H260.46ZM259.66 303.4C259.68 303.55 259.77 304.08 259.91 304.93L258.64 306.2L255.16 302.72L258.64 299.24L258.84 299.44C259.17 300.77 259.44 302.1 259.65 303.42L259.66 303.4ZM258.39 297.69L255.16 294.46L256.79 292.83C257.4 294.45 257.93 296.07 258.38 297.69H258.39ZM256.44 291.9L254.52 293.82L251.04 290.34L254.31 287.07C255.09 288.68 255.81 290.29 256.44 291.91V291.9ZM252.43 283.47L251.04 282.08L251.41 281.71C251.76 282.3 252.1 282.88 252.43 283.48V283.47ZM250.93 280.91L250.4 281.44L246.92 277.96L248.17 276.71C249.15 278.09 250.07 279.5 250.94 280.91H250.93ZM247.63 275.96L246.27 277.32L242.79 273.84L244.6 272.03C245.66 273.32 246.67 274.63 247.63 275.97V275.96ZM244.02 271.32L242.15 273.19L238.67 269.71L240.74 267.64C241.88 268.84 242.97 270.07 244.02 271.33V271.32ZM239.06 265.9C239.42 266.26 239.77 266.61 240.12 266.97L238.03 269.06L234.55 265.58L236.6 263.53C237.43 264.3 238.26 265.09 239.07 265.9H239.06ZM235.92 262.92L233.9 264.94L230.42 261.46L232.14 259.74C233.42 260.76 234.68 261.82 235.92 262.93V262.92ZM231.42 259.17L229.77 260.82L226.29 257.34L227.38 256.25C228.74 257.17 230.09 258.15 231.42 259.18V259.17ZM226.61 255.73L225.65 256.69L222.17 253.21L222.3 253.08C223.75 253.91 225.2 254.79 226.62 255.73H226.61ZM218.98 251.31L220.88 253.21L217.4 256.69L213.92 253.21L216.85 250.28C217.56 250.61 218.27 250.96 218.98 251.31ZM215.96 249.88L213.27 252.57L209.79 249.09L210.99 247.89C212.66 248.48 214.32 249.15 215.97 249.88H215.96ZM210.03 247.56L209.14 248.45L207.43 246.74C208.3 246.99 209.16 247.27 210.03 247.56ZM205.66 246.25L208.5 249.09L205.02 252.57L201.54 249.09L204.64 245.99C204.98 246.07 205.33 246.16 205.67 246.25H205.66ZM203.6 245.74L200.89 248.45L197.41 244.97L197.66 244.72C199.63 244.96 201.61 245.3 203.6 245.75V245.74ZM195.67 244.5L196.13 244.96L192.65 248.44L189.17 244.96L189.81 244.32C191.74 244.27 193.7 244.32 195.68 244.5H195.67ZM187.37 244.45L187.88 244.96L184.4 248.44L181.27 245.31C183.26 244.89 185.29 244.6 187.37 244.44V244.45ZM180.23 245.56L183.76 249.09L180.28 252.57L174.91 247.2C176.63 246.53 178.41 245.99 180.23 245.55V245.56ZM174 247.58L179.64 253.22L176.16 256.7L169.35 249.89C170.84 249.01 172.4 248.24 174 247.57V247.58ZM168.55 250.38L175.52 257.35L172.04 260.83L164.51 253.3C165.8 252.23 167.15 251.26 168.56 250.38H168.55ZM162.01 255.56C162.59 254.98 163.19 254.42 163.8 253.88L171.38 261.46L167.9 264.94L160.32 257.36C160.86 256.74 161.42 256.14 162.01 255.55V255.56ZM159.73 258.06L167.26 265.59L163.78 269.07L156.82 262.11C157.7 260.7 158.67 259.35 159.74 258.06H159.73ZM156.33 262.91L163.13 269.71L159.65 273.19L154.02 267.56C154.69 265.95 155.46 264.4 156.34 262.91H156.33ZM153.65 268.48L159.01 273.84L155.53 277.32L152.01 273.8C152.44 271.98 152.99 270.2 153.66 268.48H153.65ZM151.77 274.85L154.89 277.97L151.41 281.45L150.91 280.95C151.07 278.87 151.35 276.83 151.78 274.85H151.77ZM150.78 283.35L151.4 282.73L154.88 286.21L151.4 289.69L150.96 289.25C150.79 287.26 150.73 285.29 150.78 283.34V283.35ZM151.16 291.22L151.4 290.98L154.88 294.46L152.19 297.15C151.74 295.16 151.4 293.18 151.16 291.21V291.22ZM152.44 298.19L155.53 295.1L159.01 298.58L155.53 302.06L152.72 299.25C152.63 298.89 152.53 298.54 152.45 298.18L152.44 298.19ZM153.2 301.03L154.88 302.71L154.01 303.58C153.72 302.73 153.45 301.88 153.2 301.03ZM154.34 304.53L155.52 303.35L159 306.83L156.32 309.51C155.58 307.86 154.92 306.2 154.33 304.53H154.34ZM156.73 310.39L159.65 307.47L163.13 310.95L159.65 314.43L157.8 312.58C157.43 311.85 157.08 311.12 156.74 310.38L156.73 310.39ZM159.53 315.84L159.64 315.73L163.12 319.21L162.17 320.16C161.23 318.74 160.35 317.3 159.52 315.84H159.53ZM162.69 320.93L163.77 319.85L167.25 323.33L165.62 324.96C164.59 323.63 163.61 322.29 162.69 320.92V320.93ZM166.18 325.69L167.89 323.98L171.37 327.46L169.37 329.46C168.26 328.22 167.19 326.96 166.18 325.68V325.69ZM172.35 332.61C171.54 331.8 170.75 330.97 169.98 330.14L172.01 328.11L175.49 331.59L173.42 333.66C173.06 333.31 172.7 332.96 172.35 332.6V332.61ZM174.08 334.29L176.14 332.23L179.62 335.71L177.77 337.56C176.52 336.51 175.29 335.41 174.08 334.28V334.29ZM178.47 338.15L180.26 336.36L183.74 339.84L182.4 341.18C181.07 340.22 179.75 339.2 178.46 338.15H178.47ZM183.15 341.72L184.38 340.49L187.86 343.97L187.35 344.48C185.93 343.61 184.53 342.69 183.15 341.71V341.72ZM188.15 344.97L188.51 344.61L189.84 345.94C189.27 345.62 188.71 345.3 188.15 344.96V344.97ZM192.59 347.41L189.15 343.97L192.63 340.49L196.11 343.97L192.64 347.44L192.58 347.41H192.59ZM193.5 347.86L196.75 344.61L200.23 348.09L198.33 349.99C196.71 349.35 195.1 348.64 193.49 347.86H193.5ZM199.26 350.35L200.88 348.73L204.08 351.93C202.48 351.48 200.87 350.95 199.26 350.35ZM209.83 353.21C208.5 352.99 207.16 352.72 205.81 352.39L205.64 352.22L209.12 348.74L212.6 352.22L211.35 353.47C210.5 353.33 209.97 353.24 209.82 353.22L209.83 353.21ZM212.45 353.65L213.25 352.85L214.39 353.99C213.67 353.86 213.02 353.74 212.45 353.64V353.65ZM216.37 354.36C216.23 354.33 216.1 354.31 215.96 354.28L213.89 352.21L217.37 348.73L220.85 352.21L218.58 354.48C217.85 354.45 217.11 354.41 216.36 354.36H216.37ZM219.84 354.51L221.5 352.85L223.1 354.45C222.03 354.51 220.94 354.53 219.84 354.51ZM224.31 354.37L222.15 352.21L225.63 348.73L230.4 353.5C228.43 353.92 226.39 354.22 224.31 354.38V354.37ZM231.45 353.26L226.28 348.09L229.76 344.61L236.76 351.61C235.05 352.27 233.28 352.83 231.45 353.27V353.26ZM284.36 381.42C282.18 379.12 275.33 372.69 262.42 367.07C255.37 364 246.77 361.38 238.59 359.27C237.97 358.12 237.49 356.7 237.76 355.31C243.29 353.22 248.24 350.07 252.38 345.93C256.52 341.79 259.67 336.84 261.76 331.31C263.15 331.04 264.56 331.52 265.72 332.14C267.83 340.32 270.46 348.92 273.52 355.97C279.14 368.89 285.57 375.73 287.87 377.91L284.37 381.41L284.36 381.42Z" fill="#371B0B"/>
                                            </g>
                                            <mask id="mask1_487_1716" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="149" y="236" width="115" height="115">
                                            <path d="M161.47 248.46C142.27 267.66 146.91 303.42 171.82 328.33C182.72 339.23 199.13 348.74 216.06 350.49C229.8 351.81 242.74 348.08 251.91 338.91C261.08 329.74 264.81 316.8 263.49 303.06C262.32 288.24 252.23 269.72 241.33 258.82C216.42 233.91 180.66 229.27 161.46 248.47L161.47 248.46Z" fill="#FF2400"/>
                                            </mask>
                                            <g mask="url(#mask1_487_1716)">
                                            <path d="M125.212 281.688L124.569 282.331L216.472 374.234L217.115 373.59L125.212 281.688Z" fill="white"/>
                                            <path d="M129.332 277.581L128.689 278.225L220.592 370.127L221.235 369.484L129.332 277.581Z" fill="white"/>
                                            <path d="M133.462 273.44L132.819 274.084L224.722 365.986L225.365 365.343L133.462 273.44Z" fill="white"/>
                                            <path d="M137.582 269.324L136.939 269.967L228.842 361.87L229.485 361.226L137.582 269.324Z" fill="white"/>
                                            <path d="M141.712 265.193L141.069 265.837L232.972 357.739L233.615 357.096L141.712 265.193Z" fill="white"/>
                                            <path d="M145.832 261.077L145.189 261.72L237.092 353.623L237.735 352.979L145.832 261.077Z" fill="white"/>
                                            <path d="M149.962 256.946L149.319 257.589L241.222 349.492L241.865 348.849L149.962 256.946Z" fill="white"/>
                                            <path d="M154.082 252.819L153.439 253.463L245.342 345.366L245.985 344.722L154.082 252.819Z" fill="white"/>
                                            <path d="M158.212 248.689L157.569 249.332L249.472 341.235L250.115 340.591L158.212 248.689Z" fill="white"/>
                                            <path d="M162.332 244.572L161.689 245.216L253.592 337.118L254.235 336.475L162.332 244.572Z" fill="white"/>
                                            <path d="M166.462 240.441L165.819 241.085L257.722 332.987L258.365 332.344L166.462 240.441Z" fill="white"/>
                                            <path d="M170.582 236.325L169.939 236.968L261.842 328.871L262.485 328.227L170.582 236.325Z" fill="white"/>
                                            <path d="M174.712 232.184L174.069 232.828L265.972 324.73L266.615 324.087L174.712 232.184Z" fill="white"/>
                                            <path d="M178.832 228.067L178.189 228.711L270.092 320.614L270.735 319.97L178.832 228.067Z" fill="white"/>
                                            <path d="M182.962 223.937L182.319 224.58L274.222 316.483L274.865 315.84L182.962 223.937Z" fill="white"/>
                                            <path d="M187.082 219.83L186.439 220.474L278.342 312.376L278.985 311.733L187.082 219.83Z" fill="white"/>
                                            <path d="M191.212 215.69L190.569 216.333L282.472 308.236L283.115 307.592L191.212 215.69Z" fill="white"/>
                                            <path d="M195.332 211.563L194.689 212.207L286.592 304.109L287.235 303.466L195.332 211.563Z" fill="white"/>
                                            <path d="M216.462 211.572L124.56 303.475L125.203 304.118L217.106 212.216L216.462 211.572Z" fill="white"/>
                                            <path d="M220.603 215.702L128.7 307.605L129.344 308.248L221.246 216.346L220.603 215.702Z" fill="white"/>
                                            <path d="M224.72 219.822L132.817 311.725L133.46 312.368L225.363 220.466L224.72 219.822Z" fill="white"/>
                                            <path d="M228.85 223.952L136.948 315.855L137.591 316.498L229.494 224.596L228.85 223.952Z" fill="white"/>
                                            <path d="M232.967 228.072L141.064 319.975L141.707 320.618L233.61 228.716L232.967 228.072Z" fill="white"/>
                                            <path d="M237.097 232.202L145.195 324.105L145.838 324.748L237.741 232.846L237.097 232.202Z" fill="white"/>
                                            <path d="M241.214 236.322L149.311 328.225L149.955 328.868L241.857 236.966L241.214 236.322Z" fill="white"/>
                                            <path d="M245.345 240.452L153.442 332.355L154.085 332.998L245.988 241.096L245.345 240.452Z" fill="white"/>
                                            <path d="M249.461 244.572L157.559 336.475L158.202 337.118L250.105 245.216L249.461 244.572Z" fill="white"/>
                                            <path d="M253.602 248.702L161.699 340.605L162.343 341.248L254.245 249.346L253.602 248.702Z" fill="white"/>
                                            <path d="M257.719 252.822L165.816 344.725L166.459 345.368L258.362 253.466L257.719 252.822Z" fill="white"/>
                                            <path d="M261.849 256.952L169.947 348.855L170.59 349.498L262.493 257.596L261.849 256.952Z" fill="white"/>
                                            <path d="M265.966 261.072L174.063 352.975L174.706 353.618L266.609 261.716L265.966 261.072Z" fill="white"/>
                                            <path d="M270.097 265.202L178.194 357.105L178.837 357.748L270.74 265.846L270.097 265.202Z" fill="white"/>
                                            <path d="M274.213 269.322L182.311 361.225L182.954 361.868L274.857 269.966L274.213 269.322Z" fill="white"/>
                                            <path d="M278.344 273.452L186.441 365.355L187.085 365.998L278.987 274.096L278.344 273.452Z" fill="white"/>
                                            <path d="M282.47 277.572L190.568 369.475L191.211 370.118L283.114 278.216L282.47 277.572Z" fill="white"/>
                                            <path d="M286.601 281.702L194.698 373.605L195.342 374.248L287.244 282.346L286.601 281.702Z" fill="white"/>
                                            </g>
                                            <path d="M265.4 302.87L261.61 303.23C262.92 316.94 259.01 329.13 250.58 337.55C242.15 345.98 229.96 349.9 216.26 348.58L215.9 352.37C219.31 352.7 222.64 352.72 225.85 352.45L241.36 356.14C241.36 356.14 238.04 352.82 238.65 349.62C244.18 347.53 249.13 344.38 253.27 340.24C257.41 336.1 260.56 331.15 262.65 325.62C265.85 325.01 269.17 328.33 269.17 328.33L265.48 312.82C265.75 309.61 265.73 306.28 265.4 302.87Z" fill="white"/>
                                            <path d="M264.47 297.09C262.27 283.48 254.35 269.02 242.75 257.42C230.39 245.06 215.04 237.15 199.52 235.13C191.91 234.14 184.67 234.63 177.99 236.57C171.03 238.6 165 242.13 160.06 247.06C155.13 251.99 151.6 258.02 149.57 264.99C147.63 271.67 147.14 278.91 148.13 286.52C150.14 302.04 158.06 317.39 170.42 329.75C182.02 341.35 196.48 349.27 210.09 351.47C210.17 351.48 218.29 352.79 228.68 355.11C242.38 358.17 253.8 361.61 261.71 365.05C276.46 371.46 282.88 379.07 282.94 379.14L286.02 376.61C285.74 376.27 279.01 368.23 263.3 361.4C243.67 352.87 212.1 347.76 210.73 347.54C197.92 345.47 184.26 337.96 173.24 326.94C149.14 302.84 144.5 268.28 162.89 249.89C181.28 231.5 215.84 236.15 239.94 260.24C250.96 271.26 258.47 284.93 260.54 297.73C260.76 299.11 265.87 330.68 274.4 350.3C281.23 366.01 289.27 372.74 289.61 373.02L292.14 369.95C292.14 369.95 290.21 368.33 287.53 364.93C285.06 361.79 281.4 356.43 278.05 348.72C274.61 340.81 271.17 329.39 268.11 315.69C265.79 305.3 264.48 297.18 264.47 297.1V297.09Z" fill="white"/>
                                            <g style={{mixBlendMode:"multiply"}}>
                                            <path d="M193.97 184.08L185.92 175.37C185.76 175.19 185.59 175.03 185.4 174.87L178.62 169.01C176.07 166.81 172.26 166.95 169.88 169.33L146.27 192.65C145.74 193.17 145.39 193.85 145.27 194.59L144.77 197.62C144.5 199.25 143.15 200.47 141.5 200.57L139.35 200.7C138.5 200.75 137.69 201.11 137.08 201.71L118.28 220.27C118.28 220.27 111.95 227.23 117.07 236.26L115.76 237.56C115.76 237.56 112.83 240.77 116.62 244.56C120.4 248.34 123.65 245.65 123.65 245.65L124.9 244.42C134.33 250.51 141.77 244.35 141.77 244.35L161.35 225.01C161.88 224.48 162.24 223.8 162.35 223.06L162.83 220.05C163.06 218.59 164.18 217.43 165.64 217.15L169.17 216.46C169.85 216.33 170.48 216 170.97 215.51L193.78 192.98C196.22 190.54 196.3 186.61 193.95 184.08H193.97Z" fill="#371B0B"/>
                                            </g>
                                            <path d="M181.08 139.37C169.74 139.37 160.56 147.61 160.56 157.78V178.39C160.56 188.56 169.75 196.8 181.08 196.8C192.41 196.8 201.6 188.56 201.6 178.39V157.78C201.6 147.61 192.41 139.37 181.08 139.37Z" fill="#E7C1BB"/>
                                            <path d="M181.08 162.46C190.298 162.46 197.77 155.758 197.77 147.49C197.77 139.222 190.298 132.52 181.08 132.52C171.863 132.52 164.39 139.222 164.39 147.49C164.39 155.758 171.863 162.46 181.08 162.46Z" fill="#E2A399"/>
                                            <path d="M181.08 159.51C190.298 159.51 197.77 152.808 197.77 144.54C197.77 136.272 190.298 129.57 181.08 129.57C171.863 129.57 164.39 136.272 164.39 144.54C164.39 152.808 171.863 159.51 181.08 159.51Z" fill="#C28379"/>
                                            <path d="M181.08 108.57C169.74 108.57 160.56 116.81 160.56 126.98V138.39C160.56 148.56 169.75 156.8 181.08 156.8C192.41 156.8 201.6 148.56 201.6 138.39V126.98C201.6 116.81 192.41 108.57 181.08 108.57Z" fill="#E7C1BB"/>
                                            <path d="M181.08 134.94C190.298 134.94 197.77 128.238 197.77 119.97C197.77 111.702 190.298 105 181.08 105C171.863 105 164.39 111.702 164.39 119.97C164.39 128.238 171.863 134.94 181.08 134.94Z" fill="#E2A399"/>
                                            <path d="M181.08 132C190.298 132 197.77 125.298 197.77 117.03C197.77 108.762 190.298 102.06 181.08 102.06C171.863 102.06 164.39 108.762 164.39 117.03C164.39 125.298 171.863 132 181.08 132Z" fill="#E7C1BB"/>
                                            <path d="M181.08 122.02C187.205 122.02 192.17 118.21 192.17 113.51C192.17 108.81 187.205 105 181.08 105C174.955 105 169.99 108.81 169.99 113.51C169.99 118.21 174.955 122.02 181.08 122.02Z" fill="#C28379"/>
                                            <path d="M181.08 119.97C187.205 119.97 192.17 116.16 192.17 111.46C192.17 106.76 187.205 102.95 181.08 102.95C174.955 102.95 169.99 106.76 169.99 111.46C169.99 116.16 174.955 119.97 181.08 119.97Z" fill="#E2A399"/>
                                            <path d="M181.08 104.78C179.16 104.78 177.59 106.18 177.59 107.91V109.85C177.59 111.58 179.15 112.98 181.08 112.98C183.01 112.98 184.57 111.58 184.57 109.85V107.91C184.57 106.18 183.01 104.78 181.08 104.78Z" fill="#F1F1F2"/>
                                            <path d="M181.08 109.25C182.643 109.25 183.91 108.113 183.91 106.71C183.91 105.307 182.643 104.17 181.08 104.17C179.517 104.17 178.25 105.307 178.25 106.71C178.25 108.113 179.517 109.25 181.08 109.25Z" fill="white"/>
                                            <path d="M181.9 106.16C181.9 106.56 181.53 106.89 181.08 106.89C180.63 106.89 180.26 106.56 180.26 106.16C180.26 105.76 180.63 105.43 181.08 105.43C181.53 105.43 181.9 105.76 181.9 106.16Z" fill="#404041"/>
                                            <path d="M274.4 350.3C281.23 366.01 289.27 372.74 289.61 373.02L292.14 369.95C292.14 369.95 290.21 368.33 287.53 364.93C285.06 361.79 281.4 356.43 278.05 348.72C274.61 340.81 271.17 329.39 268.11 315.69C267.91 314.8 267.72 313.92 267.54 313.07C266.89 315.98 266.13 318.63 265.25 321.06C267.55 330.73 270.64 341.67 274.4 350.31V350.3Z" fill="#29157C"/>
                                            <path d="M261.72 365.04C276.47 371.45 282.89 379.06 282.95 379.13L286.03 376.6C285.75 376.26 279.02 368.22 263.31 361.39C253.76 357.24 241.4 353.9 231.05 351.54C227.63 352.21 223.86 352.73 219.69 353.21C222.34 353.73 225.4 354.37 228.69 355.1C242.39 358.16 253.81 361.6 261.72 365.04Z" fill="#29157C"/>
                                            <path d="M341.5 415L336.07 411.73L297.27 372.93L285.94 384.26L324.74 423.06L328.01 428.49C328.77 429.75 330.38 430.21 331.69 429.54L338.06 426.26C338.58 425.99 339 425.57 339.27 425.05L342.55 418.68C343.23 417.37 342.77 415.76 341.5 415Z" fill="#C44127"/>
                                            <path d="M297.28 372.93L285.94 384.27L281.7 379.29L292.3 368.69L297.28 372.93Z" fill="white"/>
                                            </g>
                                        </svg>                                
                                    </div>
                                    </div>
                                    <div >
                                    <div className="box">
                                        <svg width="440" height="441" viewBox="0 0 440 441" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_487_1560" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="440" height="441">
                                            <path d="M440 0.339844H0V440.34H440V0.339844Z" fill="#0E1A2E"/>
                                            </mask>
                                            <g mask="url(#mask0_487_1560)">
                                            <path d="M440 0.339844H0V440.34H440V0.339844Z" fill="#0E1A2E"/>
                                            <path d="M225.81 -35.61H214.57V50.6H225.81V-35.61Z" fill="#F6FCEE"/>
                                            <path d="M235.77 50.6H204.62V77.91H235.77V50.6Z" fill="#F6FCEE"/>
                                            <path d="M248.84 77.91H191.55V113.79H248.84V77.91Z" fill="#F6FCEE"/>
                                            <path d="M261.42 113.78H178.96V165.72H261.42V113.78Z" fill="#F6FCEE"/>
                                            <path d="M197.98 96.54H191.55V102.97H197.98V96.54Z" fill="#080F33"/>
                                            <path d="M248.84 96.54H242.41V102.97H248.84V96.54Z" fill="#080F33"/>
                                            <path d="M236.13 96.54H229.7V102.97H236.13V96.54Z" fill="#080F33"/>
                                            <path d="M223.41 96.54H216.98V102.97H223.41V96.54Z" fill="#080F33"/>
                                            <path d="M210.69 96.54H204.26V102.97H210.69V96.54Z" fill="#080F33"/>
                                            <path d="M229.77 70.36H223.34V76.79H229.77V70.36Z" fill="#080F33"/>
                                            <path d="M217.05 70.36H210.62V76.79H217.05V70.36Z" fill="#080F33"/>
                                            <path d="M236.06 165.72H204.33V464.24H236.06V165.72Z" fill="#F6FCEE"/>
                                            <path d="M204.26 273.69L235.6 165.72H204.26V273.69Z" fill="#9A412C"/>
                                            <path d="M248.18 277.37H192.22V285.67H248.18V277.37Z" fill="#F6FCEE"/>
                                            <path d="M244.03 285.67H196.37V295.31H244.03V285.67Z" fill="#9A412C"/>
                                            <path d="M244.03 307.62H196.37V317.26H244.03V307.62Z" fill="#F6FCEE"/>
                                            <path d="M239.34 295.3H201.05V307.62H239.34V295.3Z" fill="#F6FCEE"/>
                                            <path d="M204.33 437.32L234.18 325.56L204.33 321.91V437.32Z" fill="#9A412C"/>
                                            <path d="M248.18 317.26H192.22V325.56H248.18V317.26Z" fill="#F6FCEE"/>
                                            <path d="M261.42 121.6H178.96V129.44H261.42V121.6Z" fill="#080F33"/>
                                            <path d="M261.42 135.83H178.96V143.67H261.42V135.83Z" fill="#080F33"/>
                                            <path d="M261.42 150.06H178.96V157.9H261.42V150.06Z" fill="#080F33"/>
                                            <path d="M228.81 307.62L232.39 295.3H201.05V307.62H228.81Z" fill="#9A412C"/>
                                            <g opacity="0.9">
                                            <path opacity="0.9" d="M89.0203 41.09C89.0203 39.64 87.8503 38.47 86.4003 38.47C84.9503 38.47 83.7803 39.64 83.7803 41.09C83.7803 42.54 84.9503 43.71 86.4003 43.71C87.8503 43.71 89.0203 42.54 89.0203 41.09Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M80.9602 36.37L32.8302 2.16003L30.4102 5.27003L80.0602 37.63C80.3102 37.18 80.6202 36.76 80.9602 36.37Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M79.7101 44.0601L34.3701 72.2901L37.1301 75.2301L80.6701 45.7001C80.2801 45.2001 79.9501 44.6601 79.7001 44.0701L79.7101 44.0601Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M92.5601 45.21L138.71 72.12L140.78 68.15L93.3101 43.73C93.1201 44.26 92.8701 44.76 92.5601 45.22V45.21Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M93.0701 38.1001L150.45 8.56007L147.53 5.83008L92.3101 36.8401C92.6001 37.2301 92.8501 37.6501 93.0601 38.1001H93.0701Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M83.3501 34.5701L56.2501 -12.6799L53.1001 -10.3399L82.1101 35.3001C82.5001 35.0101 82.9101 34.7701 83.3501 34.5601V34.5701Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M57.8 35.5V38.21L79.15 40.76C79.18 40.23 79.27 39.72 79.4 39.23L57.79 35.5H57.8Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M35.8702 59.55L79.5802 43.7201C79.4202 43.2701 79.2902 42.8001 79.2202 42.3201L35.1702 56.0401L35.8702 59.55Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M10.7202 63.65L12.6202 67.97L32.0702 60.92L31.3302 57.23L10.7202 63.65Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M72.8101 68.32L75.2001 69.17L83.9001 48.04C83.4401 47.87 83.0001 47.65 82.5901 47.4L72.8101 68.32Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M55.4502 105.45L59.7702 106.66L73.6802 72.88L71.1102 71.96L55.4502 105.45Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M80.9601 36.3701C81.2101 36.0901 81.4801 35.8201 81.7701 35.5801L64.8301 19.3301L62.8901 21.0101L80.9701 36.3801L80.9601 36.3701Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M61.9203 16.5399L52.6903 7.68994L50.2703 10.2799L59.8003 18.3799L61.9203 16.5399Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M87.7702 10.32L88.8502 -38.25L83.9402 -37.29L84.8602 10.24L87.7702 10.32Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M86.4502 33.88C86.7202 33.88 86.9902 33.9 87.2502 33.93L87.6902 14.33L84.9502 14.25L85.3302 33.98C85.7002 33.92 86.0702 33.89 86.4502 33.89V33.88Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M118.95 -12.67L114.75 -13.96L107.35 -0.0499573L110.52 1.38005L118.95 -12.67Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M108.45 4.83998L105.47 3.48999L89.0503 34.36C89.5103 34.53 89.9403 34.75 90.3503 35.01L108.45 4.82999V4.83998Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M135.56 34.86L164.61 31.01L164.44 26.34L135.29 31.6L135.56 34.86Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M131.34 32.3101L93.4702 39.1401C93.5902 39.5501 93.6802 39.9701 93.7202 40.4101L131.59 35.3901L131.33 32.3201L131.34 32.3101Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M139.05 41.8899L123.34 41.4199L123.09 44.6199L138.88 45.8599L139.05 41.8899Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M119.1 44.31L119.34 41.3L93.7302 40.54C93.7502 40.76 93.7602 40.98 93.7602 41.2C93.7602 41.58 93.7202 41.96 93.6602 42.33L119.09 44.3201L119.1 44.31Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M110.59 82.5601L113.86 80.9301L91.1503 46.8101C90.4703 47.3801 89.6903 47.82 88.8403 48.11L108.14 99.58L111.59 98.0301L90.2803 47.9701L110.59 82.5601Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M112.62 86.01L121.09 100.44L125.58 98.54L116.09 84.28L112.62 86.01Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M87.9902 48.34C87.4902 48.45 86.9802 48.51 86.4502 48.51C86.3802 48.51 86.3102 48.51 86.2402 48.5L90.1502 86.83L93.7102 86.75L88.0002 48.34H87.9902Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M94.2903 90.74L90.5503 90.82L91.4003 99.1L95.4903 98.78L94.2903 90.74Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M91.8003 103.08L93.4503 119.27L98.4603 118.75L96.0803 102.75L91.8003 103.08Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M42.8002 32.91L26.7802 30.14L26.4302 34.46L42.5702 36.39L42.8002 32.91Z" fill="#E4E42C"/>
                                            <path opacity="0.9" d="M46.77 33.59L46.54 36.86L53.8 37.73V34.81L46.77 33.59Z" fill="#E4E42C"/>
                                            </g>
                                            <g opacity="0.9">
                                            <path opacity="0.9" d="M361.62 178.6C361.38 177.62 360.4 177.02 359.42 177.25C358.44 177.48 357.84 178.47 358.07 179.45C358.3 180.43 359.29 181.03 360.27 180.8C361.25 180.57 361.85 179.58 361.62 178.6Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M355.4 176.72L317.24 161.39L316.11 163.89L355 177.72C355.1 177.37 355.23 177.04 355.4 176.72Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M355.81 182.13L329.71 208.63L332.06 210.17L356.74 183.08C356.4 182.81 356.08 182.49 355.82 182.13H355.81Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M364.69 180.81L400.32 191.52L401.08 188.49L364.95 179.68C364.9 180.07 364.82 180.45 364.69 180.81Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M363.88 175.91L397.93 146.56L395.51 145.19L363.16 175.18C363.42 175.4 363.66 175.64 363.88 175.91Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M356.72 175.11L330.67 147.53L328.92 149.63L356 175.81C356.22 175.55 356.46 175.32 356.72 175.11Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M339.57 179.9L340.01 181.73L354.89 179.98C354.83 179.62 354.8 179.26 354.81 178.91L339.57 179.9Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M328.64 199.75L355.66 181.91C355.48 181.63 355.32 181.34 355.19 181.02L327.59 197.49L328.64 199.75Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M312.27 206.63L314.26 209.24L326.29 201.3L325.19 198.92L312.27 206.63Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M355.08 199.68L356.84 199.87L359.29 184.15C358.95 184.11 358.62 184.03 358.3 183.93L355.08 199.69V199.68Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M349.37 227.65L352.5 227.77L356.41 202.62L354.52 202.42L349.37 227.65Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M355.4 176.71C355.52 176.48 355.66 176.25 355.82 176.04L341.7 167.8L340.66 169.25L355.4 176.71Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M339.28 166.39L331.58 161.9L330.37 164.04L338.14 167.98L339.28 166.39Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M355.77 157.96L348.59 124.9L345.42 126.35L353.79 158.38L355.77 157.96Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M358.71 174.13C358.89 174.09 359.08 174.05 359.26 174.03L356.36 160.68L354.49 161.07L357.96 174.37C358.2 174.27 358.45 174.19 358.7 174.12L358.71 174.13Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M373.14 137.32L370.09 137.13L367.34 147.75L369.72 148.21L373.14 137.32Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M368.88 150.89L366.64 150.46L360.55 174.04C360.89 174.08 361.22 174.16 361.54 174.27L368.88 150.89Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M392.13 166.8L411.18 159.46L410.3 156.33L391.42 164.64L392.13 166.8Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M388.85 165.76L364.32 176.55C364.47 176.81 364.6 177.08 364.7 177.37L389.53 167.8L388.86 165.76H388.85Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M395.64 170.99L384.92 173.23L385.27 175.45L396.17 173.71L395.64 170.99Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M382.52 175.88L382.19 173.8L364.72 177.45C364.77 177.59 364.81 177.74 364.85 177.89C364.91 178.15 364.95 178.41 364.97 178.67L382.52 175.88Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M382.98 203.17L384.93 201.53L363.99 182.12C363.62 182.61 363.17 183.04 362.64 183.38L384.09 215.1L386.18 213.48L363.6 183.05L382.98 203.17Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M384.92 205.18L393.01 213.57L395.74 211.55L386.99 203.44L384.92 205.18Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M362.11 183.68C361.79 183.83 361.45 183.96 361.09 184.04C361.04 184.05 360.99 184.06 360.95 184.07L369.84 209.39L372.23 208.76L362.11 183.68Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M373.28 211.37L370.76 212.03L372.68 217.5L375.4 216.62L373.28 211.37Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M373.6 220.13L377.36 230.82L380.66 229.65L376.45 219.21L373.6 220.13Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M329 180.58L317.69 181.32L318.16 184.3L329.4 182.98L329 180.58Z" fill="#B0BBF7"/>
                                            <path opacity="0.9" d="M331.79 180.4L332.17 182.65L337.23 182.06L336.75 180.08L331.79 180.4Z" fill="#B0BBF7"/>
                                            </g>
                                            <g opacity="0.9">
                                            <path opacity="0.9" d="M110.76 251.34C110.87 250.56 110.34 249.83 109.55 249.72C108.76 249.61 108.04 250.14 107.93 250.93C107.82 251.72 108.35 252.44 109.14 252.55C109.93 252.66 110.65 252.13 110.76 251.34Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M106.79 248.15L83.5502 225.9L82.0002 227.38L106.2 248.76C106.37 248.54 106.57 248.33 106.78 248.15H106.79Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M105.51 252.2L78.8403 263.83L80.1003 265.63L105.91 253.16C105.74 252.86 105.61 252.54 105.52 252.2H105.51Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M112.35 253.84L135.09 272L136.52 270.02L112.86 253.1C112.71 253.37 112.54 253.62 112.34 253.84H112.35Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M113.18 250.05L146.45 238.67L145.09 236.97L112.87 249.31C113 249.54 113.1 249.79 113.18 250.05Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M108.22 247.38L97.3502 219.77L95.4702 220.78L107.49 247.68C107.72 247.56 107.96 247.46 108.22 247.38Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M94.3802 245.85L94.1702 247.31L105.48 250.38C105.54 250.1 105.62 249.83 105.74 249.58L94.3902 245.86L94.3802 245.85Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M80.6501 257.08L105.47 252.01C105.42 251.75 105.39 251.49 105.39 251.22L80.5601 255.13L80.6601 257.08H80.6501Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M66.7703 257.3L67.4503 259.78L78.4903 257.52L78.3903 255.47L66.7703 257.3Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M99.8701 264.73L101.09 265.38L107.45 254.68C107.22 254.55 107 254.4 106.8 254.23L99.8701 264.73Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M87.5703 283.37L89.8003 284.37L99.9803 267.26L98.6603 266.56L87.5703 283.37Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M106.79 248.15C106.95 248.02 107.11 247.89 107.29 247.79L99.4403 237.69L98.2603 238.44L106.79 248.15Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M98.1003 235.96L93.8303 230.46L92.3203 231.66L96.8103 236.78L98.1003 235.96Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M112.53 234.65L116.96 208.56L114.24 208.68L110.97 234.38L112.53 234.65Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M109.95 247.25C110.1 247.27 110.24 247.3 110.38 247.34L112.17 236.81L110.7 236.55L109.34 247.22C109.54 247.22 109.75 247.22 109.95 247.26V247.25Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M131.16 224.73L129 223.7L123.91 230.62L125.5 231.64L131.16 224.73Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M124.11 233.34L122.61 232.38L111.32 247.72C111.55 247.85 111.77 248 111.97 248.17L124.11 233.34Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M136.35 251.67L152.31 251.89L152.59 249.36L136.46 249.89L136.35 251.67Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M134.27 249.96L113.31 250.64C113.34 250.87 113.36 251.11 113.35 251.34L134.16 251.63L134.27 249.95V249.96Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M137.67 255.73L129.24 254.23L128.85 255.94L137.26 257.86L137.67 255.73Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M126.72 255.46L127.09 253.86L113.35 251.42C113.35 251.54 113.33 251.66 113.32 251.78C113.29 251.99 113.24 252.19 113.18 252.38L126.73 255.47L126.72 255.46Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M119.11 275.4L121 274.78L111.46 254.59C111.05 254.84 110.59 255.02 110.11 255.11L116.44 284.39L118.43 283.83L110.91 255.16L119.12 275.41L119.11 275.4Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M119.93 277.42L123.35 285.87L125.92 285.2L121.93 276.76L119.93 277.42Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M109.63 255.17C109.35 255.19 109.07 255.17 108.79 255.14C108.75 255.14 108.72 255.12 108.68 255.12L107.75 276.09L109.67 276.33L109.63 255.17Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M109.67 278.52L107.65 278.27L107.45 282.8L109.68 282.95L109.67 278.52Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M107.35 284.98L106.96 293.83L109.7 293.95L109.69 285.14L107.35 284.98Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M86.5003 243.27L78.0803 240.51L77.5503 242.81L86.1003 245.12L86.5003 243.27Z" fill="#B0BBFF"/>
                                            <path opacity="0.9" d="M88.5802 243.95L88.2002 245.69L92.0402 246.74L92.2802 245.16L88.5802 243.95Z" fill="#B0BBFF"/>
                                            </g>
                                            <path d="M62.07 321.84C62.15 321.3 61.78 320.81 61.24 320.73C60.7 320.65 60.21 321.02 60.13 321.56C60.05 322.1 60.42 322.59 60.96 322.67C61.5 322.75 61.99 322.38 62.07 321.84Z" fill="#EFA0A8"/>
                                            <path d="M59.3501 319.65L43.4001 304.37L42.3401 305.39L58.9601 320.07C59.0801 319.92 59.2101 319.78 59.3601 319.65H59.3501Z" fill="#EFA0A8"/>
                                            <path d="M58.4702 322.43L40.1602 330.41L41.0202 331.65L58.7402 323.09C58.6202 322.88 58.5302 322.67 58.4702 322.43Z" fill="#EFA0A8"/>
                                            <path d="M63.1602 323.56L78.7802 336.03L79.7602 334.67L63.5202 323.05C63.4202 323.23 63.3002 323.41 63.1602 323.56Z" fill="#EFA0A8"/>
                                            <path d="M63.7403 320.95L86.5803 313.14L85.6503 311.97L63.5303 320.44C63.6203 320.6 63.6903 320.77 63.7403 320.95Z" fill="#EFA0A8"/>
                                            <path d="M60.3301 319.12L52.8701 300.16L51.5801 300.86L59.8301 319.33C59.9901 319.25 60.1601 319.18 60.3301 319.12Z" fill="#EFA0A8"/>
                                            <path d="M50.8199 318.07L50.6699 319.07L58.4399 321.17C58.4799 320.98 58.5399 320.79 58.6199 320.62L50.8299 318.06L50.8199 318.07Z" fill="#EFA0A8"/>
                                            <path d="M41.4001 325.78L58.4401 322.3C58.4001 322.12 58.3801 321.94 58.3801 321.76L41.3301 324.44L41.4001 325.78Z" fill="#EFA0A8"/>
                                            <path d="M31.8701 325.93L32.3301 327.63L39.9201 326.08L39.8501 324.68L31.8701 325.93Z" fill="#EFA0A8"/>
                                            <path d="M54.5901 331.04L55.4301 331.49L59.8001 324.14C59.6401 324.05 59.4901 323.95 59.3501 323.83L54.5901 331.04Z" fill="#EFA0A8"/>
                                            <path d="M46.1501 343.84L47.6801 344.52L54.6701 332.77L53.7701 332.29L46.1501 343.84Z" fill="#EFA0A8"/>
                                            <path d="M59.3502 319.65C59.4602 319.56 59.5702 319.47 59.6902 319.4L54.3002 312.47L53.4902 312.98L59.3402 319.65H59.3502Z" fill="#EFA0A8"/>
                                            <path d="M53.3802 311.28L50.4402 307.5L49.4102 308.33L52.4902 311.84L53.3802 311.28Z" fill="#EFA0A8"/>
                                            <path d="M63.29 310.38L66.33 292.47L64.46 292.55L62.21 310.19L63.29 310.38Z" fill="#EFA0A8"/>
                                            <path d="M61.5101 319.03C61.6101 319.04 61.7101 319.07 61.8001 319.09L63.0301 311.86L62.0201 311.68L61.0901 319C61.2301 319 61.3701 319 61.5101 319.03Z" fill="#EFA0A8"/>
                                            <path d="M76.0801 303.57L74.5901 302.86L71.1001 307.61L72.1901 308.31L76.0801 303.57Z" fill="#EFA0A8"/>
                                            <path d="M71.24 309.48L70.21 308.82L62.46 319.35C62.62 319.44 62.77 319.54 62.91 319.66L71.25 309.48H71.24Z" fill="#EFA0A8"/>
                                            <path d="M79.6401 322.07L90.6001 322.22L90.7901 320.48L79.7201 320.84L79.6401 322.07Z" fill="#EFA0A8"/>
                                            <path d="M78.2101 320.89L63.8201 321.36C63.8401 321.52 63.8501 321.68 63.8501 321.84L78.1401 322.04L78.2101 320.89Z" fill="#EFA0A8"/>
                                            <path d="M80.5502 324.86L74.7602 323.83L74.4902 325L80.2702 326.32L80.5502 324.86Z" fill="#EFA0A8"/>
                                            <path d="M73.0302 324.67L73.2802 323.57L63.8402 321.89C63.8402 321.97 63.8302 322.05 63.8202 322.13C63.8002 322.27 63.7602 322.41 63.7202 322.54L73.0202 324.66L73.0302 324.67Z" fill="#EFA0A8"/>
                                            <path d="M67.8001 338.36L69.1001 337.93L62.5501 324.07C62.2701 324.24 61.9601 324.36 61.6201 324.43L65.9601 344.53L67.3201 344.14L62.1601 324.45L67.7901 338.36H67.8001Z" fill="#EFA0A8"/>
                                            <path d="M68.3601 339.75L70.7101 345.55L72.4801 345.09L69.7401 339.3L68.3601 339.75Z" fill="#EFA0A8"/>
                                            <path d="M61.3 324.47C61.11 324.48 60.92 324.47 60.72 324.45C60.69 324.45 60.67 324.44 60.64 324.43L60 338.83L61.32 338.99L61.29 324.46L61.3 324.47Z" fill="#EFA0A8"/>
                                            <path d="M61.3301 340.5L59.94 340.33L59.8 343.44L61.3301 343.55V340.5Z" fill="#EFA0A8"/>
                                            <path d="M59.73 344.93L59.46 351.02L61.34 351.1L61.33 345.05L59.73 344.93Z" fill="#EFA0A8"/>
                                            <path d="M45.41 316.3L39.63 314.4L39.27 315.98L45.14 317.57L45.41 316.3Z" fill="#EFA0A8"/>
                                            <path d="M46.8401 316.77L46.5801 317.97L49.2201 318.68L49.3801 317.6L46.8401 316.77Z" fill="#EFA0A8"/>
                                            </g>
                                        </svg>
                                    </div>
                                    </div>
                                </div>
                                <div className="copyDiv">
                                    <p className="main-title">그때 그곳의 감성을 전하세요</p>
                                    <p className="sub-title">위치기반 SNS 플랫폼, 곳;감</p>
                                </div>
                            </div>
                            <div id="trigger" className='spacer'></div>
                            <div className="section2 scroll"  id="txt1section">
                                <div className="section2_desc scroll" id="parasec1">
                                    <p className="disc1">추억의 장소를 어떻게 기억하시나요?<br/>감성적인 경험은 그때 그곳을 특별하게 만듭니다.<br/>그리고 추억은 우리를 앞으로 나아가게 만들죠.</p>
                                    <p className='disc2' style={{display:"none"}}>포스팟은 장소의 추억을 저장하는 서비스를 만들기로 했습니다.<br/>곳;감은 블록체인 기술로 감성까지 전달하는<br/>위치기반 감성 SNS 플랫폼입니다.</p>
                                </div>

                                {/* 
                                헤더바 색상 변경시 텍스트 같이 바뀌게// 22.05.03 은정
                                <div className="copyDiv " id="parasec1">
                                    <p className="disc">추억의 장소를 어떻게 기억하시나요?<br/>감성적인 경험은 그때 그곳을 특별하게 만듭니다.<br/>그리고 추억은 우리를 앞으로 나아가게 만들죠.</p>
                                </div>
                                <div className="copyDiv2 " id="parasec2" style={{display:"none"}}>
                                    <p className='disc2'>포스팟은 장소의 추억을 저장하는 서비스를 만들기로 했습니다.<br/>곳;감은 블록체인 기술로 감성까지 전달하는<br/>위치기반 감성 SNS 플랫폼입니다.</p>
                                </div>
                                 */}
                                <div className="imgDiv">
                                    {/* <div className="imsitxt">상쾌한</div> */}
                                
                                {/* Main - pospot - 곶감 설명 이미지 나누기 22.05.03 */}
                                <History/> 
                                {/* <div className="parasection">
                                    <div className='paraimg1'>

                                    </div>
                                    <div className='paraimg2'>

                                    </div>
                                </div> */}
                                </div>
                            </div>
                            <div className="section1" id="txt2section">
                                <div className="ani" >
                                    <svg width="859" height="521" viewBox="0 0 859 521" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M617 120.65H217C106.543 120.65 17 210.193 17 320.65C17 431.107 106.543 520.65 217 520.65H617C727.457 520.65 817 431.107 817 320.65C817 210.193 727.457 120.65 617 120.65Z" fill="#E8A645"/>
                                        <mask id="mask0_582_5333" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="17" y="0" width="800" height="521">
                                        <path d="M617 0H217C106.543 0 17 116.63 17 260.5C17 404.37 106.543 521 217 521H617C727.457 521 817 404.37 817 260.5C817 116.63 727.457 0 617 0Z" fill="#E8A645"/>
                                        </mask>
                                        <g mask="url(#mask0_582_5333)">
                                        <path d="M355.441 145.15C355.441 145.15 348.761 108.13 360.621 85.24C375.521 56.46 418.511 43.55 454.351 71.22C479.691 90.78 465.681 148.82 465.681 148.82L390.911 117.03L355.451 145.15H355.441Z" fill="#23130F"/>
                                        <path d="M438.591 252.63L411.881 278.02L385.171 252.63L389.871 195.09H433.901L438.591 252.63Z" fill="#FFCEC9"/>
                                        <path d="M364.821 138.64C364.821 138.64 358.501 134.56 353.611 141.07C348.721 147.59 351.971 172.04 364.201 172.04C376.431 172.04 364.821 138.64 364.821 138.64Z" fill="#FFCEC9"/>
                                        <path d="M459.33 138.64C459.33 138.64 465.65 134.56 470.54 141.07C475.43 147.59 472.17 172.04 459.95 172.04C447.73 172.04 459.33 138.64 459.33 138.64Z" fill="#FFCEC9"/>
                                        <path d="M461.37 131.85C461.37 104.42 439.22 86.47 411.88 86.47C384.54 86.47 362.38 104.42 362.38 131.85C362.38 131.85 360.23 166.84 360.23 168.54C360.23 194.6 392.14 227.66 411.88 227.66C434.67 227.66 463.52 188.28 463.52 168.54C463.52 166.84 461.36 131.85 461.36 131.85H461.37Z" fill="#FFCEC9"/>
                                        <path d="M450.301 34.0001C450.961 53.7501 436.481 66.5701 414.821 67.3001C393.151 68.0201 382.851 55.4501 382.201 35.7001C381.541 15.9501 392.481 0.750072 414.131 0.0300721C435.791 -0.689928 449.641 14.2601 450.301 34.0101V34.0001Z" fill="#23130F"/>
                                        <path d="M422.08 133.06C422.08 133.06 442.461 131.03 446.391 131.41C452.941 132.04 454.34 136.29 455.36 138.6C455.71 139.39 428.75 142.03 424.83 140.61C420.91 139.19 422.08 133.06 422.08 133.06Z" fill="#23130F"/>
                                        <path d="M401.75 133.06C401.75 133.06 381.37 131.03 377.44 131.41C370.89 132.04 369.48 136.29 368.47 138.6C368.12 139.39 395.08 142.03 399 140.61C402.92 139.19 401.75 133.06 401.75 133.06Z" fill="#23130F"/>
                                        <path d="M386.8 177.44C376.28 177.44 367.73 168.89 367.73 158.37C367.73 147.85 376.29 139.3 386.8 139.3C397.31 139.3 405.87 147.85 405.87 158.37C405.87 168.89 397.31 177.44 386.8 177.44ZM386.8 141.18C377.32 141.18 369.61 148.89 369.61 158.37C369.61 167.85 377.32 175.55 386.8 175.55C396.28 175.55 403.99 167.84 403.99 158.37C403.99 148.9 396.28 141.18 386.8 141.18Z" fill="#45299A"/>
                                        <path d="M437.15 177.44C426.63 177.44 418.08 168.89 418.08 158.37C418.08 147.85 426.63 139.3 437.15 139.3C447.67 139.3 456.22 147.85 456.22 158.37C456.22 168.89 447.67 177.44 437.15 177.44ZM437.15 141.18C427.67 141.18 419.96 148.89 419.96 158.37C419.96 167.85 427.67 175.55 437.15 175.55C446.63 175.55 454.34 167.84 454.34 158.37C454.34 148.9 446.63 141.18 437.15 141.18Z" fill="#45299A"/>
                                        <path d="M419.031 157.43H404.931V159.31H419.031V157.43Z" fill="#45299A"/>
                                        <path d="M403.371 189.04H421.991L412.681 192.62L403.371 189.04Z" fill="#D77D79"/>
                                        <path d="M411.581 280.15C437.381 280.15 449.981 254.74 443.931 252.93C426.841 247.81 414.191 244.71 414.191 244.71C414.191 244.71 399.731 247.99 380.201 253.99C373.501 256.05 386.501 280.15 411.581 280.15Z" fill="#FFCEC9"/>
                                        <path d="M576.3 401.73C574.28 392.24 572.1 383.77 569.81 376.91C567.82 370.96 565.39 363.87 562.6 356.28C554.5 334.3 543.3 308.08 530.61 292.72C520.34 280.29 470.9 261.93 443.93 252.93C438.69 277.62 386.16 277.66 380.2 254C356.41 262.48 308.91 281.08 292.78 294.85C275.73 309.39 264.5 334.02 257.17 357.11C252.98 370.32 250.06 383.02 248.07 393.04C246.16 402.61 245.09 409.74 244.55 412.54C238.01 446.16 216.04 490.51 219.27 510C227.77 561.42 249.56 561.42 249.56 561.42L587.04 561.28C596.04 554.3 602.9 528.12 602.99 510C603.13 481.33 585.28 443.76 576.31 401.72L576.3 401.73Z" fill="#45299A"/>
                                        <path d="M496.52 387.37H321.95V407.16H496.52V387.37Z" fill="white"/>
                                        <path d="M496.52 430.24H321.95V450.03H496.52V430.24Z" fill="white"/>
                                        <path d="M358.23 375.4C358.23 375.4 366.9 366.36 367.05 366.06C367.24 365.68 367.62 365.24 367.6 364.59L367.8 349.17C367.8 349.17 368.15 346.02 365.72 345.42L365.67 336.92C365.49 332.14 364.47 331.27 362.39 330.85C362.39 330.85 363.77 321.3 360.43 320.93C357.95 320.65 332.21 326.48 332.21 326.48L350.22 294.58C352.41 289.04 350.72 283.99 347.82 283.4C345.74 282.98 342.29 286.54 340.33 288.81C337.82 291.7 307.44 328.55 306.61 329.8C305.28 331.55 304.47 335.32 304.94 337.29C304.94 338.54 320.49 383.93 320.49 383.93L268.12 451.5L298.28 484.06L356.57 392.05C359.07 388.3 359.07 380.39 358.24 375.4H358.23Z" fill="#FFCEC9"/>
                                        <path d="M362.651 327.85L339.021 340.04L362.541 330.88C362.491 330.87 362.441 330.86 362.391 330.85C362.391 330.85 362.581 329.53 362.651 327.85Z" fill="#D77D79"/>
                                        <path d="M346.45 354.25L365.72 345.42L365.7 341.15L346.45 354.25Z" fill="#D77D79"/>
                                        <path d="M361.44 371.84C361.29 372.13 358.22 375.39 358.22 375.39L353.7 365.05L362.05 359.88C362.18 362.61 362.87 368.32 361.44 371.83V371.84Z" fill="#D77D79"/>
                                        <path d="M344.47 418.99C344.47 418.99 299.55 553.23 294.36 567.01L322.98 574.66L344.47 418.99Z" fill="#2C1A62"/>
                                        <path d="M294.38 566.99C303 558.11 313.03 534.16 316.47 524.28C319.92 514.4 333.44 465.03 335.57 456.11C337.7 447.19 344.56 418.71 344.56 418.71C341.34 418.9 331.29 418.05 322.72 413.63C314.15 409.22 309.84 404.63 304.71 398.24L218.98 506.47C218.2 546.53 235.67 551.23 235.67 551.23L294.37 566.97L294.38 566.99Z" fill="#45299A"/>
                                        <path d="M241.19 552.72C262.11 524.38 314.11 446.08 318.22 438.86C322.65 431.09 325.26 422.12 326.45 415.3C325.19 414.81 323.94 414.26 322.72 413.63C314.15 409.22 309.84 404.63 304.71 398.24L218.98 506.47C218.2 546.53 235.67 551.23 235.67 551.23L241.18 552.71L241.19 552.72Z" fill="#5D3DBF"/>
                                        <path d="M463.61 375.4C463.61 375.4 454.94 366.36 454.79 366.06C454.6 365.68 454.22 365.24 454.24 364.59L454.04 349.17C454.04 349.17 453.69 346.02 456.12 345.42L456.17 336.92C456.35 332.14 457.37 331.27 459.45 330.85C459.45 330.85 458.07 321.3 461.41 320.93C463.89 320.65 489.63 326.48 489.63 326.48L471.62 294.58C469.43 289.04 471.12 283.99 474.02 283.4C476.1 282.98 479.55 286.54 481.51 288.81C484.02 291.7 514.4 328.55 515.23 329.8C516.56 331.55 517.37 335.32 516.9 337.29C516.9 338.54 501.35 383.93 501.35 383.93L553.72 451.5L523.56 484.06L465.27 392.05C462.77 388.3 462.77 380.39 463.6 375.4H463.61Z" fill="#FFCEC9"/>
                                        <path d="M459.19 327.85L482.82 340.04L459.3 330.88C459.35 330.87 459.4 330.86 459.45 330.85C459.45 330.85 459.26 329.53 459.19 327.85Z" fill="#D77D79"/>
                                        <path d="M475.39 354.25L456.12 345.42L456.14 341.15L475.39 354.25Z" fill="#D77D79"/>
                                        <path d="M460.4 371.84C460.55 372.13 463.62 375.39 463.62 375.39L468.14 365.05L459.79 359.88C459.66 362.61 458.97 368.32 460.4 371.83V371.84Z" fill="#D77D79"/>
                                        <path d="M477.37 418.99C477.37 418.99 522.29 553.23 527.48 567.01L498.86 574.66L477.37 418.99Z" fill="#2C1A62"/>
                                        <path d="M527.47 566.99C518.85 558.11 508.82 534.16 505.38 524.28C501.93 514.4 488.41 465.03 486.28 456.11C484.15 447.19 477.29 418.71 477.29 418.71C480.51 418.9 490.56 418.05 499.13 413.63C507.7 409.22 512.01 404.63 517.14 398.24L602.87 506.47C603.65 546.53 586.18 551.23 586.18 551.23L527.48 566.97L527.47 566.99Z" fill="#45299A"/>
                                        <path d="M580.65 552.72C559.73 524.38 507.73 446.08 503.62 438.86C499.19 431.09 496.58 422.12 495.39 415.3C496.65 414.81 497.9 414.26 499.12 413.63C507.69 409.22 512 404.63 517.13 398.24L602.86 506.47C603.64 546.53 586.17 551.23 586.17 551.23L580.66 552.71L580.65 552.72Z" fill="#5D3DBF"/>
                                        </g>
                                        <mask id="mask1_582_5333" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="17" y="120" width="800" height="401">
                                        <path d="M617 120.65H217C106.543 120.65 17 210.193 17 320.65C17 431.107 106.543 520.65 217 520.65H617C727.457 520.65 817 431.107 817 320.65C817 210.193 727.457 120.65 617 120.65Z" fill="#E8A645"/>
                                        </mask>
                                        <g mask="url(#mask1_582_5333)">
                                        <path d="M647 385.67C653.4 388.66 664.5 402.74 666.2 405.73C667.9 408.72 682.42 445.85 684.55 458.22L654.25 459.5C649.98 449.26 646.57 419.38 644.86 408.29C643.15 397.2 643.15 389.51 643.58 386.53C644.01 383.55 646.57 384.4 646.99 385.68L647 385.67Z" fill="#4B9B7C"/>
                                        <path d="M648.28 459.5C638.46 452.25 632.92 442.43 636.76 431.76C640.6 421.09 644.01 418.96 652.12 413.41C660.23 407.86 667.91 401.46 669.62 390.79C671.33 380.12 672.18 373.29 671.33 368.17C670.48 363.05 673.46 364.33 676.02 365.18C678.58 366.03 687.6 373.11 689.68 378.41C693.52 388.23 693.95 411.7 692.67 418.1C691.39 424.5 690.11 450.53 676.03 458.64C661.95 466.75 648.29 459.49 648.29 459.49L648.28 459.5Z" fill="#7EAE7E"/>
                                        <path d="M718.27 389.94C709.31 389.51 694.37 396.34 690.1 402.32C685.83 408.3 683.7 419.82 677.3 424.94C670.9 430.06 660.66 433.9 656.82 442.01C652.98 450.12 655.54 457.37 660.23 459.93C664.92 462.49 691.81 460.78 691.81 460.78C698.21 455.66 701.63 448.4 702.05 440.3C702.48 432.19 701.62 426.22 707.6 418.54C713.58 410.86 719.55 403.18 721.26 398.06C722.97 392.94 720.83 390.38 718.27 389.95V389.94Z" fill="#438E6F"/>
                                        <path d="M704.45 456.62H633.01V465.43H704.45V456.62Z" fill="#284693"/>
                                        <path d="M668.729 463.77L638.859 464.29L644.949 519.26H668.729H692.519L698.609 464.29L668.729 463.77Z" fill="#284693"/>
                                        </g>
                                        <rect y="33.8572" width="194.3" height="122.514" rx="42.1143" fill="white"/>
                                        <path d="M271.63 216.239L192.142 125.201L154.582 146.622L271.63 216.239Z" fill="white"/>
                                        <path d="M62.7909 80.9765H44.4098V99.3576H62.7909V80.9765ZM48.8263 115.425H75.0309V111.135H54.1682V103.017H48.8263V115.425ZM49.7096 95.1514V85.2668H57.4911V95.1514H49.7096ZM68.2589 105.751H73.6429V93.2586H78.8165V88.8421H73.6429V77.8218H68.2589V105.751ZM115.264 92.3332H109.838V77.8218H104.454V116.014H109.838V96.7077H115.264V92.3332ZM80.8573 106.676H84.1802C89.8165 106.676 96.0206 106.34 102.435 105.036L101.888 100.577C96.3571 101.692 91.0994 102.155 86.1992 102.239V81.4812H80.8573V106.676ZM130.47 86.4866V80.7662H125.044V86.4866C125.002 93.6792 122.016 101.061 115.454 104.026L118.819 108.401C123.194 106.256 126.138 102.134 127.778 97.1072C129.377 101.839 132.237 105.667 136.485 107.728L139.766 103.438C133.394 100.683 130.491 93.6792 130.47 86.4866ZM135.476 94.1839H143.005V116.182H148.304V77.8218H143.005V89.8516H135.476V94.1839Z" fill="#6C4FC9"/>
                                        <rect x="591.086" y="75.0142" width="267.043" height="122.514" rx="42.1143" fill="white"/>
                                        <path d="M567.614 254.135C561.953 255.786 610.331 206.682 635.228 181.924H695.766C655.407 205.307 573.274 252.485 567.614 254.135Z" fill="white"/>
                                        <path d="M664.864 117.782H659.48V145.963H664.864V132.966H670.038V128.55H664.864V117.782ZM635.631 139.864H654.181V120.474H648.797V126.026H640.973V120.474H635.631V139.864ZM640.048 155.343H666.252V151.053H645.39V143.061H640.048V155.343ZM640.973 135.658V130.148H648.797V135.658H640.973ZM701.228 117.74H695.802V138.518H701.228V130.443H706.401V126.026H701.228V117.74ZM670.691 134.649L672.626 138.981C684.298 136.352 690.607 129.938 690.586 119.801H672.626V124.007H684.655C683.982 128.718 679.629 132.756 670.691 134.649ZM676.075 155.596H701.228V139.991H695.844V143.734H681.501V139.991H676.075V155.596ZM681.501 151.263V147.856H695.844V151.263H681.501ZM716.602 140.706H711.302V155.596H737.717V140.706H732.376V143.944H716.602V140.706ZM707.222 138.771H742.134V134.438H707.222V138.771ZM708.947 128.55L710.882 132.756C717.401 131.915 722.197 129.181 724.678 125.479C727.139 129.181 731.934 131.915 738.517 132.756L740.409 128.55C731.85 127.582 727.454 123.25 727.454 119.422V118.118H721.944V119.422C721.902 123.355 717.486 127.519 708.947 128.55ZM716.602 151.389V148.024H732.376V151.389H716.602ZM775.763 117.74H770.421V156.016H775.763V117.74ZM745.647 146.552H749.012C754.922 146.573 761.273 146.153 767.982 144.744L767.309 140.327C761.673 141.421 756.12 141.904 750.947 141.989V121.399H745.647V146.552ZM810.15 117.74H804.766V156.1H810.15V136.331H815.786V131.957H810.15V117.74ZM781.464 146.805H784.702C791.453 146.826 796.669 146.678 802.621 145.669L802.032 141.168C796.942 142.052 792.358 142.346 786.805 142.388V125.605H799.424V121.273H781.464V146.805Z" fill="#6C4FC9"/>
                                    </svg>
                                </div>
                                <div className='ani2' >
                                    <svg width="859" height="521" viewBox="0 0 859 521" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M617 120.65H217C106.543 120.65 17 210.193 17 320.65C17 431.107 106.543 520.65 217 520.65H617C727.457 520.65 817 431.107 817 320.65C817 210.193 727.457 120.65 617 120.65Z" fill="#E8A645"/>
                                        <mask id="mask0_646_1906" style={{maskType:"alpha"}}maskUnits="userSpaceOnUse" x="17" y="0" width="800" height="521">
                                        <path d="M816.53 306.97C816.83 302.17 817 297.33 817 292.45V228.17C817 102.16 714.84 0 588.83 0H245.17C119.16 0 17 102.16 17 228.17V292.45C17 297.33 17.17 302.17 17.47 306.97C17.17 311.49 17 316.03 17 320.62C17 431.08 106.54 520.62 217 520.62H617C626.46 520.62 635.77 519.95 644.89 518.68L644.95 519.23H692.52L694.07 505.22C766.26 475.04 817 403.76 817 320.62C817 316.03 816.83 311.48 816.53 306.97V306.97Z" fill="#C4C4C4"/>
                                        </mask>
                                        <g mask="url(#mask0_646_1906)">
                                        <path d="M355.441 145.15C355.441 145.15 348.761 108.13 360.621 85.2401C375.521 56.4601 418.511 43.5501 454.351 71.2201C479.691 90.7801 465.681 148.82 465.681 148.82L390.911 117.03L355.451 145.15H355.441Z" fill="#23130F"/>
                                        <path d="M438.59 252.63L411.88 278.02L385.17 252.63L389.87 195.09H433.9L438.59 252.63Z" fill="#FFCEC9"/>
                                        <path d="M364.821 138.64C364.821 138.64 358.501 134.56 353.611 141.07C348.721 147.59 351.971 172.04 364.201 172.04C376.431 172.04 364.821 138.64 364.821 138.64Z" fill="#FFCEC9"/>
                                        <path d="M459.33 138.64C459.33 138.64 465.65 134.56 470.54 141.07C475.43 147.59 472.17 172.04 459.95 172.04C447.73 172.04 459.33 138.64 459.33 138.64Z" fill="#FFCEC9"/>
                                        <path d="M461.37 131.85C461.37 104.42 439.22 86.4701 411.88 86.4701C384.54 86.4701 362.38 104.42 362.38 131.85C362.38 131.85 360.23 166.84 360.23 168.54C360.23 194.6 392.14 227.66 411.88 227.66C434.67 227.66 463.52 188.28 463.52 168.54C463.52 166.84 461.36 131.85 461.36 131.85H461.37Z" fill="#FFCEC9"/>
                                        <path d="M450.3 34.0001C450.96 53.7501 436.48 66.5701 414.82 67.3001C393.15 68.0201 382.85 55.4501 382.2 35.7001C381.54 15.9501 392.48 0.750072 414.13 0.0300721C435.79 -0.689928 449.64 14.2601 450.3 34.0101V34.0001Z" fill="#23130F"/>
                                        <path d="M422.081 133.06C422.081 133.06 442.461 131.03 446.391 131.41C452.941 132.04 454.341 136.29 455.361 138.6C455.711 139.39 428.751 142.03 424.831 140.61C420.911 139.19 422.081 133.06 422.081 133.06V133.06Z" fill="#23130F"/>
                                        <path d="M401.75 133.06C401.75 133.06 381.37 131.03 377.44 131.41C370.89 132.04 369.48 136.29 368.47 138.6C368.12 139.39 395.08 142.03 399 140.61C402.92 139.19 401.75 133.06 401.75 133.06V133.06Z" fill="#23130F"/>
                                        <path d="M386.8 177.44C376.28 177.44 367.73 168.89 367.73 158.37C367.73 147.85 376.29 139.3 386.8 139.3C397.31 139.3 405.87 147.85 405.87 158.37C405.87 168.89 397.31 177.44 386.8 177.44ZM386.8 141.18C377.32 141.18 369.61 148.89 369.61 158.37C369.61 167.85 377.32 175.55 386.8 175.55C396.28 175.55 403.99 167.84 403.99 158.37C403.99 148.9 396.28 141.18 386.8 141.18Z" fill="#45299A"/>
                                        <path d="M437.15 177.44C426.63 177.44 418.08 168.89 418.08 158.37C418.08 147.85 426.63 139.3 437.15 139.3C447.67 139.3 456.22 147.85 456.22 158.37C456.22 168.89 447.67 177.44 437.15 177.44ZM437.15 141.18C427.67 141.18 419.96 148.89 419.96 158.37C419.96 167.85 427.67 175.55 437.15 175.55C446.63 175.55 454.34 167.84 454.34 158.37C454.34 148.9 446.63 141.18 437.15 141.18Z" fill="#45299A"/>
                                        <path d="M419.03 157.43H404.93V159.31H419.03V157.43Z" fill="#45299A"/>
                                        <path d="M403.371 189.04H421.991L412.681 192.62L403.371 189.04Z" fill="#D77D79"/>
                                        <path d="M411.582 280.15C437.382 280.15 449.982 254.74 443.932 252.93C426.842 247.81 414.192 244.71 414.192 244.71C414.192 244.71 399.732 247.99 380.202 253.99C373.502 256.05 386.502 280.15 411.582 280.15Z" fill="#FFCEC9"/>
                                        <path d="M249.55 561.42C249.55 561.42 200.28 570.32 190.13 519.21C186.08 498.81 196.93 464.51 213.26 429.59C219.75 415.72 243.11 371.59 250.61 356.46C261.38 334.76 275.72 309.39 292.77 294.85C308.91 281.09 356.4 262.49 380.19 254C383.07 265.44 396.85 271.35 410.9 271.6H414.3C428.35 271.35 442.13 265.45 445.01 254C468.8 262.48 516.3 281.08 532.43 294.85C549.48 309.39 563.82 334.76 574.59 356.46C582.1 371.59 605.45 415.72 611.94 429.59C628.27 464.5 639.12 498.81 635.07 519.21C624.92 570.33 575.65 561.42 575.65 561.42H249.55Z" fill="#45299A"/>
                                        <path d="M502.501 407.15H321.951V387.37L496.351 387.53L502.501 407.15Z" fill="white"/>
                                        <path d="M515.671 449.86L321.951 450.02V430.24L509.471 430.07L515.671 449.86Z" fill="white"/>
                                        <path d="M372.77 419.98L342.48 416.17L270.36 466.28L251.15 443.99L323.64 378.56C324.57 373.92 326.4 368.45 330.42 365.44C335.82 361.39 359.02 346.71 359.02 346.71C362.85 344.44 364.2 347.68 364.32 349.5C364.51 352.37 362.28 356 358.84 359.65C356.04 362.61 351.5 369.49 351.5 369.49C351.5 369.49 361.97 372.85 367.24 373.5C372.72 374.17 399.48 357.17 399.48 357.17C402.69 355.88 405.78 355.13 407.1 357.12C408.42 359.11 407.45 361.55 406.59 364.14C410.78 362.78 413.61 366.93 413.13 369.51C412.82 371.19 411.84 372.95 411.3 374.32C411.3 374.32 413.34 374.25 414.83 375.78C416.94 377.94 416.21 380.92 414.74 383.21C413.35 385.37 409.77 388.97 409.77 388.97C409.77 388.97 412.35 391.86 412.77 394.42C413.67 397.26 406.88 401.67 404.35 404.61C402.17 406.77 386.34 418 382.58 419.42C378.72 420.99 376.85 420.93 372.77 419.98V419.98Z" fill="#FFCEC9"/>
                                        <path d="M406.59 364.13C406.68 363.87 406.77 363.6 406.86 363.34L397.05 370.6L377.31 384.06L366.4 383.14L378.83 385.88C378.83 385.88 399.41 370.81 408.9 363.91C408.19 363.8 407.42 363.85 406.59 364.12V364.13Z" fill="#D77D79"/>
                                        <path d="M413.06 374.63C412.1 374.28 411.31 374.31 411.31 374.31C411.41 374.06 411.53 373.79 411.65 373.52L381.41 397.43L370.33 396.24L383.8 399.2L413.07 374.63H413.06Z" fill="#D77D79"/>
                                        <path d="M410.651 390.07C410.161 389.4 409.771 388.97 409.771 388.97C409.771 388.97 410.251 388.49 410.911 387.78L384.371 408.44L373.471 407.72L386.211 410.3L410.641 390.07H410.651Z" fill="#D77D79"/>
                                        <path d="M332.141 426.37C332.141 426.37 261.611 549.11 253.811 561.59L280.351 574.74L332.141 426.37V426.37Z" fill="#2C1A62"/>
                                        <path d="M253.831 561.58C264.031 554.57 278.591 533.08 283.921 524.07C289.251 515.06 312.251 469.34 316.101 461.01C319.951 452.69 332.291 426.12 332.291 426.12C329.101 425.67 319.411 422.85 311.881 416.84C304.351 410.82 301.031 405.48 297.261 398.2L191.861 487.39C183.201 526.51 199.391 534.57 199.391 534.57L253.831 561.59V561.58Z" fill="#45299A"/>
                                        <path d="M204.501 537.1C230.601 513.44 297.031 446.94 302.481 440.68C308.351 433.93 312.681 425.66 315.201 419.21C314.071 418.48 312.951 417.7 311.881 416.84C304.351 410.82 301.031 405.48 297.261 398.2L191.861 487.39C183.201 526.51 199.391 534.57 199.391 534.57L204.501 537.11V537.1Z" fill="#5D3DBF"/>
                                        <path d="M456.859 481.56L486.879 476L561.779 521.84L579.669 498.48L503.509 437.36C502.309 432.78 500.169 427.43 495.979 424.65C490.359 420.92 466.339 407.61 466.339 407.61C462.389 405.56 461.219 408.88 461.209 410.7C461.189 413.58 463.619 417.07 467.269 420.51C470.229 423.3 475.169 429.91 475.169 429.91C475.169 429.91 464.909 433.87 459.689 434.82C454.259 435.81 426.549 420.39 426.549 420.39C423.269 419.29 420.139 418.72 418.939 420.78C417.739 422.84 418.849 425.23 419.859 427.76C415.589 426.64 413.019 430.95 413.639 433.5C414.049 435.16 415.119 436.86 415.739 438.19C415.739 438.19 413.699 438.24 412.299 439.85C410.319 442.13 411.219 445.06 412.819 447.27C414.329 449.35 418.119 452.74 418.119 452.74C418.119 452.74 415.709 455.78 415.439 458.36C414.699 461.25 421.739 465.26 424.439 468.05C426.739 470.08 443.189 480.38 447.029 481.57C450.969 482.92 452.839 482.75 456.859 481.56V481.56Z" fill="#FFCEC9"/>
                                        <path d="M419.859 427.77C419.759 427.51 419.649 427.25 419.549 427L429.769 433.68L450.249 445.97L461.089 444.42L448.839 447.88C448.839 447.88 427.419 434.03 417.549 427.69C418.249 427.54 419.019 427.55 419.859 427.77Z" fill="#D77D79"/>
                                        <path d="M414.01 438.63C414.95 438.22 415.74 438.2 415.74 438.2C415.63 437.96 415.49 437.69 415.35 437.43L446.93 459.55L457.93 457.72L444.66 461.46L414.01 438.63V438.63Z" fill="#D77D79"/>
                                        <path d="M417.31 453.9C417.76 453.2 418.12 452.75 418.12 452.75C418.12 452.75 417.62 452.3 416.91 451.63L444.6 470.72L455.44 469.37L442.87 472.68L417.31 453.9Z" fill="#D77D79"/>
                                        <path d="M501.719 488.36C501.719 488.36 629.209 549.87 642.699 555.78L628.209 581.61L501.719 488.36Z" fill="#2C1A62"/>
                                        <path d="M642.669 555.77C630.289 555.74 606.139 546.22 596.659 541.79C587.179 537.36 542.379 512.59 534.509 507.9C526.629 503.2 501.449 488.24 501.449 488.24C503.829 486.07 510.229 478.27 513.059 469.06C515.879 459.84 515.599 453.56 514.609 445.42L623.439 456.74C633.539 478.81 641.019 498.26 643.269 510.24C645.519 522.22 642.669 555.79 642.669 555.79V555.77Z" fill="#45299A"/>
                                        <path d="M512.42 470.97C512.42 470.97 512.39 471.06 512.37 471.1C512.15 471.7 511.91 472.3 511.66 472.89C517.38 476.79 525.62 481.18 534.28 483.43C540.64 485.09 599.93 496.35 641.64 503.35C638.39 491.56 631.94 475.35 623.72 457.34C623.5 457.14 623.29 456.94 623.07 456.73L514.62 445.41C515.61 453.55 515.89 459.83 513.07 469.05C512.87 469.7 512.65 470.33 512.42 470.96V470.97Z" fill="#5D3DBF"/>
                                        </g>
                                        <mask id="mask1_646_1906" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="17" y="120" width="800" height="401">
                                        <path d="M617 120.649H217C106.543 120.649 17 210.192 17 320.649C17 431.106 106.543 520.649 217 520.649H617C727.457 520.649 817 431.106 817 320.649C817 210.192 727.457 120.649 617 120.649Z" fill="#E8A645"/>
                                        </mask>
                                        <g mask="url(#mask1_646_1906)">
                                        <path d="M647 385.67C653.4 388.66 664.5 402.74 666.2 405.73C667.91 408.72 682.42 445.85 684.55 458.22L654.25 459.5C649.98 449.26 646.57 419.38 644.86 408.29C643.15 397.2 643.15 389.51 643.58 386.53C644.01 383.55 646.57 384.4 646.99 385.68L647 385.67Z" fill="#4B9B7C"/>
                                        <path d="M648.28 459.5C638.46 452.25 632.92 442.43 636.76 431.76C640.6 421.09 644.01 418.96 652.12 413.41C660.23 407.86 667.91 401.46 669.62 390.79C671.33 380.12 672.18 373.29 671.33 368.17C670.48 363.05 673.46 364.33 676.02 365.18C678.58 366.03 687.6 373.11 689.68 378.41C693.52 388.23 693.95 411.7 692.67 418.1C691.39 424.5 690.11 450.53 676.03 458.64C661.95 466.75 648.29 459.49 648.29 459.49L648.28 459.5Z" fill="#7EAE7E"/>
                                        <path d="M718.27 389.94C709.31 389.51 694.37 396.34 690.1 402.32C685.83 408.29 683.7 419.82 677.3 424.94C670.9 430.06 660.66 433.9 656.82 442.01C652.98 450.12 655.54 457.37 660.23 459.93C664.92 462.49 691.81 460.78 691.81 460.78C698.21 455.66 701.63 448.4 702.05 440.3C702.48 432.19 701.62 426.22 707.6 418.54C713.57 410.86 719.55 403.18 721.26 398.06C722.97 392.94 720.83 390.38 718.27 389.95V389.94Z" fill="#438E6F"/>
                                        <path d="M704.45 456.62H633.01V465.43H704.45V456.62Z" fill="#284693"/>
                                        <path d="M668.729 463.77L638.859 464.29L644.949 519.26H668.729H692.519L698.609 464.29L668.729 463.77Z" fill="#284693"/>
                                        </g>
                                        <rect y="33.8572" width="194.3" height="122.514" rx="42.1143" fill="white"/>
                                        <path d="M271.63 216.239L192.142 125.201L154.582 146.622L271.63 216.239Z" fill="white"/>
                                        <path d="M62.7899 80.9765H44.4088V99.3576H62.7899V80.9765ZM48.8253 115.425H75.0299V111.135H54.1672V103.017H48.8253V115.425ZM49.7086 95.1514V85.2668H57.4901V95.1514H49.7086ZM68.2579 105.751H73.6419V93.2586H78.8155V88.8421H73.6419V77.8218H68.2579V105.751ZM115.263 92.3332H109.837V77.8218H104.453V116.014H109.837V96.7077H115.263V92.3332ZM80.8563 106.676H84.1792C89.8155 106.676 96.0197 106.34 102.434 105.036L101.887 100.577C96.3562 101.692 91.0984 102.155 86.1982 102.239V81.4812H80.8563V106.676ZM130.469 86.4866V80.7662H125.043V86.4866C125.001 93.6792 122.015 101.061 115.453 104.026L118.818 108.401C123.193 106.256 126.137 102.134 127.777 97.1072C129.376 101.839 132.236 105.667 136.484 107.728L139.765 103.438C133.393 100.683 130.49 93.6792 130.469 86.4866ZM135.475 94.1839H143.004V116.182H148.304V77.8218H143.004V89.8516H135.475V94.1839Z" fill="#6C4FC9"/>
                                        <rect x="591.086" y="75.0143" width="267.043" height="122.514" rx="42.1143" fill="white"/>
                                        <path d="M567.614 254.136C561.953 255.786 610.331 206.682 635.228 181.924H695.766C655.407 205.307 573.274 252.485 567.614 254.136Z" fill="white"/>
                                        <path d="M664.864 117.782H659.48V145.963H664.864V132.966H670.038V128.55H664.864V117.782ZM635.631 139.864H654.181V120.474H648.797V126.026H640.973V120.474H635.631V139.864ZM640.048 155.343H666.252V151.053H645.39V143.061H640.048V155.343ZM640.973 135.658V130.148H648.797V135.658H640.973ZM701.228 117.74H695.802V138.518H701.228V130.443H706.401V126.026H701.228V117.74ZM670.691 134.649L672.626 138.981C684.298 136.352 690.607 129.938 690.586 119.801H672.626V124.007H684.655C683.982 128.718 679.629 132.756 670.691 134.649ZM676.075 155.596H701.228V139.991H695.844V143.734H681.501V139.991H676.075V155.596ZM681.501 151.263V147.856H695.844V151.263H681.501ZM716.602 140.706H711.302V155.596H737.717V140.706H732.376V143.944H716.602V140.706ZM707.222 138.771H742.134V134.438H707.222V138.771ZM708.947 128.55L710.882 132.756C717.401 131.915 722.197 129.181 724.678 125.479C727.139 129.181 731.934 131.915 738.517 132.756L740.409 128.55C731.85 127.582 727.454 123.25 727.454 119.422V118.118H721.944V119.422C721.902 123.355 717.486 127.519 708.947 128.55ZM716.602 151.389V148.024H732.376V151.389H716.602ZM775.763 117.74H770.421V156.016H775.763V117.74ZM745.647 146.552H749.012C754.922 146.573 761.273 146.153 767.982 144.744L767.309 140.327C761.673 141.421 756.12 141.904 750.947 141.989V121.399H745.647V146.552ZM810.15 117.74H804.766V156.1H810.15V136.331H815.786V131.957H810.15V117.74ZM781.464 146.805H784.702C791.453 146.826 796.669 146.678 802.621 145.669L802.032 141.168C796.942 142.052 792.358 142.346 786.805 142.388V125.605H799.424V121.273H781.464V146.805Z" fill="#6C4FC9"/>
                                    </svg>
                                </div>
                                <div className="copyDiv">
                                    <p className="main-title">AI 기술로 언어의 장벽을 넘겠습니다</p>
                                    <p className="sub-title">수어 실시간 통역 서비스</p>
                                </div>
                            </div>
                            <div className="section2" id="txt3section">
                                <div className="section2_desc">
                                    <p className="disc1">수어를 알고 계신가요?<br/>수어는 30만명이 넘는 한국인이 사용하는 제2의 국어입니다.<br/>하지만 수어를 인식하는 서비스는 찾아보기 힘들죠.</p>
                                    <p className='disc2' style={{
                                        display:"none"
                                    }}>우리는 장애가 더이상 차별이 아닌 세상을 꿈꿉니다.<br/>포스팟은 정확도 높은 인공지능 수어 인식 기술로<br/>수어 사용자에게 더 넓은 세상을 경험하게 할 것입니다.</p>
                                </div>

                                {/*
                                 헤더바 색상 변경시 텍스트 같이 바뀌게// 22.05.03 은정
                                <div className="copyDiv" id="fl1">
                                    <p className="disc">수어를 알고 계신가요?<br/>수어는 30만명이 넘는 한국인이 사용하는 제2의 국어입니다.<br/>하지만 수어를 인식하는 서비스는 찾아보기 힘들죠.</p>
                                </div>
                                <div className="copyDiv2"  id="fl2">
                                    <p className='disc2'>우리는 장애가 더이상 차별이 아닌 세상을 꿈꿉니다.<br/>포스팟은 정확도 높은 인공지능 수어 인식 기술로<br/>수어 사용자에게 더 넓은 세상을 경험하게 할 것입니다.</p>
                                </div>
                                */}

                                <div className="imgDiv imgDiv3" >
                                    <div className="box2" >
                                    <svg width="100%" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_582_4058" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                                        <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#7661CC"/>
                                        </mask>
                                        <g mask="url(#mask0_582_4058)">
                                        <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#9A8AD2"/>
                                        <path d="M99.309 112.536L99.2914 112.386L99.309 112.536Z" fill="#FAB4AD"/>
                                        <path d="M116.568 74.5063C116.568 74.5063 115.809 80.9651 113.921 93.821C112.041 106.686 111.521 148.65 109.112 157.315C109.112 157.315 107.488 162.292 101.674 161.939C101.674 161.939 96.459 162.353 97.7119 151.827C98.9649 141.292 97.4825 119.083 96.8913 112.465C96.8913 112.465 90.2207 116.489 86.9031 115.403C83.5943 114.318 81.4237 106.483 81.4237 106.483C81.4237 106.483 76.2619 109.306 72.9531 108.23C69.6355 107.145 67.0502 99.9445 67.0502 99.9445C67.0502 99.9445 62.3119 102.142 59.0031 101.056C55.6943 99.9622 52.659 90.6534 52.0943 80.9475C51.5296 71.2328 61.7384 46.2798 66.3355 33.7328C66.3355 33.7328 94.8796 25.421 98.656 25.5269C102.433 25.6328 116.418 38.321 117.997 39.5386C119.568 40.7563 128.674 51.1416 133.35 60.9975C138.035 70.8534 146.912 74.321 154.527 76.9504C154.527 76.9504 156.918 79.9945 154.138 83.1004C151.359 86.2063 140.55 87.3357 131.171 79.3328C131.171 79.3328 122.462 71.4004 120.088 71.1181C117.715 70.8357 116.585 74.4886 116.585 74.4886L116.568 74.5063Z" fill="#FFCEC9"/>
                                        <path d="M113.797 40.6855C113.797 40.6855 96.2737 7.93258 95.806 -5.55859L54.3002 4.41199C54.3002 4.41199 65.5237 27.4326 66.0796 35.7708C66.6355 44.1091 98.3031 51.4944 98.3031 51.4944C98.3031 51.4944 113.903 48.4502 113.797 40.6855Z" fill="#FFCEC9"/>
                                        <path d="M96.8914 112.456L95.8325 100.491L94.0149 114.106C94.0149 114.106 96.8649 112.262 96.8914 112.456Z" fill="#D77D79"/>
                                        <path d="M81.4148 106.483L79.8531 94.5093L78.2207 107.753C78.2207 107.753 81.1589 106.483 81.4148 106.483Z" fill="#D77D79"/>
                                        <path d="M67.0413 99.9443L64.6148 88.7031L63.1589 101.224C63.1589 101.224 66.1854 100.483 67.0325 99.9443H67.0413Z" fill="#D77D79"/>
                                        </g>
                                    </svg>
                                    </div>
                                    <div className="box2">
                                        <svg width="100%" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_582_5415" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#7661CC"/>
                                            </mask>
                                            <g mask="url(#mask0_582_5415)">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#9A8AD2"/>
                                            <path d="M73.6056 160.138L65.0732 182.338H99.1938L111.326 161.576L73.6056 160.138Z" fill="#FFCEC9"/>
                                            <path d="M98.8502 143.691L89.0296 165.035L73.1384 165.512C73.1384 165.512 60.9796 133.88 59.109 122.188C57.2384 110.497 57.7061 92.2678 55.8355 83.8501C53.9649 75.4325 46.9502 52.059 46.9502 52.059C46.9502 52.059 52.0943 46.4472 56.3031 50.1884C60.512 53.9295 67.5267 82.4472 67.5267 82.4472C67.5267 82.4472 68.9296 87.5913 70.3325 88.059C71.7355 88.5266 72.6708 82.9237 71.2678 72.6354C69.8649 62.3472 67.5267 34.7648 67.059 32.4354C66.5914 30.0972 71.7355 28.2266 74.5414 30.0972C77.3473 31.9678 78.2825 36.1766 79.6855 49.2619C81.0884 62.356 83.4267 80.5766 83.4267 80.5766C83.4267 80.5766 85.7649 82.2972 86.7002 76.6854C87.6355 71.0825 91.8443 27.759 92.312 22.6148C92.312 22.6148 95.5855 18.406 98.3914 20.2766C101.197 22.1472 105.406 23.859 104.003 36.4854C102.6 49.1119 99.7943 77.1531 99.7943 77.1531C99.7943 77.1531 106.341 65.4707 108.68 64.0678C111.009 62.6648 123.168 73.8796 126.909 77.6296C126.909 77.6296 126.909 85.5796 128.78 89.3207C130.65 93.0619 124.103 95.5501 120.83 94.6237C117.556 93.6884 113.815 83.4001 113.815 83.4001L112.88 82.7825L106.333 93.5295C106.333 93.5295 107.735 108.027 110.074 113.171C112.412 118.315 117.556 120.644 117.556 120.644L99.7943 142.156L98.859 143.709L98.8502 143.691Z" fill="#FFCEC9"/>
                                            <path d="M140.93 107.074C140.93 107.074 132.98 97.4118 129.238 92.7353C125.497 88.0589 120.821 93.9795 121.756 99.5912C122.691 105.203 127.835 110.815 127.835 110.815C127.835 110.815 120.821 119.232 118.483 120.168C116.144 121.103 107.727 111.282 107.727 111.282L96.0443 117.979L82.9502 160.527L89.4973 166.138H108.194C108.194 166.138 122.868 143.877 127.827 138.397C133.906 131.7 145.588 113.153 140.921 107.074H140.93Z" fill="#FFCEC9"/>
                                            <path d="M123.971 101.268C123.045 99.0531 122.471 96.8384 122.25 94.8002C122.03 92.7619 122.25 94.8002 122.25 94.8002C122.25 94.8002 122.762 93.7678 122.25 94.8002C121.739 95.8325 121.615 97.2707 121.765 99.5913C122.7 105.203 127.845 110.815 127.845 110.815C127.845 110.815 120.83 119.233 118.492 120.168C119.859 119.885 119.709 121.183 122.109 119.338C124.509 117.494 130.783 109.924 130.783 109.924C128.453 108.433 124.898 103.483 123.971 101.268ZM124.439 93.8207C122.4 93.3796 117.733 87.5472 117.15 86.3825C116.568 85.2178 114.406 82.9149 114.406 82.9149L112.88 82.7737L113.815 83.3913C113.815 83.3913 117.556 93.6796 120.83 94.6149C121.253 94.7384 121.739 94.7913 122.25 94.8002L124.439 93.8207Z" fill="#D77D79"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="box2">
                                        <svg width="100%" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_582_5425" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#7661CC"/>
                                            </mask>
                                            <g mask="url(#mask0_582_5425)">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#9A8AD2"/>
                                            <path d="M67.8968 68.391C67.8968 68.391 74.9291 68.6028 88.985 69.4057C103.05 70.2086 148.359 66.7763 157.941 68.5498C157.941 68.5498 163.464 69.8292 163.641 76.1381C163.641 76.1381 164.585 81.7234 153.097 81.3704C141.617 81.0175 117.794 84.7322 110.709 86.0116C110.709 86.0116 115.694 92.8322 114.838 96.5116C113.982 100.191 105.741 103.27 105.741 103.27C105.741 103.27 109.279 108.565 108.423 112.244C107.567 115.923 100.05 119.4 100.05 119.4C100.05 119.4 102.864 124.306 102.017 127.985C101.161 131.665 91.4027 135.812 80.9733 137.347C70.5527 138.882 42.6527 130.253 28.685 126.485C28.685 126.485 17.0027 96.4763 16.7556 92.3998C16.5086 88.3145 28.8615 72.0175 30.0262 70.1998C31.1909 68.3822 41.5321 57.5822 51.7144 51.5998C61.9056 45.6086 64.7997 35.691 66.9086 27.2292C66.9086 27.2292 69.9615 24.3616 73.588 27.0616C77.2144 29.7616 79.4556 41.3204 71.7085 52.1998C71.7085 52.1998 63.988 62.3469 63.9086 64.9322C63.8291 67.5263 67.8791 68.391 67.8791 68.391H67.8968Z" fill="#FFCEC9"/>
                                            <path d="M31.6674 74.6028C31.6674 74.6028 6.56448 83.5322 -7.94141 85.3145L-2.49729 134.673C-2.49729 134.673 21.9792 127.95 30.9174 126.547C39.8557 125.162 44.8057 90.291 44.8057 90.291C44.8057 90.291 40.0409 73.7469 31.6674 74.594V74.6028Z" fill="#FFCEC9"/>
                                            <path d="M110.709 86.0117L101.78 87.2205L94.6943 88.2088C96.9002 90.4147 107.921 91.8794 113.48 90.9352C113.48 90.9352 112.244 88.1294 110.709 86.0117Z" fill="#D77D79"/>
                                            <path d="M105.741 103.271L96.4235 104.832L93.0176 105.3C93.0176 105.3 95.7705 107.859 97.1029 108.335C99.7588 109.571 104.506 109.094 108.212 108.053C108.212 108.053 106.606 104.276 105.75 103.271H105.741Z" fill="#D77D79"/>
                                            <path d="M100.059 119.4L93.3263 121.412L89.7881 122.576C91.4028 124.473 93.3969 125.329 94.8175 125.329C96.2381 125.329 99.4675 125.047 101.559 123.529C101.559 123.529 100.826 120.212 100.05 119.4H100.059Z" fill="#D77D79"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="box2">
                                        <svg width="100%" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_582_5436" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#7661CC"/>
                                            </mask>
                                            <g mask="url(#mask0_582_5436)">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#9A8AD2"/>
                                            <path d="M111.229 153.159C111.229 153.159 104.365 162.918 100.138 179.912L54.7764 178.668C54.7764 178.668 64.6322 168.459 65.7528 156.256C66.8822 144.053 72.2381 135.909 72.2381 135.909L111.238 153.159H111.229Z" fill="#FFCEC9"/>
                                            <path d="M110.25 159.706C110.25 159.706 97.8175 166.994 94.2528 167.691C90.6793 168.379 65.2852 158.603 65.2852 158.603C57.6969 147.741 56.5146 118.5 57.5205 110.629C58.5263 102.758 58.1293 74.0644 58.2881 58.8085C58.4381 43.5526 61.6146 42.8467 63.741 42.1232C65.8675 41.3909 69.2557 42.5379 69.2557 42.5379L69.3881 37.5438C69.2999 30.9614 72.8116 27.8997 76.7557 27.7409C80.7175 27.5909 82.1822 31.3144 82.1822 31.3144C82.641 24.2203 85.5793 22.7203 89.541 22.2967C93.5028 21.882 95.5234 24.8291 95.991 26.9467C96.4587 29.0644 97.0675 35.9203 97.0675 35.9203C97.4734 30.4056 102.485 30.0173 102.485 30.0173C108.009 30.1673 109.306 35.8585 109.306 35.8585C110.4 39.0438 111.891 56.4526 112.676 71.082C113.462 85.7114 114.282 99.1497 114.282 99.1497L123.926 121.65L110.25 159.697" fill="#FFCEC9"/>
                                            <path d="M131.197 103.729L101.7 87.8997C101.7 87.8997 97.4734 95.532 101.726 100.191C105.97 104.858 115.394 110.206 115.394 110.206L116.02 119.294C116.02 119.294 97.9499 128.85 92.8587 141.864C89.6028 147.697 86.2764 154.958 85.6675 157.685C85.0587 160.411 79.0058 176.153 76.2793 178.879L77.6558 178.95L77.4793 179.285L100.147 179.903C102.009 172.411 104.382 166.332 106.456 161.876C108.662 160.641 110.259 159.706 110.259 159.706C110.259 159.706 130.218 139.094 131.444 134.444C132.653 129.794 131.197 103.72 131.197 103.72V103.729Z" fill="#FFCEC9"/>
                                            <path d="M120.07 122.682L119.364 107.92C119.364 107.92 113.744 104.761 107.064 100.544C102.635 97.7467 100.826 93.3085 101.7 87.8997C101.7 87.8997 97.4732 95.532 101.726 100.191C105.97 104.858 115.394 110.206 115.394 110.206L116.02 119.294L120.079 122.682H120.07Z" fill="#D77D79"/>
                                            <path d="M97.0676 35.9292L96.2646 83.0821L99.3352 82.9674C99.1323 75.8557 97.0676 35.9292 97.0676 35.9292Z" fill="#D77D79"/>
                                            <path d="M82.1908 31.3145L81.6084 83.8409L84.7231 82.9586C84.6172 72.2909 82.1908 31.3145 82.1908 31.3145Z" fill="#D77D79"/>
                                            <path d="M69.2555 42.5378L68.0996 85.7467L71.6555 84.5731C71.532 74.6996 69.2555 42.5378 69.2555 42.5378Z" fill="#D77D79"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="box2">
                                        <svg width="100%" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_582_5449" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#7661CC"/>
                                            </mask>
                                            <g mask="url(#mask0_582_5449)">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#9A8AD2"/>
                                            <path d="M14.5331 77.6032C14.5331 77.6032 36.9448 62.4973 44.2595 57.6267C51.5742 52.7561 69.6007 52.7561 74.9566 55.1914C80.3125 57.6267 90.0625 67.3679 90.0625 67.3679C94.4566 67.862 142.201 68.7091 154.386 69.1944C166.562 69.6885 166.077 76.7473 166.077 76.7473C166.077 76.7473 167.18 83.6914 154.757 82.5973C142.324 81.5032 93.3536 84.3003 90.7948 85.0326C90.7948 85.0326 88.9684 88.3238 92.6213 89.0561C96.2742 89.7885 155.851 99.0444 160.96 100.138C166.068 101.233 166.439 105.98 165.707 108.177C164.974 110.374 162.786 113.665 151.448 112.2C140.127 110.744 107.604 108.062 104.674 108.062C104.674 108.062 106.501 111.715 105.398 113.912C104.312 116.1 98.0919 120.856 98.0919 120.856C98.0919 120.856 99.9184 125.974 98.0919 129.627C96.2654 133.28 82.3772 139.13 74.3389 138.759C66.3007 138.397 24.9978 125.603 19.5184 125.233C19.5184 125.233 6.73306 102.574 5.26835 97.8267C3.80365 93.0797 14.5242 77.6032 14.5242 77.6032H14.5331Z" fill="#FFCEC9"/>
                                            <path d="M22.0945 75.5298L-12.3525 85.7563L-6.13195 135.459L19.5357 125.224L35.9828 112.809L22.0945 75.5298Z" fill="#FFCEC9"/>
                                            <path d="M90.0619 67.3679C90.0619 67.3679 77.6824 66.6443 66.4766 66.6443C72.6972 65.6826 77.1001 64.8179 80.8324 64.959C84.5648 65.1002 86.3648 65.7884 90.0619 67.3767V67.3679Z" fill="#D77D79"/>
                                            <path d="M104.683 108.053L89.2242 107.056C89.2242 107.056 88.0684 110.091 88.3595 111.971C90.8213 112.112 94.8625 111.389 96.1684 111.247C97.4742 111.106 103.218 109.765 104.683 108.044V108.053Z" fill="#D77D79"/>
                                            <path d="M98.1091 120.847C98.1091 120.847 88.8267 123.927 85.9061 124.412C85.9061 124.412 85.1826 126.724 85.1826 127.88C88.3679 127.88 95.1267 124.791 98.1091 120.847Z" fill="#D77D79"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="box2">
                                        <svg width="100%" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_582_5460" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#7661CC"/>
                                            </mask>
                                            <g mask="url(#mask0_582_5460)">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#9A8AD2"/>
                                            <path d="M74.391 166.226C74.391 166.226 59.8586 144.662 55.1733 137.638C50.488 130.606 50.488 113.268 52.8263 108.106C55.1733 102.953 64.5439 93.5735 64.5439 93.5735C65.0116 89.3559 65.8322 43.4206 66.2998 31.7029C66.7674 19.9941 73.5704 20.4529 73.5704 20.4529C73.5704 20.4529 80.2498 19.4029 79.191 31.3412C78.141 43.2971 80.8321 90.3971 81.538 92.8588C81.538 92.8588 84.6969 94.6147 85.4027 91.1029C86.1086 87.5912 95.0116 30.2912 96.0704 25.3676C97.1204 20.4529 101.691 20.1 103.8 20.7971C105.909 21.5029 109.076 23.6029 107.673 34.5088C106.262 45.3971 103.685 76.6853 103.685 79.5C103.685 79.5 107.197 77.7441 109.314 78.8029C111.423 79.8529 115.994 85.8353 115.994 85.8353C115.994 85.8353 120.917 87.2118 124.429 88.9677C127.941 90.7235 133.57 100.95 133.217 108.679C132.864 116.409 120.564 156.132 120.203 161.409C120.203 161.409 98.4086 173.709 93.8469 175.121C89.2763 176.532 74.3998 166.218 74.3998 166.218L74.391 166.226Z" fill="#FFCEC9"/>
                                            <path d="M72.4061 158.956L69.7061 179.541L117.512 179.841L120.203 161.418L108.256 145.597L72.4061 158.956Z" fill="#FFCEC9"/>
                                            <path d="M64.5526 93.5735C64.5526 93.5735 64.0849 104.047 64.0849 114.829L61.1025 111.026L64.5526 93.5735Z" fill="#D77D79"/>
                                            <path d="M103.191 92.5411L103.686 79.5088C103.686 79.5088 106.738 89.8323 107.991 93.6882L103.191 92.5411Z" fill="#D77D79"/>
                                            <path d="M118.835 95.2589C118.368 92.4531 115.994 85.8442 115.994 85.8442C115.994 85.8442 121.756 94.4472 123.635 96.6178C123.635 96.6178 118.862 95.0207 118.835 95.2589Z" fill="#D77D79"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="box2">
                                        <svg width="100%" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_582_5471" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#7661CC"/>
                                            </mask>
                                            <g mask="url(#mask0_582_5471)">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#9A8AD2"/>
                                            <path d="M45.4147 128.418C48.1941 125.577 82.8971 118.853 82.8971 118.853L99.3088 112.535L99.2912 112.385C95.7971 112.359 92.7441 112.28 90.9618 112.165C85.8706 111.83 81.7059 108.547 80.7971 103.88C80.7971 103.88 79.7647 94.059 85.4559 93.5472C84.0883 93.3354 77.4177 89.859 77.2588 84.0354C77.2588 84.0354 79.8794 75.3796 85.9588 75.3884C87.4235 75.3884 90.5647 75.7943 94.4912 76.4119V76.3149L83.5412 74.9119C83.5412 74.9119 48.0882 69.459 39.4147 68.109C30.75 66.759 26.0471 66.9531 24.8559 62.5678C23.6735 58.1737 26.6735 53.9649 32.2853 53.9119C37.9059 53.859 84.8912 61.209 89.9824 61.5354C93.203 61.7472 101.806 62.2325 107.691 62.559C108.741 57.9796 109.447 54.5737 109.447 54.5737C109.447 54.5737 132.309 50.859 140.585 51.6884C146.912 52.3149 158.038 69.2296 162.953 77.1884L181.147 90.2649L181.324 134.744L155.453 119.974C152.541 122.48 147.865 125.541 141.494 126.609C129.979 128.55 105.679 128.48 96.653 129.406C87.6265 130.333 55.7559 139.835 48.8471 139.227C41.9383 138.609 42.6177 131.241 45.3971 128.409L45.4147 128.418Z" fill="#FFCEC9"/>
                                            <path d="M145.579 99.0973C145.253 94.8708 141.177 90.5208 141.177 90.5208C137.197 84.7061 129.335 71.8061 129.415 66.6355L122.797 66.512C122.435 69.3355 119.259 74.409 119.259 74.409L75.9001 72.9708L68.9824 72.6708C81.4412 74.5943 83.5412 74.9208 83.5412 74.9208L94.4824 76.3237V76.4208C90.5648 75.8031 87.4236 75.4061 85.9589 75.3973C79.8883 75.3884 77.2589 84.0443 77.2589 84.0443C77.4177 89.8678 84.0883 93.3443 85.4559 93.5561C84.2383 93.662 83.3207 94.209 82.6412 94.9855L118.932 111.627C119.894 111.512 121.518 111.247 122.506 111.124C134.435 109.641 145.897 103.324 145.571 99.1061L145.579 99.0973Z" fill="#D77D79"/>
                                            <path d="M77.2588 84.0356C77.4176 89.8591 84.0882 93.3356 85.4558 93.5473L87.0706 93.9532C88.4382 94.165 115.465 95.9032 123.856 95.4003C132.247 94.8973 132.274 91.5179 131.859 88.1826C131.859 88.1826 132.106 82.1385 124.315 81.1591L115.615 80.0297L103.323 77.9032C95.5588 76.5267 88.4206 75.3973 85.9588 75.3973C82.3411 75.3444 78.1058 78.8032 77.2588 84.0444V84.0356Z" fill="#FFCEC9"/>
                                            <path d="M131.859 88.1825C132.538 91.6148 132.185 95.0736 123.856 95.4001C115.456 95.7266 88.4382 94.156 87.0706 93.9531L85.4558 93.5472C84.0882 93.3354 77.4176 89.8589 77.2588 84.0354C77.2588 84.0354 79.297 89.5413 85.1117 90.2119C89.2235 90.6883 107.938 92.2325 109.959 92.2325C111.979 92.2325 124.085 92.5413 125.638 92.2325C127.191 91.9236 131.409 90.8119 131.868 88.1825H131.859Z" fill="#D77D79"/>
                                            <path d="M181.165 90.2736L162.971 77.1972C158.056 69.2295 146.929 52.3236 140.603 51.6972C132.318 50.8678 109.465 54.5825 109.465 54.5825C109.465 54.5825 108.759 57.9795 107.709 62.5678L107.691 62.6825C106.129 69.4766 103.835 78.8119 101.982 83.5237C101.982 83.5237 107.197 89.0119 113.885 82.1119C120.574 75.2119 122.797 66.5295 122.797 66.5295L129.415 66.6531C129.415 66.6531 132.185 81.706 139.077 88.3942C149.241 100.324 156.071 97.6854 160.262 98.1531C164.453 98.6207 181.165 90.2913 181.165 90.2913V90.2736Z" fill="#FFCEC9"/>
                                            <path d="M122.903 66.5032C122.903 66.5032 120.679 75.2297 113.991 82.1297C107.303 89.0296 101.982 83.5061 101.982 83.5061C107.162 83.6914 111.662 81.2032 113.374 79.0326C115.085 76.862 119.744 67.0767 119.744 64.4385C119.744 64.4385 121.332 66.2385 122.903 66.5032Z" fill="#D77D79"/>
                                            <path d="M99.3092 112.535L99.2915 112.385C95.7974 112.359 92.7444 112.279 90.9621 112.165C85.8709 111.829 81.7062 108.547 80.7974 103.879C80.365 95.8059 82.6239 93.7854 85.4562 93.5471L123.856 95.4001C125.718 96.0971 130.518 98.2501 129.733 103.271C128.947 108.291 124.8 110.912 118.121 111.741C111.45 112.562 96.0356 112.491 90.9533 112.165" fill="#FFCEC9"/>
                                            <path d="M99.291 112.385C95.7969 112.359 92.7439 112.28 90.9616 112.165C85.8704 111.83 81.7057 108.547 80.7969 103.88C84.5381 108.865 86.0822 108.706 91.0145 109.306C95.2233 109.827 112.906 109.615 112.906 109.615C118.182 109.306 123.812 108.344 126.415 106.509C129.017 104.674 129.741 103.262 129.741 103.262C129.123 108.565 124.826 111.018 118.129 111.733C111.45 112.438 96.0439 112.483 90.9616 112.156" fill="#D77D79"/>
                                            <path d="M99.3087 112.535L99.291 112.385L99.3087 112.535Z" fill="#FAB4AD"/>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="box2">
                                        <svg width="100%" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <mask id="mask0_582_4142" style={{maskType:"alpha"}}np maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#7661CC"/>
                                            </mask>
                                            <g mask="url(#mask0_582_4142)">
                                            <path d="M90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180Z" fill="#9A8AD2"/>
                                            <path d="M110.118 79.7206C110.118 79.7206 116.982 49.05 118.359 43.553C119.735 38.0559 125.224 38.9736 127.976 40.8088C130.721 42.6353 130.721 47.2236 128.885 55.4647C127.05 63.7059 124.129 88.553 123.071 98.1088C122.321 104.85 111.979 139.694 111.671 144.318L131.029 174L95.2147 186.424L71.1089 147.909C68.903 144.626 58.35 128.974 54.6883 123.468C50.5765 117.309 50.5765 102.115 52.6324 97.5971C54.6795 93.0794 62.8942 84.8647 62.8942 84.8647C63.3089 81.1588 64.0236 40.9059 64.4383 30.6441C64.853 20.3736 70.8089 20.7794 70.8089 20.7794C70.8089 20.7794 78.9089 19.3236 77.9824 29.7883V80.6118L84.8471 68.25C84.8471 68.25 93.5206 67.2 97.2 72.5383C97.2 72.5383 100.279 70.9941 102.124 71.9206C103.976 72.8471 110.109 79.7294 110.109 79.7294L110.118 79.7206Z" fill="#FFCEC9"/>
                                            <path d="M62.4882 113.603C62.4882 104.162 62.8941 84.856 62.8941 84.856C62.8941 84.856 59.6559 94.6412 59.4353 97.5177C59.2147 100.394 60.7676 110.197 62.4794 113.603H62.4882Z" fill="#D77D79"/>
                                            <path d="M99.2382 80.8325L95.3206 70.7207C95.3206 70.7207 96.4941 71.7089 97.2 72.5295L103.685 82.9413C103.685 82.9413 100.244 80.8236 99.2382 80.8236V80.8325Z" fill="#D77D79"/>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="section3"  id="txt4section">
                                <div className='boxDiv'>
                                    <div className="box left">
                                        <p className="main-title">포스팟은 기술로<br/>넓은 세상을 꿈꿉니다</p>
                                        <p className="sub-title">포스팟은 기술과 콘텐츠로<br/>새로운 생태계를 개발하는 스타트업입니다.</p>
                                    </div>
                                    <div className="box right">
                                        <div className="list">
                                            <div className="sec dt">
                                                <p className="date">2018.09</p>
                                            </div>
                                            <div className="sec">
                                                <svg className="circle" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                                                </svg>
                                                <svg className="line" width="2" height="38" viewBox="0 0 2 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="2" height="38" fill="white" fillOpacity="0.2"/>
                                                </svg>
                                            </div>
                                            <div className="sec">
                                                <p className="desc">포스팟 설립, 장애인기업 등록</p>
                                            </div>
                                        </div>
                                        <div style={{float:"none", clear:"both"}}></div>
                                        <div className="list">
                                            <div className="sec dt">
                                                <p className="date">2018.11</p>
                                            </div>
                                            <div className="sec">
                                                <svg className="circle" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                                                </svg>
                                                <svg className="line" width="2" height="38" viewBox="0 0 2 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="2" height="38" fill="white" fillOpacity="0.2"/>
                                                </svg>
                                            </div>
                                            <div className="sec">
                                                <p className="desc">포스팟 기업부설 연구소 인정</p>
                                            </div>
                                        </div>
                                        <div style={{float:"none", clear:"both"}}></div>
                                        <div className="list">
                                            <div className="sec dt">
                                                <p className="date">2019.04</p>
                                            </div>
                                            <div className="sec">
                                                <svg className="circle" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                                                </svg>
                                                <svg className="line" width="2" height="72" viewBox="0 0 2 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="2" height="72" fill="white" fillOpacity="0.2"/>
                                                </svg>
                                            </div>
                                            <div className="sec">
                                                <p className="desc">국내외 지식재산권 출원지원사업 선정<br/>장애인기업종합지원센터</p>
                                            </div>
                                        </div>
                                        <div style={{float:"none", clear:"both"}}></div>
                                        <div className="list">
                                            <div className="sec dt">
                                                <p className="date">2019.09</p>
                                            </div>
                                            <div className="sec">
                                                <svg className="circle" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                                                </svg>
                                                <svg className="line" width="2" height="72" viewBox="0 0 2 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="2" height="72" fill="white" fillOpacity="0.2"/>
                                                </svg>
                                            </div>
                                            <div className="sec">
                                                <p className="desc">중소벤처기업부 초기창업패키지 신사업분야<br/>‘간편인증 솔루션' 과제 선정</p>
                                            </div>
                                        </div>
                                        <div style={{float:"none", clear:"both"}}></div>
                                        <div className="list">
                                            <div className="sec dt">
                                                <p className="date">2020.10</p>
                                            </div>
                                            <div className="sec">
                                                <svg className="circle" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                                                </svg>
                                                <svg className="line" width="2" height="38" viewBox="0 0 2 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="2" height="38" fill="white" fillOpacity="0.2"/>
                                                </svg>
                                            </div>
                                            <div className="sec">
                                                <p className="desc">자체 통합인증솔루션 OAuthumb GS인증 계약</p>
                                            </div>
                                        </div>
                                        <div style={{float:"none", clear:"both"}}></div>
                                        <div className="list">
                                            <div className="sec dt">
                                                <p className="date">2021.04</p>
                                            </div>
                                            <div className="sec">
                                                <svg className="circle" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                                                </svg>
                                                <svg className="line" width="2" height="38" viewBox="0 0 2 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="2" height="38" fill="white" fillOpacity="0.2"/>
                                                </svg>
                                            </div>
                                            <div className="sec">
                                                <p className="desc">강소형 기술기업 프로젝트 융성지원 사업자 선정</p>
                                            </div>
                                        </div>
                                        <div style={{float:"none", clear:"both"}}></div>
                                        <div className="list">
                                            <div className="sec dt">
                                                <p className="date">2021.06</p>
                                            </div>
                                            <div className="sec">
                                                <svg className="circle" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                                                </svg>
                                                <svg className="line" width="2" height="38" viewBox="0 0 2 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="2" height="38" fill="white" fillOpacity="0.2"/>
                                                </svg>
                                            </div>
                                            <div className="sec">
                                                <p className="desc">자본금 증자 5억원</p>
                                            </div>
                                        </div>
                                        <div style={{float:"none", clear:"both"}}></div>
                                        <div className="list">
                                            <div className="sec dt">
                                                <p className="date">2021.11</p>
                                            </div>
                                            <div className="sec">
                                                <svg className="circle" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                                                </svg>
                                                <svg className="line" width="2" height="38" viewBox="0 0 2 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect width="2" height="38" fill="white" fillOpacity="0.2"/>
                                                </svg>
                                            </div>
                                            <div className="sec">
                                                <p className="desc">(주)포스팟 주관 경기청년투자경진대회 개최</p>
                                            </div>
                                        </div>
                                        <div style={{float:"none", clear:"both"}}></div>
                                        <div className="list">
                                            <div className="sec dt">
                                                <p className="date">2021.12</p>
                                            </div>
                                            <div className="sec">
                                                <svg className="circle" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
                                                </svg>
                                            </div>
                                            <div className="sec">
                                                <p className="desc">안양시 유망창업기업 선정</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section4"  id="txt5section">
                                <p className="main-title">포스팟은 자유롭고 창의적인 문화를 위해<br/>지속적인 혁신을 추구합니다.</p>
                                <div className="list">
                                    <div className="list-inner">
                                        <div className="box">
                                            <p className="desc">포스팟에서는 누구나<br/>리더가 될 수 있습니다.</p>
                                            <svg width="200" height="280" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_487_1306)">
                                                <path d="M74.875 80.9273C59.6889 75.4436 42.3909 75.0202 32.2651 80.9273C22.1394 86.8345 4.84139 107.086 1.0461 125.226C-2.74919 143.365 3.99966 174.166 17.9207 193.571C31.8418 212.976 53.3584 231.12 67.2844 236.604C81.2105 242.088 89.2244 241.665 92.178 241.665H121.709C121.709 241.665 169.802 213.817 180.351 200.32C190.9 186.817 205.245 162.347 198.073 132.393C190.9 102.439 136.053 96.5319 125.509 94.8434C114.965 93.155 84.164 85.5594 74.88 80.9224L74.875 80.9273Z" fill="#EAECF9"/>
                                                <path d="M113.411 146.463L101.597 129.026L88.9409 141.119L55.7496 100.337L0.0205078 137.921C0.359195 155.643 6.88391 178.185 17.9211 193.576C31.8422 212.98 53.3588 231.125 67.2849 236.609C81.2059 242.093 89.2248 241.669 92.1784 241.669H121.709C121.709 241.669 169.803 213.822 180.352 200.324C182.732 197.276 185.307 193.665 187.788 189.561L134.504 125.37L113.411 146.463Z" fill="#D8DBFD"/>
                                                <path d="M113.411 146.463L101.597 129.026L88.9411 141.119L55.7498 100.337L25.0886 121.017C25.0537 126.476 26.3686 131.347 30.1539 132.682C34.9354 134.37 41.4053 132.682 44.7773 130.714C48.1542 128.747 50.1216 125.933 53.4985 125.933C56.8754 125.933 62.7825 129.589 65.3127 131.277C67.8429 132.965 82.4712 143.37 83.313 144.217C84.1547 145.059 89.7829 146.184 91.4713 145.059C93.1598 143.933 98.5041 138.589 100.193 137.747C101.881 136.905 104.974 137.184 106.662 140.277C108.351 143.37 113.695 149.84 113.695 149.84C113.695 149.84 128.319 138.31 130.291 137.184C132.258 136.058 136.477 136.342 139.291 138.31C140.173 138.927 146.269 143.345 154.213 149.113L134.51 125.375L113.416 146.468L113.411 146.463Z" fill="white"/>
                                                <path d="M42.4362 173.972C40.0504 171.447 37.2463 169.883 31.2197 169.947C31.2695 169.718 31.3043 169.484 31.3043 169.24C31.3043 166.82 28.6197 164.862 25.3126 164.862C23.9628 164.862 22.7176 165.191 21.7165 165.744C21.6418 162.85 19.0319 160.524 15.8193 160.524C12.6068 160.524 9.91223 162.915 9.91223 165.868C9.91223 166.272 9.96702 166.66 10.0567 167.034C9.36436 166.879 8.61725 166.79 7.83528 166.79C6.86404 166.79 5.95258 166.924 5.13574 167.153C5.86292 169.444 6.66482 171.721 7.54142 173.957C7.64103 173.957 7.73567 173.967 7.83528 173.967C7.83528 173.967 42.2967 173.822 42.4412 173.967L42.4362 173.972Z" fill="white"/>
                                                <path d="M72.0364 218.116C68.5649 214.44 64.4807 212.169 55.7097 212.258C55.7844 211.925 55.8342 211.581 55.8342 211.232C55.8342 207.711 51.9294 204.857 47.113 204.857C45.1456 204.857 43.3377 205.34 41.8783 206.142C41.7737 201.928 37.9734 198.542 33.2916 198.542C29.8051 198.542 26.8117 200.424 25.4619 203.124C30.0342 208.448 35.0149 213.508 40.0554 218.051C54.3948 218.011 71.9169 217.991 72.0414 218.111L72.0364 218.116Z" fill="white"/>
                                                <path d="M7.39692 144.102C9.26469 141.806 11.8497 138.215 10.6991 136.347C9.9321 135.102 8.19882 134.624 5.42457 134.271L0.0205078 137.921C0.0952183 141.811 0.46379 145.93 1.12124 150.164C2.38634 149.063 5.88777 145.97 7.4019 144.107L7.39692 144.102Z" fill="white"/>
                                                <path d="M146.988 120.702C148.532 113.173 144.266 105.938 137.459 104.542C130.653 103.146 123.883 108.118 122.339 115.646C120.795 123.175 125.061 130.41 131.868 131.806C138.674 133.202 145.444 128.231 146.988 120.702Z" fill="#FAB4AD"/>
                                                <path d="M125.977 113.97V114.966C125.977 114.966 121.414 115.962 118.426 115.962C116.085 115.962 113.435 115.658 110.721 114.806L87.0474 172.244C87.0474 172.244 89.0397 175.73 78.0822 175.73C67.1246 175.73 61.6459 171.746 59.6536 168.259C59.6536 168.259 57.1632 163.278 62.642 156.306L102.986 109.985C104.978 107.993 108.464 106.997 111.453 106.997C114.441 106.997 127.142 108.242 127.142 108.242L125.399 112.475C123.342 112.241 119.213 112.261 118.067 112.924C118.999 113.467 124.751 114.044 125.977 113.97Z" fill="#FBB5AE"/>
                                                <path d="M128.621 130.605V137.738V140.327H137.666H142.662V126.67L128.621 130.605Z" fill="#FBB5AE"/>
                                                <path d="M171.969 189.925L177.946 199.887L180.934 235.25L178.16 241.859H187.588L197.864 199.887C198.86 195.404 197.669 191.917 197.017 189.925C196.369 187.933 193.381 182.454 193.381 182.454L171.964 189.925H171.969Z" fill="#FBB5AE"/>
                                                <path d="M92.3615 140.512C99.3893 139.959 116.03 138.48 122.131 139.586L128.048 136.996C130.638 139.401 134.518 140.323 136.74 140.323C138.961 140.323 146.542 139.581 149.127 138.843C155.412 140.507 162.809 143.834 169.283 149.014C175.753 154.194 187.592 166.397 193.136 173.977C198.685 181.558 199.795 184.148 199.795 184.148C200.537 186.18 199.053 186.922 197.021 188.217L194.431 184.706C189.251 184.89 175.201 188.217 172.242 190.807C172.242 190.807 173.537 206.71 173.906 212.075C174.274 217.439 176.68 239.996 177.048 241.66H96.7993C98.0943 230.194 99.9421 211.701 100.311 207.637C100.679 203.573 102.159 176.757 102.159 175.093C102.159 175.093 86.808 178.604 78.8588 178.978C77.7482 173.987 79.2274 163.817 81.2645 157.342C83.2967 150.872 88.8451 143.844 92.3615 140.512Z" fill="#148664"/>
                                                <path d="M156.528 145.597C150.551 148.585 135.584 147.589 132.854 145.597L136.605 121.69C139.095 119.697 139.145 115.972 138.597 114.717C138.154 113.696 137.158 112.819 135.639 112.774C134.12 112.729 132.063 114.124 131.888 116.714L130.085 118.178C127.64 112.724 127.68 107.041 127.495 104.636C127.311 102.23 128.77 100.975 130.628 100.771C136.107 99.7746 143.578 99.7746 149.057 102.265C152.996 104.466 154.784 108.541 154.849 112.361C154.914 116.181 154.232 118.467 154.107 120.315C152.787 126.466 155.86 143.55 156.528 145.592V145.597Z" fill="#23130F"/>
                                                <path d="M199.979 184.95C198.271 184.427 196.378 184.526 194.421 184.686C195.148 185.687 195.9 187.281 196.428 188.451C196.627 188.401 196.891 188.277 197.026 188.222C198.356 187.6 200.099 186.409 199.979 184.95Z" fill="#23130F"/>
                                                <path d="M55.0967 39H55.4703C55.8837 39 56.2174 39.3337 56.2174 39.7471V102.18H54.3496V39.7471C54.3496 39.3337 54.6833 39 55.0967 39Z" fill="#23130F"/>
                                                <path d="M51.9092 46.3216C54.783 43.881 61.5319 42.7305 65.9797 42.7305C70.4274 42.7305 75.0246 44.1649 77.8985 47.4671C80.9118 51.7754 81.9179 55.506 86.5151 55.9393C91.1123 56.3726 100.586 52.6371 103.604 51.3421C106.622 50.0471 113.227 48.1843 118.825 49.046C111.503 51.631 105.472 57.5182 105.183 60.3871C109.635 57.8021 118.536 57.5132 120.548 57.9465C115.812 59.9587 107.195 63.9781 103.604 67.2803C100.013 70.5825 97.4278 74.602 90.8234 74.7464C84.219 74.8909 81.3451 73.7403 78.7601 72.3059C76.1751 70.8714 75.0246 65.8459 70.7213 65.4126C66.418 64.9793 60.6702 67.5642 57.2236 69.1481C53.7769 70.732 52.4869 70.4381 51.9092 69.0037C51.9092 69.0037 51.9092 46.1721 51.9092 46.3166V46.3216Z" fill="#F2614E"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_487_1306">
                                                <rect width="200" height="202.864" fill="white" transform="translate(0 39)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="box">
                                            <p className="desc">창의적 인재 육성을 위해<br/>주 4일제를 시행합니다.</p>
                                            <svg width="200" height="280" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_487_1312)">
                                                <path d="M174.322 199.263V169.604C174.322 134.621 167.223 108 162.328 108H162.309C157.414 108 150.315 134.621 150.315 169.604V199.263H174.315" fill="#148664"/>
                                                <path d="M162.638 198.044L160.345 174.448C157.636 146.615 149.198 126.057 144.79 126.486H144.777C140.368 126.916 136.048 148.718 138.752 176.545L141.044 200.141L162.638 198.044Z" fill="#7EAE7E"/>
                                                <path d="M132 195.158H180V236.842C180 240.328 177.171 243.158 173.684 243.158H138.316C134.829 243.158 132 240.328 132 236.842V195.158Z" fill="#523AB1"/>
                                                </g>
                                                <g clipPath="url(#clip1_487_1312)">
                                                <path d="M118 47.7998H20V156.689H118V47.7998Z" fill="#D8DBFD"/>
                                                <path d="M110.922 128.378H95.6777V136H110.922V128.378Z" fill="white"/>
                                                <path d="M88.056 81.0112H72.8115V88.6334H88.056V81.0112Z" fill="white"/>
                                                <path d="M88.056 96.8003H72.8115V104.423H88.056V96.8003Z" fill="white"/>
                                                <path d="M88.056 112.589H72.8115V120.211H88.056V112.589Z" fill="white"/>
                                                <path d="M88.056 128.378H72.8115V136H88.056V128.378Z" fill="white"/>
                                                <path d="M110.922 81.0112H95.6777V88.6334H110.922V81.0112Z" fill="white"/>
                                                <path d="M110.922 96.8003H95.6777V104.423H110.922V96.8003Z" fill="white"/>
                                                <path d="M110.922 112.589H95.6777V120.211H110.922V112.589Z" fill="white"/>
                                                <path d="M56.4778 55.4224H44.5V64.1335H56.4778V55.4224Z" fill="white"/>
                                                <path d="M93.5002 55.4224H81.5225V64.1335H93.5002V55.4224Z" fill="white"/>
                                                <path d="M50.7615 38H50.2171C48.5633 38 47.2227 39.3407 47.2227 40.9944V57.8722C47.2227 59.526 48.5633 60.8667 50.2171 60.8667H50.7615C52.4153 60.8667 53.756 59.526 53.756 57.8722V40.9944C53.756 39.3407 52.4153 38 50.7615 38Z" fill="#F2614E"/>
                                                <path d="M87.784 38H87.2396C85.5858 38 84.2451 39.3407 84.2451 40.9944V57.8722C84.2451 59.526 85.5858 60.8667 87.2396 60.8667H87.784C89.4378 60.8667 90.7785 59.526 90.7785 57.8722V40.9944C90.7785 39.3407 89.4378 38 87.784 38Z" fill="#F2614E"/>
                                                <path d="M55.0679 96.027H58.2202V101.226H55.0679V106.6H48.7578V101.226H36.1484V96.86L46.1281 80.4668H55.0679V96.027ZM48.7578 96.027V85.7316L42.7634 96.027H48.7578Z" fill="#523AB1"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_487_1312">
                                                <rect width="48" height="135.158" fill="white" transform="translate(132 108)"/>
                                                </clipPath>
                                                <clipPath id="clip1_487_1312">
                                                <rect width="98" height="118.689" fill="white" transform="translate(20 38)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>                                    
                                        </div>
                                        <div className="box">
                                            <p className="desc">출근과 재택<br/>근무 방식이 유연합니다.</p>
                                            <svg width="200" height="280" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_487_1319)">
                                                <path d="M72.6339 179.428V132.809C72.6339 132.809 63.9184 134.628 58.4395 132.936V146.121C58.4395 152.91 60.1876 157.66 61.4822 161.544C62.7768 165.428 70.1161 180.412 70.1161 180.412L76.7316 179.428H72.6339Z" fill="#FAB4AD"/>
                                                <path d="M129.365 132.809V179.428H125.268L131.883 180.412C131.883 180.412 139.222 165.428 140.517 161.544C141.812 157.66 143.56 152.91 143.56 146.121V132.936C138.081 134.628 129.365 132.809 129.365 132.809Z" fill="#FAB4AD"/>
                                                <path d="M129.346 179.428V132.809C129.346 132.809 138.061 134.628 143.54 132.936V146.121C143.54 152.91 141.792 157.66 140.497 161.544C139.203 165.428 131.864 180.412 131.864 180.412L125.248 179.428H129.346Z" fill="#FAB4AD"/>
                                                <path d="M72.6192 132.809V179.428H76.717L70.1014 180.412C70.1014 180.412 62.7621 165.428 61.4676 161.544C60.173 157.66 58.4248 152.91 58.4248 146.121V132.936C63.9038 134.628 72.6192 132.809 72.6192 132.809Z" fill="#FAB4AD"/>
                                                <path d="M111.66 97.8961C123.22 99.9348 135.865 106.295 140.441 111.148C143.617 114.517 146.18 116.754 146.772 121.851C147.363 126.947 146.772 139.18 146.772 139.18C142.776 143.767 129.346 140.963 129.346 140.963V187.583H72.6192V140.963C72.6192 140.963 59.1893 143.767 55.1934 139.18C55.1934 139.18 54.6022 126.947 55.1934 121.851C55.7847 116.754 58.3483 114.511 61.5236 111.148C66.1004 106.295 78.7455 99.9348 90.3049 97.8961C93.1386 97.1825 109.331 97.4323 111.655 97.8961H111.66Z" fill="#FFBE00"/>
                                                <path d="M100.896 87.3306C110.486 87.3306 118.26 79.4216 118.26 69.6653C118.26 59.909 110.486 52 100.896 52C91.3056 52 83.5312 59.909 83.5312 69.6653C83.5312 79.4216 91.3056 87.3306 100.896 87.3306Z" fill="#23130F"/>
                                                <path d="M100.992 92.4884C110.177 92.4884 117.623 85.0426 117.623 75.8577C117.623 66.6728 110.177 59.2271 100.992 59.2271C91.8071 59.2271 84.3613 66.6728 84.3613 75.8577C84.3613 85.0426 91.8071 92.4884 100.992 92.4884Z" fill="#FAB4AD"/>
                                                <path d="M59.6472 205.401C50.5037 205.401 41.6354 204.275 33.8985 205.401C26.1617 206.528 26.6408 211.365 29.4236 216.135C32.2064 220.906 43.7403 222.098 48.1133 222.098H60.6768L59.6421 205.396L59.6472 205.401Z" fill="#FAB4AD"/>
                                                <path d="M60.8807 226.003L164.146 207.823C172.897 205.978 178.498 197.395 176.653 188.644C174.808 179.892 166.225 174.291 157.474 176.136L59.6523 201.742L60.8858 226.008L60.8807 226.003Z" fill="#523AB1"/>
                                                <path d="M139.565 181.304H64.291V202.619H139.565V181.304Z" fill="#523AB1"/>
                                                <path d="M141.124 226.003L37.8589 207.823C29.1078 205.978 23.5065 197.395 25.3515 188.644C27.1965 179.892 35.7794 174.291 44.5305 176.136L142.352 201.742L141.119 226.008L141.124 226.003Z" fill="#7661CC"/>
                                                <path d="M142.352 205.401C151.495 205.401 160.364 204.275 168.101 205.401C175.837 206.528 175.358 211.365 172.575 216.135C169.793 220.906 158.259 222.098 153.886 222.098H141.322L142.357 205.396L142.352 205.401Z" fill="#FAB4AD"/>
                                                <path d="M135.987 183.659L138.974 137.319H63.0322L66.0138 183.659H135.987Z" fill="#D8DBFD"/>
                                                <path d="M136.858 180.065H65.1423C64.2978 180.065 63.6133 180.75 63.6133 181.594V182.267C63.6133 183.112 64.2978 183.796 65.1423 183.796H136.858C137.703 183.796 138.388 183.112 138.388 182.267V181.594C138.388 180.75 137.703 180.065 136.858 180.065Z" fill="#B3BDF3"/>
                                                <path d="M101.003 165.469C103.753 165.469 105.982 163.239 105.982 160.489C105.982 157.739 103.753 155.51 101.003 155.51C98.2528 155.51 96.0234 157.739 96.0234 160.489C96.0234 163.239 98.2528 165.469 101.003 165.469Z" fill="#B3BDF3"/>
                                                <path d="M85.4828 74.5885C82.6286 71.0157 81.0027 73.9412 81.2066 77.1879C81.4105 80.4345 84.2595 83.36 86.0944 83.0338C87.9292 82.7076 85.4828 74.5885 85.4828 74.5885Z" fill="#FAB4AD"/>
                                                <path d="M100.992 92.4884C110.177 92.4884 117.623 85.0426 117.623 75.8577C117.623 66.6728 110.177 59.2271 100.992 59.2271C91.8071 59.2271 84.3613 66.6728 84.3613 75.8577C84.3613 85.0426 91.8071 92.4884 100.992 92.4884Z" fill="#FAB4AD"/>
                                                <path d="M116.497 74.5885C119.351 71.0157 120.977 73.9412 120.773 77.1879C120.569 80.4345 117.72 83.36 115.885 83.0338C114.051 82.7076 116.497 74.5885 116.497 74.5885Z" fill="#FAB4AD"/>
                                                <path d="M117.496 66.6736C117.496 58.5749 110.111 52.0103 101.003 52.0103C91.8952 52.0103 84.5049 58.5749 84.5049 66.6736C92.9808 71.0262 109.02 71.2555 117.496 66.6736Z" fill="#23130F"/>
                                                <path d="M101.074 102.193C97.4347 102.182 93.7396 101.438 91.5684 99.9348C92.7457 97.7941 92.2513 90.6383 91.5684 86.459H110.406C109.723 90.6383 109.229 97.7941 110.406 99.9348C108.24 101.438 104.545 102.182 100.9 102.193H101.069H101.074Z" fill="#FAB4AD"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_487_1319">
                                                <rect width="152" height="174.003" fill="white" transform="translate(25 52)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className="box">
                                            <p className="desc" style={{marginRight:"10px"}}>강요와 위계를 거부하며<br/>공식적인 회식이 없습니다.</p>
                                            <svg width="200" height="280" viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_487_1325)">
                                                <path d="M99.4243 153.563L133.238 86.606H65.7061L99.4243 153.563Z" fill="#7661CC"/>
                                                <path d="M47 49.4595L65.7065 86.6056H133.239L152 49.4595H47Z" fill="#D8DBFD"/>
                                                <path d="M101.279 214.076V136.533H97.7209V214.076H67.4648V217.633H131.535V214.076H101.279Z" fill="#7661CC"/>
                                                <path d="M119.273 37C112.062 37 106.123 42.4532 105.35 49.4596H133.197C132.417 42.4532 126.485 37 119.273 37Z" fill="#F2614E"/>
                                                <path d="M119.274 65.0323C127.012 65.0323 133.286 58.758 133.286 51.0195C133.286 50.4926 133.252 49.9726 133.197 49.4595H105.35C105.295 49.9726 105.261 50.4926 105.261 51.0195C105.261 58.758 111.535 65.0323 119.274 65.0323Z" fill="#B3BDF3"/>
                                                <path d="M99.4728 130.437C104.88 130.437 109.264 126.053 109.264 120.646C109.264 115.238 104.88 110.854 99.4728 110.854C94.0653 110.854 89.6816 115.238 89.6816 120.646C89.6816 126.053 94.0653 130.437 99.4728 130.437Z" fill="#523AB1"/>
                                                <path d="M91.7754 88.6586C91.7754 95.836 97.5981 101.659 104.776 101.659C111.953 101.659 117.776 95.836 117.776 88.6586C117.776 87.9607 117.707 87.2765 117.598 86.606H91.9533C91.8438 87.2765 91.7754 87.9607 91.7754 88.6586Z" fill="#523AB1"/>
                                                <path d="M104.775 75.6582C98.2958 75.6582 92.9384 80.4067 91.9531 86.6057H117.598C116.612 80.4067 111.255 75.6582 104.775 75.6582Z" fill="#B3BDF3"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_487_1325">
                                                <rect width="105" height="180.633" fill="white" transform="translate(47 37)"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section5"   id="txt6section">
                                <div className="text">
                                    <p className="main-title">포스팟 로그</p>
                                    <Link className='goLog' to='/log'>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle r="15.5" transform="matrix(-1 0 0 1 16 16)" stroke="#444444"/>
                                            <path d="M17.3636 12L22 16.5M22 16.5L17.3636 21M22 16.5H10" stroke="#444444" strokeWidth="2" strokeLinecap="square"/>
                                        </svg>
                                    </Link>
                                </div>
                                <div className="img">
                                    <ul className="content-list">                                    {
                                        getLogList.map((data, index) => (
                                            <li className="content-box">
                                            <div className="content-pic" onClick={()=>this.openPop(data)}>
                                                <div className="pic"><img  key={index} src={`https://apipospot.anypot.co.kr/${data.img_path1}`}/></div>
                                                {
                                                    {
                                                        news : <div className="icon-rt"><News/></div>,
                                                        insight : <div className="icon-rt"><Insight/></div>,
                                                        square : <div className="icon-rt"><Square/></div>,
                                                        people : <div className="icon-rt"><People/></div>
                                                    }[data.category_id]
                                                }
                                            </div>
                                            <div className="content-title">
                                                <p key={index} className="main-title">{data.title}</p>
                                                <p key={index} className="info">{moment(data.create_date).format('YYYY.M.DD')}<span>|</span>{data.category_name}</p>
                                            </div>
                                        </li>
                                        ))
                                    }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                                            <img key='img_path1' src={`https://apipospot.anypot.co.kr/${img}`}/>                                                
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

                

        )
    }
}

export default Main;