import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import Social from "./Social";
import {preBtn,nextBtn,paging,close} from "../svg/post.icon";
import moment from "moment";
const Post=(prop)=>{
    
    
    const [data, setData] = useState([]);
    //const {open, idx, onClose} = prop;
    const idx =prop.num;
    const open = prop.open; 
    const onClose = prop.onClose;
    const styleClasses = ["Modal",open ? "ModalOpen":"ModalClose"]

    const popupWidth = 1920;
    const popupHeight = 1140;

    let horizon = (window.screen.width/2)-(popupWidth/2.5);
    let vertical = (window.screen.height/2)-(popupHeight/2);

    useEffect(()=> {
        fetch('https://apipospot.anypot.co.kr/front/pospotLogList')
        .then (res => {
            return res.json();
        })
        .then (data => {
            setData(data.data)
        });
    },[])
  
    console.log(data[idx]);

    if(data.length===0 ) {
        return
    }else {

    
    return (
        <Fade bottom>
        <div className={styleClasses.join(' ')} style={{
            top:horizon,
            left:vertical
        }}>
             
            <div className="post_modal_content">
            
                <div className="modal_content_left">
                    <div className="content-left_wrapper">
                        <div className="modal_content_img">
                            <img src={`https://apipospot.anypot.co.kr/${data[idx].img_path1}`}/>
                        </div>
                    <div className="modal_content_btn">
                        <div className="content_btn_pre">
                            {preBtn}                              
                        </div>
                        <div className="content_btn_nxt">
                            {nextBtn}
                        </div>
                    </div>
                    <div className="modal_content_paging">
                            {paging}
                    </div>
                    </div>
                </div>
                <div className="modal_content_right">
                    <div className="content_right_wrapper">
                        <div className="right_wrapper_inner">
                            <h2 className="content_right_title">{data[idx].title}</h2>
                            <div className="content_right_txt">{data[idx].content}</div>            
                        <div className="post_info">
                            <div className="post_date">{moment(data[idx].modify_date).format("YYYY.M.DD")}</div>
                            <div className="post_division">|</div>
                            <div className="post_category">{data[idx].category_id}</div>
                        </div>
           
                        <Social />

         
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="btn_close" onClick={()=>{onClose(false)}}>
                {close}
            </div>
            

    </div>
    </Fade> 
    )
}
}

export default Post;