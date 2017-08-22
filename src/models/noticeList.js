// import key from 'keymaster';
import modelExtend from 'dva-model-extend'
import {model} from './common'

import {loginLong,noticeList,loginOut} from '../services/main';
import {getCookie, setCookie, delCookie} from '../utils/index'

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
    userInformation:{
      Model:{},
      UserType:''
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
    *getUserInformation({payload}, {call, put}){
      let data = yield call(loginLong);
      yield put({type: 'updateState', payload: {userInformation: data.Data}});
    },
    *loginOut({payload}, {call, put}){
      try {
        let data = yield call(loginOut, payload);
        if (data.Type === 1) {
          yield put({type: 'updateState', payload: {isLoginIn: false}});
          debugger
          window.location = `${location.origin}/indexPage`
        } else {
          alert(data.Message);
        }
      }
      catch (error) {
        throw error;
      }
    
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'getNoticeList',payload:{search:''}});
      dispatch({type: 'getUserInformation'});
    }
  },
});
