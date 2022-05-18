// import React, { useEffect, useState } from "react";
// import { FileDrop } from "react-file-drop";

// import { ReactComponent as Hangeul } from '../resources/svg/icon_hangeul.svg'
// import { ReactComponent as PDF } from '../resources/svg/icon_pdf.svg'
// import { ReactComponent as WORD } from '../resources/svg/icon_word.svg'
// import { ReactComponent as XSLX } from '../resources/svg/icon_excel.svg'
// import { ReactComponent as PPT } from '../resources/svg/icon_ppt.svg'
// import Hover from '../resources/svg/upload.svg';

// import $ from 'jquery';

// export default function FileUpload() {

// // 드래그 형식으로 변경, file 전송할 수 있도록 file state에 담기 22.05.10

//   const [file, setFile] = useState([]);
//   const [file2, setFile2] = useState([]);
//   const [type, setType] = useState({
//         resume:{
//             name:'파일 업로드',
//             type:'',
//         },
//         porfolio:{
//           name: '포트폴리오',
//           type:'',
//       }
//     });

//     const onHover = (e,n) => {
//         console.log(e.target.id)
//         let temp = e.target.id;
//         if(n===1) {
//             $(`#${temp}`).css({"background-color":"#8b51cf", "opacity":"10%","border":"2px dashed #DBBCFF", "font-weight": "700","font-size": "15px","line-height": "18px"})
//             if(temp === "box-portfolio") {
//                 setType({...type, porfolio:{
//                         name:"onhover",
//                         type:'',
//                     }
//                 })
//             }
//         }
//         // 업로드 실패시에 type 값 돌려둬야해,,,,
//         if(n===2) {
//             $(`#${temp}`).css({"background-color":"#FFFFFF", "opacity":"100%","border":"1px solid #E5E5E5","font-weight": "700","font-size": "15px","line-height": "18px"})
//         }
//         }
//   const handle = (files, n) => {

//     if(n === 1) {
//         let arr = Object.values(files);
//         const dd = file.concat(arr);
//         setFile(dd);
      
//        setType({...type, resume:{
//            name:dd[0].name, 
//            type:dd[0].type,
//        }})
//     }
//     if ( n===2 ){
//         let arr2 = Object.values(files);
//         const dd2 = file2.concat(arr2);
//         setFile2(dd2);
   
//     setType({...type, porfolio:{
//         name:dd2[0].name, 
//         type:dd2[0].type,
//     }})
//     }
//     console.log(type.resume.type.substring(type.resume.type.lastIndexOf('.')))
//     console.log(type.porfolio.type.substring(type.porfolio.type.lastIndexOf('.')))
//   };
//   const resetUpload=(num)=> {
            
//     if(num===1) {
        
//         setType({...type, resume:{
//             name:'파일 업로드', 
//             type:'',
//         }})
//         setFile(null)
//         $("#resume-file").val('');
//     }else if(num===2) {
//         setType({...type, porfolio:{
//             name:'포트폴리오', 
//             type:'',
//         }})
//         setFile2(null)
//         $("#portfolio-file").val('');
//     }

// }
  
//   return (
//     <div className="recWrapper">
//     <div className="recruitPop">
//         <div className="recruitInner">
//       <p className="main-title">포스팟에 지원하세요</p>
//       <p className="sub-title">제목</p>
//       <input type="text" className="input-tit" placeholder="이름과 직군을 함께 적으면 좋아요"/>
//       <div className="uploadFile">
//         <FileDrop onDrop={(files, event) => handle(files,1)}>
            
//           <p className="sub-title">이력서 및 자기소개서</p>
//           <div className="box" id="box-resume">
//               {/* 첨부 파일 있을때만 x 버튼 나오기 22.05.04 은정 */}
//               {type.resume.name === '파일 업로드'
//               ?
//               null
//               :
//                 <div className="cancelBtn-div" style={{ 
//                     position:"absolute", top:"41%", left:"45%"
//                     }} onClick={()=>resetUpload(1)}>
//                     <svg className="cancelBtn" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M2.66675 2.66669L13.3806 13.3805" stroke="#222222" strokeWidth="1.5"/>
//                     <path d="M13.3333 2.66669L2.6194 13.3805" stroke="#222222" strokeWidth="1.5"/>
//                     </svg>
//                 </div>
                
//             }
//           <label htmlfor="same" className="browse-btn">
//           <div className="icon icon1">
//                 {
//                 type.resume.type.substring(type.resume.type.lastIndexOf('.')) === '.presentation' ? 
//                     <PPT /> :
//                     type.resume.type.substring(type.resume.type.lastIndexOf('.')) === '.document' ?
//                     <WORD /> :
//                     type.resume.type.substring(type.resume.type.lastIndexOf('.')) === 'application/pdf' ?
//                     <PDF /> :
//                     type.resume.type.substring(type.resume.type.lastIndexOf('.')) === '.sheet' ?
//                     <XSLX />
//                     :
//                     <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M40 8.8252H20C17.0313 8.83166 14.1849 10.0087 12.0786 12.1009C9.97241 14.1931 8.77632 17.0316 8.75 20.0002V40.0002C8.77632 42.9688 9.97241 45.8073 12.0786 47.8995C14.1849 49.9917 17.0313 51.1687 20 51.1752H40C42.9687 51.1687 45.8151 49.9917 47.9214 47.8995C50.0276 45.8073 51.2237 42.9688 51.25 40.0002V20.0002C51.2237 17.0316 50.0276 14.1931 47.9214 12.1009C45.8151 10.0087 42.9687 8.83166 40 8.8252ZM48.75 40.0002C48.75 42.3208 47.8281 44.5464 46.1872 46.1874C44.5462 47.8283 42.3206 48.7502 40 48.7502H20C17.6794 48.7502 15.4538 47.8283 13.8128 46.1874C12.1719 44.5464 11.25 42.3208 11.25 40.0002V20.0002C11.2698 17.6926 12.2004 15.4862 13.8392 13.8614C15.478 12.2367 17.6923 11.3251 20 11.3252H40C42.3077 11.3251 44.522 12.2367 46.1608 13.8614C47.7996 15.4862 48.7302 17.6926 48.75 20.0002V40.0002Z" fill="#222222"/>
//                     <path d="M42.5 18.75H17.5V21.25H42.5V18.75Z" fill="#222222"/>
//                     <path d="M42.5 28.75H17.5V31.25H42.5V28.75Z" fill="#222222"/>
//                     <path d="M30 38.75H17.5V41.25H30V38.75Z" fill="#222222"/>
//                     </svg>
//                 } 
                                                   
//             </div>
//             <p className="fileName fileName1">{type.resume.name}</p>
//             <input
//             className="inp_f1"
//               id="resume-file"
//               type="file"
//               multiple
//               onChange={(e) => console.log(e.target.files)}
//               accept=".pdf, .hwp, .Docx, .xls, .pptx"
//               required
//             ></input>
//           </label>
//           </div>
//           <div className="drop-file-detail">
//       <p className="desc">PDF, HWP, Docx, XLS, PPT 형식만 등록 가능, 최대 10MB까지</p>
     

//       {/* <div className="drop-file-detail">
//         <p>File Size: adsf asf fsdf</p>
//       </div> */}
//       </div>

      
//         </FileDrop>

//         <FileDrop onDrop={(files, event) => handle(files,2)} onDragOver={(e)=>onHover(e,1)} onDragLeave={(e)=>onHover(e,2)}>
        
//           <p className="sub-title">포트폴리오</p>
//           <div className="box" id="box-portfolio">
//           {type.porfolio.name ==='포트폴리오'
//               ?
//               null
//               :
//                 <div className="cancelBtn-div" style={{ 
//                     position:"absolute", top:"41%", left:"91%"
//                     }} onClick={()=>resetUpload(2)} >
//                     <svg className="cancelBtn" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M2.66675 2.66669L13.3806 13.3805" stroke="#222222" strokeWidth="1.5"/>
//                     <path d="M13.3333 2.66669L2.6194 13.3805" stroke="#222222" strokeWidth="1.5"/>
//                     </svg>
//                 </div>
                
//             }
//           <label htmlfor="same" className="browse-btn">
//           <div className="icon icon2">

//                     {
//                      type.porfolio.type.substring(type.porfolio.type.lastIndexOf('.')) === '.presentation' ? 
//                     <PPT /> :
//                      type.porfolio.type.substring(type.porfolio.type.lastIndexOf('.')) === '.document' ?
//                     <WORD /> :
//                      type.porfolio.type.substring(type.porfolio.type.lastIndexOf('.')) === 'application/pdf' ?
//                     <PDF /> :
//                     type.porfolio.type.substring(type.porfolio.type.lastIndexOf('.')) === '.sheet' ?
//                     <XSLX /> :
//                     type.porfolio.type === 'onhover' ?
//                     <Hover />
//                     :
//                     <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M40 8.8252H20C17.0313 8.83166 14.1849 10.0087 12.0786 12.1009C9.97241 14.1931 8.77632 17.0316 8.75 20.0002V40.0002C8.77632 42.9688 9.97241 45.8073 12.0786 47.8995C14.1849 49.9917 17.0313 51.1687 20 51.1752H40C42.9687 51.1687 45.8151 49.9917 47.9214 47.8995C50.0276 45.8073 51.2237 42.9688 51.25 40.0002V20.0002C51.2237 17.0316 50.0276 14.1931 47.9214 12.1009C45.8151 10.0087 42.9687 8.83166 40 8.8252ZM48.75 40.0002C48.75 42.3208 47.8281 44.5464 46.1872 46.1874C44.5462 47.8283 42.3206 48.7502 40 48.7502H20C17.6794 48.7502 15.4538 47.8283 13.8128 46.1874C12.1719 44.5464 11.25 42.3208 11.25 40.0002V20.0002C11.2698 17.6926 12.2004 15.4862 13.8392 13.8614C15.478 12.2367 17.6923 11.3251 20 11.3252H40C42.3077 11.3251 44.522 12.2367 46.1608 13.8614C47.7996 15.4862 48.7302 17.6926 48.75 20.0002V40.0002Z" fill="#222222"/>
//                     <path d="M42.5 18.75H17.5V21.25H42.5V18.75Z" fill="#222222"/>
//                     <path d="M42.5 28.75H17.5V31.25H42.5V28.75Z" fill="#222222"/>
//                     <path d="M30 38.75H17.5V41.25H30V38.75Z" fill="#222222"/>
//                     </svg>
//                 }

//             </div>
//             <p className="fileName fileName1">{type.porfolio.name}</p>
//             <input
//             className="inp_f1"
//               id="porfolio-file"
//               type="file"
//               multiple
//               onChange={(e) => console.log(e.target.files)}
//               accept=".pdf, .hwp, .Docx, .xls, .pptx"
//               required
//             ></input>
//           </label>
//           </div>
//           <div className="drop-file-detail">
//       <p className="desc">PDF, HWP, Docx, XLS, PPT 형식만 등록 가능, 최대 10MB까지</p>
//       </div>

//       {/* <div className="drop-file-detail">
//         <p>File Size: adsf asf fsdf</p>
//       </div> */}

//         </FileDrop>
        

//       </div>
//       <div className="center-box">
//             <button type="submit" className="purpleBtn mt75">지원하기</button>
//      </div>
//                 <a href="javascript:history.back()" id="closeBtn" className="closeBtn">
//                 {/* <a href="/recruit/list" id="closeBtn" className="closeBtn"> */}
//                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M4 4L20.0708 20.0708" stroke="white" strokeWidth="2.5"/>
//                     <path d="M20 4L3.92921 20.0708" stroke="white" strokeWidth="2.5"/>
//                     </svg>
//                 </a>
//                 </div>
//     </div>
//     </div>
//   );
// }