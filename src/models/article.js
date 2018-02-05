/**
 * 新闻中心（文章）
 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import model from './common'
import {
  articleList,
  articleCategory,
} from '../services/';

export default modelExtend(model, {
  namespace: 'article',
  state: {
    articleCategory: {
      ListData: []
    },
    expandedKeys: [],
    articleListData: {
      ListData: []
    },
    articleParams: {
      page: 1,
      rows: 15,
      search: ''
    },
    pageConfig: {
      current: 1,
      pageSize: 15,
      total: 0
    },
    hotArticle: {
      ListData: []
    }
  },
  reducers: {
    updateArticleParams(state, { payload }) {
      return {
        ...state,
        articleParams: { ...state.articleParams, ...payload }
      }
    },
  },
  effects: {
    * getArticleList({ payload }, { call, put }) {
      let data = yield call(articleList, payload);
      if (data && data.Status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            articleListData: data.Data,
            pageConfig: {
              current: data.Data.Page,
              pageSize: data.Data.Rows,
              total: data.Data.Count,
            },
          }
        });
        yield put({ type: 'updateArticleParams', payload });
      }
    },
    * getHotArticle({ payload }, { call, put }) {
      let data = yield call(articleList, payload);
      if (data && data.Status === 200) {
        yield put({ type: 'updateState', payload: { hotArticle: data.Data } });
      }
    },
    * getArticleCategory({ payload }, { call, put }) {
      let data = yield call(articleCategory, payload);
      if (data && data.Status === 200) {
        let expandedKeys = [];
        expandedKeys.push((data.Data.ListData[ 0 ].id).toString());
        yield put({
          type: 'updateState',
          payload: {
            articleCategory: data.Data,
            expandedKeys: expandedKeys
          }
        });
      }
    },
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/article") {
          dispatch({ type: 'setTitle', payload: { title: '新闻中心' } });
          let query = queryString.parse(search);
          let categoryCode = query.code;
          let titleNav = query.name || '文章列表';
          if (categoryCode) {
            dispatch({ type: 'getArticleList', payload: { page: 1, rows: 15, categoryCode, search: '', titleNav } });
          } else {
            dispatch({ type: 'getArticleList', payload: { page: 1, rows: 15, search: '', titleNav: '文章列表' } });
          }
        }
      })
      dispatch({ type: 'getHotArticle', payload: { page: 1, rows: 10, sort: 'clickCount', titleNav: '热门文章' } });
      dispatch({ type: 'getArticleCategory' });
    }
  },
});
