import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilStar, cilAccountLogout, cilContact, cilNotes } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: '관리',
  },
  {
    component: CNavItem,
    name: '메인화면',
    to: '/pospotLog',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '포스팟로그',
    to: '/pospotLog',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '채용공고',
    to: '/recruit',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '로그아웃',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav
