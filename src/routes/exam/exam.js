/**
 * 考试
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Icon, Spin, Breadcrumb, Pagination} from 'antd';
import {Link} from 'dva/router'
import styles from './exam.less';
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import examTop from '../../assets/exam_top.png'
const Exam = ({exam, dispatch, loading}) => {
  
  return (
    <div className={cs(["container_24"])}>
      <div className="grid_24">
        <div className={styles.examTop}><img src={examTop} alt=""/></div>
      </div>
    </div>
  );
};
Exam.propTypes = {
  exam: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({exam, loading}) => ({exam, loading}))(Exam);
