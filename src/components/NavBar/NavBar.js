/**
 * 导航条
 */
import React from 'react'
import styles from './NavBar.less'
import { Link } from 'dva/router'
const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className="container_24">
        <ul className={styles.navTabs}>
          <li><Link to='/indexPage' activeClassName={styles.active}>首页</Link></li>
          <li><Link to='/noticeList' activeClassName={styles.active}>通知公告</Link></li>
          <li><Link to='/trainingClass' activeClassName={styles.active}>班级园地</Link></li>
          <li><Link to='/courseCenter' activeClassName={styles.active}>课程中心</Link></li>
          <li><Link to='/personalCenter' activeClassName={styles.active}>个人中心</Link></li>
          <li><Link to='/testCenter' activeClassName={styles.active}>在线考试</Link></li>
          <li><Link to='/indexPage' activeClassName={styles.active}>在线帮助</Link></li>
        </ul>
      </div>
    </div>
  )
}


NavBar.propTypes = {
  
};
export default NavBar;
