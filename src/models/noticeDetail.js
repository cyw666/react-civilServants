/**
 * 通知内容
 */
// import key from 'keymaster';
import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import {message} from 'antd'
import {model} from './common'
import {noticeContent, favoriteAdd, favoriteDelete} from '../services/main';

export default modelExtend(model, {
  namespace: 'noticeDetail',
  state: {
    noticeDetailData: {
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
      {url: '/main/indexPage', name: '首页'},
      {url: '/main/noticeList', name: '通告公告'},
      {url: '', name: '通知内容'},
    ]
  },
  reducers: {
    changeFavoriteId(state, {payload}){
      return {
        ...state,
        noticeDetailData: {...state.noticeDetailData, ...payload},
      }
    }
  },
  effects: {
    *getNoticeDetail({payload}, {call, put}){
      let data = yield call(noticeContent, payload);
      yield put({
        type: 'updateState',
        payload: {
          noticeDetailData: data.Data.Model,
        }
      });
    },
    *favoriteAdd({payload}, {call, put}){
      let data = yield call(favoriteAdd, payload);
      if (data.Type === 1) {
        message.success(data.Message);
        yield put({type: 'changeFavoriteId', payload: {FavoriteId: data.Value}});
      } else {
        message.error('收藏失败！');
      }
    },
    *favoriteDelete({payload}, {call, put}){
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
    setup({dispatch, history}){
      history.listen((location) => {
        let match = pathToRegexp('/main/noticeDetail/:id').exec(location.pathname);
        if(match){
          dispatch({type: 'getNoticeDetail', payload: {id: match[1]}});
        }
      })
    }
  }
})
;
