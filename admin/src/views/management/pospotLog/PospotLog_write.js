import React, { useEffect, useState, useRef } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CFormFloating,
  CFormCheck,
} from '@coreui/react'
import { useForm }from 'react-hook-form';
import axios from 'axios';
import $ from 'jquery';
axios.defaults.withCredentials = true;

const PospotLogWrite = () => {
  const inputRef = useRef(null);
  const { register, handleSubmit, formState:{errors} } = useForm();
  const [imgFile, setImgFile] = useState("");
  const [postingNum, setPostingNum] = useState("");

  // table 컬럼 값 미리 선언
  const [posting, setPosting] = useState({ 
    preview: "",
    img_path1: "",
    img_path2: "",
    img_path3: "",
    img_path4: "",
    img_path5: "",
    img_path6: "",
    blog_link: 0,
    facebook_link: 0,
    instagram_link: 0,
    remark:""
  });

  // 조건(로그인)에 따라 화면 보이기 위한 변수
  const [show, setShow] = useState(false);

  // 글번호 가져와서 이미지 이름에 저장
  useEffect(() => {
    axios({
      method: 'POST',
      url: process.env.REACT_APP_API+'api/numPospotLog',
      headers: {
        // localStorage에 있는 토큰을 헤더에 넣어서 api로 전송
        Authorization: localStorage.getItem('jwtoken')
      },
      withCredentials: true
    }).then(res => {
      if (res.data.code === 502) {
        // 토큰 인증 실패
        alert(res.data.msg);
        return window.location.replace("/login");
      } else {
        let num = res.data.data;
        // console.log((num[0].num))
        setPostingNum((num[0].num));
        if(num[0].num === '') {
          setPostingNum(1);
        }
        // 토큰이 유효하다면 화면 보이게 설정
        setShow(true);
      } 
    }).catch(error => {
      console.log(error);
    });
  },[postingNum]);

  // 포스팅 데이터 API로 전송 (이미지 최소 1장 이상)
  const onSubmit =(e)=> {
    // console.log(posting);
    if(posting.img_path1 ==="") {
      alert("이미지를 추가해주세요");
      setTimeout(function(){
        $('#inputMultipleImage').focus();
       },0);
      return false;
    }
    if (window.confirm("저장하시겠습니까?") === true) {
      axios({
        method: 'POST',
        url: process.env.REACT_APP_API+'api/addPospotLog',
        withCredentials: true,
        data: posting
      })
      .then(res => {
        console.log(res.data.msg);
        saveImage();
      })
      .catch(error => {
          console.log(error);
          return false;
      });
    } else {
      return false;
    }
  }

  // 이미지 이름 생성 후 API로 file 전송
  const saveImage =()=> {
    const formData = new FormData();
    for(var i = 0; i < imgFile.length; i++) {
      // console.log(postingNum + '_' + imgFile[i].name)
      formData.append(
        "uploadImages",
        imgFile[i],
        postingNum + '_' + imgFile[i].name
      );
    }

    axios({
      method: 'POST',
      url: process.env.REACT_APP_API+'api/imgUpload',
      withCredentials: true,
      data: formData
    })
    .then(res => {
      console.log(res.data.msg);
      alert(res.data.msg);
      return window.location.replace("/PospotLog");
    })
    .catch(error => {
        console.log(error);
        return false;
    });
  }

  // input 값을 posting에 데이터 저장
  const handleChange =(e)=> {
    const { value, name } = e.target;
    setPosting((prevState) => {
      return { ...prevState, [name]: value }
    });
  }

  // select 값을 posting에 데이터 저장
  const selectChange =(e)=> {
    const { value, name } = e.target;
    setPosting((prevState) => {
      return { ...prevState, 
        [name]: value,
        category_name: e.target.options[e.target.selectedIndex].text
       }
    });
  }

  // SNS 체크박스 선택
  const checkBoxHandler = (checked, id) => {
    if (checked) {
      setPosting((prevState) => {
        return { ...prevState, [id]: 1 }
      });
    } else {
      // 체크 해제
      setPosting((prevState) => {
        return { ...prevState, [id]: 0 }
      });
    }
  };


  // 이미지 파일 선택 후 발생
  const onChangeImg = (e => {
    e.preventDefault();
    let fileUpload = e.target;
      if (parseInt(fileUpload.files.length) > 6){
        alert("사진은 최대 6장만 첨부할 수 있습니다.");
        inputRef.current.value = '';
        inputRef.current.focus();
        return;
      } else {
        let uploadFile = e.target.files; // Form의 input을 들고온다.
        setImgFile(uploadFile);
        for (let i = 0; i < uploadFile.length; i++) { 
          let name = 'img_path' + (i+1);
          setPosting((prevState) => {
            return { ...prevState, [name]: 'pospotLog_uploads/'+ postingNum + '_'+ uploadFile[i].name }
          });
        }
        $('#multipleContainer').css("display","inline-grid")
        readMultipleImage(e.target);
      }
  })

  // 이미지 미리보기 가능, 삭제는 불가능
  function readMultipleImage(input) {
    const multipleContainer = document.getElementById('multipleContainer')
    multipleContainer.innerText = '';
    
    if(input.files) {
        const fileArr = Array.from(input.files)
        const $colDiv1 = document.createElement('div')
        const $colDiv2 = document.createElement('div')
        const $colDiv3 = document.createElement('div')
        $colDiv1.classList.add('column')
        $colDiv2.classList.add('column')
        $colDiv3.classList.add('column')

        fileArr.forEach((file, index) => {
            const reader = new FileReader()
            const $imgDiv = document.createElement('div')   
            const $img = document.createElement('img')
            $img.classList.add('image')
            const $label = document.createElement('label')
            $label.classList.add('image-label')
            $label.textContent = file.name
            $imgDiv.appendChild($img)
            $imgDiv.appendChild($label)
            reader.onload = e => {
                $img.src = e.target.result
            }
            if(index < 2) {
                $colDiv1.appendChild($imgDiv)
            } else if(index >= 2 && index < 4) {
                $colDiv2.appendChild($imgDiv)
            } else {
              $colDiv3.appendChild($imgDiv)
          }
            reader.readAsDataURL(file)
        })
        multipleContainer.appendChild($colDiv1)
        multipleContainer.appendChild($colDiv2)
        multipleContainer.appendChild($colDiv3)
    }
  }

return (
  <div className="bg-light align-items-center">
    { show && 
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>POSPOT LOG</strong> <small>WRITE</small>
          </CCardHeader>
          <CCardBody>
            <CForm encType="multipart/form-data" className="row g-3" id="infoForm" onSubmit={handleSubmit(onSubmit)}>
              <CCol md={3}>
                <CFormLabel htmlFor="category">카테고리</CFormLabel>
                <CFormSelect id="category_id" name="category_id"
                {...register('category_id', {required: true})} onChange={selectChange} >
                  <option value="">선택</option>
                  <option value="insight">인사이트</option>
                  <option value="square">포스팟 스퀘어</option>
                  <option value="people">포스팟 피플</option>
                  <option value="news">새소식</option>
                </CFormSelect>
                <CCol className="mb-1">
                  {errors.category_id && errors.category_id.type === "required" && errors.category_id.ref.value ==='' && <div className='validation_msg'>※ 카테고리를 선택해주세요.</div>}
                </CCol>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="title">제목</CFormLabel>
                <CFormFloating>
                  <CFormInput type="text" id="title" name="title" 
                  {...register('title', {required: true})} onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">글 제목을 입력해주세요.</CFormLabel>
                </CFormFloating>
                <CCol className="mb-1">
                  {errors.title && errors.title.type === "required" && errors.title.ref.value ==='' && <div className='validation_msg'>※ 제목은 필수 입력사항입니다.</div>}
                </CCol>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="title">설명</CFormLabel>
                <CFormFloating>
                  <CFormInput type="text" id="preview" name="preview" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">글 설명을 입력해주세요.</CFormLabel>
                </CFormFloating>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="content">내용</CFormLabel>
                <CFormTextarea id="content" name="content" placeholder="내용을 입력해주세요" rows="10" {...register('content', {required: true})} onChange={handleChange} />
                <CCol className="mb-1">
                  {errors.content && errors.content.type === "required" && errors.content.ref.value ==='' && <div className='validation_msg'>※ 내용은 필수 입력사항입니다.</div>}
                </CCol>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="image">사진 첨부</CFormLabel>
                <CFormInput type="file" size="sm" id="inputMultipleImage" name="uploadFiles" 
                  label="image max 6" accept="image/*" multiple onChange={onChangeImg} 
                  ref={inputRef}
                />
                <div id="multipleContainer"></div>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="link">링크</CFormLabel>
                <CFormInput id="link" name="link" placeholder="링크를 입력해주세요" onChange={handleChange} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="snsLinkYN">SNS</CFormLabel>
                <CFormCheck inline id="blog_link" name="blog_link" label="블로그"
                  onChange={(e)=>{ checkBoxHandler(e.currentTarget.checked, 'blog_link') } }
                  checked={posting.blog_link === 1 ? true : false}
                />
                <CFormCheck inline id="facebook_link" name="facebook_link" label="페이스북"
                  onChange={(e)=>{ checkBoxHandler(e.currentTarget.checked, 'facebook_link') } }
                  checked={posting.facebook_link === 1 ? true : false}
                />
                <CFormCheck inline id="instagram_link" name="instagram_link" label="인스타그램"
                  onChange={(e)=>{ checkBoxHandler(e.currentTarget.checked, 'instagram_link') } }
                  checked={posting.instagram_link === 1 ? true : false}
                />
              </CCol>
              <CCol xs={12} className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton type="submit" className="saveBtn" form='infoForm'>등록</CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    }
    </div>
  )
}

export default PospotLogWrite
