/**
 * 课程详情
 */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './index.less';
import TmCourseDetail from './components/tmCourseDetail'
import TmCourseComment from './components/tmCourseComment'
import TmRelatedCourse from './components/tmRelatedCourse'

const CourseDetail = ({ courseDetail, dispatch, loading }) => {
  const courseDetailProps = {
    courseDetailData: courseDetail.courseContent,
    courseNode: courseDetail.courseNode,
    loading: loading.effects[ 'courseDetail/getCourseContent' ],
    favoriteAdd: (mainId, type, title, remark) => {
      dispatch({
        type: 'courseDetail/favoriteAdd',
        payload: { mainId, type, title, remark }
      })
    },
    favoriteDelete: (id) => {
      dispatch({
        type: 'courseDetail/favoriteDelete',
        payload: { id }
      })
    },
    selectCourse: (checkValue) => {
      dispatch({
        type: 'courseDetail/addStudyCourse',
        payload: { checkValue }
      })
    }
  }
  const courseCommentProps = {
    courseComment: courseDetail.courseComment,
    pageConfig: courseDetail.pageConfig,
    pageChange: (page) => {
      let params = Object.assign({}, { id: courseDetail.courseComment.CourseId, page })
      dispatch({
        type: 'courseDetail/getCourseComment',
        payload: params
      })
    },
    loading: loading.effects[ 'courseDetail/getCourseComment' ],
  }
  const relatedCourseProps = {
    courseData: courseDetail.relatedCourse,
    loading: loading.effects[ 'courseDetail/getRelatedCourse' ],
  }
  return (
    <div className={ styles.courseDetail }>
      <div className={ cs([ "container_24" ]) }>
        <TmCourseDetail { ...courseDetailProps }></TmCourseDetail>
        <TmCourseComment { ...courseCommentProps }></TmCourseComment>
        <TmRelatedCourse { ...relatedCourseProps }></TmRelatedCourse>
      </div>
    </div>
  );
};
CourseDetail.propTypes = {
  courseDetail: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ courseDetail, loading }) => ({ courseDetail, loading }))(CourseDetail);
