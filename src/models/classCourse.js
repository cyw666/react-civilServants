/**
 * 班级课程
 */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import model from './common'

import { classCourse } from '../services/';

export default modelExtend(model, {
  namespace: 'classCourse',
  state: {
    classId: '',
    courseType: '',
    classCourseData: {},
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
    * getClassCourse({ payload }, { call, put, select }) {
      let data = yield call(classCourse, payload);
      yield put({
        type: 'updateState',
        payload: {
          classCourseData: data.Data,
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
      let type;
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/grade/classCourse") {
          dispatch({ type: 'setTitle', payload: { title: '班级课程' } });
          let query = queryString.parse(search)
          if (id != query.id || type != query.type) {
            id = query.id;
            type = query.type;
            dispatch({ type: 'getClassCourse', payload: { id, type } });
            dispatch({ type: 'updateState', payload: { classId: id, courseType: type } });
          }
        }
      });
    }
  }
});
