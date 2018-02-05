/**
 * 导航条
 */
import React from 'react'
import { NavLink } from 'dva/router'
import styles from './NavBar.less'

const NavBar = () => {
  return (
    <div className={ styles.navBar }>
      <div className="container_24">
        <ul className={ styles.navTabs }>
          <li><NavLink to='/' exact activeClassName={ styles.active }>首页</NavLink></li>
          <li><NavLink to='/main/noticeList' activeClassName={ styles.active }>通知公告</NavLink></li>
          <li><NavLink to='/main/trainingClass' activeClassName={ styles.active }>班级园地</NavLink></li>
          <li><NavLink to='/main/courseCenter' activeClassName={ styles.active }>课程中心</NavLink></li>
          <li><NavLink to='/main/personalCenter' activeClassName={ styles.active }>个人中心</NavLink></li>
          <li><NavLink to='/main/testCenter' activeClassName={ styles.active }>在线考试</NavLink></li>
          <li><NavLink to={ { pathname: '/main/article', search: `?code=onlineHelp&name=在线帮助` } }
                       activeClassName={ styles.active }>在线帮助</NavLink></li>
        </ul>
      </div>
    </div>
  )
}


NavBar.propTypes = {};
export default NavBar;
