import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className="ms-auto">
        <a href="https://www.pospot.kr/" target="_blank" rel="noopener noreferrer">
         POSPOT WEB SITE
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
