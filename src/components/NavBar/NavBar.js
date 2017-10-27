/**
 * 导航条
 */
import React from 'react'
import {Link} from 'dva/router'
import styles from './NavBar.less'
const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className="container_24">
        <ul className={styles.navTabs}>
          <li><Link to='/main/indexPage' activeClassName={styles.active}>首页</Link></li>
          <li><Link to='/main/noticeList' activeClassName={styles.active}>通知公告</Link></li>
          <li><Link to='/main/trainingClass' activeClassName={styles.active}>班级园地</Link></li>
          <li><Link to='/main/courseCenter' activeClassName={styles.active}>课程中心</Link></li>
          <li><Link to='/main/personalCenter' activeClassName={styles.active}>个人中心</Link></li>
          <li><Link to='/main/testCenter' activeClassName={styles.active}>在线考试</Link></li>
          <li><Link to={{pathname: '/main/article', query: {code: 'onlineHelp', name: '在线帮助'}}} activeClassName={styles.active}>在线帮助</Link></li>
        </ul>
      </div>
    </div>
  )
}


NavBar.propTypes = {};
export default NavBar;
