/**
 * 教学计划
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {classStudent} from '../services/main';

export default modelExtend(model, {
  namespace: 'classStudent',
  state: {
    classId: '',
    classStudentData: {},
    pageOptions: {
      current: 1,
      pageSize: 12,
      total: 0,
    }
  },
  reducers: {
    updatePageOptions(state, {payload}) {
      return {
        ...state,
        pageOptions: {...state.pageOptions, ...payload}
      }
    },
  },
  effects: {
    * getClassStudent({payload}, {call, put, select}) {
      let data = yield call(classStudent, payload);
      yield put({
        type: 'updateState',
        payload: {
          classStudentData: data.Data,
        }
      });
      yield put({
        type: 'updatePageOptions',
        payload: {
          current: data.Data.Page,
          pageSize: data.Data.Rows,
          total: data.Data.Pass,
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      let id;
      history.listen((location) => {
        if (location.pathname === "/main/grade/classStudent") {
          if (id != location.query.id) {
            id = location.query.id;
            dispatch({type: 'getClassStudent', payload: {id}});
            dispatch({type: 'updateState', payload: {classId: id}});
          }
        }
      })
    }
  }
});
