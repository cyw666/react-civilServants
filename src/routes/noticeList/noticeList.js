import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './noticeList.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmNoticeList from './components/tmNoticeList'

const NoticeList = ({noticeList, dispatch, loading}) => {
  const userInforProps = {
    information: noticeList.userInformation,
    loginOut: ()=>{
      dispatch({type: 'noticeList/loginOut', payload: noticeList.token});
    },
    loading: loading.effects['noticeList/getUserInformation']
  }
  const noticeListProps = {
    noticeListData: noticeList.noticeListData,
    searchNotice: (params)=>{
      dispatch({
        type:'noticeList/getNoticeList',
        payload: params
      });
    }
  }
  return (
    <div className={styles.noticeList}>
      <div className={cs(["container_24"])}>
        <div className="grid_7">
          <UserInformation {...userInforProps}></UserInformation>
        </div>
        <div className="grid_17">
          <TmNoticeList {...noticeListProps}></TmNoticeList>
        </div>
      </div>
    </div>
  );
};
NoticeList.propTypes = {
  noticeList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({noticeList, loading}) => ({noticeList, loading}))(NoticeList);
