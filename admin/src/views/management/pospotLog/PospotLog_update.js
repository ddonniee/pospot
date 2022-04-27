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
import { useForm } from 'react-hook-form';
import axios from 'axios';
import $ from 'jquery';
import { useParams } from 'react-router-dom';

axios.defaults.withCredentials = true;

const PospotLogUpdate = () => {
  let postingID = useParams();

  const inputRef = useRef(null);
  const { register, handleSubmit, setValue, formState:{errors} } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: "firstError",
    shouldUnregister: false,
  });

  const [imgFile, setImgFile] = useState("");

  // table 컬럼 값 미리 선언
  const [posting, setPosting] = useState({ 
    posting_id:postingID.id
  });

  // 조건(로그인)에 따라 화면 보이기 위한 변수
  const [show, setShow] = useState(false);

  // 수정할 포스팅 데이터 가져오기
  useEffect(() => {
    axios({
      method: 'POST',
      url: process.env.REACT_APP_API+'api/detailPospotLog',
      withCredentials: true,
      headers: {
        // localStorage에 있는 토큰을 헤더에 넣어서 api로 전송
        Authorization: localStorage.getItem('jwtoken')
      },
      data: {postingId : postingID.id}
    }).then(res => {
        if (res.data.code === 502) {
          // 토큰 인증 실패
          alert(res.data.msg);
          return window.location.replace("/login");
        } else {
          let postingList = res.data.data;
          setPosting(postingList[0]);
          // console.log(postingList[0])
          // 토큰이 유효하다면 화면 보이게 설정
          setShow(true);

          readMultipleImageLoad(postingList[0]);
          
        } 
    }).catch(error => {
      console.log(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // value 값 지정하면 input 값 변경이 안되서 추가
  const { category_id, title, preview, content, link } = posting; // 비구조화 할당을 통해 값 추출

  // 수정 데이터 API로 전송
  const onSubmit =(e)=> {
    if (window.confirm("수정하시겠습니까?") === true) {
      axios({
        method: 'POST',
        url: process.env.REACT_APP_API+'api/updatePospotLog',
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
      // console.log(postingID.id + '_' + imgFile[i].name)
      formData.append(
        "uploadImages",
        imgFile[i],
        postingID.id + '_' + imgFile[i].name
      );
    }

    axios({
      method: 'POST',
      url: process.env.REACT_APP_API+'imgUpload',
      withCredentials: true,
      data: formData
    })
    .then(res => {
      alert('포스팅이 수정되었습니다.');
      return window.location.replace("/pospotLog");
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
      console.log(posting)
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

    // 새로운 이미지를 선택 했을 때 기존 파일을 경로 삭제
    setPosting((prevState) => {
      return { ...prevState, 
        img_path1: '',
        img_path2: '',
        img_path3: '',
        img_path4: '',
        img_path5: '',
        img_path6: '' }
    });
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
            let colName = 'img_path' + (i+1);
            setPosting((prevState) => {
              return { ...prevState, [colName]: 'pospotLog_uploads/'+ postingID.id + '_' + uploadFile[i].name }
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

  // 페이지 열렸을 때 이미지 미리보기 가능, 삭제는 불가능
  function readMultipleImageLoad(posting) {
    const multipleContainer = document.getElementById('multipleContainer');
    multipleContainer.innerText = '';
    let readImg = [];
    readImg =[posting.img_path1, posting.img_path2, posting.img_path3, posting.img_path4, posting.img_path5, posting.img_path6 ];
    
    let cnt = 0;
    for (let i = 0; i < readImg.length; i++) {
      if(readImg[i] !== "") {
        cnt++;
      }
    }
    const $colDiv1 = document.createElement('div')
    const $colDiv2 = document.createElement('div')
    const $colDiv3 = document.createElement('div')
    $colDiv1.classList.add('column')
    $colDiv2.classList.add('column')
    $colDiv3.classList.add('column')
    for (let i = 0; i < cnt; i++) {
      const $imgDiv = document.createElement('div')   
        const $img = document.createElement('img')
        $img.classList.add('image')
        $imgDiv.appendChild($img)
        $img.src = process.env.REACT_APP_API + readImg[i]
        if(i < 2) {
            $colDiv1.appendChild($imgDiv)
        } else if(i >= 2 && i < 4) {
            $colDiv2.appendChild($imgDiv)
        } else {
          $colDiv3.appendChild($imgDiv)
      }
    }
    multipleContainer.appendChild($colDiv1)
    multipleContainer.appendChild($colDiv2)
    multipleContainer.appendChild($colDiv3)
    $('#multipleContainer').css("display","inline-grid")
  }

return (
  <div className="bg-light align-items-center">
    { show && 
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>POSPOT LOG</strong> <small>EDIT</small>
          </CCardHeader>
          <CCardBody>
            <CForm encType="multipart/form-data" className="row g-3" id="infoForm" onSubmit={handleSubmit(onSubmit)}>
              <CCol md={3}>
                <CFormLabel htmlFor="category">카테고리</CFormLabel>
                <CFormSelect id="category_id" name="category_id"
                {...register('category_id', {required: true})} onChange={selectChange} onLoad={setValue('category_id', category_id, {shouldDirty: true})} >
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
                  {...register('title', {required: true})} onChange={handleChange} onLoad={setValue('title', title, {shouldDirty: true})} />
                  <CFormLabel htmlFor="floatingInput">글 제목을 입력해주세요.</CFormLabel>
                </CFormFloating>
                <CCol className="mb-1">
                  {errors.title && errors.title.type === "required" && errors.title.ref.value ==='' && <div className='validation_msg'>※ 제목은 필수 입력사항입니다.</div>}
                </CCol>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="title">설명</CFormLabel>
                <CFormFloating>
                  <CFormInput type="text" id="preview" name="preview" onChange={handleChange} value={preview || ''}/>
                  <CFormLabel htmlFor="floatingInput">글 설명을 입력해주세요.</CFormLabel>
                </CFormFloating>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="content">내용</CFormLabel>
                <CFormTextarea id="content" name="content" placeholder="내용을 입력해주세요" rows="10" {...register('content', {required: true})} onChange={handleChange} 
                onLoad={setValue('content', content, {shouldDirty: true})} />
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
                <CFormInput id="link" name="link" placeholder="링크를 입력해주세요" onChange={handleChange} value={link || ''}/>
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
                <CButton type="submit" className="saveBtn" form='infoForm'>수정</CButton>
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

export default PospotLogUpdate
