/**
 * 课程评论
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Pagination, Spin} from 'antd';
import styles from './tmCourseComment.less'
import {dateFilter} from '../../../utils/index'
import userPortrait from '../../../assets/userPortrait.png'
const TmCourseComment = ({
  courseComment,
  loading,
  pageConfig,
  pageChange,
}) => {
  const commentList = courseComment.ListData.map((item, index) => {
    return (
      <tbody key={index}>
      <tr>
        <td className={styles.userImg}><img src={userPortrait} alt="用户头像"/></td>
        <td className={styles.user}>{item.UserName}</td>
        <td className={styles.time}>发表于：{dateFilter(item.CreateDate, 'yyyy-MM-dd hh:mm:ss')}</td>
      </tr>
      <tr>
        <td></td>
        <td className={styles.comment}>{item.Comment}</td>
        <td></td>
      </tr>
      </tbody>
    
    )
  })
  return (
    <div className={styles.tmCourseComment}>
      <div className={styles.commentTitle}>
        课程评论
      </div>
      <Spin spinning={loading}>
        <div className={styles.commentBody}>
          <table className="table">
            {commentList}
          </table>
        </div>
      </Spin>
      <div className="pagination">
        {
          pageConfig.total > 0 ?
            <Pagination showQuickJumper showTotal={total => `共 ${total} 条`} current={pageConfig.current}
                        total={pageConfig.total} pageSize={pageConfig.pageSize} onChange={(page) => {
              pageChange(page)
            }}/>
            :
            <p className="noData">暂无课程评论</p>
        }
      </div>
    </div>
  )
}


TmCourseComment.propTypes = {
  courseComment: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  pageConfig: PropTypes.object,
  pageChange: PropTypes.func,
};
export default TmCourseComment;
