import modelExtend from 'dva-model-extend'
import {model} from './common'
import {noticeList} from '../services/main'

export default modelExtend(model, {
  namespace: 'play',
  state: {
    noticeListData: {
      ListData: [],
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
      let data = yield call(noticeList, payload);
      yield put({
        type: 'updateState',
        payload: {
          noticeListData: data.Data,
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'getNoticeList', payload: {page: 1, rows: 10, search: ''}});
    }
  }
});
