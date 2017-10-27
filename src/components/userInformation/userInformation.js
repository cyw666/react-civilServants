/**
 * 个人信息
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Button, Spin} from 'antd';
import {Link} from 'dva/router'
import styles from './userInformation.less'
import GeneralHead from '../GeneralHead/GeneralHead'
const UserInformation = ({information, loginOut, loading}) => {
  const {Model, UserType} = information;
  return (
    <div className={styles.userInformation}>
      <Spin spinning={loading}>
        <GeneralHead showIcon={false} title="个人信息"></GeneralHead>
        <div className={styles.userContent}>
          <ul>
            <li>欢迎您:<b className={styles.red}>{Model.Name}</b>({Model.Account})</li>
            <li>
              <span className={styles.list1}>课程学时：<span
                className={styles.red}>{Model.PcCredit + Model.MobileCredit}</span></span>
              <span className={styles.list2}>考试学时：<span className={styles.red}>{Model.ExamCredit}</span></span>
            </li>
            <li>
              <span className={styles.list1}>当前学时：<span className={styles.red}>{Model.SumCredit}</span></span>
              <span className={styles.list2}>规定学时：<span className={styles.red}>{Model.BatchTotalCredit}</span></span>
            </li>
            <li>
              <span>考核状态：<span className={styles.red}>{Model.PassStatus ? "通过" : "未通过"}</span></span>
            </li>
            <li>
              <span className={styles.item1}>个人学习档案</span>
              <span className={styles.item2}><Link to="/main/personalFile" target="_blank" rel="noopener noreferrer">详细&gt;&gt;</Link></span>
            </li>
            <li>
              <span className={styles.item1}>您有<span className={styles.red}> {Model.UnRead} </span>条新通知！</span>
              <span className={styles.item2}><Link to="/main/personalNotice" rel="noopener noreferrer">详细&gt;&gt;</Link></span>
            </li>
            <li className={styles.lastChild}>
              <Link to="/main/modifyPassword">修改密码</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
              <Link to="/main/changeInfor">修改信息</Link> &nbsp;|&nbsp;
              {
                UserType === '管理员' &&
                <span className={styles.item2}><a href="/admin/" target="_blank"
                                                  rel="noopener noreferrer">进入管理控制台</a></span>
              }
            </li>
            <li className={styles.exit}>
              <Button type="primary" onClick={() => {
                loginOut()
              }}>退出</Button>
            </li>
          </ul>
        </div>
      </Spin>
    </div>
  )
}


UserInformation.propTypes = {
  information: PropTypes.object,
  loginOut: PropTypes.func,
  loading: PropTypes.bool,
};
export default UserInformation;
