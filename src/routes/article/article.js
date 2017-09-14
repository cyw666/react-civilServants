/**
 * 考试中心
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './article.less';
import TmArticleCategory from './components/tmArticleCategory'
import HotArticle from './components/tmHotArticle'
import TmNoticeList from '../noticeList/components/tmNoticeList'
const Article = ({article, dispatch, loading}) => {
  const articleCategoryProps = {
    loading: loading.effects['article/getArticleCategory'],
    searchArticle: (options) => {
      let params = Object.assign({}, article.articleParams, options)
      dispatch({
        type: 'article/getArticleList',
        payload: params
      });
    },
    dataList: article.articleCategory,
  }
  const hotArticleProps = {
    loading: loading.effects['article/getHotArticle'],
    hotArticleData: article.hotArticle
  }
  const noticeListProps = {
    noticeListData: article.articleListData,
    inputSearch: (options) => {
      let params = Object.assign({}, article.articleParams, options)
      dispatch({
        type: 'article/getArticleList',
        payload: params
      });
    },
    pageConfig: article.pageConfig,
    loading: loading.effects['article/getArticleList'],
    linkUrl: 'articleDetail',
  }
  return (
    <div className={styles.testCenter}>
      <div className={cs(["container_24"])}>
        <div className="grid_6">
          <TmArticleCategory {...articleCategoryProps}></TmArticleCategory>
          <HotArticle {...hotArticleProps}></HotArticle>
        </div>
        <div className="grid_18">
          <TmNoticeList {...noticeListProps}></TmNoticeList>
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

export default connect(({article, loading}) => ({article, loading}))(Article);
