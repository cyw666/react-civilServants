/**
 * 培训班
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './trainingClass.less';
import ClassModule from './components/classModule'
import TmTrainingClass from './components/tmTrainingClass'
import ClassDetailModal from './components/classDetailModal'
import TmCategory from '../../components/tmCategory/tmCategory'

const TrainingClass = ({trainingClass, dispatch, loading}) => {
  const categoryProps = {
    treeData: trainingClass.classCategory,
    searchData: (id) => {
      let params = Object.assign({}, {type: 'just'}, {categoryId: id, page: 1, title: '', sort: 'Sort', order: 'Desc'});
      dispatch({
        type: 'trainingClass/getClassList',
        payload: params
      })
    },
    updateExpandedKeys: (keys) => {
      dispatch({
        type: 'trainingClass/updateState',
        payload: {expandedKeys: keys}
      })
    },
    expandedKeys: trainingClass.expandedKeys
  }
  const tmTrainingClassProps = {
    classListData: trainingClass.classListData,
    classType: trainingClass.classType,
    checkUserClass: (trainingId) => {
      dispatch({
        type: 'trainingClass/checkUserClass',
        payload: {trainingId}
      })
    },
    joinClass: (id) => {
      dispatch({
        type: 'trainingClass/updateTrainingStudentup',
        payload: {id}
      })
    },
    delClass: (id) => {
      dispatch({
        type: 'trainingClass/updateTrainingStudentdown',
        payload: {id}
      })
    },
    getClass: (type) => {
      dispatch({
        type: 'trainingClass/getClassList',
        payload: {rows: 10, type, categoryId: trainingClass.categoryId}
      })
    },
    seeClassDetail: (id) => {
      dispatch({
        type: 'trainingClass/seeClassDetail',
        payload: {id, more: false}
      })
    },
    loading: loading.effects['trainingClass/getClassList']
  }
  const classDetailModalProps = {
    closeModal: () => {
      dispatch({
        type: 'trainingClass/updateState',
        payload: {showModal: false}
      })
    },
    showModal: trainingClass.showModal,
    data: trainingClass.classDetailData,
  }
  return (
    <div className={styles.trainingClass}>
      <div className={cs(["container_24"])}>
        <div className="grid_6">
          <TmCategory {...categoryProps}></TmCategory>
          <ClassModule classModuleData={trainingClass.classMyData}
                       loading={loading.effects['trainingClass/classMy']}></ClassModule>
          <ClassModule classModuleData={trainingClass.classActiveData}
                       loading={loading.effects['trainingClass/classActive']}></ClassModule>
          <ClassModule classModuleData={trainingClass.classRecentData}
                       loading={loading.effects['trainingClass/classRecent']}></ClassModule>
        </div>
        <div className="grid_18">
          <TmTrainingClass {...tmTrainingClassProps}></TmTrainingClass>
          <ClassDetailModal {...classDetailModalProps}></ClassDetailModal>
        </div>
      </div>
    </div>
  );
};
TrainingClass.propTypes = {
  trainingClass: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({trainingClass, loading}) => ({trainingClass, loading}))(TrainingClass);
