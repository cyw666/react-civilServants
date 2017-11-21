/**
 * 班级详情modal
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './classDetailModal.less'
import {dateFilter} from '../../../utils/index'
import {Modal, Icon} from 'antd';

const ClassDetailModal = ({closeModal, showModal, data}) => {
  
  return (
    <Modal
      title="班级园地"
      visible={showModal}
      onCancel={closeModal}
      footer={null}
    >
      <div className={styles.classModal}>
        <div className={styles.classTip}>
          <span className={styles.tipTitle}><Icon type="smile" style={{color: "#333"}}/> 友情提示：<br/></span>
          <span className={styles.tipDesc}>班级简介会有介绍学习班级内容的规则和标准哦 请学员仔细查看，祝您学习愉快！</span>
        </div>
        <div className={styles.classContent}>
          <p>班级名称：{data.Name}</p>
          <p>培训时间：{dateFilter(data.StartDate, 'yyyy-MM-dd')}~{dateFilter(data.EndDate, 'yyyy-MM-dd')}</p>
          <p>报名时间：{dateFilter(data.SignStart, 'yyyy-MM-dd')}~{dateFilter(data.SignEnd, 'yyyy-MM-dd')}</p>
          <p>举办单位：{data.Organizers}</p>
          <p>结业方式：{data.GraduateWay}</p>
          <p>班级简介：{data.Description}</p>
        </div>
      </div>
    </Modal>
  )
}


ClassDetailModal.propTypes = {
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  data: PropTypes.object,
};
export default ClassDetailModal;
