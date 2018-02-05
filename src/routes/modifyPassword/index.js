import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './index.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmModifyPassword from './components/tmModifyPassword'

const ModifyPassword = ({ app, modifyPassword, dispatch, loading }) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({ type: 'app/loginOut', payload: modifyPassword.token });
    },
    loading: loading.effects[ 'app/getUserInformation' ]
  }
  const tmModifyPasswordProps = {
    updatePwd: (values) => {
      const { newPwd, oldPwd } = values;
      const pwdParams = { newPwd, oldPwd };
      let sendParams = { ...pwdParams, ...modifyPassword.token };
      dispatch({ type: 'modifyPassword/updatePwd', payload: sendParams })
    }
  }
  return (
    <div className={ styles.noticeList }>
      <div className={ cs([ "container_24" ]) }>
        <div className="grid_7">
          <UserInformation { ...userInforProps }></UserInformation>
        </div>
        <div className="grid_17">
          <TmModifyPassword { ...tmModifyPasswordProps }></TmModifyPassword>
        </div>
      </div>
    </div>
  );
};
ModifyPassword.propTypes = {
  app: PropTypes.object.isRequired,
  modifyPassword: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ app, modifyPassword, loading }) => ({ app, modifyPassword, loading }))(ModifyPassword);
