/**
 * 班级详情
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './classDetail.less';
// import ClassDetailModal from './components/classDetailModal'
import TmLearningInfo from './components/tmLearningInfo'
import TmNavCenter from '../../components/tmNavCenter/tmNavCenter'
import ClassModule from '../trainingClass/components/classModule'

const ClassDetail = ({classDetail, dispatch, loading}) => {
  const learningInfoProps = {
    infoData:classDetail.classInfoData,
    loading:loading.effects['classDetail/getClassInfo'],
  }
  const navCenterProps = {
    title:"班级导航",
    navData:classDetail.navData,
  }
  return (
    <div className={styles.classDetail}>
      <div className={cs(["container_24"])}>
        <div className="grid_6">
          <TmLearningInfo {...learningInfoProps}></TmLearningInfo>
          <ClassModule classModuleData={classDetail.classMyData} loading={loading.effects['classDetail/classMy']}></ClassModule>
          <TmNavCenter {...navCenterProps}></TmNavCenter>
        </div>
        <div className="grid_18">
        </div>
      </div>
    </div>
  );
};
ClassDetail.propTypes = {
  classDetail: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({classDetail, loading}) => ({classDetail, loading}))(ClassDetail);
