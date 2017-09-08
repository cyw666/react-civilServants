// import key from 'keymaster';
import modelExtend from 'dva-model-extend'
import {model} from './common'
import {noticeList} from '../services/main'

export default modelExtend(model, {
  namespace: 'noticeList',
  state: {
    noticeListData:{
      ListData:[],
      Count:0,
      Page:1,
      Rows:10,
      search:''
    },
  },
  reducers: {
  },
  effects: {
    *getNoticeList({payload}, {call, put}){
      let data = yield call(noticeList,payload);
      yield put({
        type: 'updateState',
        payload: {
          noticeListData: data.Data,
          search:payload.search
        }});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'getNoticeList',payload:{search:''}});
    }
  },
});
