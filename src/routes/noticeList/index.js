import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './index.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmNoticeList from './components/tmNoticeList'

const NoticeList = ({ app, noticeList, dispatch, loading }) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({ type: 'app/loginOut', payload: noticeList.token });
    },
    loading: loading.effects[ 'app/getUserInformation' ]
  }
  const noticeListProps = {
    noticeListData: noticeList.noticeListData,
    noticeParams: noticeList.noticeParams,
    inputSearch: (options) => {
      let params = Object.assign({}, noticeList.noticeParams, options)
      dispatch({
        type: 'noticeList/getNoticeList',
        payload: params
      });
    },
    pageConfig: noticeList.pageConfig,
    loading: loading.effects[ 'noticeList/getNoticeList' ],
    linkUrl: '/main/noticeDetail',
  }
  return (
    <div className={ styles.noticeList }>
      <div className={ cs([ "container_24" ]) }>
        <div className="grid_7">
          <UserInformation { ...userInforProps }></UserInformation>
        </div>
        <div className="grid_17">
          <TmNoticeList { ...noticeListProps }></TmNoticeList>
        </div>
      </div>
    </div>
  );
};
NoticeList.propTypes = {
  app: PropTypes.object.isRequired,
  noticeList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ app, noticeList, loading }) => ({ app, noticeList, loading }))(NoticeList);
