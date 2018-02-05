/**
 * 班级考试
 */
import modelExtend from 'dva-model-extend'
import model from './common'
import { querySearch } from '../utils/utils'
import { classExam } from '../services/';

export default modelExtend(model, {
  namespace: 'classExam',
  state: {
    classId: '',
    classExamData: {},
    pageOptions: {
      current: 1,
      pageSize: 12,
      total: 0,
    }
  },
  reducers: {
    updatePageOptions(state, { payload }) {
      return {
        ...state,
        pageOptions: { ...state.pageOptions, ...payload }
      }
    },
  },
  effects: {
    * getClassExam({ payload }, { call, put, select }) {
      let data = yield call(classExam, payload);
      yield put({
        type: 'updateState',
        payload: {
          classExamData: data.Data,
        }
      });
      yield put({
        type: 'updatePageOptions',
        payload: {
          current: data.Data.Page,
          pageSize: data.Data.Rows,
          total: data.Data.Count,
        }
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let id;
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/grade/classExam") {
          dispatch({ type: 'setTitle', payload: { title: '班级考试' } });
          if (id != querySearch(search).id) {
            id = querySearch(search).id;
            dispatch({ type: 'getClassExam', payload: { id } });
            dispatch({ type: 'updateState', payload: { classId: id } });
          }
        }
      });
    }
  }
});
