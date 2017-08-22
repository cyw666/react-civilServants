/**
 * 通知内容
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './noticeDetail.less';
import TmNoticeDetail from './components/tmNoticeDetail'

const NoticeDetail = ({noticeDetail, dispatch, loading,params}) => {
  const noticeDetailProps = {
    noticeDetailData:noticeDetail.noticeDetailData
  }
  return (
    <div className={styles.noticeDetail}>
      <div className={cs(["container_24"])}>
        <TmNoticeDetail {...noticeDetailProps}></TmNoticeDetail>
      </div>
    </div>
  );
};
NoticeDetail.propTypes = {
  noticeDetail: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({noticeDetail, loading}) => ({noticeDetail, loading}))(NoticeDetail);
