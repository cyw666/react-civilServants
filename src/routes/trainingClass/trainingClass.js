/**
 * 培训班
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './trainingClass.less';
import TrainingClassCategory from './components/trainingClassCategory'
import ClassModule from './components/classModule'
import TmTrainingClass from './components/tmTrainingClass'
const TrainingClass = ({trainingClass, dispatch, loading}) => {
  const classCategoryProps = {
    classCategory: trainingClass.classCategory,
    searchClass: (options) => {
      let params = Object.assign({}, {type: 'just'}, options);
      dispatch({
        type: 'trainingClass/getClassList',
        payload: params
      })
    },
    loading: loading.effects['trainingClass/getTrainingClassTypeList']
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
    loading: loading.effects['trainingClass/getClassList']
  }
  return (
    <div className={styles.trainingClass}>
      <div className={cs(["container_24"])}>
        <div className="grid_6">
          <TrainingClassCategory {...classCategoryProps}></TrainingClassCategory>
          <ClassModule classModuleData={trainingClass.classMyData}
                       loading={loading.effects['trainingClass/classMy']}></ClassModule>
          <ClassModule classModuleData={trainingClass.classActiveData}
                       loading={loading.effects['trainingClass/classActive']}></ClassModule>
          <ClassModule classModuleData={trainingClass.classRecentData}
                       loading={loading.effects['trainingClass/classRecent']}></ClassModule>
        </div>
        <div className="grid_18">
          <TmTrainingClass {...tmTrainingClassProps}></TmTrainingClass>
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
