/**
 * 班级导航
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Button, Icon} from 'antd'
import {Link} from 'dva/router'
import styles from './tmClassNav.less'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'

const TmClassNav = () => {
  const navData = [
    {name:"选择课程",url:"/main/courseCenter"},
    {name:"学习统计",url:"/main/testStat"},
    {name:"考试统计",url:"/main/testCenter"},
    {name:"学习计划",url:"/main/studyPlan"},
    {name:"我的收藏",url:"/main/myFavorite"},
    {name:"留言板",url:"/main/messageList"},
    {name:"学员心声",url:"/main/originalArticleList"},
    {name:"学员风采",url:"/main/studentStyle"},
    {name:"问卷调查",url:"/main/pollList"},
    {name:"必装软件",url:"/main/software"},
    {name:"排行榜",url:"/main/rankList"},
    {name:"专题学习",url:"/main/specialLearning"},
    {name:"成果展示",url:"/main/resultShow"},
    {name:"新闻中心",url:"/main/article"},
  ]
  return (
    <div className={styles.tmClassNav}>
      <GeneralHead showIcon={false} title={'班级导航'}></GeneralHead>
      <ul className={styles.categoryGuide}>
        <li><Button type="primary"><Link to={}>选择课程</Link></Button></li>
      </ul>
    </div>
  )
}

TmClassNav.propTypes = {};
export default TmClassNav;
