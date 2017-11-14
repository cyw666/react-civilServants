/**
 * 班级考试
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {classExam} from '../services/main';

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
    updatePageOptions(state, {payload}) {
      return {
        ...state,
        pageOptions: {...state.pageOptions, ...payload}
      }
    },
  },
  effects: {
    * getClassExam({payload}, {call, put, select}) {
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
    setup({dispatch, history}) {
      let id;
      history.listen((location) => {
        if (location.pathname === "/main/grade/classExam") {
          if (id != location.query.id) {
            id = location.query.id;
            dispatch({type: 'getClassExam', payload: {id}});
            dispatch({type: 'updateState', payload: {classId: id}});
          }
        }
      })
    }
  }
});
