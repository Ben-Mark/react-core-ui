import React, {useState} from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol, CCollapse,
  CDataTable,
  CRow
} from '@coreui/react'

import usersData from '../../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['name','registered', 'role', 'status']

const Tables = () => {

  const [collapse, setCollapse] = useState(false)
  const [collapseMulti, setCollapseMulti] = useState([false, false])
  const [accordion, setAccordion] = useState(1)
  const [fade, setFade] = useState(true)

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Combined All Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                       <CBadge color={getBadge(item.status)}>
                         {item.status}
                       </CBadge>
                    </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tables
