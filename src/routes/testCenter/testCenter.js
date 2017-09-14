/**
 * 考试中心
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './testCenter.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmExamList from './components/tmExamList'
const TestCenter = ({app, testCenter, dispatch, loading}) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({type: 'app/loginOut', payload: testCenter.token});
    },
    loading: loading.effects['app/getUserInformation']
  }
  const tmExamListProps = {
    examListData: testCenter.examListData,
    searchExam: (options) => {
      let params = Object.assign({}, testCenter.examParams, options)
      dispatch({type: 'testCenter/getExamList', payload: params})
      let activeKey = params.examType;
      if (activeKey == 'All') {
        activeKey = 'UnFinish'
      }
      dispatch({
        type: 'testCenter/updateState',
        payload: {activeKey}
      })
    },
    selectChange: (examType) => {
      // console.log(examType)
      dispatch({
        type: 'testCenter/updateExamParams',
        payload: {examType}
      })
    },
    joinExam: (parameter1) => {
      dispatch({
        type: 'testCenter/joinExam',
        payload: {parameter1}
      })
    },
    loading: loading.effects['testCenter/getExamList'],
    activeKey: testCenter.activeKey,
    pageConfig: testCenter.pageConfig,
  }
  return (
    <div className={styles.testCenter}>
      <div className={cs(["container_24"])}>
        <div className="grid_7">
          <UserInformation {...userInforProps}></UserInformation>
        </div>
        <div className="grid_17">
          <TmExamList {...tmExamListProps}></TmExamList>
        </div>
      </div>
    </div>
  );
};
TestCenter.propTypes = {
  app: PropTypes.object.isRequired,
  testCenter: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({app, testCenter, loading}) => ({app, testCenter, loading}))(TestCenter);
