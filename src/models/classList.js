
/*
 * 班级列表
 * */
import modelExtend from 'dva-model-extend'
import {model} from './common'
import {noticeList,classList} from '../services/main'

export default modelExtend(model, {
  namespace: 'classList',
  state: {
    classListData: {
      ListData: [],
    },
    classParams: {
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
    updateClassParams(state, {payload}){
      return {
        ...state,
        classParams: {...state.classParams, ...payload}
      }
    },
  },
  effects: {
    *getClassList({payload}, {call, put}){
      let data = yield call(classList, payload);
      yield put({
        type: 'updateState',
        payload: {
          classListData: data.Data,
          pageConfig: {
            current: data.Data.Page,
            pageSize: data.Data.Rows,
            total: data.Data.Count
          }
        }
      });
      yield put({type: 'updateClassParams', payload})
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'getClassList', payload: {page: 1, rows: 10, search: ''}});
    }
  }
});
