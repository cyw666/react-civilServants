/**
 * 班级公告
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {classNoticeList} from '../services/main';

export default modelExtend(model, {
  namespace: 'classNoticeList',
  state: {
    classId: '',
    classNoticeListData: {},
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
    * getClassNoticeList({payload}, {call, put, select}) {
      let data = yield call(classNoticeList, payload);
      yield put({
        type: 'updateState',
        payload: {
          classNoticeListData: data.Data,
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
        if (location.pathname === "/main/grade/classNotice") {
          if (id != location.query.id) {
            id = location.query.id;
            dispatch({type: 'getClassNoticeList', payload: {id}});
            dispatch({type: 'updateState', payload: {classId: id}});
          }
        }
      })
    }
  }
});
