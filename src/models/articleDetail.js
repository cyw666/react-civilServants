/**
 * 文章内容
 */
// import key from 'keymaster';
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import pathToRegexp from 'path-to-regexp'
import {model} from './common'
import {articleContent, favoriteAdd, favoriteDelete} from '../services/main';

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
      {url: '/indexPage', name: '首页'},
      {url: '/article', name: '文章列表'},
      {url: '', name: '文章详情'},
    ]
  },
  reducers: {
    changeFavoriteId(state, {payload}) {
      return {
        ...state,
        articleDetailData: {...state.articleDetailData, ...payload,},
      }
    }
  }
  ,
  effects: {
    * getArticleDetail({payload}, {call, put}) {
      let data = yield call(articleContent, payload);
      yield put({
        type: 'updateState',
        payload: {
          articleDetailData: data.Data,
        }
      });
    },
    * favoriteAdd({payload}, {call, put}) {
      let data = yield call(favoriteAdd, payload);
      if (data.Type === 1) {
        message.success(data.Message);
        yield put({type: 'changeFavoriteId', payload: {FavoriteId: data.Value}});
      } else {
        message.error('收藏失败！');
      }
    },
    * favoriteDelete({payload}, {call, put}) {
      let data = yield call(favoriteDelete, payload);
      if (data.Type === 1) {
        message.success(data.Message);
        yield put({type: 'changeFavoriteId', payload: {FavoriteId: 0}});
      } else {
        message.error('取消收藏失败！');
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        const match = pathToRegexp('/main/articleDetail/:id').exec(location.pathname);
        if (match) {
          dispatch({type: 'getArticleDetail', payload: {id: match[1]}});
        }
      })
    }
  }
})
;
