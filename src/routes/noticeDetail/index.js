/**
 * 通知内容
 */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './index.less';
import TmNoticeDetail from './components/tmNoticeDetail'

const NoticeDetail = ({ noticeDetail, dispatch, loading }) => {
  const noticeDetailProps = {
    noticeDetailData: noticeDetail.noticeDetailData,
    favoriteAdd: function (mainId, type, title, remark) {
      dispatch({
        type: 'noticeDetail/favoriteAdd',
        payload: { mainId, type, title, remark }
      })
    },
    favoriteDelete: function (id) {
      dispatch({
        type: 'noticeDetail/favoriteDelete',
        payload: { id }
      })
    },
    loading: loading.effects[ 'noticeDetail/getNoticeDetail' ],
    breadcrumbItem: noticeDetail.breadcrumbItem,
  }
  return (
    <div className={ styles.noticeDetail }>
      <div className={ cs([ "container_24" ]) }>
        <TmNoticeDetail { ...noticeDetailProps }></TmNoticeDetail>
      </div>
    </div>
  );
};
NoticeDetail.propTypes = {
  noticeDetail: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ noticeDetail, loading }) => ({ noticeDetail, loading }))(NoticeDetail);
