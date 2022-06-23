import React, { useEffect, useState } from "react";
import imageCompression from 'browser-image-compression';
import $ from 'jquery';
import { Fade } from "react-reveal";
import { useLocation } from "react-router-dom";
// imgs
import Back from '../public/svg/Vector.svg'
import Camera from '../public/svg/camera.svg'
import Cancel from '../public/svg/cancel_blue.svg'


export default function CreateMSG() {
    
    const [file, setFile] = useState([]);
    const [showImages, setShowImages] = useState([]);
    const [strLength, setStrLength] = useState(0);
    
    const [bg, setBg] = useState(["#3182F7","#ffffff"])
    useEffect(()=>{
    },[file,showImages,strLength,bg])

  
    const onCount=e=>{
        console.log(e.target.value.length)
        setStrLength(e.target.value.length);
    }

    const handleFileOnChange = async (e) => {
        e.preventDefault();
    
        let imgList = e.target.files;   // 입력받은 file객체
        let imgUrlList = [...showImages];
        let compressedFile = [...file];
    
       
        // 이미지 resize 옵션 설정
        const options = { 
            maxSizeMB: 0.2, // 최대 2MB 이하로 압축
            maxWidthOrHeight: 250,
        }
        try {
          
          for(let i = 0; i < imgList.length; i++) {
            compressedFile[i] = await imageCompression(imgList[i], options);
            
            console.log(`originalFile size : ${Math.round(imgList[i].size / 1024 / 1024 * 1000) / 1000} MB`)
            console.log(`compressedFile size : ${Math.round(compressedFile[i].size / 1024 / 1024 * 1000) / 1000} MB`)
    
            const currentImageUrl = URL.createObjectURL(imgList[i]);
            imgUrlList.push(currentImageUrl);
          }
    
          if (imgUrlList.length > 5) {
            compressedFile = compressedFile.slice(0, 5);
            imgUrlList = imgUrlList.slice(0, 5);
            $(".background").addClass("show");
            setTimeout(() => {
              $(".background").removeClass("show");
            }, 2000);
          }
    
          setFile(compressedFile);
          setShowImages(imgUrlList);
    
        } catch (error) {
            console.log(error);
        }
      }

      const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
      };

     
   
    return (
        <Fade clear>
        <div className="create-callback">
            <div className="top-bar">
            <div className="top-nav">
                <a href="javascript:window.history.back();" className="back"><img src={Back}/></a>
                <p className="title">콜백작성</p>
            </div>
            </div>

            <div className="content">
                <div className="w-content">
                <div>
                <div class="cb-title">상세내용</div>
                <div className="cb-desc">
                    <textarea type="textarea" placeholder={
                    `자유롭게 나만의 프로필을 만들어주세요. \n상세하게 내용을 적을수록 프로필에 도움이 됩니다.\n\n프로필은 최소 10자, 최대 1000자 이하까지\n작성 가능합니다.
                    `} onChange={(e)=>onCount(e)}></textarea>
                    <div>{strLength !== 0
                    ?
                    <p style={{"color":" #3182F7"}}>{strLength}</p>
                    :
                    <p style={{"color":" #8C969F"}}>{strLength}</p>
                    }/1000</div>
                </div>
                </div>
                <div className="cb-img">
                    <div className="img-title"><p style={{"color":" #8C969F"}}>사진 등록</p>
                    {showImages.length !== 0 ?
                    <>
                    <p style={{"color":"#3182F7", "padding-left":"5px"}}>{showImages.length}</p>
                    </>
                    :
                    <>
                    <p style={{"color":"#8C969F", "padding-left":"5px"}}>{showImages.length}</p>
                    </>
                    }
                    
                        
                    /5</div>
                    <div className="img-input">
                        <input type="file" accept="image/jpg,image/png,image/jpeg" multiple="multiple" className="upload_img" id="upload_btn" style={{"display":"none"}} onChange={handleFileOnChange}></input>
                        <label htmlFor="upload_btn"><div><img src={Camera} /><p>사진추가</p></div></label>

                        {showImages.map((image, id) => (
                            <div className="img-preview" key={id}>
                            <div className='img'><img src={image} alt={`${image}-${id}`} /></div>
                            <img src={Cancel} onClick={() => handleDeleteImage(id)}/>
                            </div>
                        ))}
                        
                        
        {<div className='background'>
          <div className='window'>
            <div className='popup'>
              <div className='msg-pop'>
                <p className='msg' style={{opacity:"1"}}>사진은 5개까지 첨부 가능합니다.</p>
              </div>
            </div>
          </div>
        </div>
      }

                    </div>    
                    <ul>
                        <li>용령은 각 20MB 이하, jpg,png,gif 파일만 첨부 가능합니다.</li>
                        <li>첨부파일은 최대 5개까지 등록 가능힙니다.</li>
                        <li>이미지에 개인정보(주민번호 등)가 포함되지 않도록 주의해주세요.</li>
                    </ul>
                </div>
                </div>

                <div className="btn-wrapper">
                <input type="button" id="com-btn" style={{"display":"none"}} />
                <label htmlFor="com-btn">
                    {strLength !== 0 
                    ?
                    <div style={{"backgroundColor":"#3182F7"}}>작성완료</div>
                    :
                    <div style={{"backgroundColor":"#ABC4E7"}}>작성완료</div>}
                </label>
                </div>
            </div>

        </div>
        </Fade>
    )
}