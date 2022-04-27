import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { CButton } from '@coreui/react'
import moment from 'moment';
import axios from 'axios';

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const PospotLog = () => {

  const [chageValue, setChageValue] = useState(true);
  const [posting, setPosting] = useState([]);

  // 글 리스트의 갯수를 세기 위해 선언, 기본값 0
  const [lastIdx, setLastIdx] = useState(0);

  // 조건(로그인)에 따라 화면 보이기 위한 변수
  const [show, setShow] = useState(false);

  // 토큰 인증이 되야 데이터 가져와서 리스트로 보여주기
  useEffect(() => {
    axios({
      method: 'POST',
      // url: process.env.REACT_APP_API+'api/listPospotLog',
      url: process.env.REACT_APP_API+'api/listPospotLog',
      withCredentials: true,
      headers: {
        // localStorage에 있는 토큰을 헤더에 넣어서 api로 전송
        Authorization: localStorage.getItem('jwtoken')
      },
    }).then(res => {
      if (res.data.code === 502) {
        // 토큰 인증 실패
        alert(res.data.msg);
        return window.location.replace("/login");
      } else {
        let postingList = res.data.data;
        let tempList = [];

        for (var list of postingList) {
          setLastIdx(lastIdx+1);
          tempList.push({
            id: list.posting_id,
            category: list.category_id,
            title: list.title,
            create_date: moment(list.create_date).format('YY.MM.DD'),
          })
        }
        setPosting(tempList);
        // 토큰이 유효하다면 화면 보이게 설정
        setShow(true);
      } 
    }).catch(error => {
      console.log(error);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chageValue]);

  // 게시글 삭제
  const onclickDelete = (e => {
    e.preventDefault();
    let postingIdx = e.target.value;
    console.log(postingIdx);
    if (window.confirm("삭제하시겠습니까?") === true) {
      axios({
        method: 'POST',
        url: process.env.REACT_APP_API+'api/delPospotLog',
        withCredentials: true,
        headers: {
          // localStorage에 있는 토큰을 헤더에 넣어서 api로 전송
          Authorization: localStorage.getItem('jwtoken')
        },
        data: {postingId : postingIdx}
      })
      .then(res => {
        // console.log(res.data.msg);
        alert(res.data.msg);
        setChageValue(!chageValue);
        // return window.location.replace("/pospotLog");
      })
      .catch(error => {
        console.log(error);
      });
    }  else {
      return false;
    }
  });

  return (
    <div className="bg-light align-items-center">
    { show && 
    <CRow>
      <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader> 
          <CRow>
            <CCol md={8} className="px-3">
            포스팟로그 목록
            </CCol>
            <CCol md={4} className="text-end px-3" >
              <Link to="/pospotLog_write" className="text-link px-1">
                  등록
                </Link>
            </CCol>
          </CRow>
        </CCardHeader> 
        <CCardBody>
          <CTable align="middle" responsive>
            <CTableHead className="text-center">
              <CTableRow>
                <CTableHeaderCell scope="col" style={{width:'10%'}}>
                  번호
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width:'10%'}}>
                  카테고리
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width:'45%'}}>
                  제목
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width:'15%'}}>
                  등록일자
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{width:'10%'}}>
                  삭제
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody  className="text-center">
                {lastIdx !== 0 ?
                  posting.map(list => (
                    list !== '' &&
                    <CTableRow  key={list.id}>
                      <CTableDataCell> {list.id || ''} </CTableDataCell>
                      <CTableDataCell> {list.category} </CTableDataCell>
                      <CTableDataCell> 
                        <Link to={"/pospotLog_update/" + list.id} className="text-dark px-1" id="updateRecruit" > {list.title}</Link>
                      </CTableDataCell>
                      <CTableDataCell> {list.create_date} </CTableDataCell>
                      <CTableDataCell>
                        <CButton id="deletePosting"  size="sm" color="dark" shape="rounded-pill" value={list.id || ''} onClick={onclickDelete}>
                          삭제
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )) : 
                  <CTableRow>
                    <CTableDataCell colSpan="5" className="text-center">작성된 글이 없습니다.</CTableDataCell>
                  </CTableRow>
                }
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      </CCol>
    </CRow>
    }
    </div>
  )
}

export default PospotLog


