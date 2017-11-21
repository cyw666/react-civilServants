/**
 * 班级
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './grade.less';
import TmLearningInfo from './components/tmLearningInfo'
import TmNavCenter from '../../components/tmNavCenter/tmNavCenter'
import ClassModule from '../trainingClass/components/classModule'

const Grade = ({children, grade, dispatch, loading}) => {
  const learningInfoProps = {
    infoData: grade.classInfoData,
    loading: loading.effects['classDetail/getClassInfo'],
  }
  const navData = grade.navData.map((item, index) => {
    const query = {...item.query, ...{id: grade.classId}}
    return {name: item.name, pathname: item.pathname, query}
  })
  const navCenterProps = {
    title: "班级导航",
    navData,
  }
  return (
    <div className={styles.classDetail}>
      <div className={cs(["container_24"])}>
        <div className="grid_6">
          <TmLearningInfo {...learningInfoProps}></TmLearningInfo>
          <ClassModule classModuleData={grade.classMyData} loading={loading.effects['grade/classMy']}></ClassModule>
          <TmNavCenter {...navCenterProps}></TmNavCenter>
        </div>
        <div className="grid_18">
          {children}
        </div>
      </div>
    </div>
  );
};
Grade.propTypes = {
  children: PropTypes.element.isRequired,
  grade: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({grade, loading}) => ({grade, loading}))(Grade);
