import React from 'react'

const PospotLog = React.lazy(() => import('./views/management/pospotLog/PospotLog'))
const PospotLogWrite = React.lazy(() => import('./views/management/pospotLog/PospotLog_write'))
const PospotLogUpdate = React.lazy(() => import('./views/management/pospotLog/PospotLog_update'))
const Recruit = React.lazy(() => import('./views/management/recruit/Recruit'))
const RecruitgWrite = React.lazy(() => import('./views/management/recruit/Recruit_write'))
const RecruitUpdate = React.lazy(() => import('./views/management/recruit/Recruit_update'))

const routes = [
  { path: '/', exact: true, name: 'admin', element: PospotLog},
  { path: '/admin', exact: true, name: 'admin', element: PospotLog},
  { path: '/management', name: 'management', element: PospotLog, exact: true },
  { path: '/pospotLog', name: 'PospotLog', element: PospotLog },
  { path: '/pospotLog_write', name: 'PospotLogWrite', element: PospotLogWrite },
  { path: '/pospotLog_update/:id', name: 'PospotLogUpdate', element: PospotLogUpdate },
  { path: '/recruit', name: 'Recruit', element: Recruit },
  { path: '/recruit_write', name: 'RecruitgWrite', element: RecruitgWrite },
  { path: '/recruit_update/:id', name: 'RecruitUpdate', element: RecruitUpdate },
]

export default routes
