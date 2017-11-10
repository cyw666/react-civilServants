/**
 * 通知公告（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import {Link} from 'dva/router'
import {Breadcrumb, Icon, Spin, Rate, Progress} from 'antd';
import styles from './tmCourseDetail.less'

const TmCourseDetail = ({
  courseDetailData,
  courseNode,
  favoriteAdd,
  favoriteDelete,
  selectCourse,
  loading,
}) => {
  const nodeList = courseNode.map((item, index) => {
    return (
      <li key={index}>
        <span className={styles.number}>{item.Code}</span>
        <span className={styles.name}>{item.Name} </span>
        {
          item.IsFinish ? <Icon type="check" style={{fontSize: 18, color: '#13cb00', fontWeight: 600}}/> :
            <Icon type="close" style={{fontSize: 18, color: '#c5c5c5', fontWeight: 600}}/>
        }
      </li>
    )
  })
  return (
    <div className={styles.tmCourseDetail}>
      <Breadcrumb>
        <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/main/indexPage">首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/main/courseCenter">课程中心</Link></Breadcrumb.Item>
        <Breadcrumb.Item>课程详情</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.title}>课程详情</div>
      <Spin spinning={loading}>
        <div className={styles.courseContent}>
          <table className={cs(['table', 'table-bordered'])}>
            <tbody>
            <tr>
              <td className={styles.list1}>课程名称：</td>
              <td className={styles.list2}>{courseDetailData.Name} &nbsp; &nbsp;
                {
                  courseDetailData.FavoriteId ?
                    <a className={styles.red} onClick={() => {
                      favoriteDelete(courseDetailData.FavoriteId)
                    }}><Icon type="heart"/> &nbsp;取消收藏</a> :
                    <a className={styles.red} onClick={() => {
                      favoriteAdd(courseDetailData.Id, 'Course', courseDetailData.Name, 0)
                    }}><Icon type="heart"/> &nbsp;收藏</a>
                }
              </td>
              <td className={styles.list3}>学员评分：</td>
              <td className={styles.list4}>
              <span>
                <Rate allowHalf disabled value={courseDetailData.StudentGrade}/>
                <span className="ant-rate-text">{courseDetailData.StudentGrade}</span>
              </span>
              </td>
            </tr>
            <tr>
              <td className={styles.list1}>
                <span>课程分类：</span>
              </td>
              <td className={styles.list2}>
                <Link to={{pathname: '/main/courseCenter', query: {channelId: courseDetailData.ChannelId}}} target="_blank" rel="noopener noreferrer">{courseDetailData.ChannelName}</Link>
              </td>
              <td className={styles.list3}>学员评论：</td>
              <td className={styles.list4}><span>已有<span>{courseDetailData.Count || 0}</span>条评论</span></td>
            </tr>
            <tr>
              <td className={styles.list1}>课程教师：</td>
              <td className={styles.list2}>{courseDetailData.Teacher}</td>
              <td className={styles.list3}>课程学时：</td>
              <td className={styles.list4}>{courseDetailData.Credit}</td>
            </tr>
            <tr>
              <td className={styles.list1}>时长：</td>
              <td className={styles.list2}>{courseDetailData.Duration}</td>
              <td className={styles.list3}>参加测试：</td>
              <td className={styles.list4}>
                {
                  courseDetailData.ExamId != 0 ? <a>参加测试</a> : <span>无</span>
                }
              </td>
            </tr>
            <tr>
              <td className={styles.list1}>进度：</td>
              <td className={styles.list2}><Progress percent={courseDetailData.BrowseScore} status="active"/></td>
              <td className={styles.list3}>播放：</td>
              <td className={styles.list4}>
                {
                  courseDetailData.BrowseScore >= 0 ?
                    <Link to={{pathname: "/play", query: {courseId: courseDetailData.Id}}} target="_blank" rel="noopener noreferrer" className={styles.red}>
                      <Icon type="play-circle"/> &nbsp;<span>点击播放</span>
                    </Link> :
                    <a onClick={() => {
                      selectCourse(courseDetailData.Id)
                    }} className={styles.red}>
                      <Icon type="play-circle"/> &nbsp;<span>选课并播放</span>
                    </a>
                }
              </td>
            </tr>
            <tr>
              <td className={styles.list1}>课程简介：</td>
              <td className={styles.list5} colSpan="3">{courseDetailData.Description || '暂无简介'}</td>
            </tr>
            <tr>
              <td className={styles.list1}>课程节点:</td>
              <td className={styles.list5} colSpan="3">
                {
                  courseNode.length == 0 ? <p>
                      未学时间点：<span>{courseDetailData.Remainder}</span> 分钟
                    </p> :
                    <div>
                      <p className={styles.nodeTitle}><span>节点编号</span><span>节点名称</span><span>（注：<Icon type="check"
                                                                                                       style={{
                                                                                                         fontSize: 18,
                                                                                                         color: '#13cb00',
                                                                                                         fontWeight: 600
                                                                                                       }}/>为已学 <Icon
                        type="close" style={{fontSize: 18, color: '#c5c5c5', fontWeight: 600}}/>为未学）</span>
                      </p>
                      <ul className={styles.NodeContent}>
                        {nodeList}
                      </ul>
                    </div>
                }
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </Spin>
    </div>
  )
}


TmCourseDetail.propTypes = {
  courseDetailData: PropTypes.object,
  courseNode: PropTypes.array,
  loading: PropTypes.bool,
  favoriteAdd: PropTypes.func,
  favoriteDelete: PropTypes.func,
  selectCourse: PropTypes.func,
};
export default TmCourseDetail;
