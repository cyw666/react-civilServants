/**
 * 模版通用头部
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'dva/router'
import styles from './GeneralHead.less'
import headerLeftIcon from '../../assets/headerLeftIcon.png'
import more from '../../assets/more.png'

const GeneralHead = ({showIcon, url, title = "标题"}) => {
  return (
    <div className={styles.generalHead}>
      <p className={styles.headerImg}>
        <img src={headerLeftIcon} alt="图标"/>
      </p>
      <p className={styles.title}>{title}</p>
      {
        showIcon
        &&
        <p className={styles.more}>
          <Link to={url} target="_blank" rel="noopener noreferrer"><img src={more} alt="更多"/></Link>
        </p>
      }
    
    </div>
  )
}


GeneralHead.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  showIcon: PropTypes.bool
};
export default GeneralHead;
