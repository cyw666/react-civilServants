/*
 * 个人通知
 * */
// import key from 'keymaster';
import modelExtend from 'dva-model-extend'
import {model} from './common'
import {noticeUnReadList} from '../services/main'

export default modelExtend(model, {
  namespace: 'personalNotice',
  state: {
    noticeListData: {
      AllList: [],
    },
    noticeParams: {
      page: 1,
      rows: 10,
      search: ''
    },
    pageConfig: {
      current: 1,
      pageSize: 10,
      total: 0
    },
  },
  reducers: {
    updateNoticeParams(state, {payload}){
      return {
        ...state,
        noticeParams: {...state.noticeParams, ...payload}
      }
    },
  },
  effects: {
    *getNoticeList({payload}, {call, put}){
      let data = yield call(noticeUnReadList, payload);
      yield put({
        type: 'updateState',
        payload: {
          noticeListData: data.Data,
          pageConfig: {
            current: data.Data.Page,
            pageSize: data.Data.Rows,
            total: data.Data.Count
          }
        }
      });
      yield put({type: 'updateNoticeParams', payload})
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'getNoticeList', payload: {page: 1, rows: 10}});
    }
  }
});
