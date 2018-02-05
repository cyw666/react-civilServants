/**
 * 个人档案
 */
import modelExtend from 'dva-model-extend'
import { studyStatistics } from '../services/'
import model from './common'

export default modelExtend(model, {
  namespace: 'personalFile',
  state: {
    personalFileData: {
      Model: {},
      ViewBag: {}
    },
    params: {}
  },
  reducers: {
    updateParams(state, { payload }) {
      return {
        ...state,
        params: { ...state.params, ...payload },
      }
    },
  },
  effects: {
    * getStudyStatistics({ payload }, { call, put }) {
      let data = yield call(studyStatistics, payload);
      yield put({ type: 'updateState', payload: { personalFileData: data.Data } });
      yield put({ type: 'updateParams', payload });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/main/personalFile') {
          dispatch({ type: 'setTitle', payload: { title: '个人档案' } });
        }
      });
      dispatch({ type: 'getStudyStatistics', payload: { rows: 100 } });
    }
  },
});
