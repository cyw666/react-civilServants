/**
 * 个人档案
 */
import modelExtend from 'dva-model-extend'
import {studyStatistics} from '../services/main'
import {model} from './common'

export default modelExtend(model,{
  namespace: 'personalFile',
  state: {
    personalFileData:{
      Model: {},
      ViewBag: {}
    },
    params: {}
  },
  reducers: {
    updateParams (state, {payload}) {
      return {
        ...state,
        params: {...state.params,...payload},
      }
    },
  },
  effects: {
    *getStudyStatistics({payload}, {call, put}){
      let data = yield call(studyStatistics,payload);
      yield put({type: 'updateState', payload: {personalFileData: data.Data}});
      yield put({type: 'updateParams', payload});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'getStudyStatistics',payload:{rows:100}});
    }
  },
});
