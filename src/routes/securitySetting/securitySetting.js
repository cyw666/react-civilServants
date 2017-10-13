/*
 * 设置密保
 * */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './securitySetting.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmSecuritySetting from './components/tmSecuritySetting'
import CheckPwdForm from './components/checkPwdForm'
import SetQuestionForm from './components/setQuestionForm'
const SecuritySetting = ({app, securitySetting, dispatch, loading}) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({type: 'app/loginOut', payload: securitySetting.token});
    },
    loading: loading.effects['app/getUserInformation']
  }
  const checkPwd = (values) => {
    const sendParams = {...values, ...securitySetting.token};
    dispatch({type: 'securitySetting/setPasswordQuestion', payload: sendParams});
  }
  const setQuestionFormProps = {
    setQuestion: (values) => {
      const sendParams = {...values,...securitySetting.token,...securitySetting.pwd};
      dispatch({type: 'securitySetting/addPasswordQuestion', payload: sendParams});
    },
    question: securitySetting.question,
  }
  const tmSecuritySettingProps = {
    current: securitySetting.currentStep,
    children1: <CheckPwdForm checkPwd={checkPwd}></CheckPwdForm>,
    children2: <SetQuestionForm {...setQuestionFormProps}></SetQuestionForm>,
  }
  return (
    <div className={styles.securitySetting}>
      <div className={cs(["container_24"])}>
        <div className="grid_7">
          <UserInformation {...userInforProps}></UserInformation>
        </div>
        <div className="grid_17">
          <TmSecuritySetting {...tmSecuritySettingProps}></TmSecuritySetting>
        </div>
      </div>
    </div>
  );
};
SecuritySetting.propTypes = {
  app: PropTypes.object.isRequired,
  securitySetting: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({app, securitySetting, loading}) => ({app, securitySetting, loading}))(SecuritySetting);
