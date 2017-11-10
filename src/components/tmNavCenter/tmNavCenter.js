/**
 * 导航模块
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Button, Icon} from 'antd'
import {Link} from 'dva/router'
import styles from './tmNavCenter.less'
import GeneralHead from '../GeneralHead/GeneralHead'
const TmNavCenter = ({title,navData}) => {
  const navList = navData.length>0&&navData.map((item,index)=>{
    return (
      <li key={index}><Button type="primary"><Link to={item.url}>{item.name}</Link></Button></li>
    )
  })
  return (
    <div className={styles.tmClassNav}>
      <GeneralHead showIcon={false} title={title}></GeneralHead>
      <ul className={styles.categoryGuide}>
        {navList}
      </ul>
    </div>
  )
}

TmNavCenter.propTypes = {
  title:PropTypes.string,
  navData:PropTypes.array,
};
export default TmNavCenter;
