import React, { useEffect, useState } from 'react';
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
  CRow,
  CFormFloating,
} from '@coreui/react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

axios.defaults.withCredentials = true;

const RecruitsUpdate = () => {
  let recruitId = useParams();

  const { register, handleSubmit, setValue, formState:{errors} } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: "firstError",
    shouldUnregister: false,
  });
  /* setValue 사용 중 필드를 건드려진 상태(dirty)로 설정하기 위해 shouldDirty : true 로설정 */

  // table 컬럼 값 미리 선언
  const [recruit, setRecruit] = useState({ 
    recruit_id:recruitId.id,
    deadline:new Date()
  });
  const [submitDate, setSubmitDate] = useState();

  // 조건(로그인)에 따라 화면 보이기 위한 변수
  const [show, setShow] = useState(false);

  // 수정할 채용공고 데이터 가져오기
  useEffect(() => {
    axios({
      method: 'POST',
      url: process.env.REACT_APP_API+'api/detailRecruit',
      withCredentials: true,
      headers: {
        // localStorage에 있는 토큰을 헤더에 넣어서 api로 전송
        Authorization: localStorage.getItem('jwtoken')
      },
      data: {recruitId : recruitId.id}
    }).then(res => {
        if (res.data.code === 502) {
          // 토큰 인증 실패
          alert(res.data.msg);
          return window.location.replace("/login");
        } else {
          let recruitList = res.data.data;
          setRecruit(recruitList[0]);
          setSubmitDate( new Date(recruitList[0].deadlineParse));
          // 토큰이 유효하다면 화면 보이게 설정
          setShow(true);
        } 
    }).catch(error => {
      console.log(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // value 값 지정하면 input 값 변경이 안되서 추가
  const { 
    recruit_title, task_1, task_2, task_3, task_4, task_5,
    spec_1, spec_2, spec_3, spec_4, spec_5,
    prefer_1, prefer_2, prefer_3, prefer_4, prefer_5,
    working_conditions_1, working_conditions_2, working_conditions_3, working_conditions_4, working_conditions_5,
    notice_1, notice_2, notice_3, notice_4, notice_5,
    receiving_1, receiving_2, receiving_3, receiving_4, receiving_5,
    workType, career, education, state
  } = recruit; // 비구조화 할당을 통해 값 추출
  
  
  // 수정 데이터 API로 전송
  const onSubmit =(e)=> {
    console.log(recruit);
    if (window.confirm("수정하시겠습니까?") === true) {
      axios({
        method: 'POST',
        url: process.env.REACT_APP_API+'api/updateRecruit',
        withCredentials: true,
        data: recruit
      })
      .then(res => {
        console.log(res.data.msg);
        alert(res.data.msg);
        return window.location.replace("/recruit");
      })
      .catch(error => {
          console.log(error);
          return false;
      });
    } else {
      return false;
    }
  }

  // input 값을 recruit에 데이터 저장
  const handleChange =(e)=> {
    const { value, name } = e.target;
    setRecruit((prevState) => {
      return { ...prevState, [name]: value }
    });
  }

  // 날짜 선택
  const PickDay =()=>{
    return (
        <DatePicker 
        selected={submitDate}  // value
        onChange={(date) => {
          setSubmitDate(date); //화면 변경
          pickerChange('deadline', date); //스케쥴 데이터 변경
        }} // 날짜를 선택하였을 때 실행될 함수
        placeholderText="기한 선택 필수"    // placeholder
        dateFormat="yyyy.MM.dd"
        closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
        />
    )
  }

  // 날짜 변경 값을 recruit에 저장
  const pickerChange =(name, value)=> {
    setRecruit((prevState) => {
      return { ...prevState, 
        [name]: value,
       }
    });
  }

  return (

    <div className="bg-light align-items-center">
    { show && 
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>RECRUIT</strong> <small>EDIT</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" id="infoForm" onSubmit={handleSubmit(onSubmit)}>
            <CCol md={3}>
                <CFormLabel htmlFor="workType">근무형태</CFormLabel>
                <CFormSelect id="workType" name="workType"
                {...register('workType', {required: true})} onChange={handleChange} onLoad={setValue('workType', workType, {shouldDirty: true})} >
                  <option value="">선택</option>
                  <option value="정규직">정규직</option>
                  <option value="계약직">계약직</option>
                  <option value="프리랜서">프리랜서</option>
                </CFormSelect>
                <CCol className="mb-1">
                  {errors.workType && errors.workType.type === "required" && errors.workType.ref.value ==='' && <div className='validation_msg'>※ 근무형태를 선택해주세요.</div>}
                </CCol>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="career">경력사항</CFormLabel>
                <CFormSelect id="career" name="career"
                {...register('career', {required: true})} onChange={handleChange} onLoad={setValue('career', career, {shouldDirty: true})} >
                  <option value="">선택</option>
                  <option value="신입">신입</option>
                  <option value="경력">경력</option>
                  <option value="신입/경력">신입/경력</option>
                </CFormSelect>
                <CCol className="mb-1">
                  {errors.career && errors.career.type === "required" && errors.career.ref.value ==='' && <div className='validation_msg'>※ 경력사항을 선택해주세요.</div>}
                </CCol>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="education">학력</CFormLabel>
                <CFormSelect id="education" name="education"
                {...register('education', {required: true})} onChange={handleChange} onLoad={setValue('education', education, {shouldDirty: true})} >
                  <option value="">선택</option>
                  <option value="학력무관">학력무관</option>
                  <option value="고졸이상">고졸이상</option>
                  <option value="초대졸이상">초대졸이상</option>
                  <option value="대졸이상">대졸이상</option>
                </CFormSelect>
                <CCol className="mb-1">
                  {errors.education && errors.education.type === "required" && errors.education.ref.value ==='' && <div className='validation_msg'>※ 학력을 선택해주세요.</div>}
                </CCol>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="title">구인제목</CFormLabel>
                <CFormFloating className='mb-2'>
                  <CFormInput type="text" id="recruit_title" name="recruit_title" 
                  {...register('recruit_title', {required: true})} onChange={handleChange} onLoad={setValue('recruit_title', recruit_title, {shouldDirty: true})} />
                  <CFormLabel htmlFor="floatingInput">제목을 입력해주세요.</CFormLabel>
                </CFormFloating>
                <CCol className="mb-1">
                  {errors.recruit_title && errors.recruit_title.type === "required" && errors.recruit_title.ref.value ==='' && <div className='validation_msg'>※ 제목은 필수 입력사항입니다.</div>}
                </CCol>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="task">담당업무</CFormLabel>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="task_1" name="task_1" 
                  {...register('task_1', {required: true})} onChange={handleChange} onLoad={setValue('task_1', task_1, {shouldDirty: true})} />
                  <CFormLabel htmlFor="floatingInput">담당업무 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.task_1 && errors.task_1.type === "required" && errors.task_1.ref.value ==='' && <div className='validation_msg'>※ `담당업무 1`은 필수 입력사항입니다.</div>}
                </CCol>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="task_2" name="task_2" onChange={handleChange} value={task_2 || ''} />
                  <CFormLabel htmlFor="floatingInput">담당업무 2</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="task_3" name="task_3" onChange={handleChange} value={task_3 || ''} />
                  <CFormLabel htmlFor="floatingInput">담당업무 3</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="task_4" name="task_4" onChange={handleChange} value={task_4 || ''} />
                  <CFormLabel htmlFor="floatingInput">담당업무 4</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-2'> 
                  <CFormInput type="text" id="task_5" name="task_5" onChange={handleChange} value={task_5 || ''} />
                  <CFormLabel htmlFor="floatingInput">담당업무 5</CFormLabel>
                </CFormFloating>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="task">자격요건</CFormLabel>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="spec_1" name="spec_1" 
                  {...register('spec_1', {required: true})} onChange={handleChange} onLoad={setValue('spec_1', spec_1, {shouldDirty: true})} />
                  <CFormLabel htmlFor="floatingInput">자격요건 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.spec_1 && errors.spec_1.type === "required" && errors.spec_1.ref.value ==='' && <div className='validation_msg'>※ `자격요건 1`은 필수 입력사항입니다.</div>}
                </CCol>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="spec_2" name="spec_2" onChange={handleChange} value={spec_2 || ''} />
                  <CFormLabel htmlFor="floatingInput">자격요건 2</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="spec_3" name="spec_3" onChange={handleChange} value={spec_3 || ''} />
                  <CFormLabel htmlFor="floatingInput">자격요건 3</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="spec_4" name="spec_4" onChange={handleChange} value={spec_4 || ''} />
                  <CFormLabel htmlFor="floatingInput">자격요건 4</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-2'> 
                  <CFormInput type="text" id="spec_5" name="spec_5" onChange={handleChange} value={spec_5 || ''} />
                  <CFormLabel htmlFor="floatingInput">자격요건 5</CFormLabel>
                </CFormFloating>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="prefer">우대사항</CFormLabel>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="prefer_1" name="prefer_1" 
                  {...register('prefer_1', {required: true})} onChange={handleChange} onLoad={setValue('prefer_1', prefer_1, {shouldDirty: true})} />
                  <CFormLabel htmlFor="floatingInput">우대사항 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.prefer_1 && errors.prefer_1.type === "required" && errors.prefer_1.ref.value ==='' && <div className='validation_msg'>※ `우대사항 1`은 필수 입력사항입니다.</div>}
                </CCol>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="prefer_2" name="prefer_2" onChange={handleChange} value={prefer_2 || ''} />
                  <CFormLabel htmlFor="floatingInput">우대사항 2</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="prefer_3" name="prefer_3" onChange={handleChange} value={prefer_3 || ''} />
                  <CFormLabel htmlFor="floatingInput">우대사항 3</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="prefer_4" name="prefer_4" onChange={handleChange} value={prefer_4 || ''} />
                  <CFormLabel htmlFor="floatingInput">우대사항 4</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-2'> 
                  <CFormInput type="text" id="prefer_5" name="prefer_5" onChange={handleChange} value={prefer_5 || ''} />
                  <CFormLabel htmlFor="floatingInput">우대사항 5</CFormLabel>
                </CFormFloating>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="working_conditions">근무조건</CFormLabel>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="working_conditions_1" name="working_conditions_1" 
                  {...register('working_conditions_1', {required: true})} onChange={handleChange} onLoad={setValue('working_conditions_1', working_conditions_1, {shouldDirty: true})} />
                  <CFormLabel htmlFor="floatingInput">근무조건 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.working_conditions_1 && errors.working_conditions_1.type === "required" && errors.working_conditions_1.ref.value ==='' && <div className='validation_msg'>※ `근무조건 1`은 필수 입력사항입니다.</div>}
                </CCol>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="working_conditions_2" name="working_conditions_2" onChange={handleChange} value={working_conditions_2 || ''} />
                  <CFormLabel htmlFor="floatingInput">근무조건 2</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="working_conditions_3" name="working_conditions_3" onChange={handleChange} value={working_conditions_3 || ''} />
                  <CFormLabel htmlFor="floatingInput">근무조건 3</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="working_conditions_4" name="working_conditions_4" onChange={handleChange} value={working_conditions_4 || ''} />
                  <CFormLabel htmlFor="floatingInput">근무조건 4</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-2'> 
                  <CFormInput type="text" id="working_conditions_5" name="working_conditions_5" onChange={handleChange} value={working_conditions_5 || ''} />
                  <CFormLabel htmlFor="floatingInput">근무조건 5</CFormLabel>
                </CFormFloating>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="notice">유의사항</CFormLabel>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="notice_1" name="notice_1" 
                  {...register('notice_1', {required: true})} onChange={handleChange} onLoad={setValue('notice_1', notice_1, {shouldDirty: true})} />
                  <CFormLabel htmlFor="floatingInput">유의사항 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.notice_1 && errors.notice_1.type === "required" && errors.notice_1.ref.value ==='' && <div className='validation_msg'>※ `유의사항 1`은 필수 입력사항입니다.</div>}
                </CCol>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="notice_2" name="notice_2" onChange={handleChange} value={notice_2 || ''} />
                  <CFormLabel htmlFor="floatingInput">유의사항 2</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="notice_3" name="notice_3" onChange={handleChange} value={notice_3 || ''} />
                  <CFormLabel htmlFor="floatingInput">유의사항 3</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="notice_4" name="notice_4" onChange={handleChange} value={notice_4 || ''} />
                  <CFormLabel htmlFor="floatingInput">유의사항 4</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-2'> 
                  <CFormInput type="text" id="notice_5" name="notice_5" onChange={handleChange} value={notice_5 || ''} />
                  <CFormLabel htmlFor="floatingInput">유의사항 5</CFormLabel>
                </CFormFloating>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="receiving">접수기간/방법</CFormLabel>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="receiving_1" name="receiving_1" 
                  {...register('receiving_1', {required: true})} onChange={handleChange} onLoad={setValue('receiving_1', receiving_1, {shouldDirty: true})} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.receiving_1 && errors.receiving_1.type === "required" && errors.receiving_1.ref.value ==='' && <div className='validation_msg'>※ `접수기한/방법 1`은 필수 입력사항입니다.</div>}
                </CCol>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="receiving_2" name="receiving_2" onChange={handleChange} value={receiving_2 || ''} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 2</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="receiving_3" name="receiving_3" onChange={handleChange} value={receiving_3 || ''} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 3</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="receiving_4" name="receiving_4" onChange={handleChange} value={receiving_4 || ''} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 4</CFormLabel>
                </CFormFloating>
                <CFormFloating className='mb-2'> 
                  <CFormInput type="text" id="receiving_5" name="receiving_5" onChange={handleChange} value={receiving_5 || ''} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 5</CFormLabel>
                </CFormFloating>
              </CCol>
              
              <CCol md={3}>
                <CFormLabel htmlFor="state">공고 상태</CFormLabel>
                <CFormSelect id="state" name="state"
                {...register('state', {required: true})} onChange={handleChange} onLoad={setValue('state', state, {shouldDirty: true})} >
                  <option value="">선택</option>
                  <option value="서류 제출">서류 제출</option>
                  <option value="서류 접수 종료">서류 접수 종료</option>
                  <option value="채용 완료">채용 완료</option>
                </CFormSelect>
                {errors.state && errors.state.type === "required" && errors.state.ref.value ==='' && <div className='validation_msg'>※ 상태를 선택해주세요.</div>}
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="deadline">제출 기한</CFormLabel>
                <PickDay />
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

export default RecruitsUpdate
