import React, { useState } from "react";
import { Hands,Resume,PowerPoint,Upload } from "../svg/hire.icon";
import {preBtn,nextBtn,paging,close} from "../svg/post.icon";
const NoRoom=()=>{

    const [onApply, setOnApply]=useState(false);
    const onSubmit=()=>{
        console.log("??")
        setOnApply(!onApply)
    }
    const Apply=(prop)=>{
        
        const open = prop.open;
        const onApply = prop.onApply;
        
        return (
            <div className="modal_wrapper">
        <div className="modal_header">
            <h2 className="modal_title">포스팟에 지원하세요</h2>
        </div>
        <form className="modal_body">
            <div className="apply_form">
                <h3>
                제목
                </h3>
                <input tyoe="text" placeholder="이름과 직군을 함께 적으면 좋아요" />
            </div>
            <div className="uploade_file_wrapper">
                <div className="uploade_file_box">
                    <h3 className="uploade_file_name">이력서 및 자기소개서</h3>
                    <div className="uploade_file_body" >
                        <input type="file" className="upload_file_input" accept="" />
                        <label id="upload_file_label" htmlFor="upload_file_input" >
                            <div className="uploade_file">
                                <Resume />                 
                                <div className="upload_file_description">파일 업로드</div>
                            </div>
                        </label>
                    </div>
                    <div className="upload_file_type">PDF, HWP, Docx, XLS, PPT 형식만 등록 가능, 최대 10MB까지</div>
                </div>

                <div className="uploade_file_box">
                    <h3 className="uploade_file_name">이력서 및 자기소개서</h3>
                    <div className="uploade_file_body">
                        <input type="text" className="upload_file_input" accept=""/>
                        <label id="upload_file_label" htmlFor="upload_file_input">
                            <div className="uploade_file">
                                <PowerPoint />                    
                                <div className="upload_file_description">기획자 배기홍 포트폴리오.ppt</div>
                            </div>
                        </label>
                    </div>
                    <div className="upload_file_type" >PDF, HWP, Docx, XLS, PPT 형식만 등록 가능, 최대 10MB까지</div>
                </div>

            </div>

            <div className="btn_apply_wrapper">
                <input type="button" value="지원하기" className="btn_apply" onClick={onSubmit}>
                </input>
            </div>

        </form>

        <div className="btn_close" onClick={()=>{onApply(false)}}>
                {close}
        </div>
            
    </div>
        )
    }
    return (
        <div className="recruit_want">
         
                <div className="recruit_want_inner">
                    <h2 className="recruit_want_title">이런 분을 뽑고 있어요 {<Hands />}</h2>
                    
                    <div className="recruit_want_empty">
                        <div className="empty_content">
                        <p>지금은 채용 계획이 없지만,<br />이력서를 보내주시면 검토해볼게요.</p>
                        <input type="button" value="입사지원" className="btn_apply" onClick={onSubmit}>
                        </input>
                        </div>
                    </div>

                    

                </div>
                {onApply ? <Apply open={onApply} onApply={setOnApply}/>:null}
            </div>
    )
}
export default NoRoom;