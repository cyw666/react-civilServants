/**
 * 文章详情
 */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './index.less';
import TmNoticeDetail from '../noticeDetail/components/tmNoticeDetail'

const ArticleDetail = ({ articleDetail, dispatch, loading }) => {
  const noticeDetailProps = {
    noticeDetailData: articleDetail.articleDetailData,
    favoriteAdd: function (mainId, type, title, remark) {
      dispatch({
        type: 'articleDetail/favoriteAdd',
        payload: { mainId, type, title, remark }
      })
    },
    favoriteDelete: function (id) {
      dispatch({
        type: 'articleDetail/favoriteDelete',
        payload: { id }
      })
    },
    loading: false,
    breadcrumbItem: articleDetail.breadcrumbItem,
  }
  return (
    <div className={ styles.articleDetail }>
      <div className={ cs([ "container_24" ]) }>
        <TmNoticeDetail { ...noticeDetailProps }></TmNoticeDetail>
      </div>
    </div>
  );
};
ArticleDetail.propTypes = {
  articleDetail: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ articleDetail, loading }) => ({ articleDetail, loading }))(ArticleDetail);
