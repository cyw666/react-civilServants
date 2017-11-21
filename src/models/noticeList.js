/*
* 通知公告列表
* */
// import key from 'keymaster';
import modelExtend from 'dva-model-extend'
import {model} from './common'
import {noticeList} from '../services/main'

export default modelExtend(model, {
  namespace: 'noticeList',
  state: {
    noticeListData: {
      ListData: [],
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
    updateNoticeParams(state, {payload}) {
      return {
        ...state,
        noticeParams: {...state.noticeParams, ...payload}
      }
    },
  },
  effects: {
    * getNoticeList({payload}, {call, put}) {
      let data = yield call(noticeList, payload);
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
      dispatch({type: 'getNoticeList', payload: {page: 1, rows: 10, search: ''}});
    }
  }
});
