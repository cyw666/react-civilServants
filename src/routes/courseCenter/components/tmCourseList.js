/**
 * 课程列表
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmCourseList.less'
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import CourseOrder from '../../../components/courseOrder/CourseOrder'
import Img from '../../../components/Img/Img'
import notCourse from '../../../assets/notCourse.png'
import sfp from '../../../assets/sfp.png'
import dsp from '../../../assets/dsp.png'
import dh from '../../../assets/dh.png'
import {dateFilter} from '../../../utils/index'
import {Button, Breadcrumb, Icon, Input, Checkbox, Row, Col, Pagination} from 'antd';
const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

const TmCourseList = ({
  courseList,
  channelName,
  baseImageCourse,
  checkedList,
  checkAll,
  onSearchCourse,
  courseOptions,
  onCheckAllChange,
  onCheckChange,
  pageConfig,
  onAddStudyCourse,
}) => {
  
  const courseListContent = courseList.map((item, index) => {
    return (
      <tr key={index}>
        <td className={styles.courseImgs}>
          <Link to={{pathname: 'courseDetail', query: {id: item.Id}}} target='_blank'>
            <Img src={baseImageCourse + '/' + item.Img} errSrc={notCourse} alt={item.Name}/>
          </Link>
        </td>
        <td className={styles.desc}>
          <Link to={{pathname: 'courseDetail', query: {id: item.Id}}} target='_blank'>
            <p className={styles.title} title={item.Name}>{item.Name}</p>
          </Link>
          <p>
            <span>学时：{item.Credit}</span>
            <span>主讲人：{item.Teacher}</span>
            <span>点击量：{item.ClickCount}</span>
          </p>
          <p>
            <span>评论：({item.CommentCount})</span>
            <span>试卷：{item.Exam == 0 ? '无' : item.Exam}</span>
            <span>选课状态：<span className="red">{item.Learning >= 0 ? "已选课" : "未选课"}</span></span>
          </p>
        </td>
        <td className={styles.playRight}>
          <p className={styles.time}>上线日期：{dateFilter(item.CreateDate, 'yyyy-MM-dd')}</p>
          <p className={styles.play}><Button type={'primary'}><Link
            to={{pathname: 'courseDetail', query: {id: item.Id}}} target='_blank'>点击播放</Link></Button></p>
        </td>
      </tr>
    )
  })
  const titleBarItem = [
    {name: '课程名称', sort: 'Name'},
    {name: '评论', sort: 'CommentCount'},
    {name: '学时', sort: 'Credit'},
    {name: '点击量', sort: 'ClickCount'},
    {name: '上线时间', sort: 'CreateDate'},
  ];
  
  const searchList = titleBarItem.map((item, index) => {
    return (
      <CourseOrder.Item key={item.sort} name={item.name}></CourseOrder.Item>
    )
  })
  const searchType = (courseType) => {
    onSearchCourse({page: 1, courseType, sort: 'sort', order: 'desc'})
  }
  return (
    <div className={styles.tmCourseList}>
      <GeneralHead showIcon={false} title={'课程中心'}></GeneralHead>
      
      <div className={styles.courseBorder}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><Link to={`/indexPage`}>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={`/courseCenter`}>课程中心</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{channelName}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="searchText">
          <Search
            placeholder="请输入要搜索的课程"
            style={{width: '75%'}}
            onSearch={value => {
              onSearchCourse({title: value, page: 1})
            }}
          />
        </div>
        <div className={styles.sortCourse}>
          <div className={styles.tag}>
            <span><img src={sfp}/><a onClick={() => {
              searchType('ThreeScreenCourse')
            }}> 精品三分屏</a></span>
            <span><img src={dsp}/><a onClick={() => {
              searchType('SingleCourse')
            }}> 单视频课件</a></span>
            <span><img src={dh}/><a onClick={() => {
              searchType('AnimationCourse')
            }}> 动画类课件</a></span>
          </div>
          <div className={styles.titleBar}>
            <CourseOrder onChange={(activeKey, order, sort) => {
              onSearchCourse({page: 1, sort, order})
            }}>
              {searchList}
            </CourseOrder>
          </div>
        </div>
        <div className={styles.courseContent}>
          <Row>
            <Col span={1}>
              <CheckboxGroup options={courseOptions} value={checkedList} onChange={onCheckChange}/>
            </Col>
            <Col span={23}>
              <table className="table">
                <tbody>
                {courseListContent}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Checkbox defaultChecked={false} onChange={onCheckAllChange} checked={checkAll}>全选/反选</Checkbox>
              <Button onClick={() => {
                onAddStudyCourse(checkedList)
              }}>批量选课</Button>
              <Pagination showQuickJumper defaultCurrent={1} current={pageConfig.current} pageSize={pageConfig.pageSize}
                          total={pageConfig.total} onChange={(currentPage) => {
                onSearchCourse({page: currentPage})
              }} showTotal={(total) => {
                return `共${total}条`
              }}/>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}


TmCourseList.propTypes = {
  courseList: PropTypes.array,
  channelName: PropTypes.string,
  baseImageCourse: PropTypes.string,
  checkedList: PropTypes.array,
  checkAll: PropTypes.bool,
  courseOptions: PropTypes.array,
  onCheckAllChange: PropTypes.func,
  onCheckChange: PropTypes.func,
  onSearchCourse: PropTypes.func,
  pageConfig: PropTypes.object,
  onAddStudyCourse: PropTypes.func,
};
export default TmCourseList;
