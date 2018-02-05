/**
 * 文章内容
 */
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import queryString from 'query-string'
import model from './common'
import { articleContent, favoriteAdd, favoriteDelete, classArticleDetail } from '../services/';

export default modelExtend(model, {
  namespace: 'articleDetail',
  state: {
    articleDetailData: {
      AttachmentName: "",
      Author: "",
      ClickCount: 0,
      Content: "",
      CreateDate: "",
      Creator: "",
      FavoriteId: '',
      Id: '',
      Img: "",
      Name: "",
      NoticeCategory: null,
      Read: null,
      Source: "",
      Type: "",
      Url: "",
    },
    breadcrumbItem: [
      { url: '/', name: '首页' },
      { url: '/main/article', name: '文章列表' },
      { url: '', name: '文章详情' },
    ]
  },
  reducers: {
    changeFavoriteId(state, { payload }) {
      return {
        ...state,
        articleDetailData: { ...state.articleDetailData, ...payload, },
      }
    }
  }
  ,
  effects: {
    * getArticleDetail({ payload }, { call, put }) {
      let data = yield call(articleContent, payload);
      if (data && data.Status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            articleDetailData: data.Data,
          }
        });
      }
    },
    * getClassArticleDetail({ payload }, { call, put }) {
      let data = yield call(classArticleDetail, payload);
      if (data && data.Status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            articleDetailData: data.Data.Model,
          }
        });
      }
    },
    * favoriteAdd({ payload }, { call, put }) {
      let data = yield call(favoriteAdd, payload);
      if (data.Type === 1) {
        message.success(data.Message);
        yield put({ type: 'changeFavoriteId', payload: { FavoriteId: data.Value } });
      } else {
        message.error('收藏失败！');
      }
    },
    * favoriteDelete({ payload }, { call, put }) {
      let data = yield call(favoriteDelete, payload);
      if (data.Type === 1) {
        message.success(data.Message);
        yield put({ type: 'changeFavoriteId', payload: { FavoriteId: 0 } });
      } else {
        message.error('取消收藏失败！');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/articleDetail") {
          dispatch({ type: 'setTitle', payload: { title: '新闻详情' } });
        }
        let match = queryString.parse(search);
        if (match.type === "class") {
          dispatch({ type: 'getClassArticleDetail', payload: { id: match.id } });
        } else {
          dispatch({ type: 'getArticleDetail', payload: match });
        }
      })
    }
  }
})
;
