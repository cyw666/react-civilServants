/**
 * 文章中心
 */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './index.less';
import TmCategory from '../../components/tmCategory/tmCategory'
import HotArticle from './components/tmHotArticle'
import TmNoticeList from '../noticeList/components/tmNoticeList'

const Article = ({ article, dispatch, loading }) => {
  const categoryProps = {
    treeData: article.articleCategory,
    searchData: (id) => {
      let params = Object.assign({}, article.articleParams, { page: 1, search: '', categoryCode: '', categoryId: id })
      dispatch({
        type: 'article/getArticleList',
        payload: params
      })
    },
    updateExpandedKeys: (keys) => {
      dispatch({
        type: 'article/updateState',
        payload: { expandedKeys: keys }
      })
    },
    expandedKeys: article.expandedKeys
  }
  const hotArticleProps = {
    loading: loading.effects[ 'article/getHotArticle' ],
    hotArticleData: article.hotArticle
  }
  const noticeListProps = {
    noticeListData: article.articleListData,
    noticeParams: article.articleParams,
    inputSearch: (options) => {
      let params = Object.assign({}, article.articleParams, options)
      dispatch({
        type: 'article/getArticleList',
        payload: params
      });
    },
    pageConfig: article.pageConfig,
    loading: loading.effects[ 'article/getArticleList' ],
    linkUrl: '/main/articleDetail',
  }
  return (
    <div className={ styles.testCenter }>
      <div className={ cs([ "container_24" ]) }>
        <div className="grid_6">
          <TmCategory { ...categoryProps }></TmCategory>
          <HotArticle { ...hotArticleProps }></HotArticle>
        </div>
        <div className="grid_18">
          <TmNoticeList { ...noticeListProps }></TmNoticeList>
        </div>
      </div>
    </div>
  );
};
Article.propTypes = {
  article: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ article, loading }) => ({ article, loading }))(Article);
