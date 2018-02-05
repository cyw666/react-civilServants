/**
 * 考试modal
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import styles from './notesModal.less'
import { Modal } from 'antd';

const ExamModal = ({
                     closeModal,
                     showModal,
                     examList,
                   }) => {
  
  const examListData = examList[ 'ListData' ].map((item, index) => {
    return (
      <tr key={ item.Id }>
        <td>{ item.Name }</td>
        <td>{ item.CreditHour }</td>
        <td>{ item.TimeLimit }</td>
        <td><Link to={ { pathname: "/main/exam", search: `?id=${ item.Id }` } } target="_blank"
                  rel="noopener noreferrer">参加测试</Link></td>
      </tr>
    )
    
  })
  
  return (
    <Modal
      title="考试列表"
      visible={ showModal }
      onCancel={ closeModal }
      footer={ null }
    >
      <div>
        <table className={ styles.table }>
          <tbody>
          <tr>
            <td>考试名称</td>
            <td>考试学时</td>
            <td>时限(分)</td>
            <td>参加测试</td>
          </tr>
          { examListData }
          <tr>
            <td colSpan="4">
              <div className="content_page">
                <span
                  className="current">{ examList.Page }</span><span>共 { Math.ceil(examList.Count / examList.Rows) }页,总记录 { examList.Count }条</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  )
}


ExamModal.propTypes = {
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  examList: PropTypes.object,
};
export default ExamModal;
