/**
 * 教学计划
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {classPaperList} from '../services/main';

export default modelExtend(model, {
  namespace: 'classPaperList',
  state: {
    classId: '',
    classPaperListData: {},
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
    * getClassPaperList({payload}, {call, put, select}) {
      let data = yield call(classPaperList, payload);
      yield put({
        type: 'updateState',
        payload: {
          classPaperListData: data.Data,
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
        if (location.pathname === "/main/grade/classPaperList") {
          if (id != location.query.id) {
            id = location.query.id;
            dispatch({type: 'getClassPaperList', payload: {id}});
            dispatch({type: 'updateState', payload: {classId: id}});
          }
        }
      })
    }
  }
});
