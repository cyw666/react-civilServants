/**
 * 教学计划
 */
import modelExtend from 'dva-model-extend'
import model from './common'
import { querySearch } from '../utils/utils'
import { classPlan } from '../services/';

export default modelExtend(model, {
  namespace: 'classPlan',
  state: {
    classId: '',
    classPlanData: {},
  },
  reducers: {},
  effects: {
    * getClassPlan({ payload }, { call, put, select }) {
      let data = yield call(classPlan, payload);
      yield put({
        type: 'updateState',
        payload: {
          classPlanData: data.Data,
        }
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let id;
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/grade/classPlan") {
          dispatch({ type: 'setTitle', payload: { title: '教学计划' } });
          if (id != querySearch(search).id) {
            id = querySearch(search).id;
            dispatch({ type: 'getClassPlan', payload: { id } });
            dispatch({ type: 'updateState', payload: { classId: id } });
          }
        }
      });
    }
  }
});
