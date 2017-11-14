/**
 * 教学计划
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {classPlan} from '../services/main';

export default modelExtend(model, {
  namespace: 'classPlan',
  state: {
    classId: '',
    classPlanData: {},
  },
  reducers: {},
  effects: {
    * getClassPlan({payload}, {call, put, select}) {
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
    setup({dispatch, history}) {
      let id;
      history.listen((location) => {
        if (location.pathname === "/main/grade/classPlan") {
          if (id != location.query.id) {
            id = location.query.id;
            dispatch({type: 'getClassPlan', payload: {id}});
            dispatch({type: 'updateState', payload: {classId: id}});
          }
        }
      })
    }
  }
});
