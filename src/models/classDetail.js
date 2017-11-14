/**
 * 班级详情
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {classDetail} from '../services/main';

export default modelExtend(model, {
  namespace: 'classDetail',
  state: {
    classId: '',
    classDetailData: {},
  },
  reducers: {},
  effects: {
    * getClassDetail({payload}, {call, put, select}) {
      let data = yield call(classDetail, payload);
      yield put({
        type: 'updateState',
        payload: {
          classDetailData: data.Data.Model,
        }
      })
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      let id;
      history.listen((location) => {
        if (location.pathname === "/main/grade/classDetail") {
          if (id != location.query.id) {
            id = location.query.id;
            dispatch({type: 'getClassDetail', payload: {id}});
            dispatch({type: 'updateState', payload: {classId: id}});
          }
        }
      })
    }
  }
});
