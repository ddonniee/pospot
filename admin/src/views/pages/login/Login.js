import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const { register, handleSubmit, formState:{errors} } = useForm();

  // 조건(로그인)에 따라 화면 보이기 위한 변수
  const [show, setShow] = useState(false);

  // table의 null 값 미리 선언
  const [info, setInfo] = useState({ 
    id: "",
    password: "",
  });

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
          // 토큰이 유효하지 않다면 화면 보이게 설정
          // console.log(res.data.msg);
          setShow(true);
        } else {
          alert(res.data.msg);
          return window.location.replace("/pospotLog");
        } 
    }).catch(error => {
      console.log(error);
    });
  },[]);

  const onSubmit =(e)=> {
    axios({
      method: 'POST',
      url: process.env.REACT_APP_API+'api/loginprocess',
      withCredentials: true,
      data: info
    })
    .then(res => {
      console.log(res.data.msg);
      if (res.data.code === 200) {
        // 토큰 저장
        localStorage.setItem('jwtoken',res.data.token);
        return window.location.replace("/pospotLog");
      } else {
        alert(res.data.msg);
        return window.location.reload();
      } 
    })
    .catch(error => {
        console.log(error);
        return false;
    });
  }

  // input 값을 posting에 데이터 저장 이벤트
  const handleChange =(e)=> {
    const { value, name } = e.target;
    setInfo((prevState) => {
      return { ...prevState, [name]: value }
    });
  }
    
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      { show && 
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm id="infoForm" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Admin Login</h1>
                    <p className="text-medium-emphasis">관리자 정보를 입력해주세요.</p>
                    <CInputGroup className="mb-1">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type='text' placeholder="ID" autoComplete="ID" name="id" id="id" 
                      {...register('id', {required: true})} onChange={handleChange}/>
                    </CInputGroup>
                    <CCol className="mb-1">
                      {errors.id && errors.id.type === "required" && errors.id.ref.value ==='' && <div className='validation_msg'>※ 아이디를 입력해주세요.</div>}
                    </CCol>
                    <CInputGroup className="mt-2">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="password" autoComplete="password" name="password" id="password" 
                        {...register('password', {required: true})} onChange={handleChange} />
                    </CInputGroup>
                    <CCol className="mb-1">
                      {errors.password && errors.password.type === "required" && errors.password.ref.value ==='' && <div className='validation_msg'>※ 비밀번호를 입력해주세요.</div>}
                    </CCol>
                    <CRow>
                      <CCol className="mt-3" xs={6}>
                        <CButton type="submit"  color="primary" className="px-4" form='infoForm'>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    }
    </div>
  )
}

export default Login
