/**
 * 课程中心
 */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './index.less';
import { TmCourseList, TmCourseRankingList } from './components/index'
import TmCategory from '../../components/tmCategory/tmCategory'

const CourseCenter = ({ courseCenter, dispatch, loading }) => {
  const tmCategoryProps = {
    treeData: courseCenter.courseCategory,
    searchData: (id) => {
      let params = { channelId: id, page: 1, teacher: '', courseType: 'All', title: '' }
      dispatch({
        type: 'courseCenter/getCourseList',
        payload: params
      })
    },
    updateExpandedKeys: (keys) => {
      dispatch({
        type: 'courseCenter/updateExpanderKeys',
        payload: keys
      })
    },
    expandedKeys: courseCenter.expandedKeys
  }
  
  const courseListPrpos = {
    courseList: courseCenter.courseListData,
    loading: loading.effects[ 'courseCenter/getCourseList' ],
    baseImageCourse: courseCenter.baseImageCourse,
    channelName: courseCenter.channelName,
    checkedList: courseCenter.checkedList,
    checkAll: courseCenter.checkAll,
    courseOptions: courseCenter.courseOptions,
    onCheckAllChange: (e) => {
      let checkedAllList = []
      courseCenter.courseOptions.forEach((item) => {
        if (!item.disabled) {
          checkedAllList.push(item.value)
        }
      })
      dispatch({
        type: 'courseCenter/updateState',
        payload: {
          checkedList: e.target.checked ? checkedAllList : [],
          checkAll: e.target.checked,
        }
      })
    },
    onCheckChange: (checkedList) => {
      dispatch({
        type: 'courseCenter/updateState',
        payload: {
          checkedList,
          checkAll: checkedList.length === courseCenter.courseOptions.length,
        }
      })
    },
    pageConfig: courseCenter.pageConfig,
    onSearchCourse: (options) => {
      let params = Object.assign({}, courseCenter.courseListParams, options)
      dispatch({
        type: 'courseCenter/getCourseList',
        payload: params
      })
    },
    onAddStudyCourse: (checkedList) => {
      let params = checkedList.join(',');
      dispatch({
        type: 'courseCenter/addStudyCourse',
        payload: {
          checkValue: params
        }
      })
    },
  }
  return (
    <div className={ styles.courseCenter }>
      <div className={ cs([ "container_24" ]) }>
        <div className="grid_6">
          <TmCategory { ...tmCategoryProps }></TmCategory>
          <TmCourseRankingList rankData={ courseCenter.courseRankData }></TmCourseRankingList>
        </div>
        <div className="grid_18">
          <TmCourseList { ...courseListPrpos }></TmCourseList>
        </div>
      </div>
    </div>
  );
};
CourseCenter.propTypes = {
  courseCenter: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  history: PropTypes.object,
};

export default connect(({ courseCenter, loading }) => ({ courseCenter, loading }))(CourseCenter);
