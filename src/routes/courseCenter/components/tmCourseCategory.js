/**
 * 课程分类
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmCourseCategory.less'
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import { Menu} from 'antd';

const SubMenu = Menu.SubMenu;
const TmCourseCategory = ({courseCategory, searchCourse}) => {
 
  const panelList = courseCategory['ListData'].map((item, index) => {
    if (item.Nodes.length>0) {
      return (
        <SubMenu title={item.Name} key={item.Id} onTitleClick={()=>{searchCourse({channelId:item.Id,page:1,teacher:'',courseType:'All',title:''})}}>
          {
            item.Nodes && item.Nodes.map((node, index2) => {
              return (
                <Menu.Item key={node.Id}><a onClick={()=>{searchCourse({channelId:node.Id,page:1,teacher:'',courseType:'All',title:''})}} className={styles.node}>{node.Name}</a></Menu.Item>
              )
            })
          }
        </SubMenu >
      )
    } else {
      return (
        <Menu.Item key={item.Id}><a onClick={()=>{searchCourse({channelId:item.Id,page:1,teacher:'',courseType:'All',title:''})}} className={styles.node}>{item.Name}</a></Menu.Item>
      )
    }
  });
  return (
    <div className={styles.tmCourseCategory}>
      <GeneralHead showIcon={false} title={courseCategory.TitleNav}></GeneralHead>
      <Menu mode="inline">
        <Menu.Item><a onClick={()=>{searchCourse({channelId:'',page:1,teacher:'',courseType:'All',title:''})}} className={styles.node}>全部课程</a></Menu.Item>
        {panelList}
      </Menu>
    </div>
  )
}


TmCourseCategory.propTypes = {
  courseCategory: PropTypes.object,
  searchCourse: PropTypes.func
};
export default TmCourseCategory;
