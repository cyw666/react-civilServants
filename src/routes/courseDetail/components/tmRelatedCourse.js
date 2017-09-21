/**
 * 相关课程模块
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Spin} from 'antd'
import {Link} from 'dva/router'
import styles from './tmRelatedCourse.less'
import Img from '../../../components/Img/Img'
import notCourse from '../../../assets/notCourse.png'
const TmRelatedCourse = ({courseData, loading}) => {
  // debugger
  const baseImg = courseData.ImageCourse;
  const relatedCourseList = courseData.ListData && courseData.ListData.map((item, index) => {
      return (
        <li key={index}>
          <Link to={{pathname: '/courseDetail', query: {id: item.Id}}} title={item.Name} target="_blank"
                rel="noopener noreferrer">
            <Img src={`${baseImg}/${item.Img}`} alt="相关课程" errSrc={notCourse}/>
          </Link>
          <div className={styles.desc}>
            <p>
              <Link
                to={{pathname: '/courseDetail', query: {id: item.Id}}}
                title={item.Name}
                target="_blank"
                rel="noopener noreferrer">
                {item.Name}
              </Link>
            </p>
            <p><span>讲师：{item.Teacher}</span><span className="red">学分：{item.Credit}分</span></p>
            <p>时长：{item.Time}小时</p>
          </div>
        </li>
      )
    })
  return (
    <div className={styles.tmRelatedCourse}>
      <div className={styles.title}>相关课程</div>
      <Spin spinning={loading}>
        <ul>
          {
            courseData.ListData.length > 0 ? relatedCourseList :
              <p className="noData">暂无相关课程</p>
          }
        </ul>
      </Spin>
    </div>
  )
}


TmRelatedCourse.propTypes = {
  courseData: PropTypes.object,
  loading: PropTypes.bool,
};
export default TmRelatedCourse;
