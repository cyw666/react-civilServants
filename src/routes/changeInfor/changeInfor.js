import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './changeInfor.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmChangeInfor from './components/tmChangeInfor'

const ChangeInfor = ({app, changeInfor, dispatch, loading}) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({type: 'app/loginOut', payload: changeInfor.token});
    },
    loading: loading.effects['app/getUserInformation']
  }
  const tmChangeInforProps = {
    userInfo:changeInfor.userInfo,
    gradeList:changeInfor.gradeList,
    submit:(values)=>{
      const infoParams = {...values,...changeInfor.token};
      dispatch({type:'changeInfor/updateUserInfo',payload:infoParams})
    }
  }
  return (
    <div className={styles.noticeList}>
      <div className={cs(["container_24"])}>
        <div className="grid_7">
          <UserInformation {...userInforProps}></UserInformation>
        </div>
        <div className="grid_17">
          <TmChangeInfor {...tmChangeInforProps}></TmChangeInfor>
        </div>
      </div>
    </div>
  );
};
ChangeInfor.propTypes = {
  app: PropTypes.object.isRequired,
  changeInfor: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({app, changeInfor, loading}) => ({app, changeInfor, loading}))(ChangeInfor);
