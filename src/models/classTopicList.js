/**
 * 班级话题
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {classTopicList} from '../services/main';

export default modelExtend(model, {
  namespace: 'classTopicList',
  state: {
    classId: '',
    classTopicListData: {},
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
    * getClassTopicList({payload}, {call, put, select}) {
      let data = yield call(classTopicList, payload);
      yield put({
        type: 'updateState',
        payload: {
          classTopicListData: data.Data,
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
        if (location.pathname === "/main/grade/classTopicList") {
          if (id != location.query.id) {
            id = location.query.id;
            dispatch({type: 'getClassTopicList', payload: {id}});
            dispatch({type: 'updateState', payload: {classId: id}});
          }
        }
      })
    }
  }
});
