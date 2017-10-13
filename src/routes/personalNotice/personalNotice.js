/*
 * 个人通知
 * */

import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './personalNotice.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmPersonalNotice from './components/tmPersonalNotice'

const PersonalNotice = ({app, personalNotice, dispatch, loading}) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({type: 'app/loginOut', payload: personalNotice.token});
    },
    loading: loading.effects['app/getUserInformation']
  }
  const personalNoticeProps = {
    noticeListData: personalNotice.noticeListData,
    noticeParams: personalNotice.noticeParams,
    inputSearch: (options) => {
      let params = Object.assign({}, personalNotice.noticeParams, options)
      dispatch({
        type: 'personalNotice/getNoticeList',
        payload: params
      });
    },
    pageConfig: personalNotice.pageConfig,
    loading: loading.effects['personalNotice/getNoticeList'],
    linkUrl: '/noticeDetail',
  }
  return (
    <div className={styles.noticeList}>
      <div className={cs(["container_24"])}>
        <div className="grid_7">
          <UserInformation {...userInforProps}></UserInformation>
        </div>
        <div className="grid_17">
          <TmPersonalNotice {...personalNoticeProps}></TmPersonalNotice>
        </div>
      </div>
    </div>
  );
};
PersonalNotice.propTypes = {
  app: PropTypes.object.isRequired,
  personalNotice: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({app, personalNotice, loading}) => ({app, personalNotice, loading}))(PersonalNotice);
