/**
 * 班级详情
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './classDetail.less';
import TmClassDetail from './components/tmClassDetail'

const ClassDetail = ({classDetail, dispatch, loading}) => {
  const classDetailProps ={
    detailData:classDetail.classDetailData,
    loading: loading.effects['classDetail/getClassDetail'],
  }
  return (
    <div className={styles.classDetail}>
      <TmClassDetail {...classDetailProps}></TmClassDetail>
    </div>
  );
};
ClassDetail.propTypes = {
  classDetail: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({classDetail, loading}) => ({classDetail, loading}))(ClassDetail);
