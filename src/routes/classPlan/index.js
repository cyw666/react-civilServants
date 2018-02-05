/*
* 教学计划
* */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Link } from 'dva/router'
import { Breadcrumb, Icon } from 'antd'
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import styles from './index.less';

const ClassPlan = ({ classPlan, dispatch, loading }) => {
  const { classId, classPlanData } = classPlan;
  return (
    <div className={ styles.classPlan }>
      <GeneralHead showIcon={ false } title={ '教学计划' }></GeneralHead>
      <div className={ styles.innerContent }>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={ { fontSize: 16, color: '#656565' } }/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/main/trainingClass">培训班</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={ {
            pathname: '/main/grade/classDetail', search: `?id=${ classId }`
          } }>{ classPlanData.TrainingName }</Link></Breadcrumb.Item>
          <Breadcrumb.Item>教学计划</Breadcrumb.Item>
        </Breadcrumb>
        <div className={ styles.borderBold }>
          <h2 className="commonTitle">{ classPlanData.TrainingName }</h2>
          <div className={ styles.teachingPlan }
               dangerouslySetInnerHTML={ { __html: classPlanData.TeachingPlan } }></div>
        </div>
      </div>
    </div>
  );
};
ClassPlan.propTypes = {
  classPlan: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ classPlan, loading }) => ({ classPlan, loading }))(ClassPlan);
