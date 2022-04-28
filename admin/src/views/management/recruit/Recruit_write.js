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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

axios.defaults.withCredentials = true;

const RecruitsWrite = () => {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const [submitDate, setSubmitDate] = useState(new Date());

  // 조건(로그인)에 따라 화면 보이기 위한 변수
  const [show, setShow] = useState(false);
  
  // table 컬럼 값 미리 선언
  const [recruit, setRecruit] = useState({ 
    task_1:"",
    task_2:"",
    task_3:"",
    task_4:"",
    task_5:"",
    spec_1:"",
    spec_2:"",
    spec_3:"",
    spec_4:"",
    spec_5:"",
    prefer_1:"",
    prefer_2:"",
    prefer_3:"",
    prefer_4:"",
    prefer_5:"",
    working_conditions_1:"",
    working_conditions_2:"",
    working_conditions_3:"",
    working_conditions_4:"",
    working_conditions_5:"",
    notice_1:"",
    notice_2:"",
    notice_3:"",
    notice_4:"",
    notice_5:"",
    receiving_1:"",
    receiving_2:"",
    receiving_3:"",
    receiving_4:"",
    receiving_5:"",
    deadline:""
  });

  // 항목 추가용 
  const [addNum, setAddNum] = useState({
    task: 2,
    spec: 2,
    prefer: 2,
    working_conditions: 2,
    notice: 2,
    receiving: 2
  });
  const [showInput, setShowInput] = useState({ 
    task_2: false,
    task_3: false,
    task_4: false,
    task_5: false,
    spec_2: false,
    spec_3: false,
    spec_4: false,
    spec_5: false,
    prefer_2: false,
    prefer_3: false,
    prefer_4: false,
    prefer_5: false,
    working_conditions_2: false,
    working_conditions_3: false,
    working_conditions_4: false,
    working_conditions_5: false,
    notice_2: false,
    notice_3: false,
    notice_4: false,
    notice_5: false,
    receiving_2: false,
    receiving_3: false,
    receiving_4: false,
    receiving_5: false
  });

  /*-----------------------------------------------------*/

  // 토큰 체크
  useEffect(() => {
    axios({
      method: 'get',
      url: process.env.REACT_APP_API+'api/loginprocess',
      withCredentials: true,
      headers: {
        // localStorage에 있는 토큰을 헤더에 넣어서 api로 전송
        Authorization: localStorage.getItem('jwtoken')
      }
    }).then(res => {
        if (res.data.code === 502) {
          // 토큰 인증 실패
          alert(res.data.msg);
          return window.location.replace("/login");
        } else {
          setRecruit((prevState) => {
            return { ...prevState, deadline: submitDate }
          });
          // 토큰이 유효하다면 화면 보이게 설정
          setShow(true);
        } 
    }).catch(error => {
      console.log(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // 채용공고 데이터 API로 전송 
  const onSubmit =(e)=> {
    console.log(recruit);
    
    if (window.confirm("저장하시겠습니까?") === true) {
      axios({
        method: 'POST',
        url: process.env.REACT_APP_API+'api/addRecruit',
        withCredentials: true,
        data: recruit
      })
      .then(res => {
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
    console.log(e)
    const { value, name } = e.target;
    setRecruit((prevState) => {
      return { ...prevState, [name]: value }
    });
  }

  // 날짜 선택
  const PickDay =()=>{
    return (
        <DatePicker 
        selected={submitDate} // value
        onChange={(date) => {
          setSubmitDate(date); //화면 변경
          pickerChange('deadline', date); //스케쥴 데이터 변경
        }} // 날짜를 선택하였을 때 실행될 함수
        placeholderText="기한 선택 필수"    // placeholder
        dateFormat="yyyy.MM.dd" // 날짜 형식 설정
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

  // 항목 추가용 (추가 버튼 클릭 시 안보이던 항목 보이게 추가)
  const addInputBox =(e)=> {
    const idValue = e.target.id + '_' + addNum[e.target.id];
    const count = addNum[e.target.id] + 1
    if(count > 6) {
      alert ('최대 5개까지 추가 가능합니다.')
      return
    }
    //setShowInput.idValue(true);
    setShowInput((prevState) => {
      return { ...prevState, 
        [idValue]: true,
        }
    });
    setAddNum((prevState) => {
      return { ...prevState, 
        [e.target.id]: count,
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
            <strong>RECRUIT</strong> <small>WRITE</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3" id="infoForm" onSubmit={handleSubmit(onSubmit)}>
            <CCol md={3}>
                <CFormLabel htmlFor="workType">근무형태</CFormLabel>
                <CFormSelect id="workType" name="workType"
                {...register('workType', {required: true})} onChange={handleChange} >
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
                {...register('career', {required: true})} onChange={handleChange} >
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
                {...register('education', {required: true})} onChange={handleChange} >
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
                <CFormFloating className='mb-1'>
                  <CFormInput type="text" id="recruit_title" name="recruit_title" 
                  {...register('recruit_title', {required: true})} onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">제목을 입력해주세요.</CFormLabel>
                </CFormFloating>
                <CCol className="mb-1">
                  {errors.recruit_title && errors.recruit_title.type === "required" && errors.recruit_title.ref.value ==='' && <div className='validation_msg'>※ 제목은 필수 입력사항입니다.</div>}
                </CCol>
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="task">담당업무   <CButton color="secondary" variant="ghost" size='sm' id='task' onClick={addInputBox}>추가</CButton></CFormLabel>
                  <CFormFloating className='mb-1' id='task1'>
                    <CFormInput type="text" id="task_1" name="task_1" 
                    {...register('task_1', {required: true})} onChange={handleChange} />
                    <CFormLabel htmlFor="floatingInput">담당업무 1</CFormLabel>
                  </CFormFloating>
                    {errors.task_1 && errors.task_1.type === "required" && errors.task_1.ref.value ==='' && <div className='validation_msg'>※ `담당업무 1`은 필수 입력사항입니다.</div>}
                  { showInput.task_2 &&
                  <CFormFloating className='mb-1' id='task2'>
                    <CFormInput type="text" id="task_3" name="task_3" onChange={handleChange} />
                    <CFormLabel htmlFor="floatingInput">담당업무 2</CFormLabel>
                  </CFormFloating>
                  }
                  { showInput.task_3 &&
                  <CFormFloating className='mb-1'  id='task3'>
                    <CFormInput type="text" id="task_3" name="task_3" onChange={handleChange} />
                    <CFormLabel htmlFor="floatingInput">담당업무 3</CFormLabel>
                  </CFormFloating>
                  }
                  { showInput.task_4 &&
                  <CFormFloating className='mb-1' id='task4'>
                    <CFormInput type="text" id="task_4" name="task_4" onChange={handleChange} />
                    <CFormLabel htmlFor="floatingInput">담당업무 4</CFormLabel>
                  </CFormFloating>
                  }
                  { showInput.task_5 &&
                  <CFormFloating className='mb-2' id='task5'> 
                    <CFormInput type="text" id="task_5" name="task_5" onChange={handleChange} />
                    <CFormLabel htmlFor="floatingInput">담당업무 5</CFormLabel>
                  </CFormFloating>
                  }
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="task">자격요건   <CButton color="secondary" variant="ghost" size='sm' id='spec' onClick={addInputBox}>추가</CButton></CFormLabel>
                <CFormFloating className='mb-1' id="spec1">
                  <CFormInput type="text" id="spec_1" name="spec_1" 
                  {...register('spec_1', {required: true})} onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">자격요건 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.spec_1 && errors.spec_1.type === "required" && errors.spec_1.ref.value ==='' && <div className='validation_msg'>※ `자격요건 1`은 필수 입력사항입니다.</div>}
                </CCol>
                  { showInput.spec_2 &&
                  <CFormFloating className='mb-1' id="spec2">
                    <CFormInput type="text" id="spec_2" name="spec_2" onChange={handleChange} />
                    <CFormLabel htmlFor="floatingInput">자격요건 2</CFormLabel>
                  </CFormFloating>
                  }
                  { showInput.spec_3 &&
                  <CFormFloating className='mb-1' id="spec3">
                    <CFormInput type="text" id="spec_3" name="spec_3" onChange={handleChange} />
                    <CFormLabel htmlFor="floatingInput">자격요건 3</CFormLabel>
                  </CFormFloating>
                  }
                  { showInput.spec_4 &&
                  <CFormFloating className='mb-1' id="spec4">
                    <CFormInput type="text" id="spec_4" name="spec_4" onChange={handleChange} />
                    <CFormLabel htmlFor="floatingInput">자격요건 4</CFormLabel>
                  </CFormFloating>
                  }
                  { showInput.spec_5 &&
                  <CFormFloating className='mb-2' id="spec5">
                    <CFormInput type="text" id="spec_5" name="spec_5" onChange={handleChange} />
                    <CFormLabel htmlFor="floatingInput">자격요건 5</CFormLabel>
                  </CFormFloating>
                  }
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="prefer">우대사항   <CButton color="secondary" variant="ghost" size='sm' id='prefer' onClick={addInputBox}>추가</CButton></CFormLabel>
                <CFormFloating className='mb-1'  id="prefer1">
                  <CFormInput type="text" id="prefer_1" name="prefer_1" 
                  {...register('prefer_1', {required: true})} onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">우대사항 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.prefer_1 && errors.prefer_1.type === "required" && errors.prefer_1.ref.value ==='' && <div className='validation_msg'>※ `우대사항 1`은 필수 입력사항입니다.</div>}
                </CCol>
                { showInput.prefer_2 &&
                <CFormFloating className='mb-1' id="prefer2">
                  <CFormInput type="text" id="prefer_2" name="prefer_2" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">우대사항 2</CFormLabel>
                </CFormFloating>
                }
                { showInput.prefer_3 &&
                <CFormFloating className='mb-1' id="prefer3">
                  <CFormInput type="text" id="prefer_3" name="prefer_3" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">우대사항 3</CFormLabel>
                </CFormFloating>
                }
                { showInput.prefer_4 &&
                <CFormFloating className='mb-1' id="prefer4">
                  <CFormInput type="text" id="prefer_4" name="prefer_4" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">우대사항 4</CFormLabel>
                </CFormFloating>
                }
                { showInput.prefer_5 &&
                <CFormFloating className='mb-2' id="prefer5"> 
                  <CFormInput type="text" id="prefer_5" name="prefer_5" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">우대사항 5</CFormLabel>
                </CFormFloating>
                }
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="working_conditions">근무조건   <CButton color="secondary" variant="ghost" size='sm' id='working_conditions' onClick={addInputBox}>추가</CButton></CFormLabel>
                <CFormFloating className='mb-1' id="working_conditions1" >
                  <CFormInput type="text" id="working_conditions_1" name="working_conditions_1" 
                  {...register('working_conditions_1', {required: true})} onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">근무조건 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.working_conditions_1 && errors.working_conditions_1.type === "required" && errors.working_conditions_1.ref.value ==='' && <div className='validation_msg'>※ `근무조건 1`은 필수 입력사항입니다.</div>}
                </CCol>
                { showInput.working_conditions_2 &&
                <CFormFloating className='mb-1' id="working_conditions2" >
                  <CFormInput type="text" id="working_conditions_2" name="working_conditions_2" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">근무조건 2</CFormLabel>
                </CFormFloating>
                }
                { showInput.working_conditions_3 &&
                <CFormFloating className='mb-1' id="working_conditions3" >
                  <CFormInput type="text" id="working_conditions_3" name="working_conditions_3" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">근무조건 3</CFormLabel>
                </CFormFloating>
                }
                { showInput.working_conditions_4 &&
                <CFormFloating className='mb-1' id="working_conditions4" >
                  <CFormInput type="text" id="working_conditions_4" name="working_conditions_4" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">근무조건 4</CFormLabel>
                </CFormFloating>
                }
                { showInput.working_conditions_5 &&
                <CFormFloating className='mb-2' id="working_conditions5" >
                  <CFormInput type="text" id="working_conditions_5" name="working_conditions_5" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">근무조건 5</CFormLabel>
                </CFormFloating>
                }
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="notice">유의사항   <CButton color="secondary" variant="ghost" size='sm' id='notice' onClick={addInputBox}>추가</CButton></CFormLabel>
                <CFormFloating className='mb-1' id="notice1">
                  <CFormInput type="text" id="notice_1" name="notice_1" 
                  {...register('notice_1', {required: true})} onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">유의사항 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.notice_1 && errors.notice_1.type === "required" && errors.notice_1.ref.value ==='' && <div className='validation_msg'>※ `유의사항 1`은 필수 입력사항입니다.</div>}
                </CCol>
                { showInput.notice_2 &&
                <CFormFloating className='mb-1' id="notice2">
                  <CFormInput type="text" id="notice_2" name="notice_2" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">유의사항 2</CFormLabel>
                </CFormFloating>
                }
                { showInput.notice_3 &&
                <CFormFloating className='mb-1' id="notice3">
                  <CFormInput type="text" id="notice_3" name="notice_3" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">유의사항 3</CFormLabel>
                </CFormFloating>
                }
                { showInput.notice_4 &&
                <CFormFloating className='mb-1' id="notice4">
                  <CFormInput type="text" id="notice_4" name="notice_4" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">유의사항 4</CFormLabel>
                </CFormFloating>
                }
                { showInput.notice_5 &&
                <CFormFloating className='mb-2' id="notice5"> 
                  <CFormInput type="text" id="notice_5" name="notice_5" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">유의사항 5</CFormLabel>
                </CFormFloating>
                }
              </CCol>
              <CCol xs={12}>
                <CFormLabel htmlFor="receiving">접수기간/방법   <CButton color="secondary" variant="ghost" size='sm' id='receiving' onClick={addInputBox}>추가</CButton></CFormLabel>
                <CFormFloating className='mb-1' id="receiving1">
                  <CFormInput type="text" id="receiving_1" name="receiving_1" 
                  {...register('receiving_1', {required: true})} onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 1</CFormLabel>
                </CFormFloating>
                <CCol className="mb-2">
                  {errors.receiving_1 && errors.receiving_1.type === "required" && errors.receiving_1.ref.value ==='' && <div className='validation_msg'>※ `접수기한/방법 1`은 필수 입력사항입니다.</div>}
                </CCol>
                { showInput.receiving_2 &&
                <CFormFloating className='mb-1' id="receiving2">
                  <CFormInput type="text" id="receiving_2" name="receiving_2" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 2</CFormLabel>
                </CFormFloating>
                }
                { showInput.receiving_3 &&
                <CFormFloating className='mb-1' id="receiving3">
                  <CFormInput type="text" id="receiving_3" name="receiving_3" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 3</CFormLabel>
                </CFormFloating>
                }
                { showInput.receiving_4 &&
                <CFormFloating className='mb-1' id="receiving4">
                  <CFormInput type="text" id="receiving_4" name="receiving_4" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 4</CFormLabel>
                </CFormFloating>
                }
                { showInput.receiving_5 &&
                <CFormFloating className='mb-2' id="receiving5">
                  <CFormInput type="text" id="receiving_5" name="receiving_5" onChange={handleChange} />
                  <CFormLabel htmlFor="floatingInput">접수기간/방법 5</CFormLabel>
                </CFormFloating>
                }
              </CCol>
              
              <CCol md={3}>
                <CFormLabel htmlFor="state">공고 상태</CFormLabel>
                <CFormSelect id="state" name="state"
                {...register('state', {required: true})} onChange={handleChange} >
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

export default RecruitsWrite
