/**
 * 我的班级模块
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'dva/router'
import cs from 'classnames'
import {Spin} from 'antd'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './classModule.less'

const ClassModule = ({classModuleData, loading}) => {
  const {ListData, TitleNav, type} = classModuleData;
  const classNameList = ListData.map((item, index) => {
    return (
      <li key={index}>
        <span className={styles.list1}><Link to={{pathname: "/main/grade/classDetail", query: {id: item.Id}}} target="_blank" rel="noopener noreferrer">{item.Name}</Link></span>
        <span className={styles.list2}>{item.CurrentUser}</span>
      </li>
    )
  });
  return (
    <div className={styles.classModule}>
      <GeneralHead showIcon={true} title={TitleNav} url={`/main/classlist?type=${type}`}></GeneralHead>
      <Spin spinning={loading}>
        <ul className={cs(["border-base"],`${styles.content}`)}>
          <li className={styles.title}>
            <span className={styles.list1}>班级名称</span>
            <span className={styles.list2}>学员</span>
          </li>
          {classNameList}
        </ul>
      </Spin>
    </div>
  )
}

ClassModule.propTypes = {
  classModuleData: PropTypes.object,
  loading: PropTypes.bool,
};
export default ClassModule;
